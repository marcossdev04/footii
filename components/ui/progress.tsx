'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  reverse?: boolean
  white?: boolean
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, reverse = false, white = false, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-1.5 w-full overflow-hidden rounded-full bg-primary/20',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={`h-full w-full flex-1 ${white ? 'bg-white' : 'bg-[#26EF6B]'}  transition-all origin-left`}
      style={{
        transform: reverse
          ? `translateX(${100 - (value || 0)}%)` // Para direita para esquerda
          : `translateX(-${100 - (value || 0)}%)`, // Para esquerda para direita
      }}
    />
  </ProgressPrimitive.Root>
))

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
