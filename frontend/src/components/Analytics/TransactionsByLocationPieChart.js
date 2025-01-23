// frontend/src/components/Analytics/TransactionsByLocationPieChart.js

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { fetchTransactionsByLocation } from '../../services/api';
import { Typography, Box } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#d456f9', '#4dc9ed'];

const TransactionsByLocationPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadChartData = async () => {
      try {
        const response = await fetchTransactionsByLocation();
        setData(response);
      } catch (error) {
        console.error('Error fetching transactions by location:', error);
      }
    };
    loadChartData();
  }, []);

  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <Typography variant="h6" gutterBottom>
        Transactions by NFC Location
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="location"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}`, `${name}`]}/>
          <Legend verticalAlign='bottom' height={36} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TransactionsByLocationPieChart;
