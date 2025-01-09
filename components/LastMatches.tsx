import { format } from 'date-fns'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Calendar, ChartNoAxesCombined, X } from 'lucide-react'

interface Props {
  lastFive:
    | [
        {
          date: string
          result: string
          goals_scored: number
          goals_conceded: number
          first_half_goals: number
          second_half_goals: number
        },
      ]
    | undefined
}
export function LastMatches({ lastFive }: Props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, 'dd/MM/yyyy')
  }
  return (
    <div>
      <div className="pb-2 text-sm text-[#99A1AD] px-3">Last Matches</div>
      <div className="px-3 grid grid-cols-5 gap-2.5">
        {lastFive?.map((last, index) => {
          return (
            <Dialog key={index}>
              <DialogTrigger>
                <div
                  className={`flex flex-col ${last.result === 'W' ? 'bg-[#0e642f] bg-opacity-20' : last.result === 'D' ? 'bg-[#7e6111] bg-opacity-20' : 'bg-[#ff1c20] bg-opacity-10'}  rounded-lg py-1 justify-center items-center`}
                >
                  <div
                    className={`${last.result === 'W' ? 'text-[#33BD68]' : last.result === 'D' ? 'text-[#E1B22E]' : 'text-[#E0494C]'} text-[10px]`}
                  >
                    {last.result}
                  </div>
                  <div className="text-[10px]">
                    {last.goals_scored}-{last.goals_conceded}
                  </div>
                  <div className="text-[#9CA5AF] text-[8px]">
                    {formatDate(last.date)}
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-[#141414]">
                <DialogTitle className="text-xs">
                  <div className="flex relative gap-1 items-center">
                    <div>
                      <Calendar size={16} />
                    </div>
                    <div>{formatDate(last.date)}</div>
                    <DialogClose className="absolute right-0">
                      <X size={18} />
                    </DialogClose>
                  </div>
                </DialogTitle>
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-gradient-to-b from-[#3f3f3f] to-[#282928] flex flex-col rounded-lg justify-center items-center py-2">
                      <div className="text-xs text-zinc-100">Result</div>
                      <div
                        className={`${last.result === 'W' ? 'text-[#33BD68]' : last.result === 'D' ? 'text-[#FEA624]' : 'text-[#E0494C]'} text-sm`}
                      >
                        {last.result}
                      </div>
                    </div>
                    <div className="bg-gradient-to-b from-[#3f3f3f] to-[#282928] flex flex-col rounded-lg justify-center items-center py-2">
                      <div className="text-xs text-zinc-100">Score</div>
                      <div
                        className={`${last.result === 'W' ? 'text-[#33BD68]' : last.result === 'D' ? 'text-[#FEA624]' : 'text-[#E0494C]'} text-sm`}
                      >
                        {last.goals_scored} - {last.goals_conceded}
                      </div>
                    </div>
                    <div className="bg-gradient-to-b from-[#3f3f3f] to-[#282928] flex flex-col rounded-lg justify-center items-center py-2">
                      <div className="text-xs text-zinc-100">Possession</div>
                      <div
                        className={`${last.result === 'W' ? 'text-[#33BD68]' : last.result === 'D' ? 'text-[#FEA624]' : 'text-[#E0494C]'} text-sm`}
                      >
                        60%
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-b from-[#3f3f3f] to-[#282928] flex flex-col gap-3 rounded-lg p-3">
                    <div className="text-sm flex items-center gap-1">
                      <div>
                        <ChartNoAxesCombined size={18} />
                      </div>
                      <div>Statistics</div>
                    </div>
                    <div className="flex flex-col gap-2 text-xs">
                      <div className="flex justify-between">
                        <div className="text-zinc-100">1º Half Goals</div>
                        <div className="font-bai-bold">
                          {last.first_half_goals}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-zinc-100">2º Half Goals</div>
                        <div className="font-bai-bold">
                          {last.second_half_goals}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )
        })}
      </div>
    </div>
  )
}
