import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import { StyledButton, ComingSoonButton } from '../ui/StyledButton';

// Constants for styling
const ICON_SIZE = 250;
const CONTAINER_MAX_WIDTH = 400;
const GLOW_COLOR = 'rgba(0, 255, 157, 0.3)';
const GRADIENT = {
  BACKGROUND: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
  OVERLAY: 'radial-gradient(circle at center, rgba(0, 255, 157, 0.1) 0%, transparent 70%)',
};

/**
 * HomePage component displaying main application navigation options
 */
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: GRADIENT.BACKGROUND,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: GRADIENT.OVERLAY,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          component="img"
          src="/icon.png"
          alt="VolatilityLab"
          sx={{
            width: `${ICON_SIZE}px`,
            height: 'auto',
            mb: 6,
            filter: `drop-shadow(0 0 10px ${GLOW_COLOR})`,
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2, 
          width: '100%', 
          maxWidth: `${CONTAINER_MAX_WIDTH}px` 
        }}>
          <StyledButton
            variant="contained"
            onClick={() => navigate('/backtest')}
          >
            Backtesting
          </StyledButton>
          
          <ComingSoonButton>
            Deployment
          </ComingSoonButton>
          
          <StyledButton
            variant="contained"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </StyledButton>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage; 
