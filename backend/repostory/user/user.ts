import { ItemNotExists } from "../../errors/ItemNotExists";
import { UserData, RecipeData } from "../../models/user";
import { mockUsers } from "./mock-init-data";

export interface UserRepository {
    createUser(data: UserData): Promise<UserData>;
    deleteUser(id: number): Promise<void>;
    getAllUsers(): Promise<UserData[]>;
    updateUser(id: number, data: UserData): Promise<UserData>;
    createRecipe(userId: number, recipe: RecipeData): Promise<RecipeData>;
    deleteRecipe(userId: number, recipeId: number): Promise<void>;
    getAllRecipes(userId: number): Promise<RecipeData[]>;
    updateRecipe(userId: number, recipeId: number, data: Partial<RecipeData>): Promise<RecipeData | undefined>;
}

// This is not an efficient implementation as it stores all user data in memory
// In a production environment, we would use a proper database for persistence and scalability
// Using a hash map (Map or object) instead of an array would provide O(1) lookup/deletion
// rather than O(n) operations when finding or removing users by ID
export class InMemoryUserRepository implements UserRepository {
    private users: UserData[] = [];
    private nextUserId: number = 1;
    private nextRecipeId: number = 1;

    // In the InMemoryUserRepository class, update the constructor:
    constructor() {
        // Initialize with mock data
        this.users = [...mockUsers];

        this.nextUserId = 11;

        // Find the maximum recipe ID across all users
        const maxRecipeId = Math.max(
            ...this.users.flatMap(u => u.recipes?.map(rb => rb.id ?? 0) ?? [0])
        );
        this.nextRecipeId = maxRecipeId + 1;
    }

    async createUser(data: UserData): Promise<UserData> {
        const newUser: UserData = {
            id: this.nextUserId++,
            name: data.name,
            recipes: []
        };
        this.users.push(newUser);
        return newUser;
    }

    async getAllUsers(): Promise<UserData[]> {
        return this.users;
    }

    async deleteUser(id: number): Promise<void> {
        const beforeLength = this.users.length;
        this.users = this.users.filter(item => item.id !== id);

        if (beforeLength === this.users.length) {
            throw new ItemNotExists(id);
        }
    }

    async updateUser(id: number, data: UserData): Promise<UserData> {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new ItemNotExists(id);
        }
        user.name = data.name;
        return user;
    }

    private async updateUserInMemory(userId: number, updatedData: Partial<UserData>): Promise<UserData> {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            throw new ItemNotExists(userId);
        }

        this.users[userIndex] = {
            ...this.users[userIndex],
            ...updatedData
        };

        return this.users[userIndex];
    }

    async createRecipe(userId: number, recipeData: RecipeData): Promise<RecipeData> {
        const user = await this.getUserById(userId);

        const newRecipe: RecipeData = {
            id: this.nextRecipeId++,
            name: recipeData.name,
            description: recipeData.description,
            images: recipeData.images || []
        };

        if (!user.recipes) {
            user.recipes = [];
        }

        user.recipes.push(newRecipe);
        await this.updateUserInMemory(userId, { recipes: user.recipes });

        return newRecipe;
    }

    async getAllRecipes(userId: number): Promise<RecipeData[]> {
        const user = await this.getUserById(userId);
        return user.recipes || [];
    }

    async deleteRecipe(userId: number, recipeId: number): Promise<void> {
        const user = await this.getUserById(userId);
        const beforeLength = user.recipes?.length || 0;

        user.recipes = user.recipes?.filter(recipe => recipe.id !== recipeId) || [];

        if (beforeLength === user.recipes.length) {
            throw new ItemNotExists(recipeId);
        }

        await this.updateUserInMemory(userId, { recipes: user.recipes });
    }

    async updateRecipe(userId: number, recipeId: number, data: Partial<RecipeData>): Promise<RecipeData | undefined> {
        const user = await this.getUserById(userId);
        const recipeIndex = user.recipes?.findIndex(rb => rb.id === recipeId) ?? -1;

        if (recipeIndex === -1) {
            throw new ItemNotExists(recipeId);
        }

        if (user.recipes?.[recipeIndex]) {
            const updatedRecipe: RecipeData = {
                ...user.recipes[recipeIndex],
                ...data,
                id: recipeId
            };

            user.recipes[recipeIndex] = updatedRecipe;
            await this.updateUserInMemory(userId, { recipes: user.recipes });

            return updatedRecipe;
        }
    }

    private async getUserById(id: number): Promise<UserData> {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new ItemNotExists(id);
        }
        return user;
    }
}



