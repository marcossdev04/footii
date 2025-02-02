import Link from 'next/link'
import { SignIn } from './SignIn'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import logo from '@/assets/footilogo.svg'

export function HeaderLanding() {
  const pathname = usePathname()
  return (
    <nav className="fixed w-full z-50 bg-[#1F211F]/50 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        <Link
          href={'/'}
          className="text-xl font-light tracking-wider text-[#FF6B00]"
        >
          <Image src={logo} alt="logo" width={30} />
        </Link>
        <div className="flex gap-2 md:gap-4 items-center">
          <Link
            href={'/prices'}
            className={`${pathname === '/prices' ? 'text-[#FF6B00] ' : 'text-gray-300'} hover:bg-white/10 py-2 px-3 rounded-full text-sm  transition-all duration-300`}
          >
            Pricing
          </Link>
          <Link
            href={'/faq'}
            className={`${pathname === '/faq' ? 'text-[#FF6B00]  ' : 'text-gray-300'} hover:bg-white/10  py-2 px-4 rounded-full text-sm  transition-all duration-300`}
          >
            Faq
          </Link>
          <SignIn />
        </div>
      </div>
    </nav>
  )
}
