import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, DialogContentText } from '@mui/material';
import { RecipeData } from '../types/user';

interface CarouselProps {
    recipe: RecipeData;
    open: boolean;
    onClose: () => void;
}

const CustomCarousel: React.FC<CarouselProps> = ({ recipe, open, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = recipe.images?.map(imageId => `https://picsum.photos/id/${imageId}/150`) || [];

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length || 0));
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + (images.length || 0)) % (images.length || 0));
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{recipe.name}</DialogTitle>
            <DialogContentText>{recipe.description}</DialogContentText>
            <DialogContent>
                <img src={images[currentIndex]} alt={images[currentIndex]} style={{ width: '100%' }} />
                <Typography variant="body1" sx={{ mt: 2 }}>{"displaying image #" + currentIndex}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={prevImage} color="primary" disabled={currentIndex === 0}>Previous</Button>
                <Button onClick={nextImage} color="primary" disabled={images.length === currentIndex + 1}>Next</Button>
                <Button onClick={onClose} color="info">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomCarousel;
