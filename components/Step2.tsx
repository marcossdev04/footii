import { ArrowRight, X } from 'lucide-react'
import { useState } from 'react'
import { data } from '@/utils/LeaguesData'
import Select from 'react-select'
import { DialogClose } from './ui/dialog'

interface Props {
  onStepChange: (step: 0 | 1 | 2 | 3) => void
  selectedCountry: string
  setSelectedCountry: (country: string) => void
  betAmount: string
}

export function Step2({
  onStepChange,
  selectedCountry,
  setSelectedCountry,
}: Props) {
  const [isHovered, setIsHovered] = useState(false)

  const handleContinue = () => {
    if (selectedCountry) {
      onStepChange(2)
    }
  }

  return (
    <div className="flex md:flex-row flex-col gap-2">
      <DialogClose className="absolute top-8 right-5 font-bold text-red-500">
        <X size={30} />
      </DialogClose>
      <div className="md:w-1/2 w-full flex flex-col gap-6">
        <div className="flex flex-col">
          <div className="md:text-6xl text-5xl font-bai-bold">Select</div>
          <div className="md:text-6xl text-5xl font-bai-bold text-[#35D49B]">
            Your
          </div>
          <div className="md:text-6xl text-5xl font-bai-bold text-[#35D49B]">
            Country
          </div>
        </div>
        <div className="flex flex-col md:gap-6 gap-2 border border-t-4 border-x-zinc-700 rounded-lg border-t-emerald-500 border-b-zinc-700 p-6 ">
          <div>
            <Select
              className="z-50"
              options={data.result.countries.map((country) => ({
                value: country.country,
                label: country.country,
              }))}
              onChange={(selectedOption) => {
                setSelectedCountry(selectedOption?.value || '')
              }}
              placeholder="Select Country"
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: '#030303', // dark background
                  color: 'white',
                  borderColor: '#0FB981', // dark border
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: 'white',
                }),
                input: (provided) => ({
                  ...provided,
                  color: 'white',
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: '#1f2937',
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? '#030303' : '#030303',
                  color: 'white',
                  ':hover': {
                    backgroundColor: '#374151',
                  },
                }),
              }}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: '#374151',
                  primary: '#4b5563',
                  neutral0: '#1f2937',
                  neutral20: '#374151',
                  neutral30: '#4b5563',
                  neutral50: '#6b7280',
                  neutral80: 'white',
                },
              })}
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
      <div className="flex text-sm font-mono flex-col gap-2 md:gap-4 w-full md:w-1/2 border border-t-4  border-x-zinc-700 rounded-lg border-t-emerald-500 border-b-zinc-700 px-6 py-6 ">
        <div className="">
          <span className="text-[#727272] text-sm">01</span>
          <span className="ml-1 text-emerald-500 opacity-50 text-sm">{`// Analyzing potential returns`}</span>
        </div>
        <div className="flex flex-col gap-4 text-lg">
          <div className="flex items-center">
            <span className="text-[#727272] text-sm">02</span>
            <span className="text-[#F87583] text-sm ml-2">const</span>
            <span className="text-[#79B8FF] text-sm ml-1">leagues</span>
            <span className="text-[#F87583] text-sm ml-1">=</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-sm text-[#727272]">03</span>
            <span className="text-[#B392F0] text-sm ml-1">getAllLeagues</span>
            <span className="text-[#DA70D6]">(</span>
            <span className="text-[#BBB]">{'country'}</span>
            <span className="text-[#DA70D6]">)</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-sm text-[#727272]">04</span>
            <span className="text-[#79B8FF] text-sm ml-1">console</span>
            <span className="text-[#B392F0]">.log</span>
            <span className="text-[#DA70D6]">(</span>
            <span className="text-[#BBB]">{'country'}</span>
            <span className="text-[#DA70D6]">)</span>
            <span className="ml-1 text-[#569CD6]">{selectedCountry}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-lg">
          <div className="flex items-center">
            <span className="text-[#727272] text-sm">05</span>
            <span className="text-[#F87583] text-sm ml-2">const</span>
            <span className="text-[#79B8FF] text-sm ml-1">results</span>
            <span className="text-[#F87583] text-sm ml-1">=</span>
            <span className="text-sm ml-1 text-[#DA70D6]">{`{`}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-sm text-[#727272]">06</span>
            <span className="text-[#BBB] text-sm ml-7">profit:</span>
            <span className="ml-1 text-[#79B8FF]">league</span>
            <span className="text-[#BBB]">.profit</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-sm text-[#727272]">07</span>
            <span className="text-[#BBB] text-sm ml-7">successRate:</span>
            <span className="ml-1 text-[#79B8FF]">league</span>
            <span className="text-[#BBB]">.rate</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-sm text-[#727272]">08</span>
            <span className="text-[#BBB] text-sm ml-7">confidence:</span>
            <span className="ml-1 text-[#79B8FF]">league</span>
            <span className="text-[#BBB]">.confidence</span>
          </div>
          <div>
            <span className="text-sm text-[#727272]">09</span>
            <span className="text-sm ml-1 text-[#DA70D6]">{`}`}</span>
          </div>
        </div>
        <div>
          <span className="text-sm text-[#727272]">10</span>
          <span className="text-emerald-500 ml-2 text-sm opacity-50">{`// Average monthly profit`}</span>
        </div>
      </div>
    </div>
  )
}
