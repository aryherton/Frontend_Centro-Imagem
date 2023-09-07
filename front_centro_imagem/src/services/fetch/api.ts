import axios from 'axios';
// import axios, { AxiosError } from 'axios';
// import { parseCookies } from 'nookies';
// import { AuthTokenError } from '../errors/AuthTokenError';
// import { signOut } from '@/context/AuthContext';
import dotenv from 'dotenv';

dotenv.config();

export function setupAPI(context = undefined) {
  // let cookies = parseCookies(context);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://backendcentroimagem.onrender.com/',
    // headers: {
    //   Authorization: `Bearer ${cookies['@sgar.token']}`,
    // },
  });

  // api.interceptors.response.use(
  //   (response: any) => {
  //     return response;
  //   },
  //   async (error: AxiosError) => {
  //     if (error.response?.status === 401) {
  //       if (typeof window !== 'undefined') {
  //         signOut();
  //       } else {
  //         return Promise.reject(new AuthTokenError());
  //       }
  //     }

  //     return Promise.reject(error);
  //   }
  // );

  return api;
}
