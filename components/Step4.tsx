/* eslint-disable @typescript-eslint/no-explicit-any */
import { data } from '@/utils/LeaguesData'
import { Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Register } from './Register'

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
      <div className="flex flex-col gap-3 items-center">
        <div className="md:text-5xl text-2xl text-center font-bai-bold">
          They say past performance{' '}
          <span className="text-emerald-500">
            doesen't guarantee future results
          </span>
        </div>
        <div className="md:text-xl text-base text-center text-zinc-300">
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
                <div className="text-lg text-emerald-500 font-bai-bold">
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
              <div className="text-sm text-zinc-500">
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
              <div className="text-zinc-300 flex justify-center">Match</div>
              <div className="text-xl flex-col items-center justify-center grid grid-cols-7">
                <div className="col-span-3 truncate text-center">
                  {bet.home_team}
                </div>
                <div className="text-sm justify-center text-zinc-300 flex">
                  vs
                </div>
                <div className="col-span-3 truncate text-center">
                  {bet.away_team}
                </div>
              </div>
            </div>
            <div className="flex md:flex-col justify-between">
              <div className="flex flex-col items-center">
                <div className="text-zinc-300">Prediction</div>
                <div className="text-xl">
                  {bet.odd_bet} {bet.odd_line}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-zinc-300">Profit</div>
                <div className="text-2xl font-bai-bold text-emerald-500">
                  +$
                  {bet.profit.toFixed(3) * parseFloat(betAmount) +
                    parseFloat(betAmount)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1 md:gap-5 p-5 bg-[#253831] bg-opacity-80 border-t-2 border-emerald-500 rounded-lg">
        <div className="flex flex-col gap-2 items-center">
          <div className="text-zinc-200 md:text-base text-xs">Success Rate</div>
          <div>
            <div className="md:text-4xl text-xl text-emerald-500 md:text-start text-center">
              62.5%
            </div>
            <div className="text-zinc-200 md:text-base text-xs">
              Last 3 years
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="text-zinc-200 md:text-base text-xs">Average ODDS</div>
          <div>
            <div className="md:text-4xl text-xl text-center md:text-start text-emerald-500">
              1.92
            </div>
            <div className="text-zinc-200 md:text-base text-xs">
              All Markets
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="text-zinc-200 md:text-base text-xs">ROI</div>
          <div>
            <div className="md:text-4xl text-xl text-emerald-500 text-center md:text-start">
              +15.2%
            </div>
            <div className="text-zinc-200 md:text-base text-xs">
              Monthly Average
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-3xl text-emerald-500 text-center">
            Past performance doesn't guarantee future results...
          </div>
          <div className="text-zinc-300 text-2xl text-center">
            But why not find out for yourself?
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <Register />
          </div>
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="text-xs font-medium text-gray-400 flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <div>Secure</div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <div>Encrypted</div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <div>No credit card required</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
