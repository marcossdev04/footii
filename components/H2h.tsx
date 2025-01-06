import { Bet } from '@/types/Bets'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { format, isFuture, isToday } from 'date-fns'
import Image from 'next/image'
import { teamNameToImageId } from '@/utils/teamNameToImageId'
import noImage from '@/assets/noImage.png'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Progress } from './ui/progress'

interface Props {
  game: Bet
}
type ResultType = 'Black' | 'Green' | 'Orange' | 'Red'

export function H2h({ game }: Props) {
  const [betText, setBetText] = useState('Bet')

  useEffect(() => {
    const interval = setInterval(() => {
      setBetText((prev) => (prev === 'Bet' ? 'Here' : 'Bet'))
    }, 2000)

    return () => clearInterval(interval)
  }, [])
  const formatMatchDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      shortDate: format(date, 'dd/MM'),
      time: format(date, 'HH:mm'),
      period: format(date, 'aa'),
    }
  }
  const getTeamLogoUrl = (teamName: string) => {
    const imageId =
      teamNameToImageId[teamName as keyof typeof teamNameToImageId]
    return imageId ? `https://footi.site/imgs/${imageId}.png` : null
  }
  const resultsByColor = {
    Black: { name: 'In Progress', color: '#FFFFFF' },
    Green: { name: 'Win', color: '#FFFFFF' },
    Orange: { name: 'Draw', color: '#FFFFFF' },
    Red: { name: 'Loss', color: '#000000' },
  }
  const getDateTextColor = (matchDate: string, result: ResultType) => {
    if (resultsByColor[result].name !== 'Em curso') return 'text-[#777]'

    const date = new Date(matchDate)
    if (isToday(date)) return 'text-[#E3FA9C]'
    if (isFuture(date)) return 'text-white'
    return 'text-[#777]'
  }
  const { shortDate, time, period } = formatMatchDate(game.match_date)
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex flex-col py-1 px-2 font-bai-light">
          <div className="flex px-3 bg-gradient-to-r from-[#3E3E3E] via-[#646464] to-[#484848] border-t border-x border-gray-700 items-center justify-center bg-opacity-90 rounded-t-xl text-[9px] py-0.5">
            <div className="text-white">{game.league_name}</div>
          </div>
          <div className="bg-[#1F211F] border-b border-x border-[#464646] gap-1 px-0 py-0 grid grid-cols-11 items-center rounded-b-xl">
            <div
              className={`col-span-1 items-center justify-center rounded-bl-xl px-2  flex flex-col text-[8px] py-2 bg-[#2c2e2c] ${getDateTextColor(game.match_date, game.result)}`}
            >
              <div>{shortDate}</div>
              <div>{time}</div>
              <div>{period}</div>
            </div>
            <div className="flex col-span-5 flex-col pl-2 text-[9px]">
              <div className="flex justify-between items-center">
                <div className=" mb-1 flex w-[95%] gap-1 items-center">
                  <Image
                    src={getTeamLogoUrl(game.home_name) || noImage}
                    alt={game.home_name}
                    width={14}
                    height={14}
                  />
                  <div className="truncate">{game.home_name}</div>
                </div>
                {resultsByColor[game.result].name === 'In Progress' ? (
                  ''
                ) : (
                  <div className="text-[#FCE500] text-[9px]">
                    {game.stats_home_goals}
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-1 w-[95%] items-center">
                  <Image
                    src={getTeamLogoUrl(game.away_name) || noImage}
                    alt={game.away_name}
                    width={14}
                    height={14}
                  />
                  <div className="truncate">{game.away_name}</div>
                </div>
                {resultsByColor[game.result].name === 'In Progress' ? (
                  ''
                ) : (
                  <div className="text-[#FCE500] text-[9px]">
                    {game.stats_away_goals}
                  </div>
                )}
              </div>
            </div>
            <div
              className={`flex col-span-5 pl-0 items-center justify-between gap-0 ${resultsByColor[game.result].name === 'In Progress' ? 'pr-2' : 'pr-1'} text-[8px] pb-0`}
            >
              <div className="flex flex-col gap-2 w-full items-center">
                <div className="bg-[#2E3030] px-2 text-center text-zinc-100 rounded-full bg-opacity-90">
                  Goal Line
                </div>
                <div className=" rounded-b-md w-full text-center text-zinc-100">
                  {game.odd_bet} {game.odd_line.toFixed(1)}
                </div>
              </div>
              <div className="flex gap-2 w-full flex-col items-center">
                <div className="bg-[#2E3030] text-zinc-100 text-center rounded-full bg-opacity-90 px-3">
                  Odd
                </div>
                <div className="text-[#FCE500] rounded-b-md w-full text-center ">
                  {game.odd_value.toFixed(1)}
                </div>
              </div>
              {resultsByColor[game.result].name === 'In Progress' ? (
                <Link
                  target="_blank"
                  href={`${game.bookmaker_link}I3`}
                  className="w-[100px] pr-1 relative overflow-hidden font-bai-bold"
                >
                  <div className="flex justify-center py-2 rounded-2xl bg-[#3524B0]">
                    <span className="absolute -left-1 inset-0 flex items-center justify-center animate-slide-text text-white text-[9px] font-medium">
                      {betText}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="flex w-full gap-2 flex-col items-center">
                  <div className="bg-[#2E3030] w-full text-zinc-100 text-center rounded-full bg-opacity-90 px-2">
                    Result
                  </div>

                  <div
                    className={` rounded-b-md w-full text-center ${game.result === 'Black' ? 'text-[#FAFAFA]' : game.result === 'Green' ? 'text-[#24ff6f]' : game.result === 'Orange' ? 'text-[#E3FA9C]' : 'text-[#ff4e63]'}`}
                  >
                    {resultsByColor[game.result].name}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 flex flex-col gap-0 rounded-lg border-none">
        <div className="bg-gradient-to-r py-1.5 flex justify-center items-center text-xs rounded-t-lg from-[#3E3E3E] via-[#646464] to-[#484848]">
          Euro League 2025
        </div>
        <div className="text-xs bg-gradient-to-b rounded-b-lg pb-2.5 from-[#323432] to-[#202220]">
          <div className="py-2 grid grid-cols-6">
            <div className="col-span-2 flex pl-2">
              <div className="flex gap-1">
                <Image
                  src={getTeamLogoUrl(game.home_name) || noImage}
                  alt={game.home_name}
                  width={18}
                  height={14}
                  className="h-[20px]"
                />
                <div className="truncate mt-0.5">{game.home_name}</div>
              </div>
            </div>
            <div className="col-span-2 gap-2 flex flex-col items-center justify-center">
              <div className="text-base font-bai-bold">VS</div>
              <div className="flex text-[#555655] gap-1 justify-center text-xs">
                <div>15/12</div>
                <div>3:30 PM</div>
              </div>
            </div>
            <div className="col-span-2 flex pr-2">
              <div className="flex gap-1 justify-end w-full">
                <div className="truncate mt-0.5">{game.away_name}</div>
                <Image
                  src={getTeamLogoUrl(game.away_name) || noImage}
                  alt={game.away_name}
                  width={18}
                  height={14}
                  className="h-[20px]"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full py-2">
            <div className="grid bg-[#1f211f] mx-3 rounded-2xl items-center grid-cols-3 w-full">
              <div className="flex uppercase text-[#FEA624] items-center font-bai-bold  justify-center bg-[#343534] rounded-2xl py-2">
                <span>h2h</span>
              </div>
              <div className="flex justify-center">{game.home_name}</div>
              <div className="flex justify-center">{game.away_name}</div>
            </div>
          </div>
          <div className=" py-2 pb-2 px-3 grid gap-2 grid-cols-2">
            <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-3 flex py-3 rounded-xl">
              <div className="text-[#ABABAB]">Total matches</div>
              <div>16</div>
            </div>
            <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-3 flex flex-col py-1.5 gap-1 rounded-xl">
              <div className="flex items-center justify-between w-full">
                <div className="text-[#ABABAB]">Home wins</div>
                <div className="text-[11px] text-[#ABABAB]">73.0%</div>
              </div>
              <div className="w-full">
                <Progress value={73} />
              </div>
            </div>
            <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-3 flex flex-col py-1.5 gap-1 rounded-xl">
              <div className="flex items-center justify-between w-full">
                <div className="text-[#ABABAB]">Home wins</div>
                <div className="text-[11px] text-[#ABABAB]">73.0%</div>
              </div>
              <div className="w-full">
                <Progress value={73} />
              </div>
            </div>
            <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-3 flex py-3 rounded-xl">
              <div className="text-[#ABABAB]">Total matches</div>
              <div>16</div>
            </div>
            <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-3 flex py-3 rounded-xl">
              <div className="text-[#ABABAB]">Total matches</div>
              <div>16</div>
            </div>
            <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-3 flex flex-col py-1.5 gap-1 rounded-xl">
              <div className="flex items-center justify-between w-full">
                <div className="text-[#ABABAB]">Home wins</div>
                <div className="text-[11px] text-[#ABABAB]">73.0%</div>
              </div>
              <div className="w-full">
                <Progress value={73} />
              </div>
            </div>
            <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-3 flex flex-col py-1.5 gap-1 rounded-xl">
              <div className="flex items-center justify-between w-full">
                <div className="text-[#ABABAB]">Home wins</div>
                <div className="text-[11px] text-[#ABABAB]">73.0%</div>
              </div>
              <div className="w-full">
                <Progress value={73} />
              </div>
            </div>
            <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-3 flex py-3 rounded-xl">
              <div className="text-[#ABABAB]">Total matches</div>
              <div>16</div>
            </div>
          </div>
          <div className="pb-2 text-sm text-[#99A1AD] px-3">Last Matches</div>
          <div className="px-3 grid grid-cols-5 gap-2.5">
            <div className="flex flex-col  bg-[#0e642f] bg-opacity-20 rounded-lg py-1 justify-center items-center">
              <div className="text-[#33BD68] text-[10px]">W</div>
              <div className="text-[10px]">1-0</div>
              <div className="text-[#9CA5AF] text-[8px]">01/01/2025</div>
            </div>
            <div className="flex flex-col  bg-[#7e6111] bg-opacity-20 rounded-lg py-1 justify-center items-center">
              <div className="text-[#E1B22E] text-[10px]">L</div>
              <div className="text-[10px]">0-0</div>
              <div className="text-[#9CA5AF] text-[8px]">01/01/2025</div>
            </div>
            <div className="flex flex-col  bg-[#ff1c20] bg-opacity-10 rounded-lg py-1 justify-center items-center">
              <div className="text-[#E0494C] text-[10px]">D</div>
              <div className="text-[10px]">0-1</div>
              <div className="text-[#9CA5AF] text-[8px]">01/01/2025</div>
            </div>
            <div className="flex flex-col  bg-[#ff1c20] bg-opacity-10 rounded-lg py-1 justify-center items-center">
              <div className="text-[#E0494C] text-[10px]">D</div>
              <div className="text-[10px]">0-1</div>
              <div className="text-[#9CA5AF] text-[8px]">01/01/2025</div>
            </div>
            <div className="flex flex-col  bg-[#ff1c20] bg-opacity-10 rounded-lg py-1 justify-center items-center">
              <div className="text-[#E0494C] text-[10px]">D</div>
              <div className="text-[10px]">0-1</div>
              <div className="text-[#9CA5AF] text-[8px]">01/01/2025</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
