import StatsCarousel from '@/components/StatsCarrousel'

export default function Home() {
  return (
    <div className="w-full">
      <StatsCarousel />
      <div className="flex flex-col py-2 px-3">
        <div className="flex px-3 bg-default items-center bg-opacity-90 rounded-t-lg text-xs py-1">
          <div className="flex w-[36%] text-[11px] gap-1 text-zinc-800">
            <div>16/12</div>
            <div>21:00</div>
          </div>
          <div className="text-zinc-800">Chanpeons League</div>
        </div>
        <div className="bg-[#202120] gap-1 px-3 py-1 flex flex-col rounded-b-lg">
          <div className="flex flex-col text-sm">
            <div className="flex justify-between items-center">
              <div>Real Madrid</div>
              <div>2</div>
            </div>
            <div className="flex justify-between items-center">
              <div>Barcelona</div>
              <div>1</div>
            </div>
          </div>
          <div className="flex justify-between gap-2 text-xs pb-1">
            <div className="flex flex-col w-full items-center">
              <div className="bg-default w-full text-center text-zinc-800 rounded-t-md bg-opacity-90 px-3">
                Goal Line
              </div>
              <div className="bg-[#333] rounded-b-md w-full text-center text-zinc-100">
                Over 5.0
              </div>
            </div>
            <div className="flex w-full flex-col items-center">
              <div className="bg-default w-full text-zinc-800 text-center rounded-t-md bg-opacity-90 px-3">
                Odd
              </div>
              <div className="bg-[#333] rounded-b-md w-full text-center text-zinc-100">
                1.90
              </div>
            </div>
            <div className="flex w-full flex-col items-center">
              <div className="bg-default w-full text-zinc-800 text-center rounded-t-md bg-opacity-90 px-3">
                Result
              </div>
              <div className="bg-[#333] rounded-b-md w-full text-center text-default">
                Win
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-2 px-3">
        <div className="flex px-3 bg-red-600 items-center bg-opacity-80 rounded-t-lg text-xs py-1">
          <div className="flex w-[36%] text-[11px] gap-1 text-zinc-100">
            <div>16/12</div>
            <div>21:00</div>
          </div>
          <div className="text-zinc-100">Chanpeons League</div>
        </div>
        <div className="bg-[#202120] gap-1 px-3 py-1 flex flex-col rounded-b-lg">
          <div className="flex flex-col text-sm">
            <div className="flex justify-between items-center">
              <div>Real Madrid</div>
              <div>2</div>
            </div>
            <div className="flex justify-between items-center">
              <div>Barcelona</div>
              <div>1</div>
            </div>
          </div>
          <div className="flex justify-between gap-2 text-xs pb-1">
            <div className="flex flex-col w-full items-center">
              <div className="bg-red-600 w-full text-center rounded-t-md bg-opacity-80 px-3">
                Goal Line
              </div>
              <div className="bg-[#333] rounded-b-md w-full text-center text-zinc-100">
                Over 5.0
              </div>
            </div>
            <div className="flex w-full flex-col items-center">
              <div className="bg-red-600 w-full text-center rounded-t-md bg-opacity-80 px-3">
                Odd
              </div>
              <div className="bg-[#333] rounded-b-md w-full text-center text-zinc-100">
                1.90
              </div>
            </div>
            <div className="flex w-full flex-col items-center">
              <div className="bg-red-600 w-full text-center rounded-t-md bg-opacity-80 px-3">
                Result
              </div>
              <div className="bg-[#333] rounded-b-md w-full text-center text-red-600">
                Lose
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-2 px-3">
        <div className="flex px-3 bg-[#272927] items-center rounded-t-lg text-xs py-1">
          <div className="flex w-[36%] text-[11px] gap-1 text-zinc-100">
            <div>16/12</div>
            <div>21:00</div>
          </div>
          <div className="text-zinc-100">Chanpeons League</div>
        </div>
        <div className="bg-[#202120] gap-1 px-3 py-1 flex flex-col rounded-b-lg">
          <div className="flex flex-col text-sm">
            <div className="flex justify-between items-center">
              <div>Real Madrid</div>
            </div>
            <div className="flex justify-between items-center">
              <div>Barcelona</div>
            </div>
          </div>
          <div className="flex justify-between gap-2 text-xs pb-1">
            <div className="flex flex-col w-full items-center">
              <div className="bg-[#333] w-full text-center rounded-t-md px-3">
                Goal Line
              </div>
              <div className="bg-[#272927] rounded-b-md w-full text-center text-zinc-100">
                Over 5.0
              </div>
            </div>
            <div className="flex w-full flex-col items-center">
              <div className="bg-[#333] w-full text-center rounded-t-md  px-3">
                Odd
              </div>
              <div className="bg-[#272927] rounded-b-md w-full text-center text-zinc-100">
                1.90
              </div>
            </div>
            <div className="flex w-full flex-col items-center">
              <div className="bg-default text-sm text-default bg-opacity-15 rounded-md py-1.5 w-full text-center ">
                Bet Here
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
