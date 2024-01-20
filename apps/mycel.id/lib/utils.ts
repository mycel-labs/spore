import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import tailwindConfig from '@/tailwind.config.js'
import resolveConfig from 'tailwindcss/resolveConfig'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const wait = (msec: number) => new Promise(resolve => setTimeout(resolve, msec))

export const twConfig = resolveConfig(tailwindConfig)

export const copyClipboard = async (str: string | undefined) => {
  if (!str) return
  navigator.clipboard.writeText(str)
}
