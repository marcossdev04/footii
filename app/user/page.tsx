import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UpdatePassword } from '@/components/UpdatePassword'
import { UpdateUser } from '@/components/UpdateUser'
import { BsCurrencyDollar } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'

export default function User() {
  return (
    <div className="px-3 py-3 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="text-xl">MV</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-2xl">Marcos Vinícius</div>
            <div className="text-sm text-zinc-400">marcosdev04@gmail.com</div>
            <div className="text-xs text-zinc-400">+55 (98) 98920-2782</div>
          </div>
        </div>
        <UpdateUser />
      </div>
      <div className="flex flex-col mt-5">
        <div className="h-[50vh] w-full rounded-xl bg-[#272927] p-3">
          <div className="flex items-center  justify-center">
            <div className="text-xl uppercase">Payments</div>
            <div>
              <BsCurrencyDollar className="text-default" size={24} />
            </div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <div className="flex items-center py-2 border-b border-zinc-500 gap-2 justify-between px-2">
              <div>02/10/2024</div>
              <div className="text-default">$19,90</div>
            </div>
          </div>
        </div>
      </div>
      <UpdatePassword />
      <div className="bg-[#272927] items-center gap-2 rounded-xl py-3 uppercase flex justify-center">
        <div>Log out</div>
        <div>
          <FiLogOut className="text-default" size={22} />
        </div>
      </div>
    </div>
  )
}
