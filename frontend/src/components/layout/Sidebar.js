import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  QueryStats as BacktestIcon,
  Insights as PerformanceIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

// Constants for sidebar styling
const SIDEBAR_WIDTH = 240;
const ICON_SIZE = 40;
const GLOW_COLOR = 'rgba(0, 255, 157, 0.3)';

/**
 * Navigation items configuration
 */
const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: DashboardIcon },
  { path: '/backtest', label: 'Backtesting', icon: BacktestIcon },
  { path: '/performance', label: 'Performance', icon: PerformanceIcon },
  { path: '/settings', label: 'Settings', icon: SettingsIcon },
];

/**
 * Sidebar component for application navigation
 */
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.05)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <Box
          component="img"
          src="/icon.png"
          alt="VolatilityLab"
          sx={{
            height: `${ICON_SIZE}px`,
            filter: `drop-shadow(0 0 8px ${GLOW_COLOR})`,
          }}
        />
      </Box>
      <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }} />
      <Box sx={{ overflow: 'auto', pt: 2 }}>
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: 'rgba(0, 255, 157, 0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(0, 255, 157, 0.2)',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 
