import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  Badge,
  Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  ArrowBack as BackIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Sidebar from './Sidebar';
import StrategySelector from './StrategySelector';


const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  borderRadius: '12px',
  height: '100%',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const BacktestPage = () => {
  const [activeItem, setActiveItem] = useState('Trade');
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [symbol, setSymbol] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleStrategySelect = (strategy) => {
    setSelectedStrategy(strategy);
    setShowResults(false);
  };

  const handleRunBacktest = () => {
    if (symbol && startDate && endDate) {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
    } else {
      setSelectedStrategy(null);
    }
  };

  const renderContent = () => {
    if (!selectedStrategy) {
      return <StrategySelector onStrategySelect={handleStrategySelect} />;
    }

    if (showResults) {
      return (
        <Box sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <IconButton
              onClick={handleBack}
              sx={{ mr: 2, color: 'primary.main' }}
            >
              <BackIcon />
            </IconButton>
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'Plus Jakarta Sans',
                fontWeight: 700,
                fontSize: '48px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: 'white',
              }}
            >
              Backtest Results
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledCard>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" color="primary" gutterBottom>
                    {selectedStrategy.name}
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
                              1.85
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle2" color="grey.500">
                              Total Return
                            </Typography>
                            <Typography variant="body1" color="white">
                              15.3%
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle2" color="grey.500">
                              Max Drawdown
                            </Typography>
                            <Typography variant="body1" color="white">
                              -8.2%
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle2" color="grey.500">
                              Win Rate
                            </Typography>
                            <Typography variant="body1" color="white">
                              62%
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
    }

    return (
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton
            onClick={handleBack}
            sx={{ mr: 2, color: 'primary.main' }}
          >
            <BackIcon />
          </IconButton>
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Plus Jakarta Sans',
              fontWeight: 700,
              fontSize: '48px',
              lineHeight: '100%',
              letterSpacing: '0%',
            }}
          >
            Configure Strategy
          </Typography>
        </Box>

        <StyledCard sx={{ maxWidth: '600px', mx: 'auto' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Plus Jakarta Sans',
                fontWeight: 700,
                fontSize: '24px',
                lineHeight: '120%',
                letterSpacing: '0%',
                textAlign: 'center',
                mb: 4,
              }}
            >
              {selectedStrategy.name}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Stock Ticker"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  placeholder="e.g., AAPL"
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
                  onClick={handleRunBacktest}
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

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            sx={{
              width: '300px',
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'grey.900',
                '& fieldset': {
                  borderColor: 'grey.700',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Box>
            <IconButton color="primary">
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="primary">
              <SettingsIcon />
            </IconButton>
          </Box>
        </Box>

        {renderContent()}
      </Box>
    </Box>
  );
};

export default BacktestPage; 
