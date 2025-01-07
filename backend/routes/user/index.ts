import express from 'express'

import { validateRequest } from '../../validator/validator';
import { deleteUserValidator, postUserValidator, updateUserValidator, } from './validators';
import { createUser, deleteUser, getUsers, updateUser } from '../../controller/user';
import recipeRouter from './recipe';

const router = express.Router();

router.post('',
    postUserValidator,
    validateRequest,
    createUser
);

router.get('',
    getUsers
);

router.delete('/:id',
    deleteUserValidator,
    validateRequest,
    deleteUser
);

router.put('/:id',
    updateUserValidator,
    validateRequest,
    updateUser
);

router.use('/:userId/recipe', recipeRouter);

export default router;
