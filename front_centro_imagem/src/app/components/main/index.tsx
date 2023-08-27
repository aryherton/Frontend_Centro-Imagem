import React from 'react'

import { Box } from '@mui/material'
import TableMain from './table'
import FilterMain from './filter'

function Main() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '90vh',
        backgroundColor: '#dbd5c4',
        color: '#2f9fd8',
        width: '100%',
      }}
      component="main"
    >
      <FilterMain />
      <TableMain />
    </Box>
  )
}

export default Main