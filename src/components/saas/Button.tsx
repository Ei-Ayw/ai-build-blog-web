import React from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  disabled?: boolean
  className?: string
  icon?: React.ReactNode
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
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
  fullWidth = false,
  type = 'button'
}: ButtonProps) {
  const baseClasses = 'btn-saas'
  const variantClasses = {
    primary: 'btn-saas--primary',
    secondary: 'btn-saas--secondary',
    ghost: 'btn-saas--ghost'
  }
  
  const sizeClasses = {
    sm: 'btn-saas--sm',
    md: '',
    lg: 'btn-saas--lg',
    xl: 'btn-saas--xl'
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
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {loading && (
        <motion.div
          className="loader-saas"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      {icon && !loading && <span>{icon}</span>}
      {children}
    </motion.button>
  )
}
