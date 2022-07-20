import { toast, ToastOptions } from 'react-toastify'

interface IUseToast {
  successToast: (message: string, toastOptions?: ToastOptions) => void
  errorToast: (message: string, toastOptions?: ToastOptions) => void
  warningToast: (message: string, toastOptions?: ToastOptions) => void
  infoToast: (message: string, toastOptions?: ToastOptions) => void
}

const defaultOption: ToastOptions = {
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

const useToast = (): IUseToast => {
  const successToast = (message: string, toastOptions?: ToastOptions) => {
    toast.success(message, toastOptions)
  }

  const errorToast = (
    message: string,
    toastOptions: ToastOptions = defaultOption
  ) => {
    toast.error(message, toastOptions)
  }

  const warningToast = (message: string, toastOptions?: ToastOptions) => {
    toast.warn(message, toastOptions)
  }

  const infoToast = (message: string, toastOptions?: ToastOptions) => {
    toast.info(message, toastOptions)
  }

  return { successToast, errorToast, warningToast, infoToast }
}

export default useToast
