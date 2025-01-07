import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';

import { UserService } from '../service/user';
import { createUserRepo } from "../repostory/user/repostory-factory";

const userClient = createUserRepo();
const userService = new UserService(userClient);

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const newUser = await userService.createItem(req.body);
        res.status(StatusCodes.CREATED).json(newUser);
    } catch (error) {
        next(error)
    }
}

export async function getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const users = await userService.getAllItems();
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        next(error)
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await userService.delete(+req.params?.id);
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error)
    }
}

export async function updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const updatedUser = await userService.updateItem(+req.params.id, req.body);
        res.status(StatusCodes.OK).json(updatedUser);
    } catch (error) {
        next(error)
    }
}

export async function createRecipe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId = parseInt(req.params.userId);
        const recipe = await userService.createRecipe(userId, req.body);
        res.status(StatusCodes.CREATED).json(recipe);
    } catch (error) {
        next(error);
    }
}

export async function getAllRecipes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId = parseInt(req.params.userId);
        const recipes = await userService.getAllRecipes(userId);
        res.status(StatusCodes.OK).json(recipes);
    } catch (error) {
        next(error);
    }
}

export async function deleteRecipe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId = parseInt(req.params.userId);
        const recipeId = parseInt(req.params.recipeId);
        await userService.deleteRecipe(userId, recipeId);
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
}

export async function updateRecipe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId = parseInt(req.params.userId);
        const recipeId = parseInt(req.params.recipeId);
        const recipe = await userService.updateRecipe(userId, recipeId, req.body);
        res.status(StatusCodes.OK).json(recipe);
    } catch (error) {
        next(error);
    }
}