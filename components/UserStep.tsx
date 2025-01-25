import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'

export function UserStep() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0)
  const [hovered, setHovered] = useState<boolean>(false)
  const [betAmount, setBetAmount] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')

  const handleStepChange = (newStep: 0 | 1 | 2 | 3) => {
    setStep(newStep)
  }

  return (
    <Dialog>
      <DialogTrigger
        className="group md:w-fit w-full justify-between relative bg-gradient-to-r from-emerald-500 to-teal-500 px-6 md:py-3 py-2 rounded-full font-medium tracking-wide transition-all duration-300 flex items-center gap-2 overflow-hidden hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="relative z-10">Start Free Trial</span>
        <ArrowRight
          className={`w-4 h-4 relative z-10 transition-transform duration-300 ${
            hovered ? 'translate-x-1' : ''
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </DialogTrigger>
      <DialogContent className="md:max-w-[700px] bg-[#1D211D]">
        {step === 0 && (
          <Step1
            onStepChange={handleStepChange}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
          />
        )}
        {step === 1 && (
          <Step2
            onStepChange={handleStepChange}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            betAmount={betAmount}
          />
        )}
        {step === 2 && (
          <Step3
            onStepChange={handleStepChange}
            betAmount={betAmount}
            selectedCountry={selectedCountry}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
