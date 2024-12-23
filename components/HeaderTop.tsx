'use client'
import Image from 'next/image'
import logo from '@/assets/footilogo.svg'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { startOfDay, addDays } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { useFilter } from '@/contexts/useFilter'

interface HeaderTopProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function HeaderTop({ onTabChange }: HeaderTopProps) {
  const { setDateRange, startDate, endDate } = useFilter()
  const [date, setDate] = useState<DateRange | undefined>({
    from: startDate ? new Date(startDate) : new Date(),
    to: endDate ? new Date(endDate) : addDays(new Date(), 3),
  })
  const [activeTab, setActiveTab] = useState<string>('today')

  // Função para verificar se as datas correspondem ao padrão "hoje até hoje + 3 dias"
  const isDefaultDateRange = useCallback(() => {
    const today = startOfDay(new Date())
    const startDateObj = startOfDay(new Date(startDate))
    const endDateObj = startOfDay(new Date(endDate))
    const threeDaysFromToday = startOfDay(addDays(today, 3))

    return (
      startDateObj.getTime() === today.getTime() &&
      endDateObj.getTime() === threeDaysFromToday.getTime()
    )
  }, [startDate, endDate])

  // Atualiza a tab ativa baseada nas datas
  useEffect(() => {
    const newActiveTab = isDefaultDateRange() ? 'today' : 'all'
    setActiveTab(newActiveTab)
    if (onTabChange) {
      onTabChange(newActiveTab)
    }
  }, [isDefaultDateRange, onTabChange])

  // Handler para mudança de tab
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    onTabChange?.(value)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const threeDaysFromNow = addDays(today, 3)
    threeDaysFromNow.setHours(23, 59, 59, 999)

    if (value === 'today') {
      setDate({
        from: today,
        to: threeDaysFromNow,
      })
      setDateRange(today, threeDaysFromNow)
    } else {
      // Para "all", define a data inicial como 01/01/2021
      const initialDate = new Date(2021, 0, 1) // 01/01/2021
      initialDate.setHours(0, 0, 0, 0)

      setDate({
        from: initialDate,
        to: threeDaysFromNow,
      })
      setDateRange(initialDate, threeDaysFromNow)
    }
  }

  // Handler para seleção de data no calendário
  const handleDateSelect = (newDate: DateRange | undefined) => {
    if (newDate?.from && newDate?.to) {
      setDate(newDate)
      const from = new Date(newDate.from)
      from.setHours(0, 0, 0, 0)

      const to = new Date(newDate.to)
      to.setHours(23, 59, 59, 999)

      setDateRange(from, to)
    }
  }

  return (
    <div className="flex py-1 items-center bg-[#272927] text-white justify-between px-5">
      <div>
        <Image src={logo} width={30} alt="logo" />
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-[100px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="today"
            className="data-[state=active]:bg-default bg-[#333] rounded-l-lg text-xs data-[state=active]:bg-opacity-10 data-[state=active]:text-default"
          >
            Today
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-default bg-[#333] rounded-r-lg text-xs data-[state=active]:bg-opacity-10 data-[state=active]:text-default"
          >
            All
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Popover>
        <PopoverTrigger asChild>
          <div className="justify-start hover:bg-default hover:bg-opacity-10 cursor-pointer transition-colors duration-300 p-1.5 rounded-full text-left font-normal">
            <FaRegCalendarAlt className="text-default w-5 h-5" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
