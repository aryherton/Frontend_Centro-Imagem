import { setupAPI } from './api';
import { ICadastroSolicitacao } from '../../context/index';
import axios, { AxiosError } from 'axios';

export const api = setupAPI();

export async function getAllSolicitation() {
  const response = await api.get('/solicitacoes-exames');
  return response.data;
}

export async function postCreateSolicitation(data: ICadastroSolicitacao) {
  const response = await api.post('/solicitacoes-exames', data);
  return response.data;
}
