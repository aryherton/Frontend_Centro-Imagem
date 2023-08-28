'use client';
import { createContext, ReactNode, use, useCallback, useEffect, useState } from 'react';
import { getAllSolicitation } from '@/services/fetch/apiSolicitation';

type TravelProviderProps = {
  children: ReactNode;
};

export interface ICadastroSolicitacao {
  _id?: string;
  nome: string;
  dataSolicitacao: string;
  exame: string;
  guia: number | string;
  aprovado: boolean;
  observacao: string;
  logInterno: string;
  __v?: number;
}

export const SolicitacaoContext = createContext({} as any);

export function SolicitacaoProvider({ children }: any) {
  const [openModalSolicitacao, setOpenModalSolicitacao] = useState(false);
  const [checkCadastroSolicitacao, setCheckCadastroSolicitacao] = useState(false);
  const [cadastroSolicitacao, setCadastroSolicitacao] = useState({
    nome: '',
    dataSolicitacao: '',
    exame: '',
    guia: '',
    aprovado: '',
    observacao: '',
    logInterno: '',
  });
  const [solicitacaoData, setSolicitacaoData] = useState([]);

  const handleOpen = () => setOpenModalSolicitacao(true);
  const handleClose = () => setOpenModalSolicitacao(false);

  const getAllSolicitationData = useCallback(async () => {
    const data = await getAllSolicitation();
    setSolicitacaoData(data);
  }, []);

  useEffect(() => {
    getAllSolicitationData();
  }, [getAllSolicitationData]);

  return (
    <SolicitacaoContext.Provider
      value={{
        openModalSolicitacao,
        handleOpen,
        handleClose,
        cadastroSolicitacao,
        setCadastroSolicitacao,
        checkCadastroSolicitacao,
        setCheckCadastroSolicitacao,
        solicitacaoData,
        setSolicitacaoData,
      }}
    >
      {children}
    </SolicitacaoContext.Provider>
  );
}
