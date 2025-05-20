import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  CardHeader
} from '@mui/material';
import MainLayout from '../layout/MainLayout';

// Constants
const CARD_MIN_HEIGHT = 240;

/**
 * Dashboard component that displays statistics and trading overview
 */
const Dashboard = () => {
  return (
    <MainLayout>

      <Grid container spacing={3}>
        {/* Performance Summary Card */}
        <Grid item xs={12} md={6} lg={8}>
          <Card 
            sx={{ 
              minHeight: CARD_MIN_HEIGHT,
              bgcolor: 'background.paper', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              borderRadius: '12px',
              border: '1px solid',
              borderColor: 'rgba(255, 255, 255, 0.05)'
            }}
          >
            <CardHeader
              title="Performance Summary"
              titleTypographyProps={{ 
                color: 'text.primary',
                variant: 'h5', 
                fontWeight: 600 
              }}
            />
            <CardContent>
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Performance charts and metrics will appear here
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Strategies Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card 
            sx={{ 
              minHeight: CARD_MIN_HEIGHT,
              bgcolor: 'background.paper', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              borderRadius: '12px',
              border: '1px solid',
              borderColor: 'rgba(255, 255, 255, 0.05)'
            }}
          >
            <CardHeader
              title="Recent Strategies"
              titleTypographyProps={{ 
                color: 'text.primary',
                variant: 'h5', 
                fontWeight: 600 
              }}
            />
            <CardContent>
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  List of recently used strategies will appear here
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Market Overview Card */}
        <Grid item xs={12}>
          <Card 
            sx={{ 
              minHeight: CARD_MIN_HEIGHT,
              bgcolor: 'background.paper', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              borderRadius: '12px',
              border: '1px solid',
              borderColor: 'rgba(255, 255, 255, 0.05)'
            }}
          >
            <CardHeader
              title="Market Overview"
              titleTypographyProps={{ 
                color: 'text.primary',
                variant: 'h5', 
                fontWeight: 600 
              }}
            />
            <CardContent>
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Market data and trends will appear here
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Dashboard; 
