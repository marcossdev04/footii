'use client'
import { z } from 'zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import logo from '@/assets/footilogo.svg'
import { useAuth } from '@/contexts/useAuth'
import LoadingOverlay from '@/components/RegisterLoading'
import { Ellipsis2, Ellipsis3 } from '@/components/Elipisis'

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

export default function Register() {
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
      setShowLoading(false)
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
    <div className="flex flex-col min-h-[90vh] z-10 items-center justify-center px-5 gap-10">
      {showLoading && (
        <LoadingOverlay onLoadingComplete={handleLoadingComplete} />
      )}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <Ellipsis2 />
        <Ellipsis3 />
      </div>
      <div className="w-full mt-4">
        <CardHeader>
          <CardTitle className="text-2xl flex justify-center font-bold">
            <Image width={50} src={logo} alt="logo" />
          </CardTitle>
          <CardDescription className="text-center text-zinc-200">
            Create your account and join Footi AI plataform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Name</FormLabel>
                    <FormControl>
                      <Input transparent placeholder="Your name" {...field} />
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
                      <Input
                        transparent
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                      />
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
                      <Input
                        transparent
                        type="tel"
                        placeholder="+55 (99) 99999-9999"
                        {...field}
                      />
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
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <Input
                        transparent
                        type="password"
                        placeholder="Your password"
                        {...field}
                      />
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
                    <FormLabel className="text-white ">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        transparent
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full text-xl mt-3 bg-default hover:bg-default/80"
                disabled={isLoading}
              >
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-200">
            Already have an account?{' '}
            <a href="/" className="text-default hover:underline">
              Sign in
            </a>
          </p>
        </CardFooter>
      </div>
    </div>
  )
}
