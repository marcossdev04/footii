import { Bet } from '@/types/Bets'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { format, isFuture, isToday } from 'date-fns'
import Image from 'next/image'
import { teamNameToImageId } from '@/utils/teamNameToImageId'
import noImage from '@/assets/noImage.png'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/api/api'
import { useQuery } from 'react-query'
import { h2h } from '@/types/h2h'
import { LastMatches } from './LastMatches'
import { Progress } from './ui/progress'

interface Props {
  game: Bet
}
type ResultType = 'Black' | 'Green' | 'Orange' | 'Red'

export function H2h({ game }: Props) {
  const [betText, setBetText] = useState('Bet')
  const [selectedTab, setSelectedTab] = useState<'home' | 'away' | 'h2h'>('h2h')

  async function fetchH2h() {
    const response = await api.get(`/results/h2h/${game.match_id}`)
    return response.data
  }
  const { data: h2h } = useQuery<h2h>(['getH2h', game.match_id], fetchH2h, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
  console.log(h2h)
  useEffect(() => {
    const interval = setInterval(() => {
      setBetText((prev) => (prev === 'Bet' ? 'Here' : 'Bet'))
    }, 2000)

    return () => clearInterval(interval)
  }, [])
  const formatMatchDate = (dateString: string) => {
    const date = new Date(dateString)
    // Adiciona 3 horas ao horário UTC
    date.setTime(date.getTime() + 3 * 60 * 60 * 1000)

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
    if (resultsByColor[result].name !== 'In Progress') return 'text-[#777]'

    const date = new Date(matchDate)
    // Adiciona 3 horas ao horário UTC
    date.setTime(date.getTime() + 3 * 60 * 60 * 1000)

    if (isToday(date)) return 'text-[#E3FA9C]'
    if (isFuture(date)) return 'text-white'
    return 'text-[#777]'
  }

  const { shortDate, time, period } = formatMatchDate(game.match_date)

  console.log(game.match_date)
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
              <div
                onClick={() => setSelectedTab('h2h')}
                className={`flex uppercase cursor-pointer items-center font-bai-bold justify-center py-2 rounded-2xl transition-all duration-300 ease-in-out ${
                  selectedTab === 'h2h'
                    ? 'bg-[#343534]'
                    : 'text-[#f7f7f7] hover:bg-[#2a2b2a]'
                }`}
              >
                <span className={`flex items-center text-[#FEA624]`}>
                  <span className="animate-left-h">h</span>
                  <span className="mx-0.5">2</span>
                  <span className="animate-right-h">h</span>
                </span>
              </div>

              <div
                onClick={() => setSelectedTab('home')}
                className={`px-3 cursor-pointer truncate text-center py-2 rounded-2xl transition-all duration-300 ease-in-out ${
                  selectedTab === 'home'
                    ? 'bg-[#343534] text-[#FEA624]'
                    : 'text-[#f7f7f7] hover:bg-[#2a2b2a]'
                }`}
              >
                {game.home_name}
              </div>

              <div
                onClick={() => setSelectedTab('away')}
                className={`px-3 cursor-pointer truncate text-center py-2 rounded-2xl ${
                  selectedTab === 'away'
                    ? 'bg-[#343534] text-[#FEA624]'
                    : 'text-[#f7f7f7] hover:bg-[#2a2b2a]'
                }`}
              >
                {game.away_name}
              </div>
            </div>
          </div>
          {selectedTab === 'h2h' ? (
            <div className=" py-2 pb-2 px-3 grid gap-2 grid-cols-2">
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-2 flex py-3 rounded-xl">
                <div className="text-[#f7f7f7]">Total matches</div>
                <div className="text-[#FEA624] ">{h2h?.h2h_total_matches}</div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-2 flex py-3 rounded-xl">
                <div className="text-[#f7f7f7]">Draws</div>
                <div className="text-[#FEA624] ">{h2h?.h2h_draws}</div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-2 flex py-3 rounded-xl">
                <div className="text-[#f7f7f7]">Home wins</div>
                <div className="text-[#FEA624]">{h2h?.h2h_home_wins}</div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-2 flex py-3 rounded-xl">
                <div className="text-[#f7f7f7]">Away Wins</div>
                <div className="text-[#FEA624] ">{h2h?.h2h_away_wins}</div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-2 flex py-3 rounded-xl">
                <div className="text-[#f7f7f7] text-[11px] ">
                  Home Goals 1º Half
                </div>
                <div className="text-[11px] text-[#FEA624] ">
                  {h2h?.h2h_home_avg_first_half_goals}%
                </div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-2 flex py-3 rounded-xl">
                <div className="text-[#f7f7f7] text-[11px]">
                  Away Goals 1º Half
                </div>
                <div className="text-[11px] text-[#FEA624] ">
                  {h2h?.h2h_away_avg_second_half_goals}%
                </div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-2 flex py-3 rounded-xl">
                <div className="text-[#f7f7f7] text-[11px] ">
                  Home Goals 2º Half
                </div>
                <div className="text-[11px] text-[#FEA624] ">
                  {h2h?.h2h_home_avg_second_half_goals}%
                </div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-2 flex py-3 rounded-xl">
                <div className="text-[#f7f7f7] text-[11px]">
                  Away Goals 2º Half
                </div>
                <div className="text-[11px] text-[#FEA624] ">
                  {h2h?.h2h_away_avg_second_half_goals}%
                </div>
              </div>
            </div>
          ) : selectedTab === 'away' ? (
            <div className=" py-2 pb-2 px-3 grid gap-2 grid-cols-2">
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-2 flex py-3 rounded-xl">
                <div className="text-[#f7f7f7]">Total matches</div>
                <div className="text-[#FEA624] ">
                  {h2h?.stats_away_matches_played}
                </div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-3 flex flex-col py-1.5 gap-1 rounded-xl">
                <div className="flex items-center justify-between w-full">
                  <div className="text-[#f7f7f7]">Win Rate</div>
                  <div className="text-[11px] text-[#FEA624] ">
                    {parseFloat(
                      h2h !== undefined ? h2h.stats_away_win_rate : '0',
                    ).toFixed(1)}
                    %
                  </div>
                </div>
                <div className="w-full">
                  <Progress
                    value={
                      h2h !== undefined
                        ? parseFloat(h2h.stats_away_win_rate)
                        : 0
                    }
                  />
                </div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-3 flex flex-col py-1.5 gap-1 rounded-xl">
                <div className="flex items-center justify-between w-full">
                  <div className="text-[#f7f7f7]">Shot Accuracy</div>
                  <div className="text-[11px] text-[#FEA624] ">
                    {parseFloat(
                      h2h !== undefined ? h2h.stats_away_shot_accuracy : '0',
                    ).toFixed(1)}
                    %
                  </div>
                </div>
                <div className="w-full">
                  <Progress
                    value={
                      h2h !== undefined
                        ? parseFloat(h2h.stats_away_shot_accuracy)
                        : 0
                    }
                  />
                </div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-3 flex flex-col py-1.5 gap-1 rounded-xl">
                <div className="flex items-center justify-between w-full">
                  <div className="text-[#f7f7f7]">Attack Eficiency</div>
                  <div className="text-[11px] text-[#FEA624] ">
                    {parseFloat(
                      h2h !== undefined
                        ? h2h.stats_away_attack_efficiency
                        : '0',
                    ).toFixed(1)}
                    %
                  </div>
                </div>
                <div className="w-full">
                  <Progress
                    value={
                      h2h !== undefined
                        ? parseFloat(h2h.stats_away_attack_efficiency)
                        : 0
                    }
                  />
                </div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-2 flex py-3 rounded-xl">
                <div className="text-[#f7f7f7] text-[11px]">Goals Scored</div>
                <div className="text-[11px] text-[#FEA624] ">
                  {h2h?.stats_away_avg_goals_scored}
                </div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-2 flex py-3 rounded-xl">
                <div className="text-[#f7f7f7] text-[11px]">Goals Conceded</div>
                <div className="text-[11px] text-[#FEA624] ">
                  {h2h?.stats_away_avg_goals_conceded}
                </div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-2 flex py-3 rounded-xl">
                <div className="text-[#f7f7f7] text-[11px]">
                  Away Goals 1º Half
                </div>
                <div className="text-[11px] text-[#FEA624] ">
                  {h2h?.stats_away_avg_first_half_goals}
                </div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-2 flex py-3 rounded-xl">
                <div className="text-[#f7f7f7] text-[11px]">
                  Away Goals 2º Half
                </div>
                <div className="text-[11px] text-[#FEA624] ">
                  {h2h?.stats_away_avg_second_half_goals}
                </div>
              </div>
            </div>
          ) : (
            <div className=" py-2 pb-2 px-3 grid gap-2 grid-cols-2">
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-2 flex py-3 rounded-xl">
                <div className="text-[#f7f7f7]">Total matches</div>
                <div className="text-[#FEA624] ">
                  {h2h?.stats_home_matches_played}
                </div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-3 flex flex-col py-1.5 gap-1 rounded-xl">
                <div className="flex items-center justify-between w-full">
                  <div className="text-[#f7f7f7]">Win Rate</div>
                  <div className="text-[11px] text-[#FEA624] ">
                    {parseFloat(
                      h2h !== undefined ? h2h.stats_home_win_rate : '0',
                    ).toFixed(1)}
                    %
                  </div>
                </div>
                <div className="w-full">
                  <Progress
                    value={
                      h2h !== undefined
                        ? parseFloat(h2h.stats_home_win_rate)
                        : 0
                    }
                  />
                </div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-3 flex flex-col py-1.5 gap-1 rounded-xl">
                <div className="flex items-center justify-between w-full">
                  <div className="text-[#f7f7f7]">Shot Accuracy</div>
                  <div className="text-[11px] text-[#FEA624] ">
                    {parseFloat(
                      h2h !== undefined ? h2h.stats_home_shot_accuracy : '0',
                    ).toFixed(1)}
                    %
                  </div>
                </div>
                <div className="w-full">
                  <Progress
                    value={
                      h2h !== undefined
                        ? parseFloat(h2h.stats_home_shot_accuracy)
                        : 0
                    }
                  />
                </div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-3 flex flex-col py-1.5 gap-1 rounded-xl">
                <div className="flex items-center justify-between w-full">
                  <div className="text-[#f7f7f7]">Attack Eficiency</div>
                  <div className="text-[11px] text-[#FEA624]">
                    {parseFloat(
                      h2h !== undefined
                        ? h2h.stats_home_attack_efficiency
                        : '0',
                    ).toFixed(1)}
                    %
                  </div>
                </div>
                <div className="w-full">
                  <Progress
                    value={
                      h2h !== undefined
                        ? parseFloat(h2h.stats_home_attack_efficiency)
                        : 0
                    }
                  />
                </div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-2 flex py-3 rounded-xl">
                <div className="text-[#f7f7f7] text-[11px]">Goals Scored</div>
                <div className="text-[11px] text-[#FEA624] ">
                  {h2h?.stats_home_avg_goals_scored}
                </div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-2 flex py-3 rounded-xl">
                <div className="text-[#f7f7f7] text-[11px]">Goals Conceded</div>
                <div className="text-[11px] text-[#FEA624] ">
                  {h2h?.stats_home_avg_goals_conceded}
                </div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-2 flex py-3 rounded-xl">
                <div className="text-[#f7f7f7] text-[11px]">
                  Away Goals 1º Half
                </div>
                <div className="text-[11px] text-[#FEA624] ">
                  {h2h?.stats_home_avg_first_half_goals}
                </div>
              </div>
              <div className="bg-gradient-to-b items-center justify-between from-[#3f3f3f] to-[#282928] px-2 flex py-3 rounded-xl">
                <div className="text-[#f7f7f7] text-[11px]">
                  Away Goals 2º Half
                </div>
                <div className="text-[11px] text-[#FEA624] ">
                  {h2h?.stats_home_avg_second_half_goals}
                </div>
              </div>
            </div>
          )}
          {selectedTab === 'h2h' ? null : selectedTab === 'home' ? (
            <LastMatches lastFive={h2h?.stats_home_last_five} />
          ) : (
            <LastMatches lastFive={h2h?.stats_away_last_five} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
