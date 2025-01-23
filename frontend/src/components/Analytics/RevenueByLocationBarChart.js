// frontend/src/components/Analytics/RevenueByLocationBarChart.js

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { fetchRevenueByLocation } from '../../services/api';
import { Typography, Box } from '@mui/material';

const RevenueByLocationBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadChartData = async () => {
      try {
        const response = await fetchRevenueByLocation();
        setData(response);
      } catch (error) {
        console.error('Error fetching revenue by location:', error);
      }
    };
    loadChartData();
  }, []);

  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <Typography variant="h6" gutterBottom>
        Revenue by NFC Location
      </Typography>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="location" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Revenue']} />
          <Legend />
          <Bar dataKey="revenue" fill="#4dc9ed" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RevenueByLocationBarChart;
