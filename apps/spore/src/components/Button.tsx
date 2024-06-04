import { cn } from '@/lib/utils'
import { Atom } from 'lucide-react'

export default function Button({
  isLoading = false,
  disabled = false,
  className = '',
  children,
  ...props
}: {
  isLoading?: boolean
  disabled?: boolean
  className?: string
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      className={cn('btn', className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Atom className="animate-spin mr-4 -ml-4" />}
      {children}
    </button>
  )
}
