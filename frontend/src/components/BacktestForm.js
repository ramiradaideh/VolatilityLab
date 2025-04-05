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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

function BacktestForm() {
  const [symbol, setSymbol] = useState('');
  const [strategy, setStrategy] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch available strategies
    const fetchStrategies = async () => {
      try {
        const response = await axios.get(`${API_URL}/strategies`);
        setStrategies(response.data.strategies);
      } catch (error) {
        console.error('Error fetching strategies:', error);
      }
    };

    fetchStrategies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/backtest/run`, {
        symbol,
        strategy_name: strategy,
        start_date: startDate,
        end_date: endDate,
        parameters: {}, // Add strategy-specific parameters here
      });

      // Handle the response (you'll need to implement this)
      console.log('Backtest results:', response.data);
    } catch (error) {
      console.error('Error running backtest:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Stock Symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Strategy</InputLabel>
              <Select
                value={strategy}
                label="Strategy"
                onChange={(e) => setStrategy(e.target.value)}
              >
                {strategies.map((strategy) => (
                  <MenuItem key={strategy} value={strategy}>
                    {strategy}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
              renderInput={(params) => <TextField {...params} fullWidth required />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={setEndDate}
              renderInput={(params) => <TextField {...params} fullWidth required />}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
              >
                {loading ? 'Running Backtest...' : 'Run Backtest'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default BacktestForm; 