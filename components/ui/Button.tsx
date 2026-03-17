import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  as?: 'button' | 'div'
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brown-800 text-cream hover:bg-brown-700 active:bg-brown-900 shadow-luxury hover:shadow-luxury-lg',
  secondary:
    'bg-sand text-brown-800 hover:bg-sand-dark border border-gold-200 hover:border-gold-300',
  outline:
    'bg-transparent text-brown-800 border border-brown-300 hover:bg-sand hover:border-brown-500',
  ghost: 'bg-transparent text-brown-700 hover:bg-sand hover:text-brown-900',
  gold: 'bg-gold-500 text-brown-950 hover:bg-gold-400 shadow-gold-lg font-medium',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs tracking-[0.1em]',
  md: 'px-6 py-3 text-sm tracking-[0.1em]',
  lg: 'px-8 py-4 text-sm tracking-[0.12em]',
  xl: 'px-10 py-5 text-base tracking-[0.12em]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'relative inline-flex items-center justify-center gap-2 rounded-lg font-sans uppercase transition-all duration-200 ease-luxury',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </span>
        )}
        <span className={cn(loading && 'opacity-0')}>{children}</span>
      </button>
    )
  }
)
Button.displayName = 'Button'
