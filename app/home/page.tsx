export default function Home() {
  return (
    <div className="w-full px-3">
      <div className="flex flex-col py-2">
        <div className="flex px-3 bg-[#5D5D5D] items-center bg-opacity-40 rounded-t-lg text-xs py-1">
          <div className="flex w-[36%] text-[11px] gap-1 text-zinc-300">
            <div>16/12</div>
            <div>21:00</div>
          </div>
          <div>Chanpeons League</div>
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
              <div className="bg-default w-full text-center rounded-t-lg bg-opacity-40 px-3">
                Goal Line
              </div>
              <div className="bg-[#333] rounded-b-lg w-full text-center text-zinc-100">
                Over 5.0
              </div>
            </div>
            <div className="flex w-full flex-col items-center">
              <div className="bg-default w-full text-center rounded-t-lg bg-opacity-40 px-3">
                Odd
              </div>
              <div className="bg-[#333] rounded-b-lg w-full text-center text-zinc-100">
                1.9
              </div>
            </div>
            <div className="flex w-full flex-col items-center">
              <div className="bg-default w-full text-center rounded-t-lg bg-opacity-40 px-3">
                Result
              </div>
              <div className="bg-[#333] rounded-b-lg w-full text-center text-default">
                Win
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
