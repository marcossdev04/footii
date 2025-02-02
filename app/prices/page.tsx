'use client'
import { HeaderLanding } from '@/components/HeaderLanding'
import { PricingCard } from '@/components/ui/dark-gradient-pricing'
import { PricingInteraction } from '@/components/ui/pricing-interaction'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function Page() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return (
      <>
        <HeaderLanding />
        <div className="min-h-screen w-full relative text-white p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4">Pricing Plans</h2>
          <PricingInteraction anual={99.99} month={9.99} quarter={19.99} />
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen w-full relative text-white overflow-x-hidden">
      <HeaderLanding />
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 md:px-8">
        <div className="mb-12 space-y-3">
          <h2 className="text-center text-3xl font-semibold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
            Pricing
          </h2>
          <p className="text-center text-base text-muted-foreground md:text-lg">
            Use it for free for yourself, upgrade when your team needs advanced
            control.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <PricingCard
            className="border-y-zinc-200"
            best={1}
            tier="Month"
            price="$0"
            bestFor="Best for 1-5 users"
            CTA="14-day free trial"
            benefits={[
              { text: 'One workspace', checked: true },
              { text: 'Email support', checked: true },
              { text: '1 day data retention', checked: true },
              { text: 'Custom roles', checked: true },
              { text: 'Priority support', checked: true },
              { text: 'SSO', checked: true },
            ]}
          />
          <PricingCard
            className="border-y-default"
            best={3}
            tier="Quarter"
            price="$29"
            bestFor="Best for 5-50 users"
            CTA="14-day free trial"
            benefits={[
              { text: 'Five workspaces', checked: true },
              { text: 'Email support', checked: true },
              { text: '7 day data retention', checked: true },
              { text: 'Custom roles', checked: true },
              { text: 'Priority support', checked: true },
              { text: 'SSO', checked: true },
            ]}
          />
          <PricingCard
            className="border-y-zinc-200"
            best={2}
            tier="Annual"
            price="$100"
            bestFor="Best for 50+ users"
            CTA="14-day free trial"
            benefits={[
              { text: 'Unlimited workspaces', checked: true },
              { text: 'Email support', checked: true },
              { text: '30 day data retention', checked: true },
              { text: 'Custom roles', checked: true },
              { text: 'Priority support', checked: true },
              { text: 'SSO', checked: true },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
