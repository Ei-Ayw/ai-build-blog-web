import React from 'react'
import { cn } from '../../lib/utils'

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral'
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
  className,
  size = 'md'
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'success':
        return 'bg-positive/10 text-positive border-positive/20'
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20'
      case 'error':
        return 'bg-negative/10 text-negative border-negative/20'
      case 'info':
        return 'bg-info/10 text-info border-info/20'
      case 'neutral':
        return 'bg-bg-2 text-text-3 border-border/50'
      default:
        return 'bg-bg-2 text-text-3 border-border/50'
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs'
      case 'lg':
        return 'px-4 py-2 text-sm'
      default:
        return 'px-3 py-1 text-sm'
    }
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        getStatusStyles(),
        getSizeStyles(),
        className
      )}
    >
      {children}
    </span>
  )
}
