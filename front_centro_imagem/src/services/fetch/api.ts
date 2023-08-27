import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { AuthTokenError } from '../errors/AuthTokenError';
import { signOut } from '@/context/AuthContext';

export function setupAPI(context = undefined) {
  let cookies = parseCookies(context);

  const api = axios.create({
    baseURL: 'http://localhost:3003',
    headers: {
      Authorization: `Bearer ${cookies['@sgar.token']}`,
    },
  });

  api.interceptors.response.use(
    (response: any) => {
      return response;
    },
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
