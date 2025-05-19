import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Constants for styling
const HEADING_FONT_SIZE = 64;

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
  color: 'white',
});

/**
 * BacktestResults component for displaying backtest results
 */
const BacktestResults = ({ config, onBack }) => {
  const { strategy, symbol, startDate, endDate } = config;

  // In a real application, these would come from the API
  const metrics = {
    sharpeRatio: 1.85,
    totalReturn: 0.153, // 15.3%
    maxDrawdown: -0.082, // -8.2%
    winRate: 0.62, // 62%
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

      <Box sx={{ mb: 4, width: '100%', maxWidth: '800px' }}>
        <HeadingTypography>
          Backtest Results
        </HeadingTypography>
      </Box>
      
      <Grid container spacing={3} sx={{ maxWidth: '800px', width: '100%' }}>
        <Grid item xs={12}>
          <StyledCard>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" color="primary" gutterBottom>
                {strategy.name}
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    backgroundColor: 'rgba(0, 255, 157, 0.05)',
                    p: 3,
                    borderRadius: '8px',
                  }}>
                    <Typography variant="h6" color="white" gutterBottom>
                      Configuration
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box>
                        <Typography variant="subtitle2" color="grey.500">
                          Symbol
                        </Typography>
                        <Typography variant="body1" color="white">
                          {symbol}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="grey.500">
                          Period
                        </Typography>
                        <Typography variant="body1" color="white">
                          {startDate} to {endDate}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    backgroundColor: 'rgba(0, 255, 157, 0.05)',
                    p: 3,
                    borderRadius: '8px',
                  }}>
                    <Typography variant="h6" color="white" gutterBottom>
                      Performance Metrics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="grey.500">
                          Sharpe Ratio
                        </Typography>
                        <Typography variant="body1" color="white">
                          {metrics.sharpeRatio.toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="grey.500">
                          Total Return
                        </Typography>
                        <Typography variant="body1" color="white">
                          {(metrics.totalReturn * 100).toFixed(1)}%
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="grey.500">
                          Max Drawdown
                        </Typography>
                        <Typography variant="body1" color="white">
                          {(metrics.maxDrawdown * 100).toFixed(1)}%
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="grey.500">
                          Win Rate
                        </Typography>
                        <Typography variant="body1" color="white">
                          {(metrics.winRate * 100).toFixed(0)}%
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BacktestResults; 
