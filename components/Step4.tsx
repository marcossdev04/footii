/* eslint-disable @typescript-eslint/no-explicit-any */
import { data } from '@/utils/LeaguesData'
import { Trophy, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Register } from './Register'
import { DialogClose } from './ui/dialog'

interface Props {
  onStepChange: (step: 0 | 1 | 2 | 3) => void
  betAmount: string
  selectedCountry: string
}
/* eslint-disable react/no-unescaped-entities */
export function Step4({ betAmount, selectedCountry }: Props) {
  const [lastBets, setLastBets] = useState<any[]>([])

  useEffect(() => {
    const countryData = data.result.countries.find(
      (country) => country.country === selectedCountry,
    )

    if (countryData && countryData.leagues) {
      // Get all green bets from leagues
      const allGreenBets = countryData.leagues
        .map((league) => ({
          ...league.last_green_bet,
          league_name: league.league_name,
        }))
        .filter((bet) => bet.match_date)
        .sort(
          (a, b) =>
            new Date(b.match_date).getTime() - new Date(a.match_date).getTime(),
        )
        .slice(0, 3)

      setLastBets(allGreenBets)
    }
  }, [betAmount, selectedCountry])
  return (
    <div className="md:px-5 py-2 flex flex-col gap-5">
      <DialogClose className="absolute top-5 right-5 ">
        <X size={30} />
      </DialogClose>
      <div className="flex flex-col gap-3 items-center mt-5 px-2">
        <div className="md:text-4xl text-xl text-center font-bai-bold">
          They say past performance{' '}
          <span className="text-emerald-500">
            doesen't guarantee future results
          </span>
        </div>
        <div className="md:text-lg text-sm text-center text-zinc-300">
          (but 3 years of consistent profits might suggest otherwise...)
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {lastBets.map((bet, index) => (
          <div
            key={index}
            className="bg-[#253831] flex flex-col gap-4 justify-between bg-opacity-80 p-3 rounded-lg border-t-2 border-emerald-500"
          >
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="text-base text-emerald-500 font-bai-bold">
                  {bet.league_name}
                </div>
                <div>
                  <Trophy
                    size={20}
                    strokeWidth={1.25}
                    className="text-emerald-500"
                  />
                </div>
              </div>
              <div className="text-xs text-zinc-500">
                {new Date(bet.match_date)
                  .toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                  .replace(',', '')}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-zinc-300 text-sm flex justify-center">
                Match
              </div>
              <div className="text-lg flex-col items-center justify-center grid grid-cols-7">
                <div className="col-span-3 text-sm truncate text-center">
                  {bet.home_team}
                </div>
                <div className="text-xs justify-center text-zinc-300 flex">
                  vs
                </div>
                <div className="col-span-3 text-sm truncate text-center">
                  {bet.away_team}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col items-center">
                <div className="text-zinc-300 text-sm">Prediction</div>
                <div className="text-base">
                  {bet.odd_bet} {bet.odd_line}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-zinc-300 text-sm">Profit</div>
                <div className="text-xl font-bai-bold text-emerald-500">
                  +$
                  {bet.profit.toFixed(3) * parseFloat(betAmount) +
                    parseFloat(betAmount)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-2xl text-emerald-500 text-center">
            Past performance doesn't guarantee future results...
          </div>
          <div className="text-zinc-300 text-xl text-center">
            But why not find out for yourself?
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <Register text={'Start Winning Now'} />
          </div>
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="text-xs font-medium text-gray-400 flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <div>Secure</div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <div>Encrypted</div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <div>No payment required</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
