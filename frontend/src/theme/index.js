import { createTheme } from '@mui/material/styles';

// Constants for theme configuration
const COLORS = {
  PRIMARY: '#00ff9d', // Bright green
  PRIMARY_LIGHT: '#33ffb1',
  PRIMARY_DARK: '#00cc7d',
  SECONDARY: '#1a1a1a', // Dark grey
  BACKGROUND: '#000000', // Pure black
  PAPER: '#121212', // Very dark grey for cards
  CARD_BACKGROUND: '#181818', // Slightly lighter for cards
  TEXT_PRIMARY: '#ffffff',
  TEXT_SECONDARY: '#00ff9d',
  GREY: {
    900: '#181818',
    800: '#212121', 
    700: '#333333',
    600: '#444444',
    500: '#666666',
    400: '#999999',
  }
};

const BORDER_RADIUS = {
  BUTTON: '8px',
  CARD: '12px',
};

const TYPOGRAPHY = {
  FONT_FAMILY: '"Roboto", "Helvetica", "Arial", sans-serif',
};

// Create and export theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: COLORS.PRIMARY,
      light: COLORS.PRIMARY_LIGHT,
      dark: COLORS.PRIMARY_DARK,
    },
    secondary: {
      main: COLORS.SECONDARY,
    },
    background: {
      default: COLORS.BACKGROUND,
      paper: COLORS.PAPER,
    },
    text: {
      primary: COLORS.TEXT_PRIMARY,
      secondary: COLORS.TEXT_SECONDARY,
    },
    grey: COLORS.GREY,
  },
  typography: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    h1: {
      fontWeight: 700,
      fontSize: '64px',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
    h5: {
      fontWeight: 500,
      letterSpacing: '0.3px',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.CARD_BACKGROUND,
          borderRadius: BORDER_RADIUS.CARD,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS.BUTTON,
          textTransform: 'none',
          fontWeight: 500,
        },
        containedPrimary: {
          color: COLORS.BACKGROUND,
        }
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: COLORS.BACKGROUND,
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: COLORS.GREY[700],
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: COLORS.BACKGROUND,
          },
        },
      },
    },
  },
});

export default theme; 
