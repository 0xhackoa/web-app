'use client'

import React, {ReactNode, useState, useEffect, createContext } from "react";
import { config, projectId } from '@/config'

import { createWeb3Modal } from '@web3modal/wagmi/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { State, WagmiProvider } from 'wagmi'

// Setup queryClient
const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
});

export const AppContext = createContext({
  useTestAadhaar: true,
  setIsTestMode: (isTest: boolean) => {},
});


export default function Web3ModalProvider({
  children,
  initialState
}: {
  children: ReactNode
  initialState?: State
}) {
  const [ready, setReady] = useState(false);
  const [isTestMode, setIsTestMode] = useState<boolean>(true);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
    { ready ? (
      <AppContext.Provider
      value={{
        useTestAadhaar: isTestMode,
        setIsTestMode: setIsTestMode,
      }}
    >
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider> 
    </AppContext.Provider>
    ) : null }
    </>
  )
}
    