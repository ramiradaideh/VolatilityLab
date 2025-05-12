import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import HomePage from './components/HomePage';
import BacktestForm from './components/BacktestForm';
import ResultsDisplay from './components/ResultsDisplay';
import { Container, Box, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff9d', // Bright green
      light: '#33ffb1',
      dark: '#00cc7d',
    },
    secondary: {
      main: '#1a1a1a', // Dark grey
    },
    background: {
      default: '#000000', // Pure black
      paper: '#0a0a0a', // Slightly lighter black
    },
    text: {
      primary: '#ffffff',
      secondary: '#00ff9d',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
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
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

function BacktestPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          position: 'relative',
          mb: 2
        }}>
          <IconButton 
            onClick={() => navigate('/')}
            sx={{ 
              position: 'absolute', 
              left: 0,
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(0, 255, 157, 0.08)',
              }
            }}
          >
            <HomeIcon fontSize="large" />
          </IconButton>
          <Box
            component="img"
            src="/icon.png"
            alt="VolatilityLab"
            sx={{
              height: '50px',
              width: 'auto',
              filter: 'drop-shadow(0 0 10px rgba(0, 255, 157, 0.3))',
            }}
          />
        </Box>
        <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
          Quantum Trading Strategy Backtester
        </Typography>
        <BacktestForm />
        <ResultsDisplay />
      </Box>
    </Container>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/backtest" element={<BacktestPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App; 
