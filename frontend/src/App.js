import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import BacktestForm from './components/BacktestForm';
import ResultsDisplay from './components/ResultsDisplay';
import { Container, Box, Typography } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
              VolatilityLab
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
              Quantum Trading Strategy Backtester
            </Typography>
            <BacktestForm />
            <ResultsDisplay />
          </Box>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App; 