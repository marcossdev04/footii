import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { data } from '@/utils/LeaguesData'

interface Props {
  onStepChange: (step: 0 | 1 | 2 | 3) => void
  betAmount: string
  selectedCountry: string
}

export function Step3({ onStepChange, betAmount, selectedCountry }: Props) {
  const [isHovered, setIsHovered] = useState(false)
  const [profit, setProfit] = useState(0)

  const handleContinue = () => {
    onStepChange(3)
  }
  useEffect(() => {
    const countryData = data.result.countries.find(
      (country) => country.country === selectedCountry,
    )

    if (countryData) {
      const calculatedProfit = countryData.total_profit * parseFloat(betAmount)
      setProfit(calculatedProfit)
    }
  }, [betAmount, selectedCountry])
  return (
    <div className="flex gap-2">
      <div className="w-1/2 flex flex-col gap-6">
        <div className="flex flex-col">
          <div className="text-6xl font-bai-bold">Your</div>
          <div className="text-6xl font-bai-bold text-[#35D49B]">Results</div>
        </div>
        <div className="flex flex-col gap-5 border border-t-4 border-x-zinc-700 rounded-lg border-t-emerald-500 border-b-zinc-700 p-6 ">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col text-base bg-[#253831] rounded-lg p-1 items-center">
              <div className="text-[#e3e3e3]">Monthly Profit</div>
              <div className="text-emerald-500 text-2xl font-bai-bold">
                ${profit.toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col text-base bg-[#253831] rounded-lg p-1 items-center">
              <div className="text-[#e3e3e3]">Succes Rate</div>
              <div className="text-emerald-500 text-2xl font-bai-bold">
                +60.0%
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {profit / parseFloat(betAmount) < 1 ? (
              <Link
                href="/register"
                className="w-full group relative px-8 py-4 rounded-full font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden hover:-translate-y-0.5"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 bg-[length:200%_100%] animate-gradient"></div>
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <div className="absolute inset-[-2px] bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-lg"></div>
                </div>
                <span className="relative z-10">See Top Leagues</span>
                <ArrowRight
                  className={`w-5 h-5 relative z-10 transition-all duration-300 ${isHovered ? 'translate-x-1 scale-110' : ''}`}
                />
              </Link>
            ) : (
              <button
                onClick={handleContinue}
                className="w-full group relative px-8 py-4 rounded-full font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden hover:-translate-y-0.5"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 bg-[length:200%_100%] animate-gradient"></div>
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <div className="absolute inset-[-2px] bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-lg"></div>
                </div>
                <span className="relative z-10">See Top Leagues</span>
                <ArrowRight
                  className={`w-5 h-5 relative z-10 transition-all duration-300 ${isHovered ? 'translate-x-1 scale-110' : ''}`}
                />
              </button>
            )}
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
      <div className="flex text-base font-mono flex-col gap-5 w-1/2 border border-t-4  border-x-zinc-700 rounded-lg border-t-emerald-500 border-b-zinc-700 px-6 py-6 ">
        <div className="">
          <span className="text-[#727272] text-base">01</span>
          <span className="ml-2 text-emerald-500 opacity-50 text-base">{`// Your current metrics`}</span>
        </div>
        <div className="flex flex-col gap-5 text-lg">
          <div className="flex items-center">
            <span className="text-[#727272] text-base">02</span>
            <span className="text-[#F87583] text-base ml-2">const</span>
            <span className="text-[#79B8FF] text-base ml-1">
              individualResult
            </span>
            <span className="text-[#F87583] text-base ml-1">=</span>
          </div>
          <div className="flex items-center text-base">
            <span className="text-base text-[#727272]">03</span>
            <span className="text-[#B392F0] text-base ml-1">getResult</span>
            <span className="text-[#DA70D6]">(</span>
            <span className="text-[#BBB]">
              {selectedCountry}, {betAmount}
            </span>
            <span className="text-[#DA70D6]">)</span>
          </div>
        </div>
        <div className="flex flex-col gap-5 text-base">
          <div className="flex items-center">
            <span className="text-[#727272] text-base">05</span>
            <span className="text-[#79B8FF] text-base ml-1">results</span>
            <span className="text-[#F87583] text-base ml-1">===</span>
            <span className="text-base ml-1 text-[#DA70D6]">{`{`}</span>
          </div>
          <div className="flex items-center text-base">
            <span className="text-base text-[#727272]">06</span>
            <span className="text-[#BBB] text-base ml-7">profit:</span>
            <span className=" ml-1">{profit.toFixed(2)}</span>
          </div>
          <div className="flex items-center text-base">
            <span className="text-base text-[#727272]">07</span>
            <span className="text-[#BBB] text-base ml-7">successRate:</span>
            <span className=" ml-1">{`> 60.0%`}</span>
          </div>
          <div className="flex items-center text-base">
            <span className="text-base text-[#727272]">08</span>
            <span className="text-[#BBB] text-base ml-7">confidence:</span>
            <span className=" ml-1">{`>`} 60K Games</span>
          </div>
          <div>
            <span className="text-base text-[#727272]">09</span>
            <span className="text-base ml-1 text-[#DA70D6]">{`}`}</span>
          </div>
        </div>
        <div>
          <span className="text-base text-[#727272]">10</span>
          <span className="text-emerald-500 ml-2 text-base opacity-50">{`// Average monthly profit`}</span>
        </div>
      </div>
    </div>
  )
}
