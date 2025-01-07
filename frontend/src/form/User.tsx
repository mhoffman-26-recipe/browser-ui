import React from 'react';
import { FormHelperText, Input, FormControl, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { UserData } from '../types/user';

interface UserFormProps {
    user?: UserData | null;
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string }) => void;
    title: string;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, open, onClose, title }) => {
    const [name, setName] = React.useState(user?.name || '');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit({ name });
        setName('');
        onClose(); // Close the dialog after submission
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <FormControl>
                    <TextField
                        // error to do add error when name is not valid
                        required
                        id="filled-required"
                        label="Required"
                        defaultValue={user?.name}
                        variant="filled"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <FormHelperText id="my-helper-text">Enter User Name</FormHelperText>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={name.trim() === '' || name === user?.name} // Disable if name is empty or hasn't changed
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserForm;
