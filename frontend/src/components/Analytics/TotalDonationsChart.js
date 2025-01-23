// frontend/src/components/Analytics/TotalDonationsChart.js

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { fetchTotalDonations } from '../../services/api';
import { Typography, Box } from '@mui/material';

const TotalDonationsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadChartData = async () => {
      const response = await fetchTotalDonations();
      setData(response); // Assuming response is an array of data points
    };
    loadChartData();
  }, []);

  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <Typography variant="h6" gutterBottom>
        Revenue by Day
      </Typography>
      <ResponsiveContainer>
        <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Total Donations']}/>
          <Line type="monotone" dataKey="total_donations" name="Total Donations" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TotalDonationsChart;
