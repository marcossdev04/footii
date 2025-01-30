import { ArrowRight, X } from 'lucide-react'
import { Input } from './ui/input'
import { useState } from 'react'
import { DialogClose } from './ui/dialog'
import { NumericFormat } from 'react-number-format'

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
    <div className="flex md:flex-row flex-col gap-2">
      <DialogClose className="absolute top-4 right-5 font-bold">
        <X size={30} />
      </DialogClose>
      <div className="md:w-1/2 w-full flex flex-col gap-6 mt-8">
        <div className="flex flex-col">
          <div className="md:text-6xl text-5xl font-bai-bold">Average</div>
          <div className="md:text-6xl text-5xl font-bai-bold text-[#35D49B]">
            Bet
          </div>
          <div className="md:text-6xl text-5xl font-bai-bold text-[#35D49B]">
            Amount
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-6 border border-t-4 border-x-zinc-700 rounded-lg border-t-emerald-500 border-b-zinc-700 p-6 ">
          <div>
            <NumericFormat
              customInput={Input}
              className="md:text-xl py-5"
              value={betAmount}
              onValueChange={(values) => {
                const { value } = values
                setBetAmount(value)
              }}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              prefix=""
              placeholder="Enter bet amount"
              allowNegative={false}
              valueIsNumericString
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleContinue}
              className="w-full group relative px-8 md:py-4 py-2 rounded-full font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden hover:-translate-y-0.5"
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
      <div className="flex mt-8 font-mono flex-col gap-3 w-full md:w-1/2 border border-t-4 text-sm md:text-base border-x-zinc-700 rounded-lg border-t-emerald-500 border-b-zinc-700 px-6 py-6 ">
        <div className="">
          <span className="text-[#727272]">01</span>
          <span className="text-emerald-500 ml-2 opacity-50">
            {`//  Analyzing potential `}
          </span>
          <div className="mt-2 -mb-1">
            <span className="text-[#727272]">02</span>
            <span className="text-emerald-500 ml-2 opacity-50">returns</span>
          </div>
        </div>
        <div className="flex flex-col md:gap-3 gap-2 md:text-base text-sm">
          <div>
            <span className="text-[#727272]">03</span>
            <span className="text-[#F87583] ml-2">const</span>{' '}
            <span className="text-[#79B8FF]">data</span>{' '}
            <span className="text-[#F87583]">=</span>{' '}
            <span className="text-[#DA70D6]">{`{`}</span>
          </div>
          <div>
            <span className="text-[#727272]">04</span>
            <span className="text-[#BBB] ml-7">betAmount:</span>{' '}
            {parseFloat(betAmount || '0').toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            ,
          </div>
          <div>
            <span className="text-[#727272]">05</span>
            <span className="text-[#BBB] ml-7">successRate:</span> 71.8,
          </div>
          <div>
            <span className="text-[#727272]">06</span>
            <span className="text-[#BBB] ml-7">monthlyGames:</span> 30
          </div>
          <div>
            <span className="text-[#727272]">07</span>
            <span className="text-[#DA70D6] ml-2">{`}`}</span>
          </div>
        </div>
        <div className="text-sm md:text-base">
          <span className="text-[#727272]">08</span>
          <span className="text-emerald-500 opacity-50 ml-2">{`// Average monthly`}</span>
        </div>
        <div>
          <span className="text-[#727272]">09</span>
          <span className="text-emerald-500 opacity-50 ml-2">profit</span>
        </div>
        <div className="text-sm md:text-base">
          <div className="mb-2">
            <span className="text-[#727272]">10</span>
            <span className="text-[#F87583] ml-2">const</span>{' '}
            <span className="text-[#79B8FF]">profit </span>
            <span className="text-[#F87583]">=</span>
          </div>
          <div>
            <span className="text-[#727272]">11</span>
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
