import React from 'react'
import { v4 as uuidv4 } from 'uuid';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function TableMain() {
  const rows = [
    createData('Aprovado', 'João', '01/01/2021', 'Ressonância', 123456, 'Aprovar', 'Editar', 'Excluir'),
    createData('Pendente', 'Maria', '01/01/2021', 'Tomografia', 123456, 'Aprovar', 'Editar', 'Excluir'),
    createData('Aprovado', 'José', '01/01/2021', 'Ressonância', 123456, 'Aprovar', 'Editar', 'Excluir'),
    createData('Aprovado', 'Lucas', '01/01/2021', 'Tomografia', 123456, 'Aprovar', 'Editar', 'Excluir'),
    createData('Pendente', 'Ana', '01/01/2021', 'Ressonância', 123456, 'Aprovar', 'Editar', 'Excluir'),
  ]

  function createData(
    status?: string,
    name?: string,
    dateSolicitacao?: string,
    exame?: string,
    guia?: number,
    buttonAprovar?: string,
    iconEdit?: string,
    iconDelete?: string,
  ) {
    return { status, name, dateSolicitacao, exame, guia, buttonAprovar, iconEdit, iconDelete };
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: '#C5D0DD',
              border: '1px solid #34445B',
              '&:last-child td, &:last-child th': { border: 0 },
              width: '100%',
            }}
          >
            <TableCell>Nome</TableCell>
            <TableCell align="right">CPF</TableCell>
            <TableCell align="right">Data de nascimento</TableCell>
            <TableCell align="right">Telefone</TableCell>
            <TableCell align="right">E-mail</TableCell>
            <TableCell align="right">Endereço</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow
                key={uuidv4()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.status}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.dateSolicitacao}</TableCell>
                <TableCell align="right">{row.exame}</TableCell>
                <TableCell align="right">{row.guia}</TableCell>
                <TableCell align="right">{row.buttonAprovar}</TableCell>
                <TableCell align="right">{row.iconEdit}</TableCell>
                <TableCell align="right">{row.iconDelete}</TableCell>
              </TableRow>
            )
          } )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableMain