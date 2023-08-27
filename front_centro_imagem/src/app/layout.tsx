import './globals.css'
import React, { ReactNode } from 'react'
import type { Metadata } from 'next'
import { SolicitacaoProvider } from '@/context'

export const metadata: Metadata = {
  title: 'Solicitação de exames',
  description: 'Gerenciar solicitações de exames - UNIMED',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt">
      <body>
        <SolicitacaoProvider>
          {children}
        </SolicitacaoProvider>
      </body>
    </html>
  )
}
