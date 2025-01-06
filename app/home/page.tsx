'use client'
import { api } from '@/api/api'
import { Stats } from '@/components/Stats'
import { Skeleton } from '@/components/ui/skeleton'
import { useFilter } from '@/contexts/useFilter'
import { ResultsPage } from '@/types/Bets'
import { useInfiniteQuery } from 'react-query'
import { useEffect, useCallback, useRef } from 'react'
import { LoaderCircle } from 'lucide-react'
import { formatDateToYYYYMMDD } from '@/utils/formatDate'
import { Carrousel } from '@/components/Carrousel'
import { H2h } from '@/components/H2h'

export default function Home() {
  const observerTarget = useRef<HTMLDivElement>(null)
  const { startDate, endDate } = useFilter()

  const fetchGamesPage = async ({ pageParam = 1 }) => {
    const formattedStartDate = formatDateToYYYYMMDD(startDate)
    const formattedEndDate = formatDateToYYYYMMDD(endDate)
    const response = await api.get(
      `/results/?match_date_after=${formattedStartDate}&match_date_before=${formattedEndDate}&page=${pageParam}`,
    )
    return response.data
  }
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<ResultsPage>(
      ['games', startDate, endDate],
      fetchGamesPage,
      {
        getNextPageParam: (lastPage, pages) => {
          if (lastPage.results.length === 0 || lastPage.results.length < 50) {
            return undefined
          }
          return pages.length + 1
        },
        staleTime: 1000 * 60, // 1 minuto
      },
    )

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    })
    const currentElement = observerTarget.current

    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [handleObserver])

  const allGames = data?.pages.flatMap((page) => page.results) ?? []

  return (
    <div className="w-full pb-[70px] relative">
      <div className="fixed top-10 left-0 right-0 rounded-b-lg z-50 bg-[#141414]">
        <Carrousel />
        <Stats />
      </div>
      {isLoading ? (
        <div className="pt-60">
          {Array.from({ length: 20 }, (_, index) => (
            <div
              key={index}
              className="flex flex-col  py-1 px-2 font-bai-light"
            >
              <div className="flex px-3 bg-[#5D5C5C] items-center justify-center bg-opacity-90 rounded-t-xl py-1">
                <Skeleton className="h-4 w-60" />
              </div>

              <div className="bg-[#202120] gap-1 px-1 py-1 grid grid-cols-12 items-center rounded-b-xl">
                {/* Data */}
                <div className="col-span-1 flex flex-col items-center justify-center">
                  <Skeleton className="h-12 w-full rounded-md" />
                </div>

                {/* Times */}
                <div className="flex col-span-4 flex-col pl-2 gap-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                </div>

                {/* Informações do Jogo */}
                <div className="flex col-span-7 pl-2 items-center justify-between gap-1 pb-1">
                  {/* Goal Line */}
                  <div className="flex flex-col w-full items-center gap-2">
                    <Skeleton className="h-4 w-full rounded-full" />
                    <Skeleton className="h-4 w-full rounded-md" />
                  </div>

                  {/* Odd */}
                  <div className="flex w-full flex-col items-center gap-2">
                    <Skeleton className="h-4 w-full rounded-full" />
                    <Skeleton className="h-4 w-full rounded-md" />
                  </div>

                  {/* Result/Bet Button */}
                  <div className="w-full">
                    <Skeleton className="h-8 w-full rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="pt-60">
            {allGames?.map((game, index) => {
              return <H2h key={index} game={game} />
            })}
          </div>
          <div ref={observerTarget} className="py-4">
            {isFetchingNextPage && (
              <div className="flex justify-center">
                <LoaderCircle className="h-8 w-8 animate-spin rounded-full" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
