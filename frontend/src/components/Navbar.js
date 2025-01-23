// frontend/src/components/Navbar.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import theme from '../theme';

const Navbar = () => (
  <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1, color: '#000' }}>
        Swyft
      </Typography>
      <Button color="primary" component={Link} to="/">
        Dashboard
      </Button>
      <Button color="primary" component={Link} to="/transactions">
        Transactions
      </Button>
      <Button color="primary" component={Link} to="/analytics">
        Analytics
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
