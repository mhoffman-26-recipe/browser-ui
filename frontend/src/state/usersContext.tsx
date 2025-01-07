import React, { createContext, Dispatch, useEffect, useReducer } from 'react';
import { RecipeData, UserData } from '../types/user';
import { usersReducer } from './users';
import { initialUsers } from './users';

type Action =
    | { type: 'added'; payload: UserData }
    | { type: 'deleted'; payload: { id: number } }
    | { type: 'addBulk'; payload: UserData[] }
    | { type: 'editUser'; payload: Partial<UserData> }
    | { type: 'deleteUserRecipe'; payload: { userId: number; recipeId: number } }
    | { type: 'addUserRecipe'; payload: { userId: number; recipe: RecipeData } }
    | { type: 'updateUserRecipe'; payload: { userId: number; recipe: RecipeData } };

export const UsersContext = createContext<UserData[]>([]);
export const UsersDispatchContext = createContext<Dispatch<Action> | null>(null);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
    const [users, dispatch] = useReducer(usersReducer, initialUsers);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/user');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();

            if (dispatch) {
                dispatch({ type: 'addBulk', payload: data });
            }
        } catch (err) {
            // todo handle error corectly
            console.error("got error whilel oading users", err);
        }
    }


    return (
        <UsersContext.Provider value={users}>
            <UsersDispatchContext.Provider value={dispatch}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersContext.Provider>
    );
};