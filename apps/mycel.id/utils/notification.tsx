// https://fkhadra.github.io/react-toastify/introduction/
import { toast } from 'react-toastify'

interface ToastProps {
  message?: string
  url?: string
}

export const showPromiseToast = (promise: Promise<unknown>) => {
  toast.promise(promise, {
    pending: 'Waiting confirmation...',
    success: 'Success!',
    error: 'Error',
  })
}

export const showErrorToast = ({ message }: ToastProps) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  })
}
export const showSuccessToast = ({ url, message }: ToastProps) => {
  toast.success(linkDefault(url, message), {
    position: 'top-right',
    autoClose: 6500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  })
}

export const showDefaultToast = ({ message }: ToastProps) => {
  toast.info(messageDefault(message), {
    position: 'top-right',
    autoClose: 9500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  })
}

const messageDefault = (message?: string) => {
  return (
    <div>
      <a>{message ? message : 'Waiting confirmation...'}</a>
    </div>
  )
}

const linkDefault = (url?: string, message?: string) => {
  return (
    <div>
      <a href={url} target="_blank" rel="noreferrer">
        {message ? message : 'Success! Click here to see your transaction!'}
      </a>
    </div>
  )
}
