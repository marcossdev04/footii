import { useQuery } from 'react-query'
import { Skeleton } from './ui/skeleton'
import { IStats } from '@/types/Stats'
import { api } from '@/api/api'

export function Stats() {
  async function fetchStats() {
    const response = await api.get('/results/')
    return response.data.stats
  }
  const { data: stats, isLoading: loading } = useQuery<IStats>(
    ['getStats'],
    fetchStats,
  )
  if (loading) {
    return (
      <div className="grid mt-2 mb-1 grid-cols-12 gap-2 px-2 text-[10px]">
        {/* Matches */}
        <div className="col-span-2 flex justify-center items-center flex-col">
          <div className="bg-[#3D3D3D] rounded-t-lg w-full flex justify-center py-1">
            <Skeleton className="h-3 w-10" />
          </div>
          <div className="border border-zinc-700 py-1 w-full flex justify-center rounded-b-lg">
            <Skeleton className="h-3 w-8" />
          </div>
        </div>

        {/* Profit */}
        <div className="col-span-2">
          <div className="bg-[#3D3D3D] rounded-t-lg w-full flex justify-center py-1">
            <Skeleton className="h-3 w-10" />
          </div>
          <div className="w-full border border-zinc-700 py-1 flex justify-center rounded-b-lg">
            <Skeleton className="h-3 w-8" />
          </div>
        </div>

        {/* ROI% */}
        <div className="col-span-2">
          <div className="bg-[#3D3D3D] rounded-t-lg w-full flex justify-center py-1">
            <Skeleton className="h-3 w-10" />
          </div>
          <div className="w-full border border-zinc-700 py-1 flex justify-center rounded-b-lg">
            <Skeleton className="h-3 w-8" />
          </div>
        </div>

        {/* Results */}
        <div className="col-span-6">
          <div className="bg-[#3D3D3D] rounded-t-lg w-full flex justify-center py-1">
            <Skeleton className="h-3 w-32" />
          </div>
          <div className="grid border border-zinc-700 rounded-b-lg grid-cols-3">
            <div className="border-r border-zinc-700 py-1 flex justify-center">
              <Skeleton className="h-3 w-10" />
            </div>
            <div className="border-r border-zinc-700 flex py-1 justify-center">
              <Skeleton className="h-3 w-10" />
            </div>
            <div className="flex justify-center py-1">
              <Skeleton className="h-3 w-10" />
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="grid mt-2 mb-1 grid-cols-12 gap-2 px-2 text-[10px]">
      <div className="col-span-2 flex justify-center items-center flex-col">
        <div className="bg-[#3D3D3D] rounded-t-lg w-full flex justify-center">
          Matches
        </div>
        <div className="border border-zinc-700 py-1 w-full flex justify-center rounded-b-lg">
          {stats?.bets_count}
        </div>
      </div>
      <div className="col-span-2">
        <div className="bg-[#3D3D3D] rounded-t-lg w-full flex justify-center">
          Profit
        </div>
        <div className=" w-full border border-zinc-700 py-1 flex justify-center rounded-b-lg text-default">
          {stats?.hit_rate}
        </div>
      </div>
      <div className="col-span-2">
        <div className="bg-[#3D3D3D] rounded-t-lg w-full flex justify-center">
          ROI%
        </div>
        <div className=" w-full border border-zinc-700 py-1 flex justify-center rounded-b-lg text-default">
          220
        </div>
      </div>
      <div className="col-span-6">
        <div className="bg-[#3D3D3D] rounded-t-lg w-full flex justify-center">
          Results
        </div>
        <div className="grid border border-zinc-700 rounded-b-lg grid-cols-3">
          <div className="border-r border-zinc-700 py-1 text-default flex justify-center">
            20000
          </div>
          <div className="border-r border-zinc-700 flex py-1 text-[#FCE500] justify-center">
            5000
          </div>
          <div className="flex justify-center py-1 text-red-400">2500</div>
        </div>
      </div>
    </div>
  )
}
