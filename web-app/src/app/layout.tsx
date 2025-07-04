import type { Metadata } from 'next'
import { ThemeProvider } from '@/providers/theme-provider'
import { QueryProvider } from '@/providers/query-provider'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MEI Digital',
  description: 'Plataforma para gestão de serviços para MEIs'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <body className={inter.className} cz-shortcut-listen='true'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <main className='min-h-screen p-8'>{children}</main>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
