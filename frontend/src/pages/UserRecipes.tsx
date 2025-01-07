import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RecipeData, UserData } from '../types/user';
import RecipeList from '../components/recipe/RecipeList';
import { UsersContext, UsersDispatchContext } from '../state/usersContext';
import { Box, Typography, Button, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RecipeForm from '../form/RecipeForm';
import AddIcon from '@mui/icons-material/Add';

const UserRecipes: React.FC = () => {
    const { id } = useParams();
    const users = useContext(UsersContext);
    const dispatch = useContext(UsersDispatchContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<UserData | undefined>(undefined);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (users.length) {
            const foundUser = users.find(user => user.id === Number(id));
            if (foundUser) {
                setUser(foundUser);
            } else {
                setError('User not found');
            }
            setLoading(false);
        }

    }, [users, id]);

    // to do pass the handles API functions using React Context to avoid prop drilling.
    const handleDeleteRecipe = async (recipeId: number) => {
        try {
            const response = await fetch(`/api/user/${id}/recipe/${recipeId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete recipe');
            }
            if (dispatch) {
                dispatch({ type: 'deleteUserRecipe', payload: { userId: Number(id), recipeId: recipeId } });
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete recipe');
        }
    };

    const handleCreateRecipe = async (data: RecipeData) => {
        try {
            const response = await fetch(`/api/user/${id}/recipe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to create recipe');
            }

            const createdRecipe = await response.json();
            if (dispatch) {
                dispatch({ type: 'addUserRecipe', payload: { userId: Number(id), recipe: createdRecipe } });
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create recipe');
        }
    };

    const handleUpdateRecipe = async (data: RecipeData) => {
        try {
            const response = await fetch(`/api/user/${id}/recipe/${data.id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to update recipe');
            }
            if (dispatch) {
                dispatch({ type: 'updateUserRecipe', payload: { userId: Number(id), recipe: data } });
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update recipe');
        }
    }

    const UserRecipeHeader: React.FC<{ user: UserData }> = ({ user }) => {
        return <Box sx={{ mb: 3 }}>
            <Button
                component={Link}
                to="/users"
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 1 }}
                variant="outlined"
            >
                Back to Users
            </Button>
            <Typography variant="h3" component="h1">
                {user?.name}'s Recipes
            </Typography>
        </Box>;
    }



    if (loading) {
        return <div>Loading recipes...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Box sx={{ p: 3 }}>
            {user && <UserRecipeHeader user={user} />}
            <Divider sx={{ my: 2 }} />
            {open && (
                <RecipeForm
                    open={open}
                    onClose={handleClose}
                    onSubmit={handleCreateRecipe}
                    title="Create Recipe"
                    submitText="Create"
                />
            )}
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleOpen} 
                startIcon={<AddIcon />}
            >
                Add Recipe
            </Button>
            <Divider sx={{ my: 2 }} />
            {user && user.id && (
                <RecipeList
                    userId={user.id}
                    recipes={user.recipes || []}
                    onDeleteRecipe={handleDeleteRecipe}
                    onEditRecipe={handleUpdateRecipe}
                />
            )}
        </Box>
    );
};

export default UserRecipes; 