import React, { useContext, useState } from 'react';
import { UsersContext, UsersDispatchContext } from '../state/usersContext';
import UserForm from '../form/User';
import { Button, Divider, Typography } from '@mui/material';
import UserList from '../components/UserList';
import AddIcon from '@mui/icons-material/Add';
import { addUser, deleteUser, updateUser } from '../api/user';

const Users: React.FC = () => {
    const users = useContext(UsersContext);
    const dispatch = useContext(UsersDispatchContext);
    const [isOpenUserForm, setIsOpenUserForm] = useState(false);

    const handleOpen = () => {
        setIsOpenUserForm(true);
    };

    const [error, setError] = useState<string | null>(null);


    // to do pass the handles API functions using React Context to avoid prop drilling.
    const handleDeleteUser = async (userId: number) => {
        try {
            const res = await deleteUser(userId)
            
            if (dispatch) {
                dispatch({ type: 'deleted', payload: { id: userId } });
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete user');
        }
    };

    const handleEditUser = async (userId: number, userData: { name: string }) => {
        try {
            const updatedUser = await updateUser(userId, userData.name )

            if (dispatch) {
                dispatch({ type: 'editUser', payload: {
                    ...updatedUser,
                    id: userId
                } });
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to edit user');
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }


    const handleClose = () => {
        setIsOpenUserForm(false);
    };

    const handleSubmit = async (userData: { name: string; }) => {
        // Handle user data submission logic here
        // todo dispatch and add
        const res = await addUser(userData.name)
        if (dispatch) {
            dispatch({
                type: 'added', payload: {
                    name: userData.name,
                    id: res.id
                }
            });
        }
    };

    return (
        <div className="users-container">
            <Typography variant="h3" component="h3" gutterBottom>
                Users
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<AddIcon />}>Add User</Button>
            <UserForm open={isOpenUserForm} onClose={handleClose} onSubmit={handleSubmit} title='Add User'/>
            <Divider sx={{ my: 2 }} />
            <UserList users={users} onDeleteUser={handleDeleteUser} onEditUser={handleEditUser} />
        </div>
    );
};

export default Users; 