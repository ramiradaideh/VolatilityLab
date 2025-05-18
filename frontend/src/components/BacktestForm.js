import React, { useState } from 'react';
import {
  Box,
  Drawer,

  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  Avatar,
  Badge,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Home as HomeIcon,
  ShowChart as TradeIcon,
  Assessment as PerformanceIcon,
  Article as NewsIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Styled components
const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.default,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

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
  const navigate = useNavigate();
  const [strategy, setStrategy] = useState('');
  const [symbol, setSymbol] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, notifications: 0, path: '/dashboard' },
    { text: 'Trade', icon: <TradeIcon />, notifications: 2, path: '/backtest' },
    { text: 'Performance', icon: <PerformanceIcon />, notifications: 0, path: '/performance' },
    { text: 'News', icon: <NewsIcon />, notifications: 3, path: '/news' },
    { text: 'Settings', icon: <SettingsIcon />, notifications: 0, path: '/settings' },
  ];

  const handleNavigation = (item) => {
    setActiveItem(item.text);
    navigate(item.path);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <StyledDrawer variant="permanent">
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            sx={{ width: 80, height: 80, mb: 2 }}
            src="/icon.png"
            alt="User Profile"
          />
          <Typography variant="h6" color="primary" gutterBottom>
            VolatilityLab
          </Typography>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleNavigation(item)}
              sx={{
                backgroundColor: activeItem === item.text ? 'rgba(0, 255, 157, 0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(0, 255, 157, 0.05)',
                },
              }}
            >
              <ListItemIcon sx={{ color: activeItem === item.text ? 'primary.main' : 'grey.500' }}>
                <Badge badgeContent={item.notifications} color="primary">
                  {item.icon}
                </Badge>
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                sx={{ color: activeItem === item.text ? 'primary.main' : 'grey.500' }}
              />
            </ListItem>
          ))}
        </List>
      </StyledDrawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Top Bar */}
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

        {/* Backtesting Section */}
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Backtesting
        </Typography>

        {/* Backtesting Form */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" color="grey.500" gutterBottom>
                  Strategy Configuration
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Strategy</InputLabel>
                      <Select
                        value={strategy}
                        onChange={(e) => setStrategy(e.target.value)}
                        label="Strategy"
                      >
                        <MenuItem value="sma">Simple Moving Average</MenuItem>
                        <MenuItem value="rsi">RSI</MenuItem>
                        <MenuItem value="momentum">Momentum Regression</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Symbol"
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value)}
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
                      sx={{ mt: 2 }}
                    >
                      Run Backtest
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" color="grey.500" gutterBottom>
                  Results
                </Typography>
                {/* Results will be displayed here */}
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        {/* Footer Status */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: drawerWidth,
            right: 0,
            p: 2,
            backgroundColor: 'grey.900',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="body2" color="grey.500">
            Next Steps: Configure your strategy and run the backtest
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BacktestPage; 
