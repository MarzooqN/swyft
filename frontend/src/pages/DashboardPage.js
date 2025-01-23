// frontend/src/pages/DashboardPage.js

import React, { useState, useEffect } from 'react';
import { Box, Grid2, Paper, Typography } from '@mui/material';
import { fetchFinancialOverview } from '../services/api';
import theme from '../theme';

const DashboardPage = () => {

  const [overview, setOverview] = useState({
    total_donations: 0,
    total_refunds: 0,
    total_transactions: 0,
    total_fundraisers: 0,
    net_amount: 0,
    total_fees: 0,
    amount_available: 0
  });
  
  useEffect(() => {
    const loadOverview = async () => {
      const data = await fetchFinancialOverview();
      setOverview(data); 
    };
    loadOverview();
  }, []);

  const formatNumber = (number) => {
    return number.toLocaleString('en-US');
  };

  const stats = [
    {
      label: 'Total Amount',
      value: `$${formatNumber(overview.total_donations.toFixed(2))}`,
      color: '#4dc9ed', // Blue
    },
    {
      label: 'Total Transactions',
      value: formatNumber(overview.total_transactions),
      color: '#d456f9', // Pink
    },
    {
      label: 'Total Fundraisers',
      value: formatNumber(overview.total_fundraisers),
      color: '#000000', // Black
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid2 container spacing={3}>
        {stats.map((stat) => (
          <Grid2 size={{xs: 12, md: 4}} key={stat.label}>
            <Paper
              sx={{
                p: 20,
                textAlign: 'center',
                color: '#fff',
                background: 'linear-gradient(180deg, #4dc9ed, #d456f9)',
                boxShadow: 8,
                borderRadius: 10,
              }}
      
            >
              <Typography variant="h5" component="div">
                {stat.value}
              </Typography>
              <Typography variant="subtitle1">{stat.label}</Typography>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
      {/* Placeholder for future components */}
    </Box>
  );
};

export default DashboardPage;
