import request from 'supertest';
import { createApp } from '../../../app';
import { userPath, getUserRecipePath } from './const';

describe('E2E Tests User Recipe', () => {
    let app;

    beforeAll(() => {
        app = createApp();
    });
    let userId;

    beforeEach(async () => {
        // Create a test user before each test
        const newUserData = {
            name: "Test User"
        };
        const createUserRes = await request(app)
            .post(userPath)
            .send(newUserData);

        expect(createUserRes.status).toBe(201);
        userId = createUserRes.body.id;
    });

    afterEach(async () => {
        // Clean up - delete test user after each test
        if (userId) {
            await request(app)
                .delete(`${userPath}/${userId}`);
        }
    });

    it('should create new recipe for user successfully', async () => {
        // Arrange
        const newRecipeData = {
            name: "My Favorite Recipe"
        }

        // Act
        const res = await request(app)
            .post(getUserRecipePath(userId))
            .send({ name: newRecipeData.name })

        // Assert
        expect(res.status).toBe(201);
        const { body } = res
        expect(body.name).toBe(newRecipeData.name);
        expect(body.id).toBeGreaterThan(0)
    });

    it('should be able to delete created recipe', async () => {
        // Arrange
        const newRecipeData = {
            name: "Family Recipe 2023"
        }

        // Act
        const createRes = await request(app)
            .post(getUserRecipePath(userId))
            .send({ name: newRecipeData.name })
        const { body } = createRes
        const recipeIdToDelete = body.id

        const deleteRes = await request(app)
            .delete(`${getUserRecipePath(userId)}/${recipeIdToDelete}`)

        const getAllRecipesRes = await request(app)
            .get(getUserRecipePath(userId))

        // Assert
        expect(createRes.status).toBe(201);
        expect(deleteRes.status).toBe(204);
        expect(getAllRecipesRes.status).toBe(200);

        expect(getAllRecipesRes.body.every(recipe => recipe.id !== recipeIdToDelete)).toBeTruthy()
    });

    it('should retrieve all created recipes', async () => {
        // Arrange
        const newRecipes = [
            { name: "Summer Pasta 2023" },
            { name: "Winter Soup 2023" }
        ];

        // Create multiple recipes
        for (const recipe of newRecipes) {
            const createRes = await request(app)
                .post(getUserRecipePath(userId))
                .send({ name: recipe.name });
            expect(createRes.status).toBe(201);
        }

        // Act
        const getAllRecipesRes = await request(app)
            .get(getUserRecipePath(userId));

        // Assert
        expect(getAllRecipesRes.status).toBe(200);
        const allRecipes = getAllRecipesRes.body;

        expect(Array.isArray(allRecipes)).toBeTruthy();
        expect(allRecipes.length).toBeGreaterThanOrEqual(newRecipes.length);

        // Ensure each created recipe is in the response
        newRecipes.forEach((recipe) => {
            expect(allRecipes.some((responseRecipe: { name: string }) =>
                responseRecipe.name === recipe.name
            )).toBeTruthy();
        });
    });

    it('should return 404 when trying to delete a non-existent recipe', async () => {
        // Arrange
        const nonExistentRecipeId = -100;

        // Act
        const deleteRes = await request(app)
            .delete(`${getUserRecipePath(userId)}/${nonExistentRecipeId}`);

        // Assert
        expect(deleteRes.status).toBe(404);
        expect(deleteRes.body).toHaveProperty('error');
        expect(deleteRes.body.error).toBe(`Item with id: ${nonExistentRecipeId} doesn't exists`);
    });

    describe('Recipe Update Tests', () => {
        let testRecipeId: number;

        beforeEach(async () => {
            // Create a test recipe before each test
            const createRes = await request(app)
                .post(getUserRecipePath(userId))
                .send({ name: "Test Recipe", description: "Test Recipe Description" });

            expect(createRes.status).toBe(201);
            testRecipeId = createRes.body.id;
        });

        afterEach(async () => {
            // Delete test recipe after each test
            const deleteRes = await request(app)
                .delete(`${getUserRecipePath(userId)}/${testRecipeId}`);
            expect(deleteRes.status).toBe(204);
        });

        it('should update recipe name successfully', async () => {
            // Arrange
            const updateData = {
                name: "Updated Recipe Name"
            };

            // Act
            const res = await request(app)
                .put(`${getUserRecipePath(userId)}/${testRecipeId}`)
                .send(updateData);

            // Assert
            expect(res.status).toBe(200);
            expect(res.body.name).toBe(updateData.name);
            expect(res.body.id).toBe(testRecipeId);
        });

        it('should update recipe description successfully', async () => {
            // Arrange
            const updateData = {
                description: "This is my favorite recipe"
            };

            // Act
            const res = await request(app)
                .put(`${getUserRecipePath(userId)}/${testRecipeId}`)
                .send(updateData);

            // Assert
            expect(res.status).toBe(200);
            expect(res.body.description).toBe(updateData.description);
            expect(res.body.id).toBe(testRecipeId);
        });

        it('should add new images to recipe', async () => {
            // Arrange
            const initialImages = ["oldImage1.jpg"];
            const newImages = ["oldImage1.jpg", "image1.jpg", "image2.jpg"];

            // First set initial images
            const initialImagesRes = await request(app)
                .put(`${getUserRecipePath(userId)}/${testRecipeId}`)
                .send({ images: initialImages });

            expect(initialImagesRes.status).toBe(200);
            expect(initialImagesRes.body.images).toEqual(initialImages);

            // Act - Add new images by sending full updated array
            const res = await request(app)
                .put(`${getUserRecipePath(userId)}/${testRecipeId}`)
                .send({ images: newImages });

            // Assert
            expect(res.status).toBe(200);
            expect(res.body.images).toEqual(newImages);
            expect(res.body.images).toContain("image1.jpg");
            expect(res.body.images).toContain("image2.jpg");
            expect(res.body.images).toContain("oldImage1.jpg");
        });

        it('should remove images from recipe', async () => {
            // Arrange
            const initialImages = ["image1.jpg", "image2.jpg", "image3.jpg"];
            const updatedImages = ["image2.jpg", "image3.jpg"]; // Removing image1.jpg

            // First set initial images
            const addImagesRes = await request(app)
                .put(`${getUserRecipePath(userId)}/${testRecipeId}`)
                .send({ images: initialImages });

            expect(addImagesRes.status).toBe(200);
            expect(addImagesRes.body.images).toEqual(initialImages);

            // Act - Remove image by sending updated array without it
            const res = await request(app)
                .put(`${getUserRecipePath(userId)}/${testRecipeId}`)
                .send({ images: updatedImages });

            // Assert
            expect(res.status).toBe(200);
            expect(res.body.images).toEqual(updatedImages);
            expect(res.body.images).not.toContain("image1.jpg");
            expect(res.body.images).toContain("image2.jpg");
            expect(res.body.images).toContain("image3.jpg");
        });

        it('should handle multiple update operations in single request', async () => {
            // Arrange
            const updateData = {
                name: "My Family Recipe",
                description: "Best recipe from 2023",
                images: ["newImage1.jpg", "newImage2.jpg"]
            };

            // Act
            const res = await request(app)
                .put(`${getUserRecipePath(userId)}/${testRecipeId}`)
                .send(updateData);

            // Assert
            expect(res.status).toBe(200);
            expect(res.body.name).toBe(updateData.name);
            expect(res.body.description).toBe(updateData.description);
            expect(res.body.images).toEqual(updateData.images);
        });

        it('should return 404 when trying to update non-existent recipe', async () => {
            // Arrange
            const nonExistentRecipeId = -999;
            const updateData = {
                name: "New Name"
            };

            // Act
            const res = await request(app)
                .put(`${getUserRecipePath(userId)}/${nonExistentRecipeId}`)
                .send(updateData);

            // Assert
            expect(res.status).toBe(404);
            expect(res.body.error).toBe(`Item with id: ${nonExistentRecipeId} doesn't exists`);
        });
    });
});
