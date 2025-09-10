import React from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'glow' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  className?: string
  icon?: React.ReactNode
  fullWidth?: boolean
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  icon,
  fullWidth = false
}: ButtonProps) {
  const baseClasses = 'btn-21st'
  const variantClasses = {
    primary: '',
    secondary: 'btn-glow',
    glow: 'btn-glow',
    ghost: 'bg-transparent border-2 border-white/20 text-white hover:bg-white/10'
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const widthClass = fullWidth ? 'w-full' : ''
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    className
  ].filter(Boolean).join(' ')

  return (
    <motion.button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {loading && (
        <motion.div
          className="loader-21st mr-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  )
}
