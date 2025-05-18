import React from 'react';
import {
  Box,
  Drawer,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
} from '@mui/material';
import {
  Home as HomeIcon,
  ShowChart as TradeIcon,
  Assessment as PerformanceIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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

const Sidebar = ({ activeItem, setActiveItem }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, notifications: 0, path: '/' },
    { text: 'Trade', icon: <TradeIcon />, notifications: 2, path: '/backtest' },
    { text: 'Performance', icon: <PerformanceIcon />, notifications: 0, path: '/performance' },
    { text: 'Settings', icon: <SettingsIcon />, notifications: 0, path: '/settings' },
  ];

  const handleNavigation = (item) => {
    setActiveItem(item.text);
    navigate(item.path);
  };

  return (
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
  );
};

export default Sidebar;
