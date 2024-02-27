import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import resolveConfig from 'tailwindcss/resolveConfig'
import MobileDetet from 'mobile-detect'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const wait = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec))

export const twConfig = (config: any) => resolveConfig(config)

export const copyClipboard = async (str: string | undefined) => {
  if (!str) return
  navigator.clipboard.writeText(str)
}

export const isMobile = (): boolean => {
  const md = new MobileDetet(window.navigator.userAgent)
  return !!md.mobile()
}

export const isPC = (): boolean => !isMobile()

export const isOKXApp = (): boolean => {
  if (!window) return false
  return typeof window?.okxwallet !== 'undefined'
}

export const isBitGetApp = (): boolean => {
  if (!window) return false
  return typeof window?.bitkeep !== 'undefined'
}
