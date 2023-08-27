'use client';
import { createContext, ReactNode, useState } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { api } from '@/services/fetch/apiUser';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  email: string;
} | null;

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, '@centroImagem.token');
    Router.push('/');
  } catch (error) {
    console.log('Erro ao deslogar.' + error);
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>(null);
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/user', {
        email,
        password,
      });

      console.log(response.data);

      const { _id } = response.data;

      setCookie(undefined, '@centroImagem.token', _id, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setUser({ id: _id, email });
    } catch (error) {
      console.log(error);
    }
  }

  async function signUp({
    email,
    name,
    password,
  }: SignUpProps) {
    try {
      const response = await api.post('/user', {
        email,
        name,
        password,
      });

      console.log('Cadastrado com sucesso!');
      Router.push('/');
    } catch (error) {
      console.log('Erro ao cadastrar: ', error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
