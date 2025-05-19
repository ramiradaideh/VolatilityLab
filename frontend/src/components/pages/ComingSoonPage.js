import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ConstructionOutlined as ConstructionIcon } from '@mui/icons-material';
import MainLayout from '../layout/MainLayout';

// Constants for styling
const ICON_SIZE = 100;
const GLOW_COLOR = 'rgba(0, 255, 157, 0.3)';

/**
 * ComingSoonPage component displayed for features under development
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the page being developed
 */
const ComingSoonPage = ({ title = 'This Page' }) => {
  return (
    <MainLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 1, fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          This feature is coming soon
        </Typography>
      </Box>
      
      <Paper
        sx={{
          p: 6,
          mt: 4,
          borderRadius: '16px',
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          border: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.05)',
        }}
      >
        <ConstructionIcon
          sx={{
            fontSize: ICON_SIZE,
            color: 'primary.main',
            mb: 4,
            filter: `drop-shadow(0 0 10px ${GLOW_COLOR})`,
          }}
        />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
            textAlign: 'center',
          }}
        >
          Under Construction
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            maxWidth: '600px',
            mb: 2,
          }}
        >
          The {title} page is currently under development and will be available soon.
          We're working hard to bring you the best trading experience possible.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'primary.main',
            textAlign: 'center',
            maxWidth: '600px',
          }}
        >
          Check back soon for updates!
        </Typography>
      </Paper>
    </MainLayout>
  );
};

export default ComingSoonPage; 
