'use client'
import React, { useContext, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import ButtonAdd from '../fragment/buttonAdd';
import { ICadastroSolicitacao, SolicitacaoContext } from '../../../../context';
import IconEdit from '../../../../../public/edit24.png';
import IconAprovar from '../../../../../public/aprovado.png';
import IconDelete from '../../../../../public/icons8-delete-48.png';
import ModalConfirmApprove from '../../modal/confirmApprove';
import { getAllSolicitation, updateSolicitation } from '@/services/fetch/apiSolicitation';
import dayjs from 'dayjs';

interface IRowTable {
  status?: string;
  name?: string;
  dateSolicitacao?: string;
  exame?: string;
  guia?: number | string;
  buttonAprovar?: string;
  iconEdit?: string;
  iconDelete?: string;
}

function TableMain() {
  const [rows, setRows] = React.useState<IRowTable[]>([]);
  const [openModalApprove, setOpenModalApprove] = React.useState(false);
  const [selectGuia, setSelectGuia] = React.useState<string | number>('');
  const { handleOpen, solicitacaoData, setSolicitacaoData } = useContext(SolicitacaoContext);
  // const rows = [
  //   createData('Aprovado', 'João', '01/01/2021', 'Ressonância', 123456, 'Aprovar', 'Editar', 'Excluir'),
  //   createData('Pendente', 'Maria', '01/01/2021', 'Tomografia', 123456, 'Aprovar', 'Editar', 'Excluir'),
  //   createData('Aprovado', 'José', '01/01/2021', 'Ressonância', 123456, 'Aprovar', 'Editar', 'Excluir'),
  //   createData('Aprovado', 'Lucas', '01/01/2021', 'Tomografia', 123456, 'Aprovar', 'Editar', 'Excluir'),
  //   createData('Pendente', 'Ana', '01/01/2021', 'Ressonância', 123456, 'Aprovar', 'Editar', 'Excluir'),
  // ]

  const handleApprove = async () => {
    const updateSolicitacao = solicitacaoData
      .find((item: ICadastroSolicitacao) => item.guia === selectGuia);

    if (updateSolicitacao) {
      updateSolicitacao.aprovado = true;
      await updateSolicitation(updateSolicitacao._id, updateSolicitacao);
      const newListSolicitation = await getAllSolicitation();

      setSolicitacaoData(newListSolicitation);
    }
    setSelectGuia('');
  }
  console.log(selectGuia)

  function createData(
    status?: string,
    name?: string,
    dateSolicitacao?: string,
    exame?: string,
    guia?: string | number,
    buttonAprovar?: string,
    iconEdit?: string,
    iconDelete?: string,
  ) {
    return { status, name, dateSolicitacao, exame, guia, buttonAprovar, iconEdit, iconDelete };
  }

  useEffect(() => {
    if (solicitacaoData.length > 0) {
      const newRows = solicitacaoData.map((item: ICadastroSolicitacao) => {
        return createData(
          item.aprovado ? 'Aprovado' : 'Pendente',
          item.nome ? item.nome : '---',
          item.dataSolicitacao ? item.dataSolicitacao : '---',
          item.exame ? item.exame : '---',
          item.guia ? item.guia : '---',
          'Aprovar',
          'Editar',
          'Excluir',
        )
      })
      setRows(newRows)
    }
  }, [solicitacaoData])

  return (
    <Box
      sx={{
        width: '98%',
      }}
    >
      {selectGuia && <ModalConfirmApprove
        open={openModalApprove}
        guia={selectGuia}
        setSelectGuia={setSelectGuia}
        setClose={setOpenModalApprove}
        handleApprove={handleApprove}
      />}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '10px',
        }}
      >
        <ButtonAdd
          setOpen={handleOpen}
        />
      </Box>
      <TableContainer sx={{ borderRadius: '1%' }} component={Paper}>
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
              <TableCell sx={{ textAlign:'center' }}>Status</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">Data Solicitação</TableCell>
              <TableCell align="right">Exame</TableCell>
              <TableCell align="right">Guia</TableCell>
              <TableCell sx={{ textAlign: 'center' }} align="right">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 && rows.map((row: IRowTable) => {
              return (
                <TableRow
                  key={uuidv4()}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.status}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{dayjs(row.dateSolicitacao).format('DD/MM/YYYY')}</TableCell>
                  <TableCell align="right">{row.exame}</TableCell>
                  <TableCell align="right">{row.guia}</TableCell>
                  <TableCell align="right">
                    <Box>
                      <Button onClick={() => {
                        setOpenModalApprove(true);
                        setSelectGuia(row.guia || '')
                      }}>
                        <Image
                          src={IconAprovar}
                          alt="aprovar"
                          width={24}
                          height={24}
                        />
                      </Button>
                      <Button>
                        <Image
                          src={IconEdit}
                          alt="edit"
                          width={24}
                          height={24}
                        />
                      </Button>
                      <Button>
                        <Image
                          src={IconDelete}
                          alt="delete"
                          width={24}
                          height={24}
                        />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )
            } )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default TableMain