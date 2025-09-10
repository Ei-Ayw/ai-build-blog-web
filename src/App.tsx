import React from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bot, Sparkles, Zap, FileText } from 'lucide-react'
import TemplatesPage from './pages/TemplatesPage'
import OneSentencePage from './pages/OneSentencePage'
import EnhancedBlogGenerator from './components/EnhancedBlogGenerator'
import AIBlogGenerator from './components/saas/AIBlogGenerator'
import AbstractBackground from './components/saas/AbstractBackground'
import Button from './components/saas/Button'
import './styles/saas-theme.css'

const navigationItems = [
  { 
    key: '/', 
    icon: <FileText size={18} />, 
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
    icon: <Sparkles size={18} />, 
    label: '现代AI生成',
    path: '/ai'
  }
]

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname

  return (
    <div className="min-h-screen bg-white">
      <AbstractBackground />
      
      {/* 导航栏 */}
      <motion.nav
        className="relative z-10 border-b border-gray-200 bg-white/80 backdrop-blur-xl"
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
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
                <Bot size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Blog Builder
              </h1>
            </motion.div>

            {/* 导航菜单 */}
            <div className="flex space-x-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.key}
                  variant={currentPath === item.path ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  icon={item.icon}
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


