import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Constants for styling
const HEADING_FONT_SIZE = 64;
const SUBHEADING_FONT_SIZE = 24;

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  borderRadius: '12px',
  height: '100%',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const HeadingTypography = styled(Typography)({
  fontWeight: 700,
  fontSize: `${HEADING_FONT_SIZE}px`,
  lineHeight: '100%',
  letterSpacing: '0%',
  textAlign: 'center',
  marginBottom: '48px',
});

const SubheadingTypography = styled(Typography)({
  fontWeight: 700,
  fontSize: `${SUBHEADING_FONT_SIZE}px`,
  lineHeight: '120%',
  letterSpacing: '0%',
  textAlign: 'center',
  marginBottom: '32px',
});

/**
 * BacktestForm component for configuring a backtest strategy
 */
const BacktestForm = ({ strategy, onBack, onSubmit }) => {
  const [symbol, setSymbol] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    if (symbol && startDate && endDate) {
      onSubmit({
        strategy,
        symbol,
        startDate,
        endDate
      });
    }
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      py: 8,
      px: 3,
      position: 'relative',
    }}>
      <IconButton
        onClick={onBack}
        sx={{ 
          position: 'absolute',
          left: 24,
          top: 40,
          color: 'primary.main',
          p: 1.5,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
        }}
        size="large"
      >
        <BackIcon fontSize="large" />
      </IconButton>

      <Box sx={{ mb: 4, width: '100%', maxWidth: '600px' }}>
        <HeadingTypography>
          Configure Strategy
        </HeadingTypography>
      </Box>

      <StyledCard sx={{ maxWidth: '600px', width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          <SubheadingTypography>
            {strategy.name}
          </SubheadingTypography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Stock Ticker"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="e.g., AAPL, SPY, MSFT"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleSubmit}
                disabled={!symbol || !startDate || !endDate}
              >
                Run Backtest
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default BacktestForm; 
