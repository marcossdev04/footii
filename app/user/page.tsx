/* eslint-disable react/no-unescaped-entities */
'use client'
import { api } from '@/api/api'
import { UpdatePassword } from '@/components/UpdatePassword'
import { UpdateUser } from '@/components/UpdateUser'
import { useAuth } from '@/contexts/useAuth'
import { UserInterface } from '@/types/User'
import { useQuery } from 'react-query'
import logo from '@/assets/footilogo.svg'
import Image from 'next/image'
import {
  AlertCircle,
  CircleDollarSign,
  LockKeyhole,
  LogOut,
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

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
      <div className="px-3 py-3 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center pb-2 rounded-3xl bg-[#1D1E1D] flex-col">
          <div className="bg-[#272927] w-full rounded-3xl py-2 font-bai-bold px-4">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <Image src={logo} alt="logo" width={20} />
              </div>
              <div>FOOTI USER DASHBOARD</div>
              <div className="text-[#272927]">oi</div>
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="flex items-center pb-2 rounded-3xl bg-[#1D1E1D] flex-col">
          <div className="w-full bg-[#272927] rounded-3xl">
            <div className="bg-[#343934] w-full rounded-3xl py-2 font-bai-bold px-3">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <AlertCircle size={20} />
                </div>
                <div>USER INFO</div>
                <div className="text-[#343934]">oi</div>
              </div>
            </div>
            <div className="flex p-2 flex-col gap-4 uppercase font-bai-bold">
              <div className="flex w-full justify-center px-3 items-center">
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="flex w-full justify-center items-center">
                <Skeleton className="h-4 w-52" />
              </div>
              <div className="flex w-full justify-center items-center">
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>

        {/* Payments Section */}
        <div className="flex items-center pb-2 rounded-3xl bg-[#1D1E1D] flex-col">
          <div className="w-full bg-[#272927] rounded-3xl">
            <div className="bg-[#343934] w-full rounded-3xl py-2 font-bai-bold px-3">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <CircleDollarSign size={20} />
                </div>
                <div>PAYMENTS</div>
                <div className="text-[#343934]">oi</div>
              </div>
            </div>
            <div className="flex p-2 h-[150px] flex-col gap-4 font-bai-bold">
              <div className="flex items-center py-2 border-b border-zinc-600 gap-2 justify-between px-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex items-center py-2 border-b border-zinc-600 gap-2 justify-between px-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex items-center py-2 border-b border-zinc-600 gap-2 justify-between px-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        </div>

        {/* Password Update Section */}
        <div className="flex items-center pb-2 rounded-2xl bg-[#1D1E1D] flex-col">
          <div className="bg-[#272927] w-full rounded-2xl py-3.5 font-bai-bold px-4">
            <div className="flex justify-between items-center w-full">
              <div className="text-[#272927]">oi</div>
              <div className="flex items-center gap-2">
                SECURITY
                <LockKeyhole size={20} />
              </div>
              <div className="text-[#272927]">oi</div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button className="flex items-center pb-2 rounded-2xl bg-[#1D1E1D] flex-col">
          <div className="bg-[#272927] w-full rounded-2xl py-3.5 font-bai-bold px-4">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center text-[#272927]">oi</div>
              <div className="flex justify-center items-center gap-2">
                LOG OUT
                <LogOut
                  className="text-[#FC4343]"
                  strokeWidth={2.5}
                  size={20}
                />
              </div>
              <div className="text-[#272927]" />
            </div>
          </div>
        </button>
      </div>
    )
  }
  return (
    <div className="px-3 py-3 flex flex-col gap-6">
      <div className="flex items-center pb-2 rounded-3xl   bg-[#1D1E1D] flex-col">
        <div className="bg-[#272927] w-full rounded-3xl py-2 font-bai-bold px-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 ">
              <Image src={logo} alt="logo " width={20} />
            </div>
            <div>FOOTI USER DASHBOARD</div>
            <div className="text-[#272927]">oi</div>
          </div>
        </div>
      </div>
      <div className="flex items-center pb-2 rounded-3xl   bg-[#1D1E1D] flex-col">
        <div className="w-full bg-[#272927] rounded-3xl">
          <div className="bg-[#343934] w-full rounded-3xl py-2 font-bai-bold px-3">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2 ">
                <AlertCircle size={20} />
              </div>
              <div>USER INFO</div>
              <div className="text-[#343934] flex">
                <UpdateUser user={user} />
              </div>
            </div>
          </div>
          <div className="flex p-2 flex-col gap-2 uppercase font-bai-bold">
            <div className="flex w-full justify-center px-3 items-center">
              <div>{user?.name}</div>
            </div>
            <div className="flex w-full justify-center items-center">
              {user?.email}
            </div>
            <div className="flex w-full justify-center items-center">
              {user?.phone}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center pb-2 rounded-3xl   bg-[#1D1E1D] flex-col">
        <div className="w-full bg-[#272927] rounded-3xl">
          <div className="bg-[#343934] w-full rounded-3xl py-2 font-bai-bold px-3">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2 ">
                <CircleDollarSign size={20} />
              </div>
              <div>PAYMENTS</div>
              <div className="text-[#343934] flex">oi</div>
            </div>
          </div>
          <div className="flex p-2 h-[150px] overflow-auto flex-col gap-2  font-bai-bold">
            {(user?.contracts?.length ?? 0) === 0 ? (
              <div className="flex items-center h-full justify-center py-4 text-zinc-300">
                You haven't subscribed to any plans yet
              </div>
            ) : (
              user?.contracts.map((contract, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center py-2 border-b border-zinc-600 gap-2 justify-between px-2"
                  >
                    <div className="flex gap-2">
                      <div>
                        {formatDate(contract.contract_period_start_date)}
                      </div>
                      <div>-</div>
                      <div>{formatDate(contract.contract_period_end_date)}</div>
                    </div>
                    <div className="text-default">${contract.price}</div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      <UpdatePassword user={user} />
      <button
        onClick={handleSignOut}
        className="flex items-center pb-2 rounded-2xl   bg-[#1D1E1D] flex-col"
      >
        <div className="bg-[#272927] w-full rounded-2xl py-3.5 font-bai-bold px-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center text-[#272927]">oi</div>
            <div className="flex justify-center items-center gap-2">
              LOG OUT
              <LogOut className="text-[#FC4343]" strokeWidth={2.5} size={20} />
            </div>
            <div className="text-[#272927]"></div>
          </div>
        </div>
      </button>
    </div>
  )
}
