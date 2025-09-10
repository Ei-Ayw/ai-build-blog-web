import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SelectOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  error?: string
  className?: string
  required?: boolean
}

export default function Select({
  options,
  value,
  onChange,
  placeholder,
  label,
  disabled = false,
  error,
  className = '',
  required = false
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [focused, setFocused] = useState(false)

  const selectedOption = options.find(option => option.value === value)

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue)
    setIsOpen(false)
  }

  return (
    <motion.div
      className={`relative w-full ${className}`}
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
        <motion.button
          type="button"
          className={`
            w-full px-4 py-3 text-left bg-white border rounded-xl
            ${focused ? 'border-teal-500 ring-2 ring-teal-200' : 'border-gray-200'}
            ${error ? 'border-red-300 ring-2 ring-red-200' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'cursor-pointer hover:border-gray-300'}
            transition-all duration-200 flex items-center justify-between
          `}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          whileHover={{ scale: disabled ? 1 : 1.01 }}
          whileTap={{ scale: disabled ? 1 : 0.99 }}
          disabled={disabled}
        >
          <div className="flex items-center">
            {selectedOption?.icon && (
              <span className="mr-3 text-gray-400">
                {selectedOption.icon}
              </span>
            )}
            <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {options.map((option, index) => (
                <motion.button
                  key={option.value}
                  type="button"
                  className={`
                    w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200
                    ${option.value === value ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-500' : 'text-gray-700'}
                    ${index === 0 ? 'rounded-t-xl' : ''}
                    ${index === options.length - 1 ? 'rounded-b-xl' : ''}
                  `}
                  onClick={() => handleSelect(option.value)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center">
                    {option.icon && (
                      <span className="mr-3 text-gray-400">
                        {option.icon}
                      </span>
                    )}
                    <div>
                      <div className="font-medium">{option.label}</div>
                      {option.description && (
                        <div className="text-sm text-gray-500 mt-1">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
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
