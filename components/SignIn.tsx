/* eslint-disable react/no-unescaped-entities */
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from './ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import logo from '@/assets/footilogo.svg'
import Image from 'next/image'
import { useAuth } from '@/contexts/useAuth'
import { GiSoccerBall } from 'react-icons/gi'

const formSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must have at least 6 characters')
    .max(50, 'Password is too long'),
})

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const { handleSignIn, isLoading } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSignIn(values)
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide duration-300 transition-all hover:tracking-wider">
        Sign In
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] bg-[#1F211F]/50 backdrop-blur-sm border-y-2 border-x-[#1D1E1B] border-y-default">
        <DialogHeader className="text-center flex justify-center flex-col space-y-0">
          <div className="mx-auto pl-3 rounded-full">
            <Image alt="logo" src={logo} className="w-14" />
          </div>
          <DialogTitle className="text-2xl font-bai-bold">Login</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="name@example.com"
                        className="bg-white/5 border-white/10 pl-10"
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
                        className="bg-white/5 border-white/10 pl-10"
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
                <span className="relative z-10">Sign In</span>
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
