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

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI智能生成",
      description: "基于先进的大语言模型，智能生成高质量博客内容，让创作变得简单高效。"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "一键生成",
      description: "只需一句话描述，即可生成完整的博客文章，包含标题、内容、标签等。"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "多种模板",
      description: "提供极简白、极夜黑、杂志风等多种精美模板，满足不同风格需求。"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "一键部署",
      description: "生成完成后可直接下载ZIP文件，支持多种部署方式，快速上线。"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "安全可靠",
      description: "采用企业级安全标准，保护您的数据安全，支持私有化部署。"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "多语言支持",
      description: "支持中英文内容生成，适应全球化内容创作需求。"
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
      name: "免费版",
      price: "¥0",
      period: "/月",
      description: "适合个人用户和初学者",
      features: [
        "每月10篇博客生成",
        "基础模板选择",
        "标准AI模型",
        "社区支持"
      ],
      cta: "开始免费使用",
      popular: false
    },
    {
      name: "专业版",
      price: "¥99",
      period: "/月",
      description: "适合内容创作者和小团队",
      features: [
        "每月100篇博客生成",
        "所有模板和主题",
        "高级AI模型",
        "优先技术支持",
        "自定义品牌设置",
        "批量生成功能"
      ],
      cta: "升级到专业版",
      popular: true
    },
    {
      name: "企业版",
      price: "¥299",
      period: "/月",
      description: "适合大型团队和企业",
      features: [
        "无限博客生成",
        "私有化部署",
        "定制AI模型训练",
        "专属客户经理",
        "API接口访问",
        "团队协作功能",
        "高级数据分析"
      ],
      cta: "联系销售",
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
    <div className="min-h-screen bg-white">
      {/* 导航栏 - 21st.dev风格 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                <Bot size={22} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-black">BlogBuilder</h1>
            </motion.div>

            {/* 桌面导航 */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-black transition-colors font-medium">功能</a>
              <a href="#pricing" className="text-gray-600 hover:text-black transition-colors font-medium">定价</a>
              <a href="#testimonials" className="text-gray-600 hover:text-black transition-colors font-medium">评价</a>
              <a href="#faq" className="text-gray-600 hover:text-black transition-colors font-medium">帮助</a>
            </div>

            {/* CTA按钮 */}
            <div className="hidden md:flex items-center space-x-3">
              <button 
                onClick={() => navigate('/ai')} 
                className="px-6 py-2.5 bg-black text-white rounded-2xl font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                开始使用
              </button>
            </div>

            {/* 移动端菜单按钮 */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* 移动端菜单 */}
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 py-4 border-t border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-gray-900">功能特性</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900">定价方案</a>
                <a href="#testimonials" className="text-gray-600 hover:text-gray-900">用户评价</a>
                <a href="#faq" className="text-gray-600 hover:text-gray-900">常见问题</a>
                <button 
                  onClick={() => navigate('/ai')} 
                  className="text-gray-600 hover:text-gray-900 text-left"
                >
                  开始使用
                </button>
                <div className="flex space-x-4 pt-4">
                  <Button variant="ghost" size="sm" fullWidth>登录</Button>
                  <Button variant="primary" size="sm" fullWidth>免费试用</Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero区域 - 21st.dev风格 */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* 徽章 */}
              <motion.div
                className="inline-flex items-center px-6 py-3 bg-black/5 backdrop-blur-sm border border-black/10 rounded-full text-sm font-medium mb-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-gray-700">AI驱动的博客创作平台</span>
              </motion.div>
              
              {/* 主标题 - 大胆排版 */}
              <motion.h1
                className="text-6xl md:text-8xl font-black text-black mb-8 leading-[0.9] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="block">创建</span>
                <span className="block bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
                  完美博客
                </span>
                <span className="block text-4xl md:text-5xl font-light text-gray-500 mt-4">
                  只需几秒钟
                </span>
              </motion.h1>
              
              {/* 副标题 - 简洁描述 */}
              <motion.p
                className="text-lg md:text-xl text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                描述你的想法，AI为你生成完整的博客内容。从标题到正文，从排版到发布，一切都在瞬间完成。
              </motion.p>
              
              {/* CTA按钮 - 现代设计 */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <motion.button
                  onClick={() => navigate('/ai')}
                  className="group relative px-8 py-4 bg-black text-white rounded-2xl font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center">
                    开始创作
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.button>
                
                <motion.button
                  className="px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl font-medium text-lg transition-all duration-300 hover:border-gray-300 hover:bg-gray-50"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center">
                    <Play className="mr-2 w-5 h-5" />
                    观看演示
                  </span>
                </motion.button>
              </motion.div>
              
              {/* 信任指标 - 极简设计 */}
              <motion.div
                className="flex items-center justify-center space-x-12 text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <div className="flex items-center">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                  免费开始
                </div>
                <div className="flex items-center">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                  无需注册
                </div>
                <div className="flex items-center">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                  即时生成
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 产品演示区域 - 21st.dev风格 */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-black mb-6 leading-tight">
              简单三步
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
              无需复杂操作，只需描述你的需求，AI为你生成完整的博客内容
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "描述需求",
                description: "简单描述你想要创建的博客主题和风格",
                icon: <FileText className="w-8 h-8" />
              },
              {
                step: "02", 
                title: "AI生成",
                description: "我们的AI将为你生成完整的博客内容",
                icon: <Bot className="w-8 h-8" />
              },
              {
                step: "03",
                title: "一键部署",
                description: "选择模板并一键下载，快速上线",
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
                  <div className="text-6xl font-black text-gray-200 mb-4 group-hover:text-gray-300 transition-colors">
                    {item.step}
                  </div>
                  
                  {/* 图标 */}
                  <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-white mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  
                  {/* 内容 */}
                  <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-gray-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 功能特性区域 - 21st.dev风格 */}
      <section id="features" className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-black mb-6 leading-tight">
              为什么选择我们
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
              不仅仅是AI工具，更是你的创作伙伴
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 bg-white border border-gray-100 rounded-3xl transition-all duration-500 group-hover:border-gray-200 group-hover:shadow-xl group-hover:-translate-y-2">
                  {/* 背景装饰 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* 图标 */}
                  <div className="relative w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  
                  {/* 内容 */}
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-gray-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* 悬停效果 */}
                  <div className="absolute bottom-6 right-6 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 用户评价区域 */}
      <section id="testimonials" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              用户真实评价
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              已有超过10,000+用户选择Blog Builder，看看他们怎么说
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full" padding="lg">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 定价方案区域 */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              选择适合您的方案
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              从免费版到企业版，满足不同规模用户的需求
            </p>
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
                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      最受欢迎
                    </div>
                  </div>
                )}
                <Card className={`h-full ${plan.popular ? 'ring-2 ring-teal-500' : ''}`} padding="lg">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    variant={plan.popular ? 'primary' : 'secondary'}
                    fullWidth
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ区域 */}
      <section id="faq" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              常见问题
            </h2>
            <p className="text-xl text-gray-600">
              解答您关于Blog Builder的疑问
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card padding="lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              准备开始您的AI内容创作之旅？
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              立即注册，体验AI驱动的博客生成工具
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button
                variant="primary"
                size="xl"
                icon={<ArrowRight size={20} />}
                className="w-full sm:w-auto"
                onClick={() => navigate('/ai')}
              >
                免费开始使用
              </Button>
              <Button
                variant="secondary"
                size="xl"
                className="w-full sm:w-auto"
              >
                联系销售
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">Blog Builder</h3>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                基于先进AI技术的内容创作平台，让每个人都能轻松创建高质量的博客内容。
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Users size={20} />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Globe size={20} />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">产品</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">功能特性</a></li>
                <li><a href="#" className="hover:text-white transition-colors">定价方案</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API文档</a></li>
                <li><a href="#" className="hover:text-white transition-colors">更新日志</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">支持</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">帮助中心</a></li>
                <li><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
                <li><a href="#" className="hover:text-white transition-colors">隐私政策</a></li>
                <li><a href="#" className="hover:text-white transition-colors">服务条款</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Blog Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
