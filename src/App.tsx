import React from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bot, Sparkles, Zap, FileText, Layout } from 'lucide-react'
import LandingPage from './pages/LandingPage'
import TemplatesPage from './pages/TemplatesPage'
import OneSentencePage from './pages/OneSentencePage'
import TemplateGallery from './pages/TemplateGallery'
import EnhancedBlogGenerator from './components/EnhancedBlogGenerator'
import AIBlogGenerator from './components/saas/AIBlogGenerator'
import AbstractBackground from './components/saas/AbstractBackground'
import Button from './components/saas/Button'
import './styles/saas-theme.css'

const navigationItems = [
  { 
    key: '/', 
    icon: <FileText size={18} />, 
    label: '首页',
    path: '/'
  },
  { 
    key: '/templates', 
    icon: <Layout size={18} />, 
    label: '模板库',
    path: '/templates'
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

  // 如果是首页，直接显示Landing Page
  if (currentPath === '/' || currentPath === '/ai-build-blog-web/') {
    return <LandingPage />
  }

  return (
    <div className="min-h-screen bg-white">
      <AbstractBackground />
      
      {/* 导航栏 - 21st.dev风格 */}
      <motion.nav
        className="relative z-10 border-b border-gray-100 bg-white/90 backdrop-blur-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="w-10 h-10 bg-black rounded flex items-center justify-center">
                <Bot size={22} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-black">BlogBuilder</h1>
            </motion.div>

            {/* 导航菜单 */}
            <div className="flex space-x-1">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.key}
                  onClick={() => navigate(item.path)}
                  className={`
                    px-4 py-2 rounded font-medium text-sm transition-all duration-300 flex items-center space-x-2
                    ${currentPath === item.path 
                      ? 'bg-black text-white ' 
                      : 'text-gray-600 hover:text-black hover:bg-gray-100'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
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
                          <Route path="/templates" element={<TemplateGallery />} />
                          <Route path="/one" element={<OneSentencePage />} />
                          <Route path="/enhanced" element={<EnhancedBlogGenerator />} />
                          <Route path="/ai" element={<AIBlogGenerator />} />
                        </Routes>
      </motion.main>
    </div>
  )
}


