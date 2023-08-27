'use client';
import { createContext, ReactNode, useState } from 'react';

type TravelProviderProps = {
  children: ReactNode;
};

export interface ICadastroSolicitacao {
  nome: string;
  dataSolicitacao: string;
  exame: string;
  guia: string;
  aprovado: boolean;
  observacao: string;
  logInterno: string;
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

  const handleOpen = () => setOpenModalSolicitacao(true);
  const handleClose = () => setOpenModalSolicitacao(false);

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
      }}
    >
      {children}
    </SolicitacaoContext.Provider>
  );
}
