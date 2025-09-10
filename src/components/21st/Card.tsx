import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
  padding?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export default function Card({
  children,
  className = '',
  hover = true,
  glass = false,
  padding = 'md',
  onClick
}: CardProps) {
  const baseClasses = glass ? 'card-glass' : 'card-21st'
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const classes = [
    baseClasses,
    paddingClasses[padding],
    className
  ].filter(Boolean).join(' ')

  const MotionCard = motion.div

  return (
    <MotionCard
      className={classes}
      onClick={onClick}
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {children}
    </MotionCard>
  )
}
