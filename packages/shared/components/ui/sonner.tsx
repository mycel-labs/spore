import { toast, Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="system"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:rounded group-[.toaster]:outline group-[.toaster]:outline-3 group-[.toaster]:outline-dark group-[.toaster]:border-3 group-[.toaster]:border-light group-[.toaster]:bg-dark group-[.toaster]:text-light group-[.toaster]:border-dark group-[.toaster]:shadow-xl font-title text-2xl',
          description: 'group-[.toast]:text-light',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-dark',
          cancelButton: 'group-[.toast]:bg-secondary group-[.toast]:text-dark',
        },
      }}
      {...props}
    />
  )
}

export { toast, Toaster }
