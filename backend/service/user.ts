import { UserData, RecipeData } from '../models/user';
import { UserRepository } from '../repostory/user/user';

export class UserService {
    private repositoryClient: UserRepository;

    constructor(repositoryClient: UserRepository) {
        this.repositoryClient = repositoryClient;
    }

    async createItem(data: UserData): Promise<UserData> {
        return this.repositoryClient.createUser(data);
    }

    async getAllItems(): Promise<UserData[]> {
        return this.repositoryClient.getAllUsers();
    }

    async delete(id: number): Promise<void> {
        return this.repositoryClient.deleteUser(id);
    }

    async updateItem(id: number, data: UserData): Promise<UserData> {
        return this.repositoryClient.updateUser(id, data);
    }

    async createRecipe(userId: number, data: RecipeData): Promise<RecipeData> {
        return this.repositoryClient.createRecipe(userId, data);
    }

    async getAllRecipes(userId: number): Promise<RecipeData[]> {
        return this.repositoryClient.getAllRecipes(userId);
    }

    async deleteRecipe(userId: number, recipeId: number): Promise<void> {
        return this.repositoryClient.deleteRecipe(userId, recipeId);
    }

    async updateRecipe(userId: number, recipeId: number, data: Partial<RecipeData>): Promise<RecipeData | undefined> {
        return this.repositoryClient.updateRecipe(userId, recipeId, data);
    }
}


