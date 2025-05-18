import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Dashboard from './components/Dashboard';
import BacktestPage from './components/BacktestForm';
import ComingSoonPage from './components/ComingSoonPage';

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/backtest" element={<BacktestPage />} />
            <Route path="/performance" element={<ComingSoonPage title="Performance" />} />
            <Route path="/settings" element={<ComingSoonPage title="Settings" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App; 
