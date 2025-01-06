/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../api/api'
import { usePathname, useRouter } from 'next/navigation'
import { CookiesProvider, useCookies } from 'react-cookie'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-toastify'
import { queryClient } from '../api/queryClient'

interface SignInCredentials {
  email: string
  password: string
}
interface RegisterCredentials {
  name: string
  phone_number: string
  email: string
  password: string
}

interface AuthContextProps {
  handleSignIn: (credentials: SignInCredentials) => void
  handleRegister: (credentials: RegisterCredentials) => void
  handleSignOut: () => void
  isLoading: boolean
  errorSignIn: string | null
  handleClearErrorSignIn: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextProps)

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const { push } = useRouter()
  const pathname = usePathname()
  const [cookies, setCookie, removeCookie] = useCookies([
    'token_footiapp',
    'refresh_footiapp',
  ])

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!cookies.token_footiapp,
  )

  const handleSignOut = useCallback(() => {
    removeCookie('token_footiapp')
    removeCookie('refresh_footiapp')
    if (typeof window !== 'undefined') {
      localStorage.clear()
    }
    api.defaults.headers.Authorization = ''
    setIsAuthenticated(false)
    push('/login')
  }, [push, removeCookie])

  useEffect(() => {
    const refreshAccessToken = async (refresh_token: string) => {
      try {
        const response = await api.post('/token/refresh/', {
          refresh: refresh_token,
        })
        return response.data.access
      } catch (error) {
        return null
      }
    }

    const handleCookieChange = async () => {
      const isPublicRoute =
        pathname === '/' || pathname === '/register' || pathname === '/login'

      if (!cookies.token_footiapp) {
        // Tenta refresh antes de deslogar
        if (cookies.refresh_footiapp && !isPublicRoute) {
          try {
            const newAccessToken = await refreshAccessToken(
              cookies.refresh_footiapp,
            )
            if (newAccessToken) {
              setCookie('token_footiapp', newAccessToken, { maxAge: 60 * 30 })
              api.defaults.headers.Authorization = `Bearer ${newAccessToken}`
              setIsAuthenticated(true)
              return // Retorna se o refresh foi bem sucedido
            }
          } catch (error) {
            console.error('Refresh token error:', error)
          }
        }

        // Só desloga se não conseguiu fazer o refresh
        setIsAuthenticated(false)
        api.defaults.headers.Authorization = ''
        if (!isPublicRoute) {
          handleSignOut()
        }
      } else {
        setIsAuthenticated(true)
        api.defaults.headers.Authorization = `Bearer ${cookies.token_footiapp}`
      }
    }

    // Configura o interceptor
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          cookies.refresh_footiapp
        ) {
          originalRequest._retry = true

          try {
            const newAccessToken = await refreshAccessToken(
              cookies.refresh_footiapp,
            )
            if (newAccessToken) {
              setCookie('token_footiapp', newAccessToken, { maxAge: 5 })
              api.defaults.headers.Authorization = `Bearer ${newAccessToken}`
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
              return api(originalRequest)
            }
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError)
          }
        }

        return Promise.reject(error)
      },
    )

    handleCookieChange()
    const interval = setInterval(handleCookieChange, 2000)

    return () => {
      clearInterval(interval)
      api.interceptors.response.eject(interceptor)
    }
  }, [
    cookies.token_footiapp,
    cookies.refresh_footiapp,
    pathname,
    setCookie,
    handleSignOut,
  ])

  async function handleRegister({
    email,
    name,
    password,
    phone_number,
  }: RegisterCredentials) {
    setIsLoading(true)
    const formattedData = {
      name,
      email,
      password,
      phone_number,
    }
    try {
      await api.post('/users/', formattedData).then(async () => {
        // Adiciona um delay de 3 segundos antes do handleSignIn
        await new Promise((resolve) => setTimeout(resolve, 3000))
        const data = { email, password }
        await handleSignIn(data)
      })
      await queryClient.refetchQueries(['getUsers'])

      setIsLoading(false)
    } catch (err: any) {
      setIsLoading(false)
      toast.error(
        err.response.data.non_field_errors === 'This password is too common.'
          ? 'Weak password'
          : err.response.data.cpf
            ? 'Invalid CPF'
            : 'Account creation failed.',
        {
          position: 'bottom-right',
          theme: 'dark',
          closeOnClick: true,
        },
      )
    }
  }

  async function handleSignIn({ email, password }: SignInCredentials) {
    setIsLoading(true)
    try {
      const response = await api.post('/token/', {
        email,
        password,
      })

      const accessToken = response.data.access
      const refreshToken = response.data.refresh

      setCookie('token_footiapp', accessToken, { maxAge: 5 })
      setCookie('refresh_footiapp', refreshToken, {
        maxAge: 60 * 60 * 12, // 12 horas
      })
      api.defaults.headers.Authorization = `Bearer ${accessToken}`

      setIsAuthenticated(true)
      push('/home')
    } catch (err: any) {
      let errorMessage = 'Unknown error'

      if (err.response) {
        const { status, data } = err.response

        switch (status) {
          case 403:
            errorMessage = 'User is already connected'
            break
          case 404:
            errorMessage = 'Invalid email or password'
            break
          case 400:
            if (data.error === 'Wrong password') {
              errorMessage = 'Invalid email or password'
            }
            break
          case 401:
            errorMessage = 'Invalid email or password'
            break
          default:
            console.error('Detailed error:', err.response)
        }
      }

      toast.error(errorMessage, {
        position: 'bottom-right',
        theme: 'dark',
        closeOnClick: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  function handleClearErrorSignIn() {
    setError('')
  }

  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
        handleRegister,
        handleSignOut,
        isLoading,
        errorSignIn: error ? String(error) : null,
        handleClearErrorSignIn,
        isAuthenticated,
      }}
    >
      <CookiesProvider>{children}</CookiesProvider>
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext)

  return context
}
