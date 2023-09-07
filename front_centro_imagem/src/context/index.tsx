'use client';
import { createContext, ReactNode, use, useCallback, useEffect, useState } from 'react';
import { getAllSolicitation } from '@/services/fetch/apiSolicitation';

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

export interface IFilterOptions {
  nameInput: 'aprovado' | 'nome' | 'exame' | 'guia';
  newValue: string | boolean;
  valueBool?: boolean | null;
}

export const SolicitacaoContext = createContext({} as any);

export function SolicitacaoProvider({ children }: any) {
  const [filterOptions, setFilterOptions] = useState<IFilterOptions[] | []>([]);
  const [solicitacaoData, setSolicitacaoData] = useState([]);
  const [filtroSolicitacaoData, setFiltroSolicitacaoData] = useState<ICadastroSolicitacao[] | []>([]);
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

  const getAllSolicitationData = useCallback(async () => {
    const data = await getAllSolicitation();
    setSolicitacaoData(data);
  }, []);

  const handleFilterSolicitation = (objFilter: IFilterOptions) => {
    console.log(objFilter);
    if (objFilter.nameInput === 'aprovado') {
      const filterDataSolicitacao = solicitacaoData
        .filter((item: ICadastroSolicitacao) => item[objFilter.nameInput] === objFilter.valueBool);

      setFiltroSolicitacaoData(filterDataSolicitacao);
    } else {
      let filterOpt = [...filterOptions, objFilter];
      if (objFilter.newValue === null) {
        filterOpt = filterOptions.filter((item: IFilterOptions) => item.nameInput !== objFilter.nameInput);
      }
      const filterDataSolicitacao = filterOpt
        .reduce((acc: ICadastroSolicitacao[] | [], currentValue: IFilterOptions) => {
          const filterValue = solicitacaoData
            .filter((item: ICadastroSolicitacao) => item[currentValue.nameInput] === currentValue.newValue && !acc.some((obj: ICadastroSolicitacao) => obj._id === item._id));

          return [...acc, ...filterValue];
        }, []);

      setFilterOptions(filterOpt);
      setFiltroSolicitacaoData(filterDataSolicitacao);
    }
  }

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
        filtroSolicitacaoData,
        handleFilterSolicitation,
        filterOptions,
        setFilterOptions,
      }}
    >
      {children}
    </SolicitacaoContext.Provider>
  );
}
