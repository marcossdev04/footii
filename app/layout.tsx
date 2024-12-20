'use client'
import './globals.css'
// eslint-disable-next-line camelcase
import { Bai_Jamjuree } from 'next/font/google'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Header } from '@/components/Header'
import { usePathname } from 'next/navigation'
import { HeaderTop } from '@/components/HeaderTop'
import { AuthContextProvider } from '@/contexts/useAuth'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/api/queryClient'
import { ToastContainer } from 'react-toastify'

const baiLight = Bai_Jamjuree({
  weight: '600',
  subsets: ['latin'],
  variable: '--font-bai-light', // Variável CSS personalizada
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  return (
    <html lang="en">
      <body
        className={`${baiLight.className} antialiased  bg-[#141414] max-w-[450px] mx-auto`}
      >
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {pathname === '/' ||
              pathname === '/register' ||
              pathname === '/user' ? null : (
                <HeaderTop />
              )}
              {children}
              {pathname === '/' || pathname === '/register' ? null : <Header />}
            </ThemeProvider>
            <ToastContainer />
          </AuthContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
