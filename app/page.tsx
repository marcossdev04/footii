'use client'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Brain, TrendingUp, Clock } from 'lucide-react'
import bg from '@/assets/footiBg.jpeg'
import Image from 'next/image'
import { UserStep } from '@/components/UserStep'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { HeaderLanding } from '@/components/HeaderLanding'

// Types
interface CodeLine {
  type: 'comment' | 'import' | 'code' | 'indent'
  content: string
}

interface CodeLineProps {
  line: CodeLine
  index: number
  isActive: boolean
  currentLine: number
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

interface AgeVerificationModalProps {
  onVerified: (isVerified: boolean) => void
}

interface CodeLineProps {
  line: CodeLine
  index: number
  isActive: boolean
}

// Constants
const codeLines: CodeLine[] = [
  { type: 'comment', content: '# Match Analysis: Napoli vs Verona' },
  { type: 'import', content: 'import pandas as pd' },
  { type: 'import', content: 'import numpy as np' },
  { type: 'comment', content: '# Loading historical data' },
  { type: 'code', content: 'match_data = {' },
  { type: 'indent', content: '  "home_form": 0.82,  # Last 5 matches' },
  { type: 'indent', content: '  "away_form": 0.65,' },
  { type: 'indent', content: '  "h2h_score": 0.78,' },
  { type: 'indent', content: '  "odds_movement": 1.80,' },
  { type: 'code', content: '}' },
  { type: 'comment', content: '# Processing live metrics' },
  { type: 'code', content: 'prediction = model.predict({' },
  { type: 'indent', content: '  "possession": 58.2,' },
  { type: 'indent', content: '  "shots_on_target": 4,' },
  { type: 'indent', content: '  "dangerous_attacks": 12' },
  { type: 'code', content: '})' },
  { type: 'comment', content: '# Under 3.0 @ 1.80 ✓' },
]

const CodeLineComponent: React.FC<CodeLineProps> = React.memo(
  function CodeLineComponent({ line, index, isActive, currentLine }) {
    const [displayText, setDisplayText] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
      // Se a linha atual é menor ou igual ao índice atual, ela deve estar visível
      if (currentLine >= index) {
        setIsVisible(true)

        // Se for a linha atual, inicia a animação de digitação
        if (currentLine === index) {
          setIsTyping(true)
          setDisplayText('')
          let currentIndex = 0
          const content = line.content

          const typingInterval = setInterval(() => {
            if (currentIndex <= content.length) {
              setDisplayText(content.slice(0, currentIndex))
              currentIndex++
            } else {
              clearInterval(typingInterval)
              setIsTyping(false)
            }
          }, 50)

          return () => clearInterval(typingInterval)
        } else {
          // Se for uma linha anterior, mostra o texto completo
          setDisplayText(line.content)
          setIsTyping(false)
        }
      } else {
        // Se for uma linha futura, mantém oculta
        setIsVisible(false)
        setDisplayText('')
        setIsTyping(false)
      }
    }, [currentLine, index, line.content])

    const getLineStyle = () => {
      const baseStyle =
        'transition-all duration-300 md:text-base text-xs opacity-0'
      const visibilityStyle = isVisible ? 'opacity-100' : 'opacity-0'
      const activeStyle = isActive
        ? 'text-[#FF6B00] md:text-base text-xs'
        : 'text-gray-400'
      const typeStyle =
        line.type === 'comment'
          ? 'text-blue-400 md:text-base text-xs'
          : line.type === 'import'
            ? 'text-purple-400 md:text-base text-xs'
            : ''

      return `${baseStyle} ${visibilityStyle} ${activeStyle} ${typeStyle}`.trim()
    }

    if (!isVisible) return null

    return (
      <div className={getLineStyle()}>
        <span className="mr-4 text-gray-600">
          {String(index + 1).padStart(2, '0')}
        </span>
        {displayText}
        {isTyping && (
          <span className="inline-block w-2 h-4 ml-1 bg-[#FF6B00] animate-pulse" />
        )}
      </div>
    )
  },
)
// Componente para o container das linhas de código
const CodeLinesContainer: React.FC<{
  codeLines: CodeLine[]
  currentLine: number
}> = React.memo(function CodeLinesContainer({ codeLines, currentLine }) {
  return (
    <>
      {codeLines.map((line, index) => (
        <CodeLineComponent
          key={`line-${index}`}
          line={line}
          index={index}
          isActive={index === currentLine}
          currentLine={currentLine}
        />
      ))}
    </>
  )
})

// Sub-components
const FeatureCard: React.FC<FeatureCardProps> = React.memo(
  function FeatureCard({ icon, title, description }) {
    return (
      <div className="group transition-colors duration-300 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10  cursor-pointer">
        <div className="text-[#FF6B00] mb-4">{icon}</div>
        <h3 className="text-lg font-light mb-2 group-hover:text-[#FF6B00] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 font-light leading-relaxed">
          {description}
        </p>
      </div>
    )
  },
)

