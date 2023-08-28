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

export async function deleteSolicitation(id: string) {
  const response = await api.delete(`/solicitacoes-exames/${id}`);
  return response.data;
}

export async function updateSolicitation(id: string, data: ICadastroSolicitacao) {
  const response = await api.put(`/solicitacoes-exames/${id}`, data);
  return response.data;
}
