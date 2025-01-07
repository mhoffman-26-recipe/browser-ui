import request from 'supertest';
import { createApp } from '../../../app';
import { userPath } from './const';

describe('E2E Tests User', () => {
    let app;

    beforeAll(() => {
        app = createApp();
    });

    it('should create new user successfully', async () => {
        // Arrange
        const newUserData = {
            name: "Brand New Name"
        }

        // Act
        const res = await request(app)
            .post(userPath)
            .send({ name: newUserData.name })

        // Assert
        expect(res.status).toBe(201);
        const { body } = res
        expect(body.name).toBe(newUserData.name);
        expect(body.id).toBeGreaterThan(0)
    });

    it('should be able to delete created user', async () => {
        // Arrange
        const newUserData = {
            name: "Brand New Name"
        }

        // Act
        const createRes = await request(app)
            .post(userPath)
            .send({ name: newUserData.name })
        const { body } = createRes
        const userIdToDelete = body.id

        const deleteRes = await request(app)
            .delete(userPath + '/' + userIdToDelete)

        const getAllUsersRes = await request(app)
            .get(userPath)


        // Assert
        expect(createRes.status).toBe(201);
        expect(deleteRes.status).toBe(204);
        expect(getAllUsersRes.status).toBe(200);
        expect(getAllUsersRes.body.every(user => user.id !== userIdToDelete)).toBeTruthy()
    });

    it('should retrieve all created users', async () => {
        // Arrange
        const newUsers = [
            { name: "P. One" },
            { name: "P. Two" }
        ];

        // Create multiple users
        for (const item of newUsers) {
            const createRes = await request(app)
                .post(userPath)
                .send({ name: item.name });
            expect(createRes.status).toBe(201);
        }

        // Act
        const getAllUsersRes = await request(app).get(userPath);

        // Assert
        expect(getAllUsersRes.status).toBe(200);
        const allUsers = getAllUsersRes.body;

        expect(Array.isArray(allUsers)).toBeTruthy();
        expect(allUsers.length).toBeGreaterThanOrEqual(newUsers.length);

        // Ensure each created user is in the response
        newUsers.forEach((item) => {
            expect(allUsers.some((user: { name: string }) => user.name === item.name)).toBeTruthy();
        });
    });
    it('should update an existing user', async () => {
        // Arrange
        const originalUser = { name: "Original Name" };
        const updatedName = "Updated Name";

        // Create a user first
        const createRes = await request(app)
            .post(userPath)
            .send(originalUser);
        expect(createRes.status).toBe(201);
        const userId = createRes.body.id;

        // Act
        const updateRes = await request(app)
            .put(`${userPath}/${userId}`)
            .send({ name: updatedName });

        // Verify the update
        const getRes = await request(app)
            .get(userPath);

        // Assert
        expect(updateRes.status).toBe(200);
        expect(updateRes.body.id).toBe(userId);
        expect(updateRes.body.name).toBe(updatedName);

        // Verify the user was actually updated in the list
        const updatedUser = getRes.body.find((user: { id: number }) => user.id === userId);
        expect(updatedUser).toBeTruthy();
        expect(updatedUser.name).toBe(updatedName);
    });

    it('should return 404 when trying to update a non-existent user', async () => {
        // Arrange
        const nonExistentUserId = -100;
        const updateData = { name: "New Name" };

        // Act
        const updateRes = await request(app)
            .put(`${userPath}/${nonExistentUserId}`)
            .send(updateData);

        // Assert
        expect(updateRes.status).toBe(404);
        expect(updateRes.body).toHaveProperty('error');
        expect(updateRes.body.error).toBe(`Item with id: ${nonExistentUserId} doesn't exists`);
    });


    it('should return 404 when trying to delete a non-existent user', async () => {
        // Arrange
        const nonExistentUserId = -100; // ID that doesn't exist in the database

        // Act
        const deleteRes = await request(app).delete(`${userPath}/${nonExistentUserId}`);

        // Assert
        expect(deleteRes.status).toBe(404);
        expect(deleteRes.body).toHaveProperty('error');
        expect(deleteRes.body.error).toBe(`Item with id: ${nonExistentUserId} doesn't exists`);
    });
});
