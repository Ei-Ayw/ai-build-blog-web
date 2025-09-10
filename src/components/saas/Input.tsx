import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface InputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea'
  rows?: number
  maxLength?: number
  disabled?: boolean
  error?: string
  className?: string
  icon?: React.ReactNode
  required?: boolean
}

export default function Input({
  value,
  onChange,
  placeholder,
  label,
  type = 'text',
  rows = 4,
  maxLength,
  disabled = false,
  error,
  className = '',
  icon,
  required = false
}: InputProps) {
  const [focused, setFocused] = useState(false)

  const inputClasses = [
    type === 'textarea' ? 'input-saas textarea-saas' : 'input-saas',
    error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : '',
    focused ? 'ring-2 ring-teal-200' : '',
    className
  ].filter(Boolean).join(' ')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <motion.label
          className="block text-sm font-medium text-gray-700 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        {type === 'textarea' ? (
          <motion.textarea
            className={`${inputClasses} ${icon ? 'pl-10' : ''}`}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            rows={rows}
            maxLength={maxLength}
            disabled={disabled}
            required={required}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        ) : (
          <motion.input
            type={type}
            className={`${inputClasses} ${icon ? 'pl-10' : ''}`}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={disabled}
            required={required}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </div>
      
      {error && (
        <motion.p
          className="text-red-500 text-sm mt-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}
