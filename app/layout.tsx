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
import { FilterProvider } from '@/contexts/useFilter'
import { useEffect, useState } from 'react'
import FootiNewsTop from '@/components/HeaderNews'
const baiLight = Bai_Jamjuree({
  weight: '600',
  subsets: ['latin'],
  variable: '--font-bai-light', // Variável CSS personalizada
})
const baiBold = Bai_Jamjuree({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-bai-bold', // Variável CSS personalizada
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [shouldAddPadding, setShouldAddPadding] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      // Verifica se a altura atual é maior que a altura inicial
      // isso indica que a barra do navegador está escondida
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.clientHeight
      setShouldAddPadding(windowHeight > documentHeight)
    }

    // Checa no carregamento inicial
    handleResize()

    // Adiciona listener para mudanças de tamanho
    window.addEventListener('resize', handleResize)
    // Para dispositivos iOS, também monitoramos o scroll
    window.addEventListener('scroll', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleResize)
    }
  }, [])
  const pathname = usePathname()
  return (
    <html lang="en">
      {pathname === '/user' ||
      pathname === '/' ||
      pathname === '/login' ||
      pathname === '/register' ? (
        <head>
          <meta name="theme-color" content="#141414" />
        </head>
      ) : (
        <head>
          <meta name="theme-color" content="#272927" />
        </head>
      )}

      <body
        className={`${baiLight.className} ${baiBold.variable} ${
          pathname === '/' ||
          pathname === '/login' ||
          pathname === '/register' ||
          pathname === '/user'
            ? null
            : 'mt-12'
        } antialiased  bg-[#141414] max-w-[450px] mx-auto`}
      >
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <FilterProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                {pathname === '/' ||
                pathname === '/login' ||
                pathname === '/register' ||
                pathname === '/user' ||
                pathname === '/news' ? null : (
                  <HeaderTop />
                )}
                {pathname === '/news' ? <FootiNewsTop /> : null}
                {children}
                {pathname === '/' ||
                pathname === '/register' ||
                pathname === '/login' ? null : (
                  <Header padding={shouldAddPadding} />
                )}
              </ThemeProvider>
              <ToastContainer />
            </FilterProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
