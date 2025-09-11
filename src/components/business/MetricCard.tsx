import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { cn, formatNumber, formatPercentage } from '../../lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: number
  change?: number
  unit?: string
  precision?: number
  showSign?: boolean
  className?: string
  variant?: 'default' | 'positive' | 'negative' | 'warning' | 'info'
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  unit = '',
  precision = 0,
  showSign = false,
  className,
  variant = 'default'
}) => {
  const getChangeIcon = () => {
    if (!change) return <Minus className="h-3 w-3" />
    return change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
  }

  const getChangeColor = () => {
    if (!change) return 'text-tertiary'
    return change > 0 ? 'text-positive' : 'text-negative'
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'positive':
        return 'border-positive/20 bg-positive/5'
      case 'negative':
        return 'border-negative/20 bg-negative/5'
      case 'warning':
        return 'border-warning/20 bg-warning/5'
      case 'info':
        return 'border-info/20 bg-info/5'
      default:
        return ''
    }
  }

  return (
    <Card className={cn('card-base', getVariantStyles(), className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-label text-quaternary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          <div className="text-h2 text-primary">
            {formatNumber(value, { precision, unit, showSign })}
          </div>
          {change !== undefined && (
            <div className={cn('flex items-center gap-1 text-caption', getChangeColor())}>
              {getChangeIcon()}
              <span>{formatPercentage(Math.abs(change))}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
