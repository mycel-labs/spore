import { cn } from '@/lib/utils'
import { Atom, CheckCircle } from 'lucide-react'

export default function Button({
  isLoading = false,
  disabled = false,
  success = false,
  className = '',
  children,
  ...props
}: {
  isLoading?: boolean
  disabled?: boolean
  success?: boolean
  className?: string
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      className={cn('btn', className)}
      disabled={isLoading || disabled || success}
      {...props}
    >
      {isLoading && <Atom className="animate-spin mr-4 -ml-4" />}
      {success && <CheckCircle className="text-green-500 mr-4 -ml-4" />}
      {success ? <span className="line-through">{children}</span> : children}
    </button>
  )
}
