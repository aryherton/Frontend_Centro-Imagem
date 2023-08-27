'use client'
import React, { useState } from 'react'
import { Autocomplete, Box, TextField } from '@mui/material'
import CustomDateRangeInputs from './fragment/dateRage';

function FilterMain() {
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },]
  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option: any) => option.title,
  };
  const flatProps = {
    options: top100Films.map((option) => option.title),
  };
  const [value, setValue] = useState<any>(null);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: '60px',
      }}
      component="nav"
    >
      <Autocomplete
        {...defaultProps}
        sx={{ width: '15%', minWidth: '150px' }}
        id="disable-clearable"
        disableClearable
        renderInput={(params) => (
          <TextField {...params} label="Status" variant="standard" />
        )}
      />
      <Autocomplete
        {...defaultProps}
        sx={{ width: '15%', minWidth: '150px' }}
        id="disable-clearable"
        disableClearable
        renderInput={(params) => (
          <TextField {...params} label="Nome" variant="standard" />
        )}
      />
      <CustomDateRangeInputs />
      <Autocomplete
        {...defaultProps}
        sx={{ width: '15%', minWidth: '150px' }}
        id="disable-clearable"
        disableClearable
        renderInput={(params) => (
          <TextField {...params} label="Exame" variant="standard" />
        )}
      />
      <Autocomplete
        {...defaultProps}
        sx={{ width: '15%', minWidth: '150px' }}
        id="disable-clearable"
        disableClearable
        renderInput={(params) => (
          <TextField {...params} label="Guia" variant="standard" />
        )}
      />
    </Box>
  )
}

export default FilterMain