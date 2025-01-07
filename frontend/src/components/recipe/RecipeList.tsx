import React, { useState } from 'react';
import { Grid, CardContent, Typography, Box, Stack, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RecipeIcon from '@mui/icons-material/PhotoAlbum';
import EditIcon from '@mui/icons-material/Edit';
import CustomCarousel from '../Carousel';
import '../../index.css';
import { StyledCard, CoverImage, StyledImage, PlaceholderIcon } from './styles/RecipeListStyle';
import { RecipeData } from '../../types/user';
import RecipeForm from '../../form/RecipeForm';

interface RecipeCardProps {
  userId: number;
  recipe: RecipeData;
  onDeleteRecipe: (recipeId: number) => void;
  onViewRecipe: (recipe: RecipeData) => void;
  onEditRecipe: (recipe: RecipeData) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onDeleteRecipe,
  onViewRecipe,
  onEditRecipe
}) => {
  const coverImageUrl = recipe.images?.[0] ? `https://picsum.photos/id/${recipe.images[0]}/150` : '';

  return (
    <StyledCard elevation={3}>
      <CoverImage>
        {coverImageUrl ? (
          <StyledImage
            src={coverImageUrl}
            alt={`Cover for ${recipe.name}`}
          />
        ) : (
          <Box display="flex" alignItems="center" justifyContent="center" height="338px" bgcolor="rgba(0, 0, 0, 0.04)">
            <PlaceholderIcon />
          </Box>
        )}
      </CoverImage>

      <CardContent sx={{ padding: 'var(--spacing-md)' }}>
        <Stack spacing={2}>
          <Typography variant="h6" component="h3" sx={{ color: 'var(--text-primary)' }}>
            {recipe.name}
          </Typography>
          {recipe.description && (
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              {recipe.description}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<RecipeIcon />}
            fullWidth
            onClick={() => onViewRecipe(recipe)}
            disabled={recipe.images?.length === 0}
          >
            View Recipe
          </Button>
          <Button
            variant="contained"
            color="info"
            size="small"
            startIcon={<EditIcon />}
            fullWidth
            onClick={() => onEditRecipe(recipe)}
          >
            Edit Recipe
          </Button>
          <Button
            onClick={() => onDeleteRecipe(recipe.id!)}
            variant="contained"
            color="error"
            size="small"
            title="Delete Recipe"
            startIcon={<DeleteIcon />}
          >
            Delete Recipe
          </Button>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

interface RecipeListProps {
  userId: number;
  recipes: RecipeData[];
  onDeleteRecipe: (recipeId: number) => Promise<void>;
  onEditRecipe: (recipe: RecipeData) => Promise<void>;
}

const RecipeList: React.FC<RecipeListProps> = ({ userId, recipes, onDeleteRecipe, onEditRecipe }) => {
  const [recipeToView, setRecipeToView] = useState<RecipeData | null>(null);
  const [recipeToEdit, setRecipeToEdit] = useState<RecipeData | null>(null);

  const handleViewRecipe = (recipe: RecipeData) => {
    setRecipeToView(recipe);
  };

  const handleEditRecipe = (recipe: RecipeData) => {
    setRecipeToEdit(recipe);
  };

  const handleSubmitEdit = async (data: RecipeData) => {
    await onEditRecipe(data);
    setRecipeToEdit(null);
  };

  return (
    <Grid container spacing={3}>
      {recipes.map(recipe => (
        <Grid item xs={12} sm={6} md={4} key={recipe.id}>
          <RecipeCard
            userId={userId}
            recipe={recipe}
            onDeleteRecipe={onDeleteRecipe}
            onViewRecipe={handleViewRecipe}
            onEditRecipe={handleEditRecipe}
          />
        </Grid>
      ))}

      {recipeToView && (
        <CustomCarousel
          recipe={recipeToView}
          open={Boolean(recipeToView)}
          onClose={() => setRecipeToView(null)}
        />
      )}

      {recipeToEdit && (
        <RecipeForm
          recipe={recipeToEdit}
          open={Boolean(recipeToEdit)}
          onClose={() => setRecipeToEdit(null)}
          onSubmit={handleSubmitEdit}
          title="Edit Recipe"
          submitText="Save Changes"
        />
      )}
    </Grid>
  );
};

export default RecipeList; 