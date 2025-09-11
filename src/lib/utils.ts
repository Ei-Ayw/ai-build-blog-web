import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Number formatting utilities
export function formatNumber(value: number, options?: {
  precision?: number
  showSign?: boolean
  unit?: string
}): string {
  const { precision = 0, showSign = false, unit = '' } = options || {}
  
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value)
  
  const sign = showSign && value > 0 ? '+' : ''
  return `${sign}${formatted}${unit ? ` ${unit}` : ''}`
}

// Format currency
export function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value)
}

// Format percentage
export function formatPercentage(value: number, precision = 1): string {
  return `${value.toFixed(precision)}%`
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}