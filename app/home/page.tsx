'use client'
import { api } from '@/api/api'
import { Stats } from '@/components/Stats'
import { Skeleton } from '@/components/ui/skeleton'
import { Bets } from '@/types/Bets'
import Link from 'next/link'
import { useQuery } from 'react-query'

export default function Home() {
  async function fetchGames() {
    const response = await api.get('/results/')
    return response.data.results
  }
  const { data: games, isLoading } = useQuery<Bets[]>(['getGames'], fetchGames)

  const resultsByColor = {
    Black: {
      name: 'Em curso',
      color: '#FAFAFA',
    },
    Green: {
      name: 'Ganho',
      color: '#24ff6f',
    },
    Orange: {
      name: 'Devolvido',
      color: '#91cdf8',
    },
    Red: { name: 'Perdido', color: '#ff4e63' },
  }
  return (
    <div className="w-full">
      <Stats />
      {isLoading
        ? Array.from({ length: 20 }, (_, index) => (
            <div key={index} className="flex flex-col py-1 px-2 font-bai-light">
              <div className="flex px-3 bg-[#5D5C5C] items-center justify-center bg-opacity-90 rounded-t-lg py-1">
                <Skeleton className="h-4 w-60" />
              </div>

              <div className="bg-[#202120] gap-1 px-1 py-1 grid grid-cols-12 items-center rounded-b-lg">
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
        : games?.map((game, index) => {
            return (
              <div
                key={index}
                className="flex flex-col py-1 px-2 font-bai-light"
              >
                <div className="flex px-3 bg-[#5D5C5C] items-center justify-center bg-opacity-90 rounded-t-lg text-xs py-1">
                  <div className="text-[#FFF]">{game.league_name}</div>
                </div>
                <div className="bg-[#202120] gap-1 px-1 py-1 grid grid-cols-12 items-center rounded-b-lg">
                  <div
                    className={`col-span-1 items-center justify-center ${resultsByColor[game.result].name === 'Em curso' ? 'text-zinc-200' : 'text-[#777]'} flex flex-col text-[8px] py-1 bg-[#232523] `}
                  >
                    <div>20/12</div>
                    <div>23:00</div>
                    <div>PM</div>
                  </div>
                  <div className="flex col-span-4 flex-col pl-2 text-[10px]">
                    <div className="flex justify-between items-center">
                      <div className="truncate">{game.home_name}</div>
                      {resultsByColor[game.result].name === 'Em curso' ? (
                        ''
                      ) : (
                        <div className="text-[#FCE500] text-[10px]">
                          {game.stats_home_goals}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="truncate">{game.away_name}</div>
                      {resultsByColor[game.result].name === 'Em curso' ? (
                        ''
                      ) : (
                        <div className="text-[#FCE500] text-[10px]">
                          {game.stats_away_goals}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex col-span-7 pl-2 items-center justify-between gap-1 text-[10px] pb-1">
                    <div className="flex flex-col w-full items-center">
                      <div className="bg-[#2E3030] w-full text-center text-zinc-100 rounded-full bg-opacity-90 px-0.5">
                        Goal Line
                      </div>
                      <div className=" rounded-b-md w-full text-center text-zinc-100">
                        {game.odd_bet} {parseFloat(game.odd_line).toFixed(1)}
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center">
                      <div className="bg-[#2E3030] w-full text-zinc-100 text-center rounded-full bg-opacity-90 px-3">
                        Odd
                      </div>
                      <div className="text-[#FCE500] rounded-b-md w-full text-center ">
                        {parseFloat(game.odd_value).toFixed(1)}
                      </div>
                    </div>
                    {resultsByColor[game.result].name === 'Em curso' ? (
                      <Link
                        target="_blank"
                        className="w-full flex justify-center py-1.5 rounded-lg bg-[#3524B0]"
                        href={`${game.bookmaker_link}I3`}
                      >
                        Bet Here
                      </Link>
                    ) : (
                      <div className="flex w-full flex-col items-center">
                        <div className="bg-[#2E3030] w-full text-zinc-100 text-center rounded-full bg-opacity-90 px-3">
                          Result
                        </div>

                        <div
                          className={` rounded-b-md w-full text-center ${game.result === 'Black' ? 'text-[#FAFAFA]' : game.result === 'Green' ? 'text-[#24ff6f]' : game.result === 'Orange' ? 'text-[#91cdf8]' : 'text-[#ff4e63]'}`}
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
    </div>
  )
}
