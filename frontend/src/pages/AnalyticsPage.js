// frontend/src/pages/AnalyticsPage.js

import React from 'react';
import { Box, Grid2 } from '@mui/material';
import TotalDonationsChart from '../components/Analytics/TotalDonationsChart';
import TransactionsByLocationPieChart from '../components/Analytics/TransactionsByLocationPieChart';
import RevenueByLocationBarChart from '../components/Analytics/RevenueByLocationBarChart';

const AnalyticsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid2 container spacing={4} rowSpacing={6}>
        <Grid2 size={6}>
          <TotalDonationsChart />
        </Grid2>
        <Grid2 size={6}>
          <TransactionsByLocationPieChart />
        </Grid2>
        <Grid2 size={6} >
          <RevenueByLocationBarChart />
        </Grid2>
        {/* Additional charts can be added here */}
      </Grid2>
    </Box>
  );
};

export default AnalyticsPage;
