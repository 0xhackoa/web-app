'use client'

import { ReactNode } from 'react'
import { cookieToInitialState } from 'wagmi'
import Web3ModalProvider from '@/context'
import { AnonAadhaarProvider } from "@anon-aadhaar/react";


interface Web3ModalWrapperProps {
  children: ReactNode
  initialState: ReturnType<typeof cookieToInitialState>
}

export default function Web3ModalWrapper({ children, initialState }: Web3ModalWrapperProps) {
  return (
    <Web3ModalProvider initialState={initialState}>
      <AnonAadhaarProvider _useTestAadhaar={true}>
        {children}
      </AnonAadhaarProvider>
    </Web3ModalProvider>
  )
}