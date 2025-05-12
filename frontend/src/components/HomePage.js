import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2, 4),
  fontSize: '1.2rem',
  minWidth: '200px',
  height: '60px',
  borderRadius: '8px',
  textTransform: 'none',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.background.default,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ComingSoonButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2, 4),
  fontSize: '1.2rem',
  minWidth: '200px',
  height: '60px',
  borderRadius: '8px',
  textTransform: 'none',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.primary.main}`,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
  position: 'relative',
  '&::before': {
    content: '"Coming Soon"',
    position: 'absolute',
    top: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '0.8rem',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.default,
    padding: '2px 8px',
    borderRadius: '4px',
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

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
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(0, 255, 157, 0.1) 0%, transparent 70%)',
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
            width: '250px',
            height: 'auto',
            mb: 6,
            filter: 'drop-shadow(0 0 10px rgba(0, 255, 157, 0.3))',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: '400px' }}>
          <StyledButton
            variant="contained"
            onClick={() => navigate('/backtest')}
          >
            Backtesting
          </StyledButton>
          
          <ComingSoonButton>
            Deployment
          </ComingSoonButton>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
