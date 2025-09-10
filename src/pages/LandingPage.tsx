import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowRight, 
  Check, 
  Star, 
  Users, 
  Zap, 
  Shield, 
  Globe,
  Bot,
  Sparkles,
  FileText,
  Download,
  Play,
  ChevronDown,
  Menu,
  X
} from 'lucide-react'
import Button from '../components/saas/Button'
import Card from '../components/saas/Card'
import { AuroraBackground } from '../components/ui/aurora-background'
import { blogTemplates } from '../data/templates'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Smart Generation",
      description: "Based on advanced large language models, intelligently generate high-quality blog content, making creation simple and efficient."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "One-Click Generation",
      description: "Just describe in one sentence to generate complete blog articles, including titles, content, tags, etc."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Multiple Templates",
      description: "Provides various beautiful templates like minimal white, dark night, magazine style to meet different style needs."
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "One-Click Deploy",
      description: "After generation, you can directly download ZIP files, support multiple deployment methods, go live quickly."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      description: "Adopts enterprise-grade security standards, protects your data security, supports private deployment."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Language Support",
      description: "Supports Chinese and English content generation, adapting to global content creation needs."
    }
  ]

  const testimonials = [
    {
      name: "张小明",
      role: "技术博主",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content: "Blog Builder让我的内容创作效率提升了300%，AI生成的内容质量超出预期。"
    },
    {
      name: "李小红",
      role: "产品经理",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content: "界面设计非常现代，操作简单直观，是我们团队内容创作的最佳工具。"
    },
    {
      name: "王大华",
      role: "营销总监",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content: "从想法到发布，只需要几分钟时间，大大提升了我们的内容产出速度。"
    }
  ]

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for individuals and beginners",
      features: [
        "10 blog generations per month",
        "Basic template selection",
        "Standard AI model",
        "Community support"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "Perfect for content creators and small teams",
      features: [
        "100 blog generations per month",
        "All templates and themes",
        "Advanced AI model",
        "Priority technical support",
        "Custom brand settings",
        "Batch generation features"
      ],
      cta: "Upgrade to Pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "Perfect for large teams and enterprises",
      features: [
        "Unlimited blog generation",
        "Private deployment",
        "Custom AI model training",
        "Dedicated account manager",
        "API access",
        "Team collaboration features",
        "Advanced analytics"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ]

  const faqs = [
    {
      question: "AI生成的内容质量如何？",
      answer: "我们使用先进的大语言模型，生成的内容质量接近人工创作水平，同时支持多轮优化和编辑。"
    },
    {
      question: "支持哪些部署方式？",
      answer: "支持静态网站部署、WordPress导入、Markdown导出等多种方式，满足不同用户需求。"
    },
    {
      question: "数据安全如何保障？",
      answer: "我们采用企业级安全标准，所有数据加密传输和存储，支持私有化部署，确保数据安全。"
    },
    {
      question: "可以自定义模板吗？",
      answer: "专业版和企业版用户支持自定义模板，可以上传自己的设计文件或使用我们的模板编辑器。"
    }
  ]

  return (
    <AuroraBackground className="min-h-screen" showRadialGradient={true}>
      {/* 导航栏 - Aurora风格 */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/20 backdrop-blur-2xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2 sm:space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded flex items-center justify-center">
                <Bot size={18} className="sm:w-[22px] sm:h-[22px] text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white">BlogBuilder</h1>
            </motion.div>

            {/* 桌面导航 */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#features" className="text-white hover:text-white/80 transition-colors font-medium text-sm lg:text-base ">Features</a>
              <a href="#pricing" className="text-white hover:text-white/80 transition-colors font-medium text-sm lg:text-base ">Pricing</a>
              <a href="#templates" className="text-white hover:text-white/80 transition-colors font-medium text-sm lg:text-base ">Templates</a>
            </div>

            {/* CTA按钮 */}
            <div className="hidden md:flex items-center space-x-3">
                <button 
                  onClick={() => navigate('/ai-build-blog-web/ai')} 
                  className="bg-white text-black rounded-full px-4 sm:px-6 py-2 font-medium text-sm transition-all duration-300 hover:bg-white/90 "
                >
                  Get Started
                </button>
            </div>

            {/* 移动端菜单按钮 */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
            </button>
          </div>

          {/* 移动端菜单 */}
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 py-4 border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-white hover:text-white/80 text-sm ">Features</a>
                <a href="#pricing" className="text-white hover:text-white/80 text-sm ">Pricing</a>
                <a href="#templates" className="text-white hover:text-white/80 text-sm ">Templates</a>
                <button 
                  onClick={() => navigate('/ai-build-blog-web/ai')} 
                  className="text-white hover:text-white/80 text-left text-sm "
                >
                  Get Started
                </button>
                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 px-4 py-2 bg-transparent border border-white text-white rounded-xl text-sm ">Login</button>
                  <button className="flex-1 px-4 py-2 bg-white text-black rounded-xl text-sm ">Free Trial</button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero区域 - Aurora背景风格 */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-24">
        <motion.div
          className="text-center max-w-7xl mx-auto w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
            {/* 主标题 - 响应式设计 */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center mb-6 sm:mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="block text-black ">Create Perfect Blogs</span>
              <span className="block text-black ">
                In Seconds
              </span>
            </motion.h1>
            
            {/* 副标题 - 响应式设计 */}
            <motion.div
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-black/80 py-4 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className=" mb-2 sm:mb-4 font-medium">Describe your ideas, AI generates complete blog content.</p>
              <p className=" font-medium">From title to content, from layout to publish, everything happens in seconds.</p>
            </motion.div>
            
            {/* CTA按钮 - 响应式设计 */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.button
                onClick={() => navigate('/ai-build-blog-web/templates')}
                className="w-full sm:w-auto bg-white text-black rounded-full px-6 sm:px-8 py-3 sm:py-4 font-medium text-base sm:text-lg transition-all duration-300 hover:bg-white/90  flex items-center justify-center space-x-2"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Browse Templates</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
              
              <motion.button
                className="w-full sm:w-auto bg-transparent border-2 border-black text-black rounded-full px-6 sm:px-8 py-3 sm:py-4 font-medium text-base sm:text-lg transition-all duration-300 hover:bg-black hover:text-white  flex items-center justify-center space-x-2"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>
            
            {/* 信任指标 - 响应式设计 */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-12 text-xs sm:text-sm text-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <div className="flex items-center">
                <div className="w-1 h-1 bg-black/70 rounded-full mr-2"></div>
                Free to Start
              </div>
              <div className="flex items-center">
                <div className="w-1 h-1 bg-black/70 rounded-full mr-2"></div>
                No Registration
              </div>
              <div className="flex items-center">
                <div className="w-1 h-1 bg-black/70 rounded-full mr-2"></div>
                Instant Generation
              </div>
            </motion.div>
          </motion.div>
        </section>

      {/* 产品演示区域 - Aurora风格 */}
      <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center mb-6">
              Simple Three Steps
            </h2>
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/80 py-4 max-w-4xl mx-auto">
              <p className="mb-2 sm:mb-4">No complex operations needed, just describe your requirements</p>
              <p>AI generates complete blog content for you</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Describe Requirements",
                description: "Simply describe the blog topic and style you want to create",
                icon: <FileText className="w-8 h-8" />
              },
              {
                step: "02", 
                title: "AI Generation",
                description: "Our AI will generate complete blog content for you",
                icon: <Bot className="w-8 h-8" />
              },
              {
                step: "03",
                title: "One-Click Deploy",
                description: "Choose template and download with one click, go live quickly",
                icon: <Download className="w-8 h-8" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="group text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  {/* 步骤编号 */}
                  <div className="text-6xl font-black text-white/20 mb-4 group-hover:text-white/30 transition-colors">
                    {item.step}
                  </div>
                  
                  {/* 图标 */}
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  
                  {/* 内容 */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/70 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 功能特性区域 - Aurora风格 */}
      <section id="features" className="relative z-10 py-16 sm:py-24 lg:py-32 px-0 bg-gradient-to-b from-slate-800 via-slate-700 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center mb-6">
              Why Choose Us
            </h2>
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/80 py-4 max-w-4xl mx-auto">
              <p>Not just an AI tool, but your creative partner</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
                  {/* 图标 */}
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  
                  {/* 内容 */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 定价方案区域 */}
      <section id="pricing" className="relative z-10 py-16 sm:py-20 lg:py-24 px-0 bg-gradient-to-b from-slate-600 via-slate-500 to-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center mb-6">
              Choose Your Plan
            </h2>
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/80 py-4 max-w-4xl mx-auto">
              <p>From free to enterprise, meet the needs of users of different scales</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1 rounded-xl text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                )}
                <div className={`p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl h-full transition-all duration-300 ${plan.popular ? 'ring-2 ring-white/30 bg-white/10' : ''}`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-white/70 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      <span className="text-white/70 ml-1">{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    className={`w-full px-6 py-3 rounded-xl font-medium text-lg transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30' 
                        : 'bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/40'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA区域 - 带模板展示 */}
      <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-0 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-400 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center mb-6">
              Ready to Start Your AI Content Creation Journey?
            </h2>
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/80 py-4 mb-12 max-w-4xl mx-auto">
              <p className="mb-2 sm:mb-4">Experience AI-powered blog generation tools immediately</p>
              <p>From idea to publish in just minutes</p>
            </div>
            
            {/* CTA按钮 */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 sm:mb-20">
              <motion.button
                onClick={() => navigate('/ai-build-blog-web/ai')}
                className="w-full sm:w-auto bg-white text-black rounded-full px-6 sm:px-8 py-3 sm:py-4 font-medium text-base sm:text-lg lg:text-xl transition-all duration-300 hover:bg-white/90  flex items-center justify-center space-x-2 sm:space-x-3"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Free</span>
                <ArrowRight size={20} className="sm:w-6 sm:h-6" />
              </motion.button>
              <motion.button
                onClick={() => navigate('/ai-build-blog-web/templates')}
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 font-medium text-base sm:text-lg lg:text-xl transition-all duration-300 hover:bg-white hover:text-black "
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Templates
              </motion.button>
            </div>
          </motion.div>

          {/* 模板展示区域 */}
          <div className="relative">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              Choose Your Favorite Template Style
            </h3>
            
            {/* 从右到左滚动的模板卡片 */}
            <div className="relative overflow-hidden">
              <motion.div
                className="flex space-x-8"
                animate={{
                  x: [0, -100 * blogTemplates.length]
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {[...blogTemplates, ...blogTemplates].map((template, index) => (
                  <motion.div
                    key={`${template.id}-${index}`}
                    className="flex-shrink-0 w-80"
                    whileHover={{ y: -10, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 h-96 flex flex-col">
                      {/* 模板预览 */}
                      <div className="flex-1 bg-white/5 rounded-xl mb-4 overflow-hidden">
                        <div 
                          className="w-full h-full bg-gradient-to-br"
                          style={{
                            background: `linear-gradient(135deg, ${template.style.colors.primary}20, ${template.style.colors.secondary}20)`
                          }}
                        >
                          <div className="p-4 h-full flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="h-3 bg-white/30 rounded w-3/4"></div>
                              <div className="h-2 bg-white/20 rounded w-1/2"></div>
                              <div className="h-2 bg-white/20 rounded w-2/3"></div>
                            </div>
                            <div className="space-y-2">
                              <div className="h-2 bg-white/20 rounded w-full"></div>
                              <div className="h-2 bg-white/20 rounded w-3/4"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* 模板信息 */}
                      <div className="space-y-3">
                        <h4 className="text-white font-bold text-lg">{template.name}</h4>
                        <p className="text-white/80 text-sm line-clamp-2">{template.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {template.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-white/20 text-white/90 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="relative z-10 bg-gradient-to-b from-slate-300 via-slate-200 to-slate-300 text-slate-800 py-12 sm:py-16 px-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Blog Builder</h3>
              </div>
              <p className="text-slate-600 mb-6 max-w-md">
                AI-powered content creation platform that makes it easy for everyone to create high-quality blog content.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <Users size={20} className="text-white" />
                </div>
                <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <Globe size={20} className="text-white" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-slate-800">Product</h4>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#" className="hover:text-slate-800 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-slate-800 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-slate-800 transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-slate-800 transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-slate-800">Support</h4>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#" className="hover:text-slate-800 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-slate-800 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-400 mt-12 pt-8 text-center text-slate-600">
            <p>&copy; 2024 Blog Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </AuroraBackground>
  )
}
