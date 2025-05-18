import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  ArrowBackIosNew as LeftArrowIcon,
  ArrowForwardIos as RightArrowIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  width: '315px',
  height: '474px',
  backgroundColor: theme.palette.grey[900],
  borderRadius: '12px',
  transition: 'transform 0.2s, box-shadow 0.2s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px rgba(0, 255, 157, 0.1)',
  },
}));

const StrategySelector = ({ onStrategySelect }) => {
  const [strategies, setStrategies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const strategiesPerPage = 2;

  useEffect(() => {
    // Fetch strategies from the API
    const fetchStrategies = async () => {
      try {
        const response = await fetch('/api/strategies');
        const data = await response.json();
        setStrategies(data);
      } catch (error) {
        console.error('Error fetching strategies:', error);
      }
    };

    fetchStrategies();
  }, []);

  const totalPages = Math.ceil(strategies.length / strategiesPerPage);
  const currentStrategies = strategies.slice(
    currentPage * strategiesPerPage,
    (currentPage + 1) * strategiesPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      minHeight: '100vh',
      pt: '228px', // Top spacing as specified
    }}>
      {/* Main Heading */}
      <Typography
        variant="h1"
        sx={{
          fontFamily: 'Plus Jakarta Sans',
          fontWeight: 700,
          fontSize: '70px',
          lineHeight: '100%',
          letterSpacing: '0%',
          textAlign: 'center',
          mb: 8,
        }}
      >
        Choose a Strategy
      </Typography>

      {/* Strategy Cards Container */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 4,
        position: 'relative',
      }}>
        {/* Left Arrow */}
        <IconButton
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          sx={{
            color: 'primary.main',
            '&:disabled': {
              color: 'grey.700',
            },
          }}
        >
          <LeftArrowIcon fontSize="large" />
        </IconButton>

        {/* Strategy Cards */}
        <Grid container spacing={4} sx={{ maxWidth: '800px' }}>
          {currentStrategies.map((strategy) => (
            <Grid item key={strategy.id}>
              <StyledCard onClick={() => onStrategySelect(strategy)}>
                <CardContent sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 4,
                }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: 'Plus Jakarta Sans',
                      fontWeight: 700,
                      fontSize: '32px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      textAlign: 'center',
                    }}
                  >
                    {strategy.name}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Right Arrow */}
        <IconButton
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
          sx={{
            color: 'primary.main',
            '&:disabled': {
              color: 'grey.700',
            },
          }}
        >
          <RightArrowIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default StrategySelector;
