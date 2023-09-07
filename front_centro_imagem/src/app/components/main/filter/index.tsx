'use client'
import React, { useContext, useState } from 'react'
import { SolicitacaoContext } from '@/context';
import { Autocomplete, Box, TextField } from '@mui/material'
import CustomDateRangeInputs from './fragment/dateRage';

function FilterMain() {
  const { solicitacaoData, handleFilterSolicitation } = useContext(SolicitacaoContext);
  const arrayNamesCliente = solicitacaoData.map((item: any) => item.nome);
  const arrayExames = solicitacaoData.map((item: any) => item.exame);
  const arrayGuia = solicitacaoData.map((item: any) => item.guia);
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
        options={['Aprovado', 'Pendente']}
        sx={{ width: '15%', minWidth: '150px' }}
        id="auto-comoplete-status"
        renderInput={(params) => (
          <TextField {...params} label="Status" variant="standard" />
        )}
        onChange={(_event, newValue: any) => {
          let valueBool: boolean | null = newValue === 'Aprovado' ? true : false;
          valueBool = newValue === null ? null : valueBool;
          handleFilterSolicitation({ nameInput: 'aprovado', valueBool });
        }}
      />
      <Autocomplete
        options={arrayNamesCliente ?? []}
        sx={{ width: '15%', minWidth: '150px' }}
        id="auto-comoplete-nome"
        renderInput={(params) => (
          <TextField {...params} label="Nome" variant="standard" />
        )}
        onChange={(_event, newValue: any) => {
          handleFilterSolicitation({ nameInput: 'nome', newValue });
        }}
      />
      <CustomDateRangeInputs />
      <Autocomplete
        options={arrayExames ?? []}
        sx={{ width: '15%', minWidth: '150px' }}
        id="auto-comoplete-exame"
        renderInput={(params) => (
          <TextField {...params} label="Exame" variant="standard" />
        )}
        onChange={(_event, newValue: any) => {
          handleFilterSolicitation({ nameInput: 'exame', newValue });
        }}
      />
      <Autocomplete
        options={arrayGuia ?? []}
        sx={{ width: '15%', minWidth: '150px' }}
        id="auto-comoplete-guia"
        renderInput={(params) => (
          <TextField {...params} label="Guia" variant="standard" />
        )}
        onChange={(_event, newValue: any) => {
          handleFilterSolicitation({ nameInput: 'guia', newValue });
        }}
      />
    </Box>
  )
}

export default FilterMain