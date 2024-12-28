import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ballSoccer from '@/assets/soccer-ball.svg'

interface Props {
  onLoadingComplete: () => void
}

const LoadingOverlay = ({ onLoadingComplete }: Props) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer)
          onLoadingComplete()
          return 100
        }
        return Math.min(oldProgress + 1, 100)
      })
    }, 50)

    return () => {
      clearInterval(timer)
    }
  }, [onLoadingComplete])

  return (
    <div className="w-full h-full absolute top-0 left-0 bg-[#131413] flex flex-col justify-center items-center overflow-hidden">
      {/* Ellipses container */}
      <div className="absolute inset-0">
      </div>

      {/* Loading bar container with ball */}
      <div className="relative w-[85%] mb-4">
        {/* Ball position based on progress */}
        <div 
          className="absolute -top-5 transition-all duration-50 ease-linear"
          style={{ 
            left: `calc(${progress}% - 20px)`, // 40px is half the ball width
          }}
        >
          <Image 
            src={ballSoccer} 
            alt="Soccer Ball" 
            width={50} 
            height={50} 
          />
        </div>

        {/* Loading bar */}
        <div className="h-4 bg-white/30 rounded-lg overflow-hidden">
          <div
            className="h-full rounded-lg z-50 bg-[#30F0AA] transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Loading text */}
      <div className="font-bai-bold text-lg z-20 text-center text-default px-4">
        {progress < 25 && 'Analyzing match statistics...'}
        {progress >= 25 && progress < 50 && 'Processing odds data...'}
        {progress >= 50 && progress < 75 && 'Calculating best betting opportunities...'}
        {progress >= 75 && progress < 100 && 'Finalizing predictions...'}
        {progress === 100 && 'Your smart betting insights are ready!'}
      </div>
    </div>
  )
}

export default LoadingOverlay