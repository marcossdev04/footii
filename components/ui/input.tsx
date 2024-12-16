import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-[#141414] px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-[#141414] file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-default disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          '[&:-webkit-autofill]:bg-[#141414] [&:-webkit-autofill]:shadow-[0_0_0px_1000px_white_inset] dark:[&:-webkit-autofill]:shadow-[0_0_0px_1000px_#141414_inset]',
          '[&:-webkit-autofill]:text-foreground',
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
