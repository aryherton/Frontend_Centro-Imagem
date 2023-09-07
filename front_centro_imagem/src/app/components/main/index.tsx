'use client'
import React, { useContext } from 'react'

import { Box } from '@mui/material'
import TableMain from './table'
import FilterMain from './filter'
import ModalSolicitacao from '../modal/addSolicitacao'
import { SolicitacaoContext } from '../../../context'

function Main() {
  const { openModalSolicitacao, handleClose } = useContext(SolicitacaoContext);

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
      <ModalSolicitacao
        open={openModalSolicitacao}
        setClose={handleClose}
      />
    </Box>
  )
}

export default Main