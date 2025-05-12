import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2, 4),
  fontSize: '1.2rem',
  minWidth: '200px',
  height: '60px',
  borderRadius: '8px',
  textTransform: 'none',
  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.grey[600],
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
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.grey[500],
  '&:hover': {
    backgroundColor: theme.palette.grey[700],
  },
  position: 'relative',
  '&::before': {
    content: '"Coming Soon"',
    position: 'absolute',
    top: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '0.8rem',
    color: theme.palette.grey[500],
    backgroundColor: theme.palette.grey[900],
    padding: '2px 8px',
    borderRadius: '4px',
  },
}));

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
          VolatilityLab
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => navigate('/backtest')}
          >
            Backtesting
          </StyledButton>
          
          <ComingSoonButton>
            Deployment
          </ComingSoonButton>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
