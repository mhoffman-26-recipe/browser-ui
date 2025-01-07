import React, { useState } from 'react';
import { UserData } from '../types/user';
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Stack,
    Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RecipeIcon from '@mui/icons-material/PhotoAlbum';
import UserForm from '../form/User';

interface UserListProps {
    users: UserData[];
    onDeleteUser: (userId: number) => void;
    onEditUser: (userId: number, userData: { name: string }) => void;
}

interface CardContentProps {
    user: UserData;
    onDeleteUser: (userId: number) => void;
}

interface UserRecipeSectionProps {
    user: UserData;
    onDeleteUser: (userId: number) => void;
    onClickEditUser: () => void;
}
// the function passes can be improved over here

const UserRecipeSection: React.FC<UserRecipeSectionProps> = ({ user, onDeleteUser, onClickEditUser }) => {
    return (
        <>
            <Box display="flex" alignItems="center" gap={1}>
                <RecipeIcon color="primary" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                    Recipes: {user.recipes?.length || 0}
                </Typography>
            </Box>

            <Button
                component={Link}
                to={`/users/${user.id}`}
                variant="contained"
                color="primary"
                size="small"
                startIcon={<RecipeIcon />}
                fullWidth
            >
                View Recipes
            </Button>
            <Button
                onClick={onClickEditUser}
                variant="contained"
                color="info"
                size="small"
                title="Edit User"
                startIcon={<EditIcon />}
            >
                Edit User
            </Button>
            <Button
                onClick={() => onDeleteUser(user.id || -1)}
                variant="contained"
                color="error"
                size="small"
                title="Delete User"
                startIcon={<DeleteIcon />}
            >
                Delete User
            </Button>
        </>
    );
};


const UserCardContent: React.FC<CardContentProps & { onEditUser: () => void }> = ({ user, onDeleteUser, onEditUser }) => {
    return (
        <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Typography variant="h5" component="h2" gutterBottom>
                    {user.name}
                </Typography>
            </Box>

            <Stack spacing={2}>
                <UserRecipeSection user={user} onDeleteUser={onDeleteUser} onClickEditUser={onEditUser} />
            </Stack>
        </CardContent>
    );
};

const UserList: React.FC<UserListProps> = ({ users, onDeleteUser, onEditUser }) => {
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

    const handleEditUser = (userData: { name: string }) => {
        if (selectedUser) {
            onEditUser(selectedUser.id || -1, userData);
        }
        setOpen(false);
    };

    return (
        <Grid container spacing={3}>
            {users.map(user => (
                <Grid item xs={12} sm={6} md={4} key={user.id}>
                    <Card elevation={3}>
                        <UserCardContent
                            user={user}
                            onDeleteUser={onDeleteUser}
                            onEditUser={() => {
                                setSelectedUser(user);
                                setOpen(true);
                            }}
                        />
                    </Card>
                </Grid>
            ))}
            {open && <UserForm user={selectedUser} open={open} onClose={() => setOpen(false)} onSubmit={handleEditUser} title="Edit User" />}
        </Grid>
    );
};

export default UserList; 