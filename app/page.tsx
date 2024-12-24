/* eslint-disable react/no-unescaped-entities */
'use client'
import { z } from 'zod'
import React from 'react'
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
import x from '@/assets/x.svg'
import telegram from '@/assets/telegram.svg'
import whatsapp from '@/assets/whatsapp.svg'
import instagram from '@/assets/instagram.svg'
import image18 from '@/assets/18.svg'
import gametherapy from '@/assets/gametherapy.svg'
import gamecare from '@/assets/gamecare.svg'
import player from '@/assets/loginPlayer.svg'
import { useAuth } from '@/contexts/useAuth'
import { GiSoccerBall } from 'react-icons/gi'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must have at least 6 characters')
    .max(50, 'Password is too long'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function Home() {
  const { handleSignIn, isLoading } = useAuth()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    handleSignIn(data)
  }

  return (
    <div className="flex flex-col min-h-[90vh] items-center justify-center px-5 gap-10">
      <div className="w-full mt-12">
        <CardHeader>
          <CardTitle className="text-2xl flex justify-center font-bold">
            <Image width={50} src={logo} alt="logo" />
          </CardTitle>
          <CardDescription className="text-center text-zinc-200">
            Enjoy our recommendations for free and experience the power of Footi
            AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Email</FormLabel>
                    <FormControl>
                      <Input
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isLoading ? (
                <div className="flex bg-default justify-center items-center py-0.5 rounded-md">
                  <GiSoccerBall className="animate-spin text-black" size={32} />
                </div>
              ) : (
                <Button
                  type="submit"
                  className="w-full text-xl bg-default hover:bg-default/80"
                  disabled={isLoading}
                >
                  Login
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-200">
            Don't have an account?{' '}
            <a href="/register" className="text-default hover:underline">
              Sing up
            </a>
          </p>
        </CardFooter>
      </div>
      <div className="absolute bottom-0 right-0 pointer-events-none">
        <Image src={player} width={250} alt="player" className="select-none" />
      </div>

      {/* Footer */}
      <footer className="w-full mb-2 z-10 ">
        <div className="flex flex-col gap-2">
          <div className="text-sm">FOOTI™ 2025</div>
          <div className="text-sm">Privacy Policy</div>
          <div className="text-sm">Terms and conditions (T&Cs)</div>
          <div className="flex gap-3">
            <Image src={x} alt="twitter" />
            <Image src={telegram} alt="telegran" />
            <Image src={instagram} alt="instagram" />
            <Image src={whatsapp} alt="whatsapp" />
          </div>
          <div className="text-[10px]">
            Content on footi.ai is not intended for anybody under 18 years of
            age.
          </div>
          <div className="flex justify-center gap-5">
            <Image src={image18} alt="+18" />
            <Image src={gametherapy} alt="gametherapy" />
            <Image src={gamecare} alt="gamecare" />
          </div>
        </div>
      </footer>
    </div>
  )
}
