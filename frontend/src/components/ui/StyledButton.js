import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

// Constants for button styling
const BUTTON_SIZE = {
  HEIGHT: '60px',
  MIN_WIDTH: '200px',
  PADDING_VERTICAL: 2,
  PADDING_HORIZONTAL: 4,
  MARGIN: 2,
  FONT_SIZE: '1.2rem',
};

/**
 * Primary styled button component with consistent styling
 */
const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(BUTTON_SIZE.MARGIN),
  padding: theme.spacing(BUTTON_SIZE.PADDING_VERTICAL, BUTTON_SIZE.PADDING_HORIZONTAL),
  fontSize: BUTTON_SIZE.FONT_SIZE,
  minWidth: BUTTON_SIZE.MIN_WIDTH,
  height: BUTTON_SIZE.HEIGHT,
  borderRadius: '8px',
  textTransform: 'none',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.background.default,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

/**
 * Button with "Coming Soon" label for features under development
 */
const ComingSoonButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(BUTTON_SIZE.MARGIN),
  padding: theme.spacing(BUTTON_SIZE.PADDING_VERTICAL, BUTTON_SIZE.PADDING_HORIZONTAL),
  fontSize: BUTTON_SIZE.FONT_SIZE,
  minWidth: BUTTON_SIZE.MIN_WIDTH,
  height: BUTTON_SIZE.HEIGHT,
  borderRadius: '8px',
  textTransform: 'none',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.primary.main}`,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
  position: 'relative',
  '&::before': {
    content: '"Coming Soon"',
    position: 'absolute',
    top: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '0.8rem',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.default,
    padding: '2px 8px',
    borderRadius: '4px',
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

export { StyledButton, ComingSoonButton }; 
