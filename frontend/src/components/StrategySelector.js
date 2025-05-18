import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import {
  ArrowBackIosNew as LeftArrowIcon,
  ArrowForwardIos as RightArrowIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  width: '280px',
  height: '320px',
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
  const [strategies] = useState([
    { 
      id: 1, 
      name: 'Simple Moving Average',
      description: 'A trend-following strategy that generates signals based on the crossing of short and long-term moving averages.'
    },
    { 
      id: 2, 
      name: 'RSI Strategy',
      description: 'A mean-reversion strategy that identifies overbought and oversold conditions using the Relative Strength Index.'
    },
    { 
      id: 3, 
      name: 'Momentum Regression',
      description: 'An advanced momentum strategy that uses multiple timeframes and regression analysis for signal generation.'
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('right');

  const handlePrevPage = () => {
    if (currentIndex > 0) {
      setDirection('left');
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleNextPage = () => {
    if (currentIndex < strategies.length - 1) {
      setDirection('right');
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      py: 4,
    }}>
      <Typography
        variant="h1"
        sx={{
          fontFamily: 'Plus Jakarta Sans',
          fontWeight: 700,
          fontSize: '48px',
          lineHeight: '100%',
          letterSpacing: '0%',
          textAlign: 'center',
          mb: 6,
        }}
      >
        Choose a Strategy
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 3,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <IconButton
          onClick={handlePrevPage}
          disabled={currentIndex === 0}
          sx={{
            color: 'primary.main',
            '&:disabled': {
              color: 'grey.700',
            },
          }}
        >
          <LeftArrowIcon fontSize="large" />
        </IconButton>

        <Box sx={{ 
          width: '280px',
          height: '320px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              transition: 'transform 0.3s ease-in-out',
              transform: isTransitioning 
                ? `translateX(${direction === 'right' ? '-100%' : '100%'})`
                : 'translateX(0)',
            }}
          >
            <StyledCard onClick={() => onStrategySelect(strategies[currentIndex])}>
              <CardContent sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 3,
              }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: 'Plus Jakarta Sans',
                    fontWeight: 700,
                    fontSize: '24px',
                    lineHeight: '120%',
                    letterSpacing: '0%',
                    textAlign: 'center',
                    mb: 2,
                  }}
                >
                  {strategies[currentIndex].name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'grey.500',
                    fontSize: '14px',
                    lineHeight: '150%',
                    textAlign: 'center',
                  }}
                >
                  {strategies[currentIndex].description}
                </Typography>
              </CardContent>
            </StyledCard>
          </Box>
        </Box>

        <IconButton
          onClick={handleNextPage}
          disabled={currentIndex >= strategies.length - 1}
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
