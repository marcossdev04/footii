'use client'
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
    <div className="fixed bottom-0 left-0 w-full flex justify-center">
      <div
        className={`bg-[#272927] py-0.5 flex rounded-t-3xl justify-around w-full max-w-[450px] ${
          padding ? 'pb-4' : ''
        }`}
      >
        <Link href={'/news'} className="flex flex-col items-center">
          <div
            className={`${pathname === '/news' ? 'bg-default bg-opacity-10 rounded-full' : ''} p-1`}
          >
            <svg
              viewBox="0 0 23 21"
              className={`w-[30px] h-[30px] p-1 group`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.958374 8.625V14.375V17.25C0.958374 18.309 1.81647 19.1667 2.87504 19.1667H21.0834C22.1423 19.1667 23 18.309 23 17.25V14.375V8.625H0.958374Z"
                className={`${
                  pathname === '/news'
                    ? 'fill-[#28D199]'
                    : 'fill-[#95A5A6] group-hover:fill-[#28D199] transition-colors duration-300'
                }`}
              />
              <path
                d="M0 0V8.625V15.3333V18.2083C0 19.2673 0.85812 20.125 1.91667 20.125H20.125C21.184 20.125 22.0417 19.2673 22.0417 18.2083V15.3333V8.625V0H0Z"
                className={`${
                  pathname === '/news'
                    ? 'fill-[#30F0AA]'
                    : 'fill-[#BDC3C7] group-hover:fill-[#30F0AA] transition-colors duration-300'
                }`}
              />
              <path
                d="M1.91663 1.91666V6.70832H2.87496V3.83332L4.79163 6.70832H5.74996V1.91666H4.79163V4.79166L2.87496 1.91666H1.91663ZM6.70829 1.91666V6.70832H10.5416V5.74999H7.66663V4.79166H9.58329V3.83332H7.66663V2.87499H10.5416V1.91666H6.70829ZM11.5 1.91666V6.70832H12.4583L13.4166 4.79166L14.375 6.70832H15.3333V1.91666H14.375V4.79166L13.4166 2.87499L12.4583 4.79166V1.91666H11.5ZM17.7291 1.91666C16.9356 1.91666 16.2916 2.56027 16.2916 3.35416C16.2916 4.14804 16.9356 4.79166 17.7291 4.79166H18.6875C18.952 4.79166 19.1666 5.00623 19.1666 5.27082C19.1666 5.53542 18.952 5.74999 18.6875 5.74999H17.7588H16.2916V6.70832H17.7588H18.6875C19.481 6.70832 20.125 6.06471 20.125 5.27082C20.125 4.47694 19.481 3.83332 18.6875 3.83332H18.2083H17.7291C17.4646 3.83332 17.25 3.61875 17.25 3.35416C17.25 3.08956 17.4646 2.87499 17.7291 2.87499H18.2083H18.6875H20.125V1.91666H18.6875H17.7291Z"
                className={`${
                  pathname === '/news'
                    ? 'fill-[#189377]'
                    : 'fill-[#393F40] group-hover:fill-[#189377] transition-colors duration-300'
                }`}
              />
              <path
                d="M10.5416 8.625H1.91663V15.3333H10.5416V8.625Z"
                className={`${
                  pathname === '/news'
                    ? 'fill-[#20B288]'
                    : 'fill-[#818B8C] group-hover:fill-[#20B288] transition-colors duration-300'
                }`}
              />
              <path
                d="M20.125 12.4583H11.5V13.4167H20.125V12.4583Z"
                fill="#818B8C"
              />
              <path
                d="M10.5416 16.2917H1.91663V17.25H10.5416V16.2917Z"
                fill="#818B8C"
              />
              <path
                d="M20.125 14.375H11.5V15.3333H20.125V14.375Z"
                fill="#818B8C"
              />
              <path
                d="M20.125 10.5417H11.5V11.5H20.125V10.5417Z"
                fill="#818B8C"
              />
              <path
                d="M20.125 8.625H11.5V9.58333H20.125V8.625Z"
                fill="#818B8C"
              />
              <path
                d="M0 17.25V18.2083C0 19.2673 0.85812 20.125 1.91667 20.125H20.125C21.184 20.125 23 19.2673 23 18.2083V17.25C23 18.309 21.184 19.1667 20.125 19.1667H1.91667C0.858092 19.1667 0 18.309 0 17.25Z"
                fill="#818B8C"
              />
              <path
                d="M20.125 16.2917H11.5V17.25H20.125V16.2917Z"
                fill="#818B8C"
              />
            </svg>
          </div>
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
    </div>
  )
}
