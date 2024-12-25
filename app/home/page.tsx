'use client'
import { api } from '@/api/api'
import { Stats } from '@/components/Stats'
import { Skeleton } from '@/components/ui/skeleton'
import { useFilter } from '@/contexts/useFilter'
import { ResultsPage } from '@/types/Bets'
import { teamNameToImageId } from '@/utils/teamNameToImageId'
import Image from 'next/image'
import Link from 'next/link'
import { useInfiniteQuery } from 'react-query'
import noImage from '@/assets/noImage.png'
import { format, isFuture, isToday } from 'date-fns'
import { useState, useEffect, useCallback, useRef } from 'react'
import { LoaderCircle } from 'lucide-react'
import { formatDateToYYYYMMDD } from '@/utils/formatDate'
import { Carrousel } from '@/components/Carrousel'

type ResultType = 'Black' | 'Green' | 'Orange' | 'Red'

export default function Home() {
  const [betText, setBetText] = useState('Bet')
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

  useEffect(() => {
    const interval = setInterval(() => {
      setBetText((prev) => (prev === 'Bet' ? 'Here' : 'Bet'))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getTeamLogoUrl = (teamName: string) => {
    const imageId =
      teamNameToImageId[teamName as keyof typeof teamNameToImageId]
    return imageId ? `https://footi.site/imgs/${imageId}.png` : null
  }

  const formatMatchDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      shortDate: format(date, 'dd/MM'),
      time: format(date, 'HH:mm'),
      period: format(date, 'aa'),
    }
  }

  const resultsByColor = {
    Black: { name: 'In Progress', color: '#FAFAFA' },
    Green: { name: 'Win', color: '#24ff6f' },
    Orange: { name: 'Draw', color: '#F4DD03' },
    Red: { name: 'Loss', color: '#ff4e63' },
  }
  const getDateTextColor = (matchDate: string, result: ResultType) => {
    if (resultsByColor[result].name !== 'Em curso') return 'text-[#777]'

    const date = new Date(matchDate)
    if (isToday(date)) return 'text-[#E3FA9C]'
    if (isFuture(date)) return 'text-white'
    return 'text-[#777]'
  }

  const allGames = data?.pages.flatMap((page) => page.results) ?? []

  return (
    <div className="w-full pb-[70px]">
      <Carrousel />
      <Stats />
      {isLoading ? (
        Array.from({ length: 20 }, (_, index) => (
          <div key={index} className="flex flex-col py-1 px-2 font-bai-light">
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
        ))
      ) : (
        <>
          {allGames?.map((game, index) => {
            const { shortDate, time, period } = formatMatchDate(game.match_date)
            return (
              <div
                key={index}
                className="flex flex-col py-1 px-2 font-bai-light"
              >
                <div className="flex px-3 bg-gradient-to-r from-[#3E3E3E] via-[#646464] to-[#484848] border-t border-x border-[#3F3F3F] items-center justify-center bg-opacity-90 rounded-t-xl text-[9px] py-0.5">
                  <div className="text-[#FFF]">{game.league_name}</div>
                </div>
                <div className="bg-[#1F211F] border-b border-x border-[#464646] gap-1 px-0 py-0 grid grid-cols-11 items-center rounded-b-xl">
                  <div
                    className={`col-span-1 items-center justify-center rounded-bl-xl px-2  flex flex-col text-[8px] py-2 bg-[#2c2e2c] ${getDateTextColor(game.match_date, game.result)}`}
                  >
                    <div>{shortDate}</div>
                    <div>{time}</div>
                    <div>{period}</div>
                  </div>
                  <div className="flex col-span-5 flex-col pl-2 text-[9px]">
                    <div className="flex justify-between items-center">
                      <div className=" mb-1 flex w-[95%] gap-1 items-center">
                        <Image
                          src={getTeamLogoUrl(game.home_name) || noImage}
                          alt={game.home_name}
                          width={14}
                          height={14}
                        />
                        <div className="truncate">{game.home_name}</div>
                      </div>
                      {resultsByColor[game.result].name === 'In Progress' ? (
                        ''
                      ) : (
                        <div className="text-[#FCE500] text-[9px]">
                          {game.stats_home_goals}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1 w-[95%] items-center">
                        <Image
                          src={getTeamLogoUrl(game.away_name) || noImage}
                          alt={game.away_name}
                          width={14}
                          height={14}
                        />
                        <div className="truncate">{game.away_name}</div>
                      </div>
                      {resultsByColor[game.result].name === 'In Progress' ? (
                        ''
                      ) : (
                        <div className="text-[#FCE500] text-[9px]">
                          {game.stats_away_goals}
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`flex col-span-5 pl-0 items-center justify-between gap-0 ${resultsByColor[game.result].name === 'In Progress' ? 'pr-2' : 'pr-1'} text-[8px] pb-0`}
                  >
                    <div className="flex flex-col gap-2 w-full items-center">
                      <div className="bg-[#2E3030] px-2 text-center text-zinc-100 rounded-full bg-opacity-90">
                        Goal Line
                      </div>
                      <div className=" rounded-b-md w-full text-center text-zinc-100">
                        {game.odd_bet} {game.odd_line.toFixed(1)}
                      </div>
                    </div>
                    <div className="flex gap-2 w-full flex-col items-center">
                      <div className="bg-[#2E3030] text-zinc-100 text-center rounded-full bg-opacity-90 px-3">
                        Odd
                      </div>
                      <div className="text-[#FCE500] rounded-b-md w-full text-center ">
                        {game.odd_value.toFixed(1)}
                      </div>
                    </div>
                    {resultsByColor[game.result].name === 'In Progress' ? (
                      <Link
                        target="_blank"
                        href={`${game.bookmaker_link}I3`}
                        className="w-[100px] pr-1 relative overflow-hidden font-bai-bold"
                      >
                        <div className="flex justify-center py-2 rounded-2xl bg-[#3524B0]">
                          <span className="absolute -left-1 inset-0 flex items-center justify-center animate-slide-text text-white text-[9px] font-medium">
                            {betText}
                          </span>
                        </div>
                      </Link>
                    ) : (
                      <div className="flex w-full gap-2 flex-col items-center">
                        <div className="bg-[#2E3030] w-full text-zinc-100 text-center rounded-full bg-opacity-90 px-2">
                          Result
                        </div>

                        <div
                          className={` rounded-b-md w-full text-center ${game.result === 'Black' ? 'text-[#FAFAFA]' : game.result === 'Green' ? 'text-[#24ff6f]' : game.result === 'Orange' ? 'text-[#E3FA9C]' : 'text-[#ff4e63]'}`}
                        >
                          {resultsByColor[game.result].name}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
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
