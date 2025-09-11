import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'
import { FileX, Search, AlertCircle, Plus } from 'lucide-react'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
  variant?: 'default' | 'search' | 'error' | 'create'
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
  variant = 'default'
}) => {
  const getDefaultIcon = () => {
    switch (variant) {
      case 'search':
        return <Search className="h-12 w-12 text-text-4" />
      case 'error':
        return <AlertCircle className="h-12 w-12 text-negative" />
      case 'create':
        return <Plus className="h-12 w-12 text-text-4" />
      default:
        return <FileX className="h-12 w-12 text-text-4" />
    }
  }

  return (
    <Card className={cn('card-base', className)}>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4">
          {icon || getDefaultIcon()}
        </div>
        <h3 className="text-h4 text-primary mb-2">{title}</h3>
        {description && (
          <p className="text-body text-secondary max-w-sm mb-6">
            {description}
          </p>
        )}
        {action && (
          <Button onClick={action.onClick} variant="default">
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
