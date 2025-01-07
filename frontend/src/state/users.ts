import { UserData } from '../types/user';

export const initialUsers: UserData[] = [];

export function usersReducer(users: UserData[], action: any) {
    switch (action.type) {
        case 'added': {
            return [...users, action.payload];
        }
        case 'addBulk': {
            return [...users, ...action.payload];
        }
        case 'deleted': {
            return users.filter(user => user.id !== action.payload.id);
        }
        case 'editUser': {
            return users.map(user =>
                user.id === action.payload.id ? { ...action.payload } : user
            );
        }
        case 'deleteUserRecipe': {
            return users.map(user => {
                if (user.id === action.payload.userId) {
                    return {
                        ...user,
                        recipes: user.recipes?.filter(recipe => recipe.id !== action.payload.recipeId)
                    };
                }
                return user;
            });
        }
        case 'addUserRecipe': {
            return users.map(user => {
                if (user.id === action.payload.userId) {
                    const recipes = user.recipes || [];
                    recipes.push(action.payload.recipe);
                    return { ...user, recipes };
                }
                return user;
            });
        }
        case 'updateUserRecipe': {
            return users.map(user => {
                if (user.id === action.payload.userId) {
                    return {
                        ...user,
                        recipes: user.recipes?.map(recipe =>
                            recipe.id === action.payload.recipe.id ? action.payload.recipe : recipe
                        )
                    };
                }
                return user;
            });
        }
        default: {
            return users;
        }
    }
}