const AgeVerificationModal: React.FC<AgeVerificationModalProps> = React.memo(
  function AgeVerificationModal({ onVerified }) {
    return (
      <AlertDialog defaultOpen>
        <AlertDialogContent className="bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-light text-center">
              Age Verification Required
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400 text-center font-light">
              You must be 18 or older to access this website.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-4 justify-center sm:justify-center">
            <AlertDialogAction
              onClick={() => onVerified(true)}
              className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 rounded-full font-medium tracking-wide transition-all duration-300 flex items-center gap-2 overflow-hidden hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5"
            >
              <span className="relative text-base z-10">I am 18 or older</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={() => onVerified(false)}
              className="py-3 px-6 rounded-full text-base font-medium bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:shadow-lg"
            >
              I am under 18
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  },
)

const RestrictedAccess: React.FC = React.memo(function RestrictedAccess() {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-3xl rounded-3xl"></div>
        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          <h2 className="text-2xl font-light mb-6 text-center">
            Access Restricted
          </h2>
          <p className="text-gray-400 text-center mb-4 font-light">
            We apologize, but this website is not accessible to users under 18
            years of age.
          </p>
          <p className="text-sm text-gray-500 text-center">
            Please close this window.
          </p>
        </div>
      </div>
    </div>
  )
})

const CodeDisplay: React.FC = React.memo(function CodeDisplay() {
  const [currentLine, setCurrentLine] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const updateLine = useCallback(() => {
    setCurrentLine((prev) => {
      // Se a próxima linha seria o fim do array
      if (prev + 1 >= codeLines.length) {
        setIsComplete(true)
        return prev // Mantém na última linha
      }
      return prev + 1
    })
  }, [])

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // Só configura o timer se ainda não completou a animação
    if (!isComplete) {
      timerRef.current = setInterval(updateLine, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [updateLine, isComplete])

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-[#FF6B00]/10 to-[#1A1F35]/30 blur-3xl rounded-3xl" />

      <div className="relative h-[300px] md:h-[480px] bg-[#1F211F]/90 rounded-3xl overflow-hidden border border-emerald-500/20 backdrop-blur-sm p-3 md:p-8 font-mono">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B00] to-[#FF8534]" />

        <CodeLinesContainer codeLines={codeLines} currentLine={currentLine} />

        {!isComplete && (
          <div className="absolute bottom-4 right-4 w-3 h-6 bg-[#FF6B00]/50 animate-pulse" />
        )}
      </div>
    </div>
  )
})

// Main Component
const ModernLanding: React.FC = () => {
  const [ageVerified, setAgeVerified] = useState<boolean | null>(null)
  const [isShowed, setIsShowed] = useState(false)

  useEffect(() => {
    const hasShown = localStorage.getItem('hasShownAgeVerification')
    if (hasShown === 'true') {
      setIsShowed(true)
    }
  }, [])

  const handleVerification = (isVerified: boolean): void => {
    setAgeVerified(isVerified)
    if (isVerified) {
      localStorage.setItem('hasShownAgeVerification', 'true')
      setIsShowed(true)
    }
  }

  if (ageVerified === false) {
    return <RestrictedAccess />
  }

  return (
    <>
      {!isShowed && <AgeVerificationModal onVerified={handleVerification} />}
      <div className="min-h-screen w-full relative text-white overflow-x-hidden">
        <Image
          src={bg}
          alt="Background"
          fill
          priority
          quality={100}
          className="object-cover -z-10"
        />
        <div className="fixed inset-0 bg-[#1F211F]/75 backdrop-blur-sm"></div>

        <HeaderLanding />

        <main className="relative min-h-screen">
          <div className="relative desktop:pt-32 md:pt-16 pt-14">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 md:gap-12 gap-3">
              <div className="space-y-4 md:space-y-10 ">
                <h1 className="space-y-1">
                  <div className="md:text-7xl text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                    Precision
                  </div>
                  <div className="md:text-7xl text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                    Football
                  </div>
                  <div className="md:text-7xl pb-1 md:pb-2 text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                    Analytics
                  </div>
                </h1>

                <p className="text-sm md:text-xl text-gray-200 font-light leading-relaxed">
                  <span className="font-medium">
                    3+ years of consistent profits
                  </span>{' '}
                  through AI-powered predictions.
                  <span className="block md:mt-4 mt-1 text-gray-300">
                    Global market analysis • All leagues covered • 48-hour edge
                  </span>
                </p>

                <div className="md:space-y-4 space-y-2">
                  <UserStep />
                  <div className="flex md:justify-start justify-center items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-base font-medium text-white">
                      3 days free • No payment required
                    </span>
                  </div>
                </div>
              </div>

              <CodeDisplay />
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-4 md:mt-6 desktop:mt-40">
              <div className="grid md:grid-cols-3 gap-6">
                <FeatureCard
                  icon={<Brain className="w-6 h-6" />}
                  title="Deep Learning Core"
                  description="Neural networks processing millions of data points for accurate predictions"
                />
                <FeatureCard
                  icon={<TrendingUp className="w-6 h-6" />}
                  title="Market Analysis"
                  description="Real-time odds monitoring across all major global bookmakers"
                />
                <FeatureCard
                  icon={<Clock className="w-6 h-6" />}
                  title="Early Predictions"
                  description="Get insights up to 48 hours before matches begin"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default ModernLanding
