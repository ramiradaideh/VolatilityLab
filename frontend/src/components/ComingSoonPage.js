import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Badge,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Sidebar from './Sidebar';

const drawerWidth = 240;

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  borderRadius: '12px',
  height: '100%',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const ComingSoonPage = ({ title }) => {
  const [activeItem, setActiveItem] = useState(title);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

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

        {/* Coming Soon Section */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '60vh'
        }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
            {title}
          </Typography>
          <StyledCard sx={{ maxWidth: 400, width: '100%' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Coming Soon
              </Typography>
              <Typography variant="body1" color="grey.500">
                This feature is currently under development. Stay tuned for updates!
              </Typography>
            </CardContent>
          </StyledCard>
        </Box>

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
            Next Steps: {title} feature coming soon
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ComingSoonPage;
