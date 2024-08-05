import type { Metadata } from 'next'
import { headers } from 'next/headers'
import './globals.css'

import { cookieToInitialState } from 'wagmi'

import { config } from '@/config'
import Web3ModalProvider from '@/context'
import { Palanquin } from "next/font/google";


// const inter = Inter({ subsets: ["latin"] });
const palanquin = Palanquin({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-palanquin',
})


export const metadata: Metadata = {
  title: "QuestChain",
  description: "Bitcoin based cross-chain quest platform",
};


// wallet connect Project ID: d25d30fb15568c9a05abe406f8883973


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en" className={`${palanquin.variable} font-sans`}>
      <body>
        <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
      </body>
    </html>
  )
}
