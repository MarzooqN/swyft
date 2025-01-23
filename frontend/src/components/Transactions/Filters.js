// frontend/src/components/Transactions/Filters.js

import React, {useState} from 'react';
import { TextField, Button, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Filters = ({ onFilter }) => {
  // Implement state management for filters
  // For example:
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleClick = () => {
    const params = {
      'start_date': startDate == null ? null: startDate.format(),
      'end_date': endDate == null ? null: endDate.format()
    }
    onFilter(params)
  }

  return (
    <Box component="form" sx={{ display: 'flex', gap: 2 , py: 2}}>
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={(newValue) => setStartDate(newValue)}
        textField={(params) => <TextField {...params} />}
      />
      <DatePicker
        label="End Date"
        value={endDate}
        onChange={(newValue) => setEndDate(newValue)}
        textField={(params) => <TextField {...params} />}
      />
      {/* Other filters */}
      <Button variant="contained" color="primary" onClick={handleClick}>
        Search
      </Button>
    </Box>
  );
};

export default Filters;
