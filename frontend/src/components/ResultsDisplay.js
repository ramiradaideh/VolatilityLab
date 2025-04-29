import React from 'react';
import {
  Paper,
  Grid,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function ResultsDisplay({ results }) {
  if (!results) {
    return null;
  }

  const metrics = [
    { label: 'Strategy', value: results.strategy_display_name },
    { label: 'Total Return', value: `${(results.total_return * 100).toFixed(2)}%` },
    { label: 'Sharpe Ratio', value: results.sharpe_ratio.toFixed(2) },
    { label: 'Max Drawdown', value: `${(results.max_drawdown * 100).toFixed(2)}%` },
  ];

  // Prepare data for the equity curve chart
  const chartData = results.equity_curve.map((value, index) => ({
    date: index,
    value: value,
  }));

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Backtest Results for {results.symbol}
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {metrics.map((metric) => (
                    <TableCell key={metric.label}>{metric.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {metrics.map((metric) => (
                    <TableCell key={metric.label}>{metric.value}</TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  name="Equity Curve"
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ResultsDisplay; 
