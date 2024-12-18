'use client'

import React from 'react'
import Marquee from 'react-fast-marquee'

const statsData = [
  { label: 'Matches', value: '7' },
  { label: 'Profit', value: '0.8' },
  { label: 'ROI', value: '100%' },
]
const statsData2 = [
  { label: 'Green', value: '4' },
  { label: 'Red', value: '1' },
  { label: 'Dev', value: '2' },
]

const StatsCarousel = () => {
  return (
    <div className="w-full overflow-hidden">
      <Marquee gradient={false} speed={50} pauseOnHover pauseOnClick>
        {statsData.map((stat, index) => (
          <div
            key={`${stat.label}-${index}`}
            className="flex flex-col items-center text-xs mt-2 min-w-[150px] mx-1.5 p-0.5"
          >
            <div
              className={`whitespace-nowrap ${stat.label === 'Red' ? 'bg-red-600' : stat.label === 'Green' ? 'bg-default bg-opacity-40' : 'bg-[#3D3D3D]'} w-full flex justify-center  rounded-t-sm`}
            >
              {stat.label}
            </div>
            <div
              className={`whitespace-nowrap w-full flex justify-center bg-[#3D3D3D] rounded-b-sm ${stat.label === 'Profit' ? 'text-default' : ''}`}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </Marquee>
      <Marquee gradient={false} speed={50} pauseOnHover pauseOnClick>
        {statsData2.map((stat, index) => (
          <div
            key={`${stat.label}-${index}`}
            className="flex flex-col items-center text-xs mt-2 min-w-[150px] mx-1.5 p-0.5"
          >
            <div
              className={`whitespace-nowrap ${stat.label === 'Red' ? 'bg-red-600' : stat.label === 'Green' ? 'bg-default bg-opacity-40' : 'bg-[#6A6A6A]'} w-full flex justify-center  rounded-t-sm`}
            >
              {stat.label}
            </div>
            <div
              className={`${stat.label === 'Red' ? 'text-red-600' : stat.label === 'Green' ? 'text-default' : 'text-zinc-100'} whitespace-nowrap w-full flex justify-center bg-[#2D2D2D] rounded-b-sm`}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  )
}

export default StatsCarousel
