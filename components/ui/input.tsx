import * as React from 'react'
import { cn } from '@/lib/utils'

interface Props extends React.ComponentProps<'input'> {
  transparent?: boolean
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, type, transparent = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md  px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-default disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          transparent ? 'bg-transparent' : 'bg-[#141414]',
          '[&:-webkit-autofill]:text-foreground',
          transparent
            ? '[&:-webkit-autofill]:shadow-[0_0_0px_1000px_transparent] border border-white'
            : '[&:-webkit-autofill]:shadow-[0_0_0px_1000px_#141414_inset] border border-input',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
