// frontend/src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners
          textTransform: 'none', // Disable uppercase transformation
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          boxShadow: 'none',
        },
      },
    },
  },

  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 500 },
    body1: { fontWeight: 400 },
    // Customize other variants as needed
  },

  palette: {
    background: {
      default: '#ffffff', // Set the default background to white
    },
    primary: {
      main: '#4dc9ed', // Blue
    },
    secondary: {
      main: '#d456f9', // Pink
    },
    text: {
      primary: '#000000', // Black
    },
  },
  // Add typography settings here
});

export default theme;
