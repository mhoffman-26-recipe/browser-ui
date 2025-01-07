import { body, ValidationChain, param } from 'express-validator';

export const postUserValidator: ValidationChain[] = [
    body('name').exists().trim().isString().notEmpty(),
];


export const deleteUserValidator: ValidationChain[] = [
    param('id')
        .exists().withMessage('ID parameter is required')
        .isInt().withMessage('ID must be a number')
        .notEmpty().withMessage('ID cannot be empty')
];
export const updateUserValidator: ValidationChain[] = [
    param('id')
        .exists().withMessage('ID parameter is required')
        .isInt().withMessage('ID must be a number')
        .notEmpty().withMessage('ID cannot be empty'),
    body('name')
        .exists().withMessage('Name is required')
        .trim()
        .isString().withMessage('Name must be a string')
        .notEmpty().withMessage('Name cannot be empty')
];