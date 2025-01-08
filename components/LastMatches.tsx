import { format } from 'date-fns'

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
            <div
              key={index}
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
          )
        })}
      </div>
    </div>
  )
}
