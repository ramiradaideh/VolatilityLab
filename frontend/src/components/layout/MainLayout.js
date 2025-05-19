import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';

// Constants for layout dimensions
const CONTENT_PADDING = 3;

/**
 * MainLayout component for consistent page layout with sidebar
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render in the main content area
 */
const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: CONTENT_PADDING, 
          bgcolor: 'background.default',
          overflow: 'auto'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout; 
