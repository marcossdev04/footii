'use client'
/* eslint-disable react/no-unescaped-entities */
import { z } from 'zod'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { useAuth } from '@/contexts/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import {
  Mail,
  EyeOff,
  Eye,
  Lock,
  User,
  Phone,
  X,
  ArrowRight,
} from 'lucide-react'
import { GiSoccerBall } from 'react-icons/gi'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form'
import Image from 'next/image'
import { Input } from './ui/input'
import logo from '@/assets/footilogo.svg'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import LoadingOverlay from './RegisterLoading'

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must have at least 2 characters')
      .max(50, 'Name is too long'),
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    phone: z
      .string()
      .min(10, 'Phone must have at least 10 digits')
      .max(15, 'Phone number is too long'),
    password: z
      .string()
      .min(6, 'Password must have at least 6 characters')
      .max(50, 'Password is too long'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export function Register() {
  const [isHovered, setIsHovered] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { handleRegister, isLoading } = useAuth()
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true)
    }
  }, [isLoading])

  // Função para ser chamada quando a animação terminar
  const handleLoadingComplete = () => {
    if (!isLoading) {
      setTimeout(() => {
        setShowLoading(false)
      }, 2000)
    }
  }

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    handleRegister({
      name: data.name,
      email: data.email,
      password: data.password,
      phone_number: data.phone,
    })
  }

  return (
    <Dialog>
      <DialogTrigger
        className="w-full group relative px-8 py-4 rounded-full font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden hover:-translate-y-0.5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 bg-[length:200%_100%] animate-gradient"></div>
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <div className="absolute inset-[-2px] bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-lg"></div>
        </div>
        <span className="relative z-10">Start Winning Now</span>
        <ArrowRight
          className={`w-5 h-5 relative z-10 transition-all duration-300 ${isHovered ? 'translate-x-1 scale-110' : ''}`}
        />
      </DialogTrigger>
      <DialogContent
        className={` ${showLoading ? 'h-[100vh] max-w-[100vw]' : 'max-w-[95vw] max-h-[90vh]'} md:max-w-[450px] bg-[#1F211F]/50 backdrop-blur-sm border-y-2 border-x-[#1D1E1B] border-y-default`}
      >
        {showLoading && (
          <LoadingOverlay onLoadingComplete={handleLoadingComplete} />
        )}
        <DialogClose className="absolute top-6 right-2 text-red-500">
          <X size={30} />
        </DialogClose>
        <DialogHeader className="text-center flex justify-center flex-col space-y-0">
          <div className="mx-auto pl-3 rounded-full">
            <Image alt="logo" src={logo} className="w-14" />
          </div>
          <DialogTitle className="text-2xl font-bai-bold">Register</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="md:space-y-6 space-y-3 mt-1"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                      <Input
                        className="pl-10 bg-white/5 "
                        placeholder="Your name"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                      <Input
                        className="pl-10 bg-white/5 "
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Phone</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                      <Input
                        className="pl-10 bg-white/5 "
                        type="tel"
                        placeholder="+55 (99) 99999-9999"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        className="bg-white/5   pl-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">
                    {' '}
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        className=" bg-white/5  pl-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading ? (
              <div className="w-ful flex justify-center group bg-default/90 hover:opacity-80 transition-opacity duration-200 hover:bg-emerald-500 text-black py-1.5 rounded-lg">
                <GiSoccerBall className="animate-spin text-black" size={25} />
              </div>
            ) : (
              <Button
                type="submit"
                className="w-full relative group bg-default/90 hover:opacity-80 transition-opacity duration-200 hover:bg-emerald-500 text-black tracking-wide py-2.5"
              >
                <span className="relative z-10">Register</span>
              </Button>
            )}
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
