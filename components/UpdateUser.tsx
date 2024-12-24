'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FaEdit } from 'react-icons/fa'
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
import { api } from '@/api/api'
import { queryClient } from '@/api/queryClient'
import { toast } from 'react-toastify'
import { UserInterface } from '@/types/User'
import { GiSoccerBall } from 'react-icons/gi'

interface Props {
  user: UserInterface | undefined
}

const formSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone number must have at least 10 digits'),
})

type FormValues = z.infer<typeof formSchema>

export function UpdateUser({ user }: Props) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  })

  async function onSubmit(data: FormValues) {
    try {
      setLoading(true)
      await api.patch(`/users/${user?.id}/`, {
        name: data.name,
        email: data.email,
        phone_number: data.phone,
      })
      await queryClient.refetchQueries(['getUser'])
      toast.success('User edited successfully', {
        position: 'bottom-right',
        theme: 'dark',
        closeOnClick: true,
      })
      setLoading(false)
      setOpen(false)
    } catch (error) {
      setLoading(false)
      console.error('Error updating user:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <FaEdit className="text-default" size={22} />
      </DialogTrigger>

      <DialogContent className="max-w-[95vw] rounded-lg bg-[#272927]">
        <DialogHeader>
          <DialogTitle className="text-default">Update User</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#272927] border border-zinc-600"
                      placeholder="Player"
                      {...field}
                    />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#272927] border border-zinc-600"
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
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#272927] border border-zinc-600"
                      placeholder="+5598989202782"
                      {...field}
                    />
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
                Update
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
