import './globals.css'
import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'


const roboto = Roboto({ 
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'] 
})

export const metadata: Metadata = {
  title: 'Siwes App',
  description: 'Siwes Record',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
