import React from 'react';
import { Box, Card, Button, Grid, TextField, CardMedia, CardActions, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface RecipeFormImagesProps {
    images: string[];
    onImagesChange: (images: string[]) => void;
}

const RecipeFormImages: React.FC<RecipeFormImagesProps> = ({ images, onImagesChange }) => {
    const [imageId, setImageId] = React.useState('');



    const handleImageIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setImageId(value);
    };

    const handleAddImage = () => {
        if (imageId.trim()) {
            onImagesChange([...images, imageId.trim()]);
            setImageId('');
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        onImagesChange(images.filter((_, index) => index !== indexToRemove));
    };


    return (
        <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                    id="image-id"
                    label="Image ID"
                    value={imageId}
                    onChange={handleImageIdChange}
                    variant="filled"
                    size="small"
                    type="number"
                    inputProps={{ // check deprecated
                        min: 1,
                        max: 999
                    }}
                />
                <Button
                    onClick={handleAddImage}
                    variant="contained"
                    disabled={!imageId.trim()}
                >
                    Add Image
                </Button>
            </Box>

            <Grid container spacing={1}>
                {images.map((id, index) => (
                    <Grid item xs={4} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="100"
                                image={`https://picsum.photos/id/${id}/150`}
                                alt={`Image ${id}`}
                            />
                            <CardActions>
                                <IconButton
                                    size="small"
                                    onClick={() => handleRemoveImage(index)}
                                    color="error"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};


export default RecipeFormImages