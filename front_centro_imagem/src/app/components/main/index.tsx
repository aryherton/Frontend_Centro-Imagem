import React from 'react'

import { Box } from '@mui/material'
import TableMain from './table'

function Main() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        backgroundColor: '#dbd5c4',
        color: '#2f9fd8',
        width: '100%',
      }}
      component="main"
    >
      <TableMain />
    </Box>
  )
}

export default Main