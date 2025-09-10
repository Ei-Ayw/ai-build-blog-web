import React from 'react'
import { motion } from 'framer-motion'

interface TabItem {
  key: string
  label: string
  icon?: React.ReactNode
  content: React.ReactNode
}

interface TabsProps {
  items: TabItem[]
  activeKey?: string
  onChange?: (key: string) => void
  className?: string
}

export default function Tabs({
  items,
  activeKey,
  onChange,
  className = ''
}: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(activeKey || items[0]?.key)

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    onChange?.(key)
  }

  const activeContent = items.find(item => item.key === activeTab)?.content

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Headers */}
      <div className="flex bg-gray-800/50 rounded-xl p-1 border border-gray-600 mb-6">
        {items.map((item) => (
          <motion.button
            key={item.key}
            className={`
              flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-300
              ${activeTab === item.key 
                ? 'text-white' 
                : 'text-gray-400 hover:text-white'
              }
            `}
            onClick={() => handleTabChange(item.key)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {item.icon && (
              <span className="mr-2">
                {item.icon}
              </span>
            )}
            {item.label}
          </motion.button>
        ))}
        
        {/* Active Tab Indicator */}
        <motion.div
          className="absolute bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg"
          style={{
            height: '40px',
            zIndex: -1
          }}
          initial={false}
          animate={{
            x: items.findIndex(item => item.key === activeTab) * (100 / items.length) + '%',
            width: `${100 / items.length}%`
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {activeContent}
      </motion.div>
    </div>
  )
}
