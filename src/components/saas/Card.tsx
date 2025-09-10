import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
  padding?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  elevation?: 'sm' | 'md' | 'lg'
}

export default function Card({
  children,
  className = '',
  hover = true,
  glass = false,
  padding = 'md',
  onClick,
  elevation = 'sm'
}: CardProps) {
  const baseClasses = glass ? 'card-saas card-saas--glass' : 'card-saas'
  
  const paddingClasses = {
    sm: 'card-saas--sm',
    md: 'card-saas--md',
    lg: 'card-saas--lg'
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
      whileHover={hover ? { y: -2, scale: 1.01 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {children}
    </MotionCard>
  )
}
