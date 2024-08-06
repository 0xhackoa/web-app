'use client'

import { ReactNode } from 'react'
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config'
import Web3ModalProvider from '@/context'

interface Web3ModalWrapperProps {
  children: ReactNode
  initialState: ReturnType<typeof cookieToInitialState>
}

export default function Web3ModalWrapper({ children, initialState }: Web3ModalWrapperProps) {
  return (
    <Web3ModalProvider initialState={initialState}>
      {children}
    </Web3ModalProvider>
  )
}