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
} from '@mui/material';
import {
  Home as HomeIcon,
  ShowChart as TradeIcon,
  Assessment as PerformanceIcon,
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

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState('Home');
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, notifications: 0, path: '/' },
    { text: 'Trade', icon: <TradeIcon />, notifications: 2, path: '/backtest' },
    { text: 'Performance', icon: <PerformanceIcon />, notifications: 0, path: '/performance' },
    { text: 'Settings', icon: <SettingsIcon />, notifications: 0, path: '/settings' },
  ];

  const stats = [
    { title: 'Cash Available', value: '$1,000.00', color: 'white' },
    { title: 'Total Invested', value: '$53,089.00', color: 'white' },
    { title: 'Profit/Loss', value: '-$90.00', color: '#ff4d4d' },
    { title: 'Portfolio Value', value: '$5,238.99', color: '#00ff9d' },
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

        {/* Summary Section */}
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Summary
        </Typography>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} key={stat.title}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" color="grey.500" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" sx={{ color: stat.color }}>
                    {stat.value}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
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
            Next Steps: See Status 75% Executed / Pending / Your Order was Sent
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
