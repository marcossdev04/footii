/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../api/api'
import { usePathname, useRouter } from 'next/navigation'
import { CookiesProvider, useCookies } from 'react-cookie'
import {
  ReactNode,
  createContext,
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
  cpf: string
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

  useEffect(() => {
    const handleCookieChange = () => {
      const isPublicRoute = pathname === '/' || pathname === '/register'

      if (!cookies.token_footiapp) {
        setIsAuthenticated(false)
        api.defaults.headers.Authorization = ''

        // Só faz o redirecionamento se não estiver em uma rota pública
        if (!isPublicRoute) {
          push('/')
        }
      } else {
        setIsAuthenticated(true)
        api.defaults.headers.Authorization = `Bearer ${cookies.token_footiapp}`
      }
    }

    handleCookieChange()

    const interval = setInterval(handleCookieChange, 2000)

    return () => clearInterval(interval)
  }, [cookies, push, pathname])

  async function handleRegister({
    cpf,
    email,
    name,
    password,
    // eslint-disable-next-line camelcase
    phone_number,
  }: RegisterCredentials) {
    setIsLoading(true)
    const formattedData = {
      name,
      cpf,
      email,
      password,
      // eslint-disable-next-line camelcase
      phone_number,
    }
    try {
      await api.post('/users/', formattedData).then(async () => {
        const data = { email, password }
        await handleSignIn(data)
      })
      await queryClient.refetchQueries(['getUsers'])

      setIsLoading(false)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      setIsLoading(false)
      toast.error(
        err.response.data.non_field_errors === 'This password is too common.'
          ? 'Senha fraca'
          : err.response.data.cpf
            ? 'CPF inválido'
            : 'Não foi possível fazer a criação da conta.',
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
      // Primeira requisição - login
      const response = await api.post('/token/', {
        email,
        password,
      })

      const accessToken = response.data.access
      const refreshToken = response.data.refresh

      // Define cookies e headers
      setCookie('token_footiapp', accessToken, { maxAge: 60 * 30 })
      setCookie('refresh_footiapp', refreshToken, {
        maxAge: 60 * 60 * 12,
      })
      api.defaults.headers.Authorization = `Bearer ${accessToken}`

      setIsAuthenticated(true)
      push('/home')
    } catch (err: any) {
      let errorMessage = 'Erro desconhecido'

      if (err.response) {
        const { status, data } = err.response

        switch (status) {
          case 403:
            errorMessage = 'Usuário já está conectado'
            break
          case 404:
            errorMessage = 'Email ou senha incorreta'
            break
          case 400:
            if (data.error === 'Wrong password') {
              errorMessage = 'Email ou senha incorreta'
            }
            break
          case 401:
            errorMessage = 'Email ou senha incorreta'
            break
          default:
            console.error('Erro detalhado:', err.response)
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

  async function handleSignOut() {
    removeCookie('token_footiapp')
    removeCookie('refresh_footiapp')
    if (typeof window !== 'undefined') {
      localStorage.clear() // Limpa todo o localStorage
    }
    api.defaults.headers.Authorization = ''
    setIsAuthenticated(false)
    push('/')
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
