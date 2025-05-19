import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
} from '@mui/material';
import { 
  ChevronLeft as LeftArrowIcon,
  ChevronRight as RightArrowIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import STRATEGIES from '../../../data/strategies';

// Constants for styling and animation
const CARD_WIDTH = 280;
const CARD_HEIGHT = 420;
const CIRCLE_SIZE = 100;
const HEADING_FONT_SIZE = 64;
const STRATEGY_TITLE_FONT_SIZE = 28;
const DESCRIPTION_FONT_SIZE = 15;
const TRANSITION_DURATION = 300; // ms
const STRATEGIES_PER_PAGE = 3;

const StyledCard = styled(Card)(({ theme, selected }) => ({
  width: `${CARD_WIDTH}px`,
  height: `${CARD_HEIGHT}px`,
  backgroundColor: theme.palette.grey[900],
  borderRadius: '12px',
  border: selected ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1,
  transformOrigin: 'center bottom',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-4px)',
    boxShadow: `0 8px 16px rgba(0, 255, 157, 0.2)`,
    zIndex: 2,
  },
}));

const HeadingTypography = styled(Typography)({
  fontWeight: 700,
  fontSize: `${HEADING_FONT_SIZE}px`,
  lineHeight: '100%',
  letterSpacing: '0%',
  textAlign: 'center',
  marginBottom: '48px',
});

const StrategyTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: `${STRATEGY_TITLE_FONT_SIZE}px`,
  lineHeight: '120%',
  letterSpacing: '0%',
  textAlign: 'center',
  marginBottom: '16px',
});

const DescriptionText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
  fontSize: `${DESCRIPTION_FONT_SIZE}px`,
  lineHeight: '145%',
  marginBottom: '6px',
}));

const CircleIcon = styled(Box)(({ theme }) => ({
  width: `${CIRCLE_SIZE}px`,
  height: `${CIRCLE_SIZE}px`,
  borderRadius: '50%',
  border: `2px solid ${theme.palette.primary.main}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 20px',
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.primary.main,
  borderRadius: '8px',
  padding: '12px 0',
  marginTop: 'auto',
  '&:hover': {
    backgroundColor: theme.palette.grey[700],
  },
}));

const ArrowButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  '&.Mui-disabled': {
    color: theme.palette.grey[700],
  },
  padding: '12px',
  margin: '0 16px',
}));

/**
 * StrategySelector component for displaying and selecting trading strategies
 */
const StrategySelector = ({ onStrategySelect }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next');
  const containerRef = useRef(null);

  // Calculate the max number of pages
  const maxPages = Math.ceil(STRATEGIES.length / STRATEGIES_PER_PAGE);

  const handleCardClick = (strategy) => {
    setSelectedStrategy(strategy);
    // Adding a slight delay before proceeding to allow user to see selection
    setTimeout(() => {
      onStrategySelect(strategy);
    }, 150);
  };

  const handleConfirm = (e, strategy) => {
    e.stopPropagation(); // Stop event from propagating to card
    onStrategySelect(strategy);
  };

  const handlePrev = () => {
    if (currentPage > 0 && !isTransitioning) {
      setDirection('prev');
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsTransitioning(false);
      }, TRANSITION_DURATION);
    }
  };

  const handleNext = () => {
    if (currentPage < maxPages - 1 && !isTransitioning) {
      setDirection('next');
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsTransitioning(false);
      }, TRANSITION_DURATION);
    }
  };

  // Get the strategies for the current page
  const startIndex = currentPage * STRATEGIES_PER_PAGE;
  const visibleStrategies = STRATEGIES.slice(startIndex, startIndex + STRATEGIES_PER_PAGE);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      py: 8,
      px: 3,
    }}>
      <HeadingTypography>
        Select A Strategy
      </HeadingTypography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 4,
        }}
      >
        <ArrowButton
          onClick={handlePrev}
          disabled={currentPage === 0}
          size="large"
        >
          <LeftArrowIcon fontSize="large" />
        </ArrowButton>

        <Box
          ref={containerRef}
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            width: `${STRATEGIES_PER_PAGE * (CARD_WIDTH + 20)}px`,
            overflow: 'visible',
            paddingY: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2.5,
              transition: `transform ${TRANSITION_DURATION}ms ease`,
              transform: isTransitioning 
                ? `translateX(${direction === 'next' ? '-10%' : '10%'})` 
                : 'translateX(0)',
              opacity: isTransitioning ? 0.5 : 1,
            }}
          >
            {visibleStrategies.map((strategy) => (
              <StyledCard 
                key={strategy.id}
                selected={selectedStrategy?.id === strategy.id}
                onClick={() => handleCardClick(strategy)}
              >
                <CardContent sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 3,
                }}>
                  <CircleIcon />
                  
                  <StrategyTitle>
                    {strategy.name}
                  </StrategyTitle>

                  <Box sx={{ mb: 3 }}>
                    {strategy.bulletPoints.map((point, index) => (
                      <DescriptionText key={index}>
                        {point}
                      </DescriptionText>
                    ))}
                  </Box>

                  <ConfirmButton
                    fullWidth
                    onClick={(e) => handleConfirm(e, strategy)}
                  >
                    Confirm
                  </ConfirmButton>
                </CardContent>
              </StyledCard>
            ))}
          </Box>
        </Box>

        <ArrowButton
          onClick={handleNext}
          disabled={currentPage >= maxPages - 1}
          size="large"
        >
          <RightArrowIcon fontSize="large" />
        </ArrowButton>
      </Box>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        {Array.from({ length: maxPages }).map((_, index) => (
          <Box 
            key={index}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              mx: 0.5,
              backgroundColor: index === currentPage 
                ? 'primary.main'
                : 'grey.700',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default StrategySelector; 
