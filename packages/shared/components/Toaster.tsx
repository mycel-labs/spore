import toast, { Toaster as OrigToaster } from 'react-hot-toast'
import { isMobile } from '~/utils/lib'

export { toast }

export default function Toaster() {
  return (
    <OrigToaster
      position={isMobile() ? 'top-center' : 'bottom-center'}
      toastOptions={{
        className: 'border-2 border-black shadow-solid-sm rounded-md bg-white px-6 py-3',
        success: {
          icon: '👌',
        },
        error: {
          icon: '🚫',
        },
      }}
    />
  )
}
