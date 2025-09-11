import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { cn } from '../../lib/utils'

interface Column<T> {
  key: keyof T
  title: string
  render?: (value: any, record: T) => React.ReactNode
  width?: string
  align?: 'left' | 'center' | 'right'
}

interface DataTableProps<T> {
  title?: string
  data: T[]
  columns: Column<T>[]
  className?: string
  compact?: boolean
  striped?: boolean
}

export function DataTable<T extends Record<string, any>>({
  title,
  data,
  columns,
  className,
  compact = false,
  striped = true
}: DataTableProps<T>) {
  return (
    <Card className={cn('card-base', className)}>
      {title && (
        <CardHeader className="pb-4">
          <CardTitle className="text-h4 text-primary">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn('p-0', title && 'pt-0')}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={cn(
                      'px-4 py-3 text-left text-label text-quaternary font-medium',
                      column.align === 'center' && 'text-center',
                      column.align === 'right' && 'text-right',
                      compact && 'px-3 py-2'
                    )}
                    style={{ width: column.width }}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((record, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={cn(
                    'border-b border-border/30 last:border-b-0 transition-colors hover:bg-bg-2/50',
                    striped && rowIndex % 2 === 1 && 'bg-bg-2/30',
                    compact && 'text-sm'
                  )}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={cn(
                        'px-4 py-3 text-body text-secondary',
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right',
                        compact && 'px-3 py-2'
                      )}
                    >
                      {column.render
                        ? column.render(record[column.key], record)
                        : record[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
