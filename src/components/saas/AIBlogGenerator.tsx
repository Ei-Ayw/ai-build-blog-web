import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { 
  Bot, 
  Sparkles, 
  Palette, 
  User, 
  FileText, 
  Download,
  Copy,
  Check,
  Wand2,
  Lightbulb,
  ArrowRight,
  Star,
  Type,
  Layout
} from 'lucide-react'
import Card from './Card'
import Button from './Button'
import Input from './Input'
import Select from './Select'
import { TencentAIService, type BlogGenerationRequest, type BlogContent } from '../../services/tencentAI'
import { BlogTemplate } from '../../data/templates'

interface AIBlogGeneratorProps {
  onGenerated?: (content: BlogContent) => void
  onDownload?: (zipBlob: Blob, filename: string) => void
}

export default function AIBlogGenerator({ onGenerated, onDownload }: AIBlogGeneratorProps) {
  const location = useLocation()
  const [formData, setFormData] = useState({
    prompt: '',
    template: 'clean',
    style: 'professional',
    author: ''
  })
  const [loading, setLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<BlogContent | null>(null)
  const [optimizing, setOptimizing] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<BlogTemplate | null>(null)

  // 从路由状态获取选中的模板
  useEffect(() => {
    if (location.state?.selectedTemplate) {
      const template = location.state.selectedTemplate as BlogTemplate
      setSelectedTemplate(template)
      setFormData(prev => ({
        ...prev,
        template: template.id,
        style: template.style.layout.type
      }))
    }
  }, [location.state])

  const templateOptions = [
    { 
      value: 'clean', 
      label: '极简白', 
      description: '极简白底，强调阅读体验',
      icon: <FileText size={16} />
    },
    { 
      value: 'dark', 
      label: '极夜黑', 
      description: '深色主题，夜间友好',
      icon: <Palette size={16} />
    },
    { 
      value: 'magazine', 
      label: '杂志风', 
      description: '封面列表，杂志排版',
      icon: <FileText size={16} />
    }
  ]

  const styleOptions = [
    { 
      value: 'professional', 
      label: '专业风格', 
      description: '适合技术博客、企业博客',
      icon: <User size={16} />
    },
    { 
      value: 'personal', 
      label: '个人风格', 
      description: '适合个人生活记录、随笔',
      icon: <User size={16} />
    },
    { 
      value: 'creative', 
      label: '创意风格', 
      description: '适合设计、艺术类博客',
      icon: <Sparkles size={16} />
    },
    { 
      value: 'minimalist', 
      label: '极简风格', 
      description: '适合专注内容的博客',
      icon: <FileText size={16} />
    }
  ]

  const handleAIGenerate = async () => {
    try {
      setLoading(true)
      
      const request: BlogGenerationRequest = {
        prompt: formData.prompt,
        template: formData.template,
        style: formData.style,
        author: formData.author
      }

      const content = await TencentAIService.generateBlogContent(request)
      setGeneratedContent(content)
      onGenerated?.(content)
    } catch (error) {
      console.error('AI生成错误:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOptimize = async (type: 'title' | 'about', content: string) => {
    try {
      setOptimizing(type)
      const optimized = await TencentAIService.optimizeBlogContent(content, type)
      
      if (type === 'title' && generatedContent) {
        setGeneratedContent({ ...generatedContent, title: optimized })
      } else if (type === 'about' && generatedContent) {
        setGeneratedContent({ ...generatedContent, about: optimized })
      }
    } catch (error) {
      console.error('优化错误:', error)
    } finally {
      setOptimizing(null)
    }
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('复制失败:', error)
    }
  }

  const handleGenerateAndDownload = async () => {
    if (!generatedContent) return

    try {
      // 这里应该调用实际的博客生成和下载逻辑
      const mockZipBlob = new Blob(['Mock blog content'], { type: 'application/zip' })
      const filename = `${generatedContent.title}-blog.zip`
      onDownload?.(mockZipBlob, filename)
    } catch (error) {
      console.error('生成下载失败:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section - 21st.dev风格 */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center">
              <Bot className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black text-black mb-6 leading-tight">
            AI博客生成器
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            描述你的想法，AI为你生成完整的博客内容。从标题到正文，一切都在瞬间完成。
          </p>
          
          <div className="flex items-center justify-center mt-12 space-x-8 text-sm text-gray-400">
            <div className="flex items-center">
              <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
              智能生成
            </div>
            <div className="flex items-center">
              <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
              多种模板
            </div>
            <div className="flex items-center">
              <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
              一键导出
            </div>
          </div>
        </motion.div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：表单区域 */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded  p-6">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-black text-black mb-3">
                    开始创作
                  </h2>
                  <p className="text-gray-600 font-light">
                    描述你的想法，AI为你生成完整的博客内容
                  </p>
                </div>

                {/* 选中的模板信息 */}
                {selectedTemplate && (
                  <motion.div
                    className="p-4 bg-gray-50 rounded border border-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-black">已选择模板</h3>
                      <span className="px-3 py-1 bg-black text-white text-sm rounded-xl">
                        {selectedTemplate.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-12 h-12 rounded flex items-center justify-center text-white text-xl font-bold"
                        style={{ backgroundColor: selectedTemplate.style.colors.primary }}
                      >
                        {selectedTemplate.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-black">{selectedTemplate.name}</h4>
                        <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center space-x-2">
                        <Palette className="w-4 h-4 text-gray-400" />
                        <div className="flex space-x-1">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: selectedTemplate.style.colors.primary }}
                          ></div>
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: selectedTemplate.style.colors.accent }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Type className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{selectedTemplate.style.typography.heading}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Layout className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{selectedTemplate.style.layout.type}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <Input
                  label="博客需求描述"
                  type="textarea"
                  rows={6}
                  value={formData.prompt}
                  onChange={(value) => setFormData({ ...formData, prompt: value })}
                  placeholder="例如：我想创建一个技术博客，主要分享前端开发经验，包含React、Vue、Node.js等技术栈，目标读者是初级到中级的前端开发者..."
                  icon={<FileText size={16} />}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Select
                    label="模板选择"
                    options={templateOptions}
                    value={formData.template}
                    onChange={(value) => setFormData({ ...formData, template: value })}
                    placeholder="选择模板"
                  />

                  <Select
                    label="内容风格"
                    options={styleOptions}
                    value={formData.style}
                    onChange={(value) => setFormData({ ...formData, style: value })}
                    placeholder="选择风格"
                  />

                  <Input
                    label="作者名称"
                    value={formData.author}
                    onChange={(value) => setFormData({ ...formData, author: value })}
                    placeholder="您的名字"
                    icon={<User size={16} />}
                  />
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    onClick={handleAIGenerate}
                    disabled={loading}
                    className="flex-1 px-8 py-4 bg-black text-white rounded font-medium text-lg transition-all duration-300 hover:-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>AI正在生成...</span>
                      </>
                    ) : (
                      <>
                        <Bot size={20} />
                        <span>开始生成博客</span>
                      </>
                    )}
                  </motion.button>
                  
                  <motion.button
                    onClick={() => {
                      setFormData({
                        prompt: '我想创建一个技术博客，主要分享前端开发经验，包含React、Vue、Node.js等技术栈，目标读者是初级到中级的前端开发者',
                        template: 'clean',
                        style: 'professional',
                        author: '技术爱好者'
                      })
                    }}
                    className="px-6 py-4 border border-gray-300 text-gray-700 rounded font-medium text-lg transition-all duration-300 hover:-sm flex items-center space-x-2"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Lightbulb size={20} />
                    <span>使用示例</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 右侧：生成结果 */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {generatedContent ? (
              <div className="bg-white rounded  p-6">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-black rounded flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-black">生成完成</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">博客标题</label>
                      <div className="flex items-center space-x-2">
                        <Input
                          value={generatedContent.title}
                          onChange={(value) => setGeneratedContent({ ...generatedContent, title: value })}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOptimize('title', generatedContent.title)}
                          loading={optimizing === 'title'}
                          icon={<Wand2 size={14} />}
                        >
                          优化
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">作者</label>
                      <Input
                        value={generatedContent.author}
                        onChange={(value) => setGeneratedContent({ ...generatedContent, author: value })}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">副标题</label>
                      <Input
                        value={generatedContent.tagline}
                        onChange={(value) => setGeneratedContent({ ...generatedContent, tagline: value })}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <motion.button
                      onClick={handleGenerateAndDownload}
                      className="w-full px-6 py-4 bg-black text-white rounded font-medium text-lg transition-all duration-300 hover:-sm flex items-center justify-center space-x-2"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download size={20} />
                      <span>生成并下载博客</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded  p-6">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">等待生成</h3>
                  <p className="text-gray-500 font-light">
                    填写左侧表单并点击生成按钮，AI将为你创建博客内容
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* 文章列表预览 */}
        {generatedContent && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white rounded  p-6">
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-black text-black mb-3">生成的文章列表</h3>
                  <p className="text-gray-600 font-light">AI为你创建的相关文章内容</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {generatedContent.articles.map((article, index) => (
                    <motion.div
                      key={index}
                      className="group p-4 bg-gray-50 rounded   transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h4 className="font-bold text-black mb-3 group-hover:text-gray-700 transition-colors">{article.title}</h4>
                      <p className="text-gray-600 font-light leading-relaxed">{article.excerpt}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
