import express from 'express';
import { validateRequest } from '../../validator/validator';
import { body, param } from 'express-validator';
import { createRecipe, deleteRecipe, updateRecipe, getAllRecipes } from '../../controller/user';

const router = express.Router({ mergeParams: true });

// Validators
const recipeValidator = [
    body('name').isString().notEmpty(),
    body('description').optional().isString(),
    body('images').optional().isArray(),
    param('userId').isInt(),
];

const recipeIdValidator = [
    param('userId').isInt(),
    param('recipeId').isInt()
];

const getAllRecipeValidator = [
    param('userId').isInt(),
];

// Routes
router.post('/',
    recipeValidator,
    validateRequest,
    createRecipe
);

router.get('/',
    getAllRecipeValidator,
    validateRequest,
    getAllRecipes
);

router.delete('/:recipeId',
    recipeIdValidator,
    validateRequest,
    deleteRecipe
);

router.put('/:recipeId',
    recipeIdValidator,
    validateRequest,
    updateRecipe
);

export default router; 