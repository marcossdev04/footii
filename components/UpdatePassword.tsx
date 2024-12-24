/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Eye, EyeOff, LucideLockKeyhole } from 'lucide-react'
import { api } from '@/api/api'
import { UserInterface } from '@/types/User'
import { queryClient } from '@/api/queryClient'
import { toast } from 'react-toastify'
import { GiSoccerBall } from 'react-icons/gi'

interface Props {
  user: UserInterface | undefined
}
const formSchema = z
  .object({
    currentPassword: z.string().min(6, 'A senha atual é obrigatória'),
    newPassword: z
      .string()
      .min(6, 'A nova senha deve ter pelo menos 6 caracteres')
      .max(50, 'A senha não pode ter mais de 50 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: 'A nova senha deve ser diferente da senha atual',
    path: ['newPassword'],
  })

type FormValues = z.infer<typeof formSchema>

export function UpdatePassword({ user }: Props) {
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: FormValues) {
    try {
      setLoading(true)
      await api.post('change-password/', {
        user_email: user?.email,
        old_password: data.currentPassword,
        new_password: data.newPassword,
      })
      await queryClient.refetchQueries('getUser')
      toast.success('Password changed successfully', {
        position: 'bottom-right',
        theme: 'dark',
        closeOnClick: true,
      })
      setLoading(false)
      form.reset()
      setOpen(false)
    } catch (error: any) {
      setLoading(false)
      toast.error(
        error.response.data.detail
          ? error.response.data.detail
          : 'Unexpected error',
        { position: 'bottom-right', theme: 'dark', closeOnClick: true },
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer bg-[#272927] items-center gap-2 rounded-xl py-3 uppercase flex justify-center">
        <div>Security</div>
        <div>
          <LucideLockKeyhole className="text-default" size={20} />
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-[95vw] rounded-lg bg-[#272927]">
        <DialogHeader>
          <DialogTitle className="text-default">Update Password</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showOldPassword ? 'text' : 'password'}
                        className="bg-[#272927] border border-zinc-600"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                      >
                        {showOldPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
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
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        className="bg-[#272927] border border-zinc-600"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                      >
                        {showNewPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
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
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="bg-[#272927] border border-zinc-600"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {loading ? (
              <div className="w-full bg-default flex justify-center py-0.5 text-black rounded-md hover:bg-default hover:bg-opacity-80">
                <GiSoccerBall className="animate-spin" size={32} />
              </div>
            ) : (
              <Button
                type="submit"
                className="w-full bg-default hover:bg-default hover:bg-opacity-80"
              >
                Save
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
