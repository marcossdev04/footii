import Image from 'next/image'
import logo from '@/assets/footilogo.svg'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { format } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { FaRegCalendarAlt } from 'react-icons/fa'

interface HeaderTopProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function HeaderTop({ activeTab, onTabChange }: HeaderTopProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })

  return (
    <div className="flex py-1 items-center bg-[#272927] text-white justify-between px-5">
      <div>
        <Image src={logo} width={30} alt="logo" />
      </div>

      <Tabs value={activeTab} onValueChange={onTabChange} className="w-[120px]">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
          <TabsTrigger
            value="today"
            className="data-[state=active]:bg-default rounded-l-lg text-sm data-[state=active]:bg-opacity-40 data-[state=active]:text-default"
          >
            Today
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-default rounded-r-lg text-sm data-[state=active]:bg-opacity-40 data-[state=active]:text-default"
          >
            All
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Popover>
        <PopoverTrigger asChild>
          <div className="justify-start hover:bg-default hover:bg-opacity-40 cursor-pointer transition-colors duration-300 p-1.5 rounded-full text-left font-normal">
            <FaRegCalendarAlt className="text-default w-5 h-5" />
            {date?.from && (
              <span className="hidden lg:inline-block ml-2">
                {format(date.from, 'LLL dd, y')}
              </span>
            )}
            {date?.to && (
              <span className="hidden lg:inline-block">
                {' '}
                - {format(date.to, 'LLL dd, y')}
              </span>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
