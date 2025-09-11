import React from 'react'
import { cn } from '../../lib/utils'

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  rounded?: boolean
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  rounded = true
}) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-bg-2',
        rounded && 'rounded-md',
        className
      )}
      style={{
        width: width || '100%',
        height: height || '1rem'
      }}
    />
  )
}

// Predefined skeleton components
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('card-base p-6 space-y-4', className)}>
    <Skeleton height="1.5rem" width="60%" />
    <Skeleton height="1rem" />
    <Skeleton height="1rem" width="80%" />
    <div className="flex gap-2">
      <Skeleton height="2rem" width="4rem" />
      <Skeleton height="2rem" width="4rem" />
    </div>
  </div>
)

export const SkeletonTable: React.FC<{ rows?: number; columns?: number; className?: string }> = ({
  rows = 5,
  columns = 4,
  className
}) => (
  <div className={cn('card-base p-0', className)}>
    <div className="p-4 border-b border-border/50">
      <Skeleton height="1.25rem" width="30%" />
    </div>
    <div className="p-4 space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: columns }).map((_, j) => (
            <Skeleton key={j} height="1rem" width={j === 0 ? '40%' : '20%'} />
          ))}
        </div>
      ))}
    </div>
  </div>
)
