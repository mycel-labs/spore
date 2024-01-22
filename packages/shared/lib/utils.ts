import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import resolveConfig from 'tailwindcss/resolveConfig'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const wait = (msec: number) => new Promise(resolve => setTimeout(resolve, msec))

export const twConfig = (config: any) => resolveConfig(config)

export const copyClipboard = async (str: string | undefined) => {
  if (!str) return
  navigator.clipboard.writeText(str)
}
