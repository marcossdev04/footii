import NumberFlow from '@number-flow/react'
import React from 'react'

export function PricingInteraction({
  anual,
  month,
  quarter,
}: {
  month: number
  quarter: number
  anual: number
}) {
  const [active, setActive] = React.useState(0)
  const handleChangePlan = (index: number) => {
    setActive(index)
  }
  return (
    <div className="border-2 rounded-[32px] p-3 shadow-md max-w-sm w-full flex flex-col items-center gap-3 bg-[#1A1B1A]">
      <div className="w-full relative flex flex-col items-center justify-center gap-3">
        <div
          className="w-full flex justify-between cursor-pointer border-2 border-gray-200 p-4 rounded-2xl"
          onClick={() => handleChangePlan(0)}
        >
          <div className="flex flex-col items-start">
            <p className="font-semibold text-xl text-gray-200">Month</p>
            <p className="text-slate-500 text-md">
              <span className="text-gray-200 font-medium">${month}</span>
            </p>
          </div>
          <div
            className="border-2 border-slate-200 size-6 rounded-full mt-0.5 p-1 flex items-center justify-center"
            style={{
              borderColor: `${active === 0 ? '#3ff0aa' : '#64748b'}`,
              transition: 'border-color 0.3s',
            }}
          >
            <div
              className="size-3 bg-default rounded-full"
              style={{
                opacity: `${active === 0 ? 1 : 0}`,
                transition: 'opacity 0.3s',
              }}
            ></div>
          </div>
        </div>
        <div
          className="w-full flex justify-between cursor-pointer border-2 border-gray-200 p-4 rounded-2xl"
          onClick={() => handleChangePlan(1)}
        >
          <div className="flex flex-col items-start">
            <p className="font-semibold text-xl flex items-center gap-2 text-default">
              Quarter{' '}
              <span className="py-1 px-2 block rounded-lg bg-default text-yellow-950 text-sm">
                Popular
              </span>
            </p>
            <p className="text-slate-200 text-md flex">
              <span className="text-default font-medium flex items-center">
                ${' '}
                <NumberFlow
                  className="text-default font-medium"
                  value={quarter}
                />
              </span>
            </p>
          </div>
          <div
            className="border-2 border-slate-200 size-6 rounded-full mt-0.5 p-1 flex items-center justify-center"
            style={{
              borderColor: `${active === 1 ? '#3ff0aa' : '#3ff0aa'}`,
              transition: 'border-color 0.3s',
            }}
          >
            <div
              className="size-3 bg-default rounded-full"
              style={{
                opacity: `${active === 1 ? 1 : 0}`,
                transition: 'opacity 0.3s',
              }}
            ></div>
          </div>
        </div>
        <div
          className="w-full flex justify-between cursor-pointer border-2 border-gray-200 p-4 rounded-2xl"
          onClick={() => handleChangePlan(2)}
        >
          <div className="flex flex-col items-start">
            <p className="font-semibold text-xl text-white">Anual</p>
            <p className="text-slate-200 text-md flex">
              <span className="text-white font-medium flex items-center">
                ${' '}
                <NumberFlow className="text-white font-medium" value={anual} />
              </span>
            </p>
          </div>
          <div
            className="border-2 border-slate-500 size-6 rounded-full mt-0.5 p-1 flex items-center justify-center"
            style={{
              borderColor: `${active === 2 ? '#3ff0aa' : '#64748b'}`,
              transition: 'border-color 0.3s',
            }}
          >
            <div
              className="size-3 bg-default rounded-full"
              style={{
                opacity: `${active === 2 ? 1 : 0}`,
                transition: 'opacity 0.3s',
              }}
            ></div>
          </div>
        </div>
        <div
          className={`w-full h-[88px] absolute top-0 border-[3px] border-default rounded-2xl`}
          style={{
            transform: `translateY(${active * 88 + 12 * active}px)`,
            transition: 'transform 0.3s',
          }}
        ></div>
      </div>
      <button className="rounded-full bg-default text-lg text-black w-full p-3 active:scale-95 transition-transform duration-300">
        Get Started
      </button>
    </div>
  )
}
