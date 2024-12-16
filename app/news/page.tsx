import Image from 'next/image'
import teste from '@/assets/GettyImages-1708473303-e1696338357503.webp'

export default function News() {
  return (
    <div className="flex flex-col px-5 py-3">
      <div className="flex bg-[#272927] justify-between p-2 rounded-lg">
        <div className="flex flex-col gap-2">
          <div className="text-sm">ESPN</div>
          <div className="text-xs">
            Lamine yamall will be transfer to Real Madrid in secound semestrer
            of 2025
          </div>
          <div className="text-xs text-zinc-400">December 16, 2024</div>
        </div>
        <div className="w-[150px]">
          <Image className="rounded-lg border" src={teste} alt="teste" />
        </div>
      </div>
    </div>
  )
}
