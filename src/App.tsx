import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bot, Sparkles, Zap } from 'lucide-react'
import TemplatesPage from './pages/TemplatesPage'
import OneSentencePage from './pages/OneSentencePage'
import EnhancedBlogGenerator from './components/EnhancedBlogGenerator'
import AIBlogGenerator from './components/21st/AIBlogGenerator'
import AnimatedBackground from './components/21st/AnimatedBackground'
import Button from './components/21st/Button'
import './styles/21st-theme.css'

const navigationItems = [
  { 
    key: '/', 
    icon: <Sparkles size={18} />, 
    label: '模板生成',
    path: '/'
  },
  { 
    key: '/one', 
    icon: <Zap size={18} />, 
    label: '一句话生成',
    path: '/one'
  },
  { 
    key: '/enhanced', 
    icon: <Bot size={18} />, 
    label: 'AI增强生成',
    path: '/enhanced'
  },
  { 
    key: '/ai', 
    icon: <Bot size={18} />, 
    label: '21st风格AI',
    path: '/ai'
  }
]

export default function App() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AnimatedBackground />
      
      {/* 导航栏 */}
      <motion.nav
        className="relative z-10 border-b border-gray-700 bg-gray-900/80 backdrop-blur-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Blog Builder
              </h1>
            </motion.div>

            {/* 导航菜单 */}
            <div className="flex space-x-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.key}
                  variant={currentPath === item.path ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => window.location.href = item.path}
                  icon={item.icon}
                  className={currentPath === item.path ? 'bg-gradient-to-r from-purple-500 to-blue-500' : ''}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* 主内容区域 */}
      <motion.main
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Routes>
          <Route path="/" element={<TemplatesPage />} />
          <Route path="/one" element={<OneSentencePage />} />
          <Route path="/enhanced" element={<EnhancedBlogGenerator />} />
          <Route path="/ai" element={<AIBlogGenerator />} />
        </Routes>
      </motion.main>
    </div>
  )
}


