import { styled } from '@mui/material/styles';
import { Card, Box } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

import '../../../index.css';

export const StyledCard = styled(Card)({
  transition: 'var(--transition-speed)',
  backgroundColor: 'var(--card-background)',
});

export const CoverImage = styled(Box)({
  height: 'var(--card-cover-height)',
  position: 'relative',
  backgroundColor: 'var(--background-light)',
  borderRadius: 'var(--border-radius) var(--border-radius) 0 0',
  overflow: 'hidden',
});

export const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  // transition: 'var(--transition-speed)',
});

export const PlaceholderIcon = styled(PhotoLibraryIcon)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '60px',
  color: 'var(--text-secondary)',
}); 