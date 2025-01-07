import React from 'react';
import {
    FormHelperText,
    FormControl,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { RecipeData } from '../types/user';
import RecipeFormImages from './RecipeFormImages';

interface RecipeFormProps {
    recipe?: RecipeData | null;
    open: boolean;
    onClose: () => void;
    onSubmit: (data: RecipeData) => void;
    title: string;
    submitText?: string;
}

interface FormButtonsProps {
    onClose: () => void;
    onSubmit: (event: React.FormEvent) => void;
    isValid: boolean;
    submitText?: string;
}

const FormButtons: React.FC<FormButtonsProps> = ({ onClose, onSubmit, isValid, submitText }) => {
    return (
        <DialogActions>
            <Button onClick={onClose} color="primary">
                Cancel
            </Button>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={onSubmit}
                disabled={!isValid}
            >
                {submitText || 'Submit'}
            </Button>
        </DialogActions>
    );
};

interface FormTextFiledsProps {
    recipe?: RecipeData | null;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
}

const FormTextFileds: React.FC<FormTextFiledsProps> = ({ recipe, setName, setDescription }) => {
    return (
        <>
            <TextField
                id="recipe-name"
                label="Recipe Name"
                defaultValue={recipe?.name}
                variant="filled"
                required
                onChange={(e) => setName(e.target.value)}
            />
            <FormHelperText>Enter Recipe Name</FormHelperText>

            <TextField
                id="recipe-description"
                label="Description"
                defaultValue={recipe?.description}
                variant="filled"
                multiline
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
            />
            <FormHelperText>Enter Recipe Description (Optional)</FormHelperText>
        </>
    );
};


// todo put in utils
const arraysEqual = (a: string[], b: string[]) => {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
};



const RecipeForm: React.FC<RecipeFormProps> = ({ recipe, onSubmit, open, onClose, title, submitText }) => {
    const [name, setName] = React.useState(recipe?.name || '');
    const [description, setDescription] = React.useState(recipe?.description || '');
    const [images, setImages] = React.useState<string[]>(recipe?.images || []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit({ name, description, images, id: recipe?.id });
        setName('');
        setDescription('');
        setImages([]);
        onClose();
    };

    const isFormValid = () => {
        return name.trim() !== '' &&
            (recipe ? (
                name !== recipe.name ||
                description !== recipe.description ||
                !arraysEqual(images, recipe.images || [])
            ) : true);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={{ gap: 2, mt: 1 }}>
                    <FormTextFileds
                        recipe={recipe}
                        setName={setName}
                        setDescription={setDescription}
                    />
                    {/* right now the primary image is the first image in the array */}
                    <RecipeFormImages
                        images={images}
                        onImagesChange={setImages}
                    />
                    <FormHelperText>Add Images (Optional)</FormHelperText>
                </FormControl>
            </DialogContent>
            <FormButtons
                onClose={onClose}
                onSubmit={handleSubmit}
                isValid={isFormValid()}
                submitText={submitText}
            />
        </Dialog>
    );
};

export default RecipeForm;
