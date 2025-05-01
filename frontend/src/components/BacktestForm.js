import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Typography,
  Fade,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import strategyDescriptions from '../data/strategyDescriptions';

// Use environment variable for API URL, fallback to localhost for development
const API_URL = process.env.REACT_APP_API_URL ;

function BacktestForm() {
  const [symbol, setSymbol] = useState('');
  const [strategy, setStrategy] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [strategies, setStrategies] = useState({});
  const [loading, setLoading] = useState(false);
  
  // Form step states
  const [showStockPicker, setShowStockPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Results state
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  // Get today's date for max date validation
  const today = new Date();

  useEffect(() => {
    // Fetch available strategies
    const fetchStrategies = async () => {
      try {
        const response = await axios.get(`${API_URL}/backtest/strategies`);
        setStrategies(response.data.strategies);
      } catch (error) {
        console.error('Error fetching strategies:', error);
      }
    };

    fetchStrategies();
  }, []);

  // Handle strategy selection
  const handleStrategyChange = (e) => {
    setStrategy(e.target.value);
    setShowStockPicker(true);
    setShowDatePicker(false); // Reset date picker visibility
    setResults(null); // Clear previous results
    setError(null); // Clear previous errors
  };

  // Handle symbol selection
  const handleSymbolChange = (e) => {
    // Convert to uppercase
    const uppercaseSymbol = e.target.value.toUpperCase();
    setSymbol(uppercaseSymbol);
    setShowDatePicker(true);
    setResults(null); // Clear previous results
    setError(null); // Clear previous errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/backtest/run`, {
        symbol,
        strategy_name: strategy,
        start_date: startDate,
        end_date: endDate,
        parameters: {}, // Add strategy-specific parameters here
      });

      // Set the results
      setResults(response.data);
    } catch (error) {
      console.error('Error running backtest:', error);
      setError(error.response?.data?.detail || 'An error occurred while running the backtest');
    } finally {
      setLoading(false);
    }
  };

  // Format percentage values
  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Backtest Configuration
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Step 1: Strategy Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Select Strategy</InputLabel>
                <Select
                  value={strategy}
                  label="Select Strategy"
                  onChange={handleStrategyChange}
                >
                  {Object.entries(strategies).map(([key, displayName]) => (
                    <MenuItem key={key} value={key}>
                      {displayName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Strategy Description */}
            {strategy && (
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  {strategyDescriptions[strategy] || "No description available"}
                </Typography>
              </Grid>
            )}
            
            {/* Step 2: Stock Symbol */}
            <Fade in={showStockPicker}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Stock Symbol"
                  value={symbol}
                  onChange={handleSymbolChange}
                  required
                  placeholder="Enter stock symbol (e.g., AAPL)"
                  inputProps={{ style: { textTransform: 'uppercase' } }}
                />
              </Grid>
            </Fade>
            
            {/* Step 3: Date Selection */}
            <Fade in={showDatePicker}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                  maxDate={today}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </Grid>
            </Fade>
            
            <Fade in={showDatePicker}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                  maxDate={today}
                  minDate={startDate}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </Grid>
            </Fade>
            
            {/* Submit Button */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={loading || !strategy || !symbol || !startDate || !endDate}
                >
                  {loading ? 'Running Backtest...' : 'Run Backtest'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Display error if any */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Display results if available */}
      {results && (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom align="center">
            Backtest Results for {results.symbol}
          </Typography>
          
          <Alert severity="success" sx={{ mb: 3 }}>
            Backtest was successful!
          </Alert>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Strategy</TableCell>
                  <TableCell>Total Return</TableCell>
                  <TableCell>Sharpe Ratio</TableCell>
                  <TableCell>Max Drawdown</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{results.strategy_display_name}</TableCell>
                  <TableCell>{formatPercentage(results.total_return)}</TableCell>
                  <TableCell>{results.sharpe_ratio.toFixed(2)}</TableCell>
                  <TableCell>{formatPercentage(results.max_drawdown)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
}

export default BacktestForm; 
