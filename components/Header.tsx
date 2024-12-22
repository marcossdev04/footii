'use client'
import { ScrollText } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaUser } from 'react-icons/fa6'
import { GiSoccerBall } from 'react-icons/gi'

interface Props {
  padding: boolean
}
export function Header({ padding }: Props) {
  const pathname = usePathname()
  return (
    <div
      className={`fixed bg-[#272927] py-0.5 flex rounded-t-3xl justify-around w-full left-0 bottom-0 ${padding ? 'pb-4' : ''}`}
    >
      <Link href={'/news'} className="flex flex-col items-center">
        <ScrollText
          className={`${pathname === '/news' ? 'bg-default bg-opacity-10  rounded-full text-default' : ''} p-1.5`}
          size={37}
        />
        <div
          className={`text-xs ${pathname === '/news' ? 'text-default' : ''}`}
        >
          News
        </div>
      </Link>
      <Link href={'/home'} className="flex flex-col items-center">
        <GiSoccerBall
          className={`${pathname === '/home' ? 'bg-default bg-opacity-10  rounded-full text-default' : ''} p-1.5`}
          size={37}
        />
        <div
          className={`text-xs ${pathname === '/home' ? 'text-default' : ''}`}
        >
          Games
        </div>
      </Link>

      <Link href={'/user'} className="flex flex-col items-center">
        <FaUser
          className={`${pathname === '/user' ? 'bg-default bg-opacity-10 rounded-full text-default' : ''} p-1.5`}
          size={37}
        />
        <div
          className={`text-xs ${pathname === '/user' ? 'text-default' : ''}`}
        >
          User
        </div>
      </Link>
    </div>
  )
}
