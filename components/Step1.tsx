import { ArrowRight } from 'lucide-react'
import { Input } from './ui/input'
import { useState } from 'react'

interface Props {
  onStepChange: (step: 0 | 1 | 2 | 3) => void
  betAmount: string
  setBetAmount: (amount: string) => void
}

export function Step1({ onStepChange, betAmount, setBetAmount }: Props) {
  const [isHovered, setIsHovered] = useState(false)

  const handleContinue = () => {
    if (betAmount.trim() !== '') {
      onStepChange(1)
    }
  }

  return (
    <div className="flex gap-2">
      <div className="w-1/2 flex flex-col gap-6">
        <div className="flex flex-col">
          <div className="text-6xl font-bai-bold">Average</div>
          <div className="text-6xl font-bai-bold text-[#35D49B]">Bet</div>
          <div className="text-6xl font-bai-bold text-[#35D49B]">Amount</div>
        </div>
        <div className="flex flex-col gap-6 border border-t-4 border-x-zinc-700 rounded-lg border-t-emerald-500 border-b-zinc-700 p-6 ">
          <div>
            <Input
              className="md:text-xl py-5"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              type="number"
              placeholder="Enter bet amount"
            />
          </div>
          <div className="flex flex-col gap-2">
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
              <span className="relative z-10">Continue</span>
              <ArrowRight
                className={`w-5 h-5 relative z-10 transition-all duration-300 ${isHovered ? 'translate-x-1 scale-110' : ''}`}
              />
            </button>
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
      <div className="flex font-mono flex-col gap-3 w-1/2 border border-t-4 text-base border-x-zinc-700 rounded-lg border-t-emerald-500 border-b-zinc-700 px-6 py-6 ">
        <div className="">
          <span className="text-[#727272]">01</span>
          <span className="text-emerald-500 ml-2 opacity-50">
            {`//  Analyzing potential `}
          </span>
          <div>
            <span className="text-[#727272]">02</span>
            <span className="text-emerald-500 ml-2 opacity-50">returns</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-base">
          <div>
            <span className="text-[#727272]">02</span>
            <span className="text-[#F87583] ml-2">const</span>{' '}
            <span className="text-[#79B8FF]">data</span>{' '}
            <span className="text-[#F87583]">=</span>{' '}
            <span className="text-[#DA70D6]">{`{`}</span>
          </div>
          <div>
            <span className="text-[#727272]">02</span>
            <span className="text-[#BBB] ml-7">betAmount:</span>{' '}
            {betAmount || 0},
          </div>
          <div>
            <span className="text-[#727272]">02</span>
            <span className="text-[#BBB] ml-7">successRate:</span> 71.8,
          </div>
          <div>
            <span className="text-[#727272]">02</span>
            <span className="text-[#BBB] ml-7">monthlyGames:</span> 30
          </div>
          <div>
            <span className="text-[#727272]">02</span>
            <span className="text-[#DA70D6] ml-2">{`}`}</span>
          </div>
        </div>
        <div className="">
          <span className="text-[#727272]">02</span>
          <span className="text-emerald-500 opacity-50 ml-2">{`// Average monthly`}</span>
        </div>
        <div>
          <span className="text-[#727272]">02</span>
          <span className="text-emerald-500 opacity-50 ml-2">profit</span>
        </div>
        <div>
          <div>
            <span className="text-[#727272]">02</span>
            <span className="text-[#F87583] ml-2">const</span>{' '}
            <span className="text-[#79B8FF]">profit </span>
            <span className="text-[#F87583]">=</span>
          </div>
          <div>
            <span className="text-[#727272]">02</span>
            <span className="text-[#B392F0] ml-2">calculate</span>
            <span className="text-[#DA70D6]">(</span>
            <span className="text-[#BBB]">data</span>
            <span className="text-[#DA70D6]">)</span>
            <span className="font-bai-bold text-[#BBB]">;</span>
          </div>
        </div>
      </div>
    </div>
  )
}
