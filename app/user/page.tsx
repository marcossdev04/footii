'use client'
import { api } from '@/api/api'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { UpdatePassword } from '@/components/UpdatePassword'
import { UpdateUser } from '@/components/UpdateUser'
import { useAuth } from '@/contexts/useAuth'
import { UserInterface } from '@/types/User'
import { BsCurrencyDollar } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'
import { useQuery } from 'react-query'

const getInitials = (name: string | undefined) => {
  if (!name) return ''
  const words = name.split(' ')
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
}

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString)
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000,
    )
    const day = localDate.getDate().toString().padStart(2, '0')
    const month = (localDate.getMonth() + 1).toString().padStart(2, '0')
    const year = localDate.getFullYear()
    return `${day}/${month}/${year}`
  } catch (error) {
    console.error('Error formatting date:', error)
    return dateString
  }
}

export default function User() {
  const { handleSignOut } = useAuth()
  async function fetchUserData() {
    const response = await api.get('/users/me/')
    return response.data
  }

  const { data: user, isLoading } = useQuery<UserInterface>(
    ['getUser'],
    fetchUserData,
  )

  if (isLoading) {
    return (
      <div className="px-3 py-3 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div>
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-4 w-48 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>

        <div className="flex flex-col mt-5">
          <div className="h-[50vh] w-full rounded-xl bg-[#272927] p-3">
            <div className="flex items-center justify-center mb-4">
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
        </div>

        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    )
  }

  return (
    <div className="px-3 py-3 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="text-xl">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-2xl">{user?.name}</div>
            <div className="text-sm text-zinc-400">{user?.email}</div>
            <div className="text-xs text-zinc-400">{user?.phone}</div>
          </div>
        </div>
        <UpdateUser user={user} />
      </div>
      <div className="flex flex-col mt-5">
        <div className="h-[50vh] w-full rounded-xl bg-[#272927] p-3">
          <div className="flex items-center justify-center gap-2">
            <div className="text-xl uppercase">Payments</div>
            <div>
              <BsCurrencyDollar className="text-default" size={24} />
            </div>
          </div>
          <div className="flex flex-col h-[90%] overflow-auto">
            {user?.contracts.map((contract, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center py-2 border-b border-zinc-500 gap-2 justify-between px-2"
                >
                  <div className="flex gap-2">
                    <div>{formatDate(contract.contract_period_start_date)}</div>
                    <div>-</div>
                    <div>{formatDate(contract.contract_period_end_date)}</div>
                  </div>
                  <div className="text-default">${contract.price}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <UpdatePassword user={user} />
      <button
        onClick={handleSignOut}
        className="bg-[#272927] items-center gap-2 rounded-xl py-3 uppercase flex justify-center cursor-pointer hover:bg-opacity-80"
      >
        <div>Log out</div>
        <div>
          <FiLogOut className="text-default" size={22} />
        </div>
      </button>
    </div>
  )
}
