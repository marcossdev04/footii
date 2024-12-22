import { createContext, ReactNode, useContext, useState } from 'react'

export interface FilterContextData {
  startDate: string
  endDate: string
  setDateRange: (start: Date | undefined, end: Date | undefined) => void
  clearDateRange: () => void
}

function getDefaultDates() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const threeDaysFromNow = new Date(today)
  threeDaysFromNow.setDate(today.getDate() + 3)
  threeDaysFromNow.setHours(23, 59, 59, 999)

  return {
    startDate: today.toISOString(),
    endDate: threeDaysFromNow.toISOString(),
  }
}

export function FilterProvider({ children }: { children: ReactNode }) {
  const defaultDates = getDefaultDates()

  const [startDate, setStartDate] = useState<string>(defaultDates.startDate)
  const [endDate, setEndDate] = useState<string>(defaultDates.endDate)

  const setDateRange = (start: Date | undefined, end: Date | undefined) => {
    if (start) {
      const startWithTime = new Date(start)
      startWithTime.setHours(0, 0, 0, 0)
      setStartDate(startWithTime.toISOString())
    } else {
      // Se não houver data fornecida, volta para a data inicial padrão
      setStartDate(defaultDates.startDate)
    }

    if (end) {
      const endWithTime = new Date(end)
      endWithTime.setHours(23, 59, 59, 999)
      setEndDate(endWithTime.toISOString())
    } else {
      // Se não houver data fornecida, volta para a data final padrão
      setEndDate(defaultDates.endDate)
    }
  }

  const clearDateRange = () => {
    // Ao invés de definir como undefined, volta para as datas padrão
    setStartDate(defaultDates.startDate)
    setEndDate(defaultDates.endDate)
  }

  return (
    <FilterContext.Provider
      value={{
        startDate,
        endDate,
        setDateRange,
        clearDateRange,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

const FilterContext = createContext<FilterContextData>({} as FilterContextData)

export function useFilter(): FilterContextData {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider')
  }

  return context
}
