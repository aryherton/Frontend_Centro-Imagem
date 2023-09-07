'use client'
import React, { useContext, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import dayjs from 'dayjs';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ButtonAdd from '../fragment/buttonAdd';
import { ICadastroSolicitacao, SolicitacaoContext } from '../../../../context';
import IconEdit from '../../../../../public/edit24.png';
import IconAprovar from '../../../../../public/aprovado.png';
import IconDelete from '../../../../../public/icons8-delete-48.png';
import ModalConfirm from '../../modal/confirmApprove';
import { deleteSolicitation, getAllSolicitation, updateSolicitation } from '@/services/fetch/apiSolicitation';
import { exportToPDF } from '@/services/utils/exportFile';

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
  const [formatFile, setFormatFile] = React.useState('');
  const [rows, setRows] = React.useState<IRowTable[]>([]);
  const [openModalApprove, setOpenModalApprove] = React.useState(false);
  const [openModalDelete, setOpenModalDelete] = React.useState(false);
  const [selectGuia, setSelectGuia] = React.useState<string | number | null>(null);
  const { handleOpen, solicitacaoData, setSolicitacaoData, filtroSolicitacaoData } = useContext(SolicitacaoContext);

  const handleExportFile = () => {
    const data = {
      head: [['Status', 'Nome', 'Data Solicitação', 'Exame', 'Guia']],
      body: rows.map((item: IRowTable) => {
        return [item.status, item.name, item.dateSolicitacao, item.exame, item.guia];
      })
    }
    if (formatFile === 'xls') {
      return;
    } else {
      exportToPDF(data, 'SolicitaçõesExamesUNIMED');
    }
  }

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

  const handleDelete = async () => {
    const updateSolicitacao = solicitacaoData
      .find((item: ICadastroSolicitacao) => item.guia === selectGuia);

    if (updateSolicitacao) {
      await deleteSolicitation(updateSolicitacao._id);
      const newListSolicitation = await getAllSolicitation();

      setSolicitacaoData(newListSolicitation);
    }
    setSelectGuia('');
  }

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
      const arrayData = filtroSolicitacaoData.length > 0 ? filtroSolicitacaoData : solicitacaoData;
      const newRows = arrayData.map((item: ICadastroSolicitacao) => {
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
  }, [solicitacaoData, filtroSolicitacaoData])

  return (
    <Box
      sx={{
        width: '98%',
      }}
    >
      {selectGuia && <ModalConfirm
        open={openModalApprove}
        guia={selectGuia}
        setSelectGuia={setSelectGuia}
        setClose={setOpenModalApprove}
        handleApprove={handleApprove}
        msg="Deseja aprovar a solicitação?"
      />}
      {selectGuia && <ModalConfirm
        open={openModalDelete}
        guia={selectGuia}
        setSelectGuia={setSelectGuia}
        setClose={setOpenModalDelete}
        handleApprove={handleDelete}
        msg="Deseja excluir a solicitação?"
      />}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
            <InputLabel id="select-format-file-export">Formato do arquivo</InputLabel>
            <Select
              labelId="select-format-file-export"
              id="select-format-file-export"
              value={formatFile}
              onChange={({ target: { value } }) => {
                console.log(value);
                setFormatFile(value)
              }}
              label="Selecione formato"
            >
              <MenuItem value="xls">XLS</MenuItem>
              <MenuItem value="pdf">PDF</MenuItem>
            </Select>
          </FormControl>
          <Button
            onClick={handleExportFile}
          >
            Exporta
          </Button>
        </Box>
        <ButtonAdd
          setOpen={handleOpen}
        />
      </Box>
      <TableContainer sx={{ borderRadius: '1%' }} component={Paper}>
        <Table id="tabela-de-dados" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: '#C5D0DD',
                border: '1px solid #34445B',
                '&:last-child td, &:last-child th': { border: 0 },
                width: '100%',
              }}
            >
              <TableCell sx={{ textAlign: 'center' }}>Status</TableCell>
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
                      <Button
                        disabled={row.status === 'Aprovado'}
                        onClick={() => {
                          setOpenModalApprove(true);
                          setSelectGuia(row.guia || '')
                        }
                        }>
                        <Image
                          src={IconAprovar}
                          alt="aprovar"
                          width={24}
                          height={24}
                          style={{
                            opacity: row.status === 'Aprovado' ? 0.5 : 1,
                          }}
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
                      <Button
                        onClick={() => {
                          setSelectGuia(row.guia || '')
                          setOpenModalDelete(true);
                        }}
                      >
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
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default TableMain