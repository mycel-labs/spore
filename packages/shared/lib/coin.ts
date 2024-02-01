export const MYCEL_BASE_COIN_UNIT = 'umycel'
export const MYCEL_HUMAN_COIN_UNIT = 'MYCEL'
export const MYCEL_COIN_DECIMALS = 6

// Convert coin to human readable format
export function convertToDecimalString(amount: string, decimal: number, format = true): string {
  const numericAmount = parseInt(amount, 10)
  const adjustedAmount = numericAmount / Math.pow(10, decimal)
  return format ? new Intl.NumberFormat().format(adjustedAmount) : adjustedAmount.toString()
}
