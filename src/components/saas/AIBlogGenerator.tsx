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
import Card21 from '../21st/Card'
import Button21 from '../21st/Button'
import Input21 from '../21st/Input'
import Select21 from '../21st/Select'
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
    <div className="min-h-screen">
      {/* Compact Hero Section */}
      <motion.div
        className="relative py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">AI博客生成器</h1>
          <p className="text-slate-600 text-base max-w-2xl mx-auto leading-relaxed">描述你的想法，AI为你生成完整的博客内容。从标题到正文，一切都在瞬间完成。</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 pb-12">

        {/* 主要内容区域 - 紧凑左右布局 */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* 左侧：表单区域 */}
          <motion.div
            className="xl:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card21 className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-1">
                    开始创作
                  </h2>
                  <p className="text-slate-600 text-sm">
                    描述你的想法，AI为你生成完整的博客内容
                  </p>
                </div>

                {/* 选中的模板信息 - 紧凑版 */}
                {selectedTemplate && (
                  <motion.div
                    className="p-4 bg-slate-50 rounded-lg border border-slate-200/60"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-semibold text-slate-900">已选择模板</h3>
                      <span className="px-2 py-1 bg-black text-white text-xs rounded-full">
                        {selectedTemplate.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-sm"
                        style={{ backgroundColor: selectedTemplate.style.colors.primary }}
                      >
                        {selectedTemplate.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-900 text-sm">{selectedTemplate.name}</h4>
                        <p className="text-xs text-slate-600 truncate">{selectedTemplate.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-slate-200/60">
                      <div className="flex items-center space-x-1">
                        <Palette className="w-3.5 h-3.5 text-slate-400" />
                        <div className="flex space-x-0.5">
                          <div
                            className="w-3 h-3 rounded-full border border-slate-300"
                            style={{ backgroundColor: selectedTemplate.style.colors.primary }}
                          ></div>
                          <div
                            className="w-3 h-3 rounded-full border border-slate-300"
                            style={{ backgroundColor: selectedTemplate.style.colors.accent }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Type className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs text-slate-600">{selectedTemplate.style.typography.heading}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Layout className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs text-slate-600">{selectedTemplate.style.layout.type}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <Input21
                  label="博客需求描述"
                  type="textarea"
                  rows={4}
                  value={formData.prompt}
                  onChange={(value) => setFormData({ ...formData, prompt: value })}
                  placeholder="描述你的博客需求..."
                  icon={<FileText size={14} />}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select21
                    label="模板选择"
                    options={templateOptions}
                    value={formData.template}
                    onChange={(value) => setFormData({ ...formData, template: value })}
                    placeholder="选择模板"
                  />

                  <Select21
                    label="内容风格"
                    options={styleOptions}
                    value={formData.style}
                    onChange={(value) => setFormData({ ...formData, style: value })}
                    placeholder="选择风格"
                  />

                  <Input21
                    label="作者名称"
                    value={formData.author}
                    onChange={(value) => setFormData({ ...formData, author: value })}
                    placeholder="您的名字"
                    icon={<User size={14} />}
                  />
                </div>

                <div className="flex space-x-3">
                  <Button21
                    onClick={handleAIGenerate}
                    disabled={loading}
                    icon={<Bot size={14} />}
                    size="md"
                    fullWidth
                  >
                    {loading ? 'AI正在生成...' : '开始生成博客'}
                  </Button21>

                  <Button21
                    onClick={() => {
                      setFormData({
                        prompt: '我想创建一个技术博客，主要分享前端开发经验，包含React、Vue、Node.js等技术栈，目标读者是初级到中级的前端开发者',
                        template: 'clean',
                        style: 'professional',
                        author: '技术爱好者'
                      })
                    }}
                    variant="secondary"
                    icon={<Lightbulb size={14} />}
                    size="md"
                  >
                    示例
                  </Button21>
                </div>
              </div>
            </Card21>
          </motion.div>

          {/* 右侧：生成结果 - 紧凑布局 */}
          <motion.div
            className="xl:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {generatedContent ? (
              <Card21 className="p-5">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-sm">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">生成完成</h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-slate-700 mb-1 block">博客标题</label>
                      <div className="flex items-center space-x-2">
                        <Input21
                          value={generatedContent.title}
                          onChange={(value) => setGeneratedContent({ ...generatedContent, title: value })}
                          className="flex-1"
                        />
                        <Button21
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOptimize('title', generatedContent.title)}
                          loading={optimizing === 'title'}
                          icon={<Wand2 size={12} />}
                        >
                          优化
                        </Button21>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-slate-700 mb-1 block">作者</label>
                        <Input21
                          value={generatedContent.author}
                          onChange={(value) => setGeneratedContent({ ...generatedContent, author: value })}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-slate-700 mb-1 block">副标题</label>
                        <Input21
                          value={generatedContent.tagline}
                          onChange={(value) => setGeneratedContent({ ...generatedContent, tagline: value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60">
                    <Button21
                      onClick={handleGenerateAndDownload}
                      icon={<Download size={14} />}
                      size="md"
                      fullWidth
                    >
                      生成并下载博客
                    </Button21>
                  </div>
                </div>
              </Card21>
            ) : (
              <Card21 className="p-5">
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">等待生成</h3>
                  <p className="text-slate-600 text-sm">
                    填写左侧表单并点击生成按钮，AI将为你创建博客内容
                  </p>
                </div>
              </Card21>
            )}
          </motion.div>
        </div>

        {/* 文章列表预览 - 紧凑布局 */}
        {generatedContent && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card21 className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">生成的文章列表</h3>
                  <p className="text-slate-600 text-sm">AI为你创建的相关文章内容</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {generatedContent.articles.map((article, index) => (
                    <motion.div
                      key={index}
                      className="group p-4 bg-slate-50 rounded-lg border border-slate-200/60 transition-all duration-300 hover:bg-white hover:shadow-sm hover:shadow-slate-200/25"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h4 className="font-medium text-slate-900 mb-2 text-sm group-hover:text-slate-700 transition-colors line-clamp-2">{article.title}</h4>
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{article.excerpt}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card21>
          </motion.div>
        )}
      </div>
    </div>
  )
}
