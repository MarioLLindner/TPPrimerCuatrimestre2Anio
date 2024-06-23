import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header2 } from '../app/componentes/primarios/header/Header2'
import { Footer } from './componentes/primarios/footer/Footer'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Casa Lindner',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">    
      <body className={inter.className}><Header2 />{children}<Footer/></body>
    </html>
  )
}
