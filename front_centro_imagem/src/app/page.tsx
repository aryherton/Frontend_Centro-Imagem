import React from 'react'
import { Box } from '@mui/material'
import Header from './components/header'
import Main from './components/main'

export default function Home() {
  return (
    <Box>
      <Header />
      <Main />
      <Box component="footer">Footer</Box>
    </Box>
  )
}
