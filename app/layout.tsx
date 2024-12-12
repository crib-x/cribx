import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import LayoutClient from '@/components/layout/layout-client'
import ToastNotification from '@/components/ui/toast-notification'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'cribX - Student Housing Platform',
  description: 'Find your perfect student housing, roommates, and community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutClient>
            {children}
          </LayoutClient>
          <ToastNotification />
        </ThemeProvider>
      </body>
    </html>
  )
}