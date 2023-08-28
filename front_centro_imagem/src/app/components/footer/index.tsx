import React from 'react';

import { Box } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10vh',
        backgroundColor: '#2f9fd8',
        color: '#dbd5c4',
        width: '100%',
      }}
      component="footer"
    >
      <p>Teresina/PI</p>
    </Box>
  );
}

export default Footer;