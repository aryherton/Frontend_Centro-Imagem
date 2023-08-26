import React from 'react'

import { Box } from '@mui/material'

function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '5vh',
        backgroundColor: '#2f9fd8',
        color: '#dbd5c4',
        width: '100%',
      }}
      component="header"
    >
      <Box
        sx={{
          fontSize: '1.3rem',
          fontWeight: 'bold',
          fontFamily: 'Inter, sans-serif',
        }}
        component="h1"
      >
        Controle de guias
      </Box>
    </Box>
  )
}

export default Header