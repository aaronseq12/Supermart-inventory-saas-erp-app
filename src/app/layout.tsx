import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './providers' // 1. Import the provider

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Inventory SaaS',
  description: 'Modern Inventory Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. Wrap your children with the provider */}
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
