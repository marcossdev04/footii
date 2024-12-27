import logo from '@/assets/footilogo.svg'
import Image from 'next/image'
import ia from '@/assets/ai.svg'
import word from '@/assets/world.svg'
import results from '@/assets/results.svg'
import clock from '@/assets/alarm.svg'
import { Footer } from '@/components/footer'
import Link from 'next/link'
export default function Page() {
  return (
    <div className="px-6 flex flex-col justify-center items-center min-h-[90vh] ">
      <div className="flex mt-4 justify-center gap-3 flex-col items-center">
        <div>
          <Image src={logo} alt="logo" />
        </div>
        <div className="text-base text-center leading-tight font-bai-bold">
          Start your successful journey in football betting
        </div>
        <div className="text-sm text-center">
          Footi provides football match recommendations parameterized by an AI
          algorithm
        </div>
      </div>
      <div className="grid grid-cols-2 mt-4 text-xs justify-center gap-6">
        <div className="flex flex-col gap-1 items-center text-center">
          <div>
            <Image src={ia} alt="ia" />
          </div>
          <div>AI powered soccer tips</div>
        </div>
        <div className="flex flex-col gap-1 items-center text-center">
          <div>
            <Image src={word} alt="ia" />
          </div>
          <div>All soccer leagues worldwide</div>
        </div>
        <div className="flex flex-col gap-1 items-center text-center">
          <div>
            <Image src={results} alt="ia" />
          </div>
          <div>Three years of positive results</div>
        </div>
        <div className="flex flex-col gap-1 items-center text-center">
          <div>
            <Image src={clock} alt="ia" />
          </div>
          <div>Pre-live odds</div>
        </div>
      </div>
      <div className="flex flex-col my-4 gap-2 w-full">
        <Link
          href={'/login'}
          className="bg-default text-center text-black text-xl font-bai-bold rounded-lg py-1.5 hover:bg-opacity-80 transition-colors duration-300"
        >
          Join Now
        </Link>
        <Link
          href={'/register'}
          className="bg-default text-black text-center text-xl font-bai-bold rounded-lg py-1.5"
        >
          Register
        </Link>
      </div>
      <Footer />
    </div>
  )
}
