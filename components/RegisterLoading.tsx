import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import soccerBall from '@/assets/soccer-ball.svg'

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
    <div className="w-full h-full absolute top-0 left-0 bg-[#131413] flex flex-col justify-center items-center z-50 overflow-hidden">
      {/* Ellipses container */}
      <div className="w-full h-full absolute overflow-hidden">
        {/* Ellipse 1 */}
        <div className="absolute w-96 h-72 -right-24 -bottom-24 opacity-70 blur-[100px] rotate-[-77.62deg] bg-gradient-to-b from-[#30F0AA] to-[rgba(153,252,124,0.30)]" />
        {/* Ellipse 2 */}
        <div className="absolute w-[482px] h-80 -right-36 bottom-12 opacity-70 blur-[100px] rotate-[-77.62deg] bg-gradient-to-br from-[rgba(240,125,250,0.5)] to-[rgba(60,9,143,0.7)]" />
      </div>

      {/* Ball with bounce animation */}
      <div className="w-20 h-20 mb-3 animate-bounce">
        <Image src={soccerBall} alt="Soccer Ball" width={80} height={80} />
      </div>

      {/* Loading bar */}
      <div className="w-[68%] max-w-[255px] h-4 bg-white/30 rounded-lg overflow-hidden mb-5">
        <div
          className="h-full rounded-lg bg-gradient-to-r from-[#30F0AA] via-[#99FC7C] to-[#E3FA9C] transition-all duration-50 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading text */}
      <div className="font-bai-bold text-lg z-20 text-center text-white px-2">
        {progress < 25 && 'Scouting for the perfect goal opportunities...'}
        {progress >= 25 && progress < 50 && 'Dribbling through the stats...'}
        {progress >= 50 &&
          progress < 75 &&
          'Making our predictions score big...'}
        {progress >= 75 && progress < 100 && 'Getting ready for kickoff...'}
        {progress === 100 && 'Game on! Your betting strategy is ready! 🎯'}
      </div>
    </div>
  )
}

export default LoadingOverlay
