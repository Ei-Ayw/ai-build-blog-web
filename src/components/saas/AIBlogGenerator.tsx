import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
  Star
} from 'lucide-react'
import Card from './Card'
import Button from './Button'
import Input from './Input'
import Select from './Select'
import { TencentAIService, type BlogGenerationRequest, type BlogContent } from '../../services/tencentAI'

interface AIBlogGeneratorProps {
  onGenerated?: (content: BlogContent) => void
  onDownload?: (zipBlob: Blob, filename: string) => void
}

export default function AIBlogGenerator({ onGenerated, onDownload }: AIBlogGeneratorProps) {
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI智能博客生成器
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            使用先进的人工智能技术，根据您的需求智能生成完整的博客内容和设计。
            让创作变得简单而高效。
          </p>
          
          <div className="flex items-center justify-center mt-8 space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              智能内容生成
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              多种模板选择
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              一键导出部署
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
            <Card className="h-fit" padding="lg">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    创建您的博客
                  </h2>
                  <p className="text-gray-600">
                    描述您的需求，AI将为您生成完整的博客内容
                  </p>
                </div>

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
                  <Button
                    onClick={handleAIGenerate}
                    loading={loading}
                    icon={<Bot size={16} />}
                    fullWidth
                    size="lg"
                    variant="primary"
                  >
                    {loading ? 'AI正在生成...' : '开始生成博客'}
                  </Button>
                  
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setFormData({
                        prompt: '我想创建一个技术博客，主要分享前端开发经验，包含React、Vue、Node.js等技术栈，目标读者是初级到中级的前端开发者',
                        template: 'clean',
                        style: 'professional',
                        author: '技术爱好者'
                      })
                    }}
                    icon={<Lightbulb size={16} />}
                  >
                    使用示例
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* 右侧：生成结果 */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {generatedContent ? (
              <Card className="h-fit" padding="lg">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">生成完成</h3>
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
                    <Button
                      onClick={handleGenerateAndDownload}
                      icon={<Download size={16} />}
                      fullWidth
                      size="lg"
                      variant="primary"
                    >
                      生成并下载博客
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-fit" padding="lg">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">等待生成</h3>
                  <p className="text-gray-500 text-sm">
                    填写左侧表单并点击生成按钮，AI将为您创建博客内容
                  </p>
                </div>
              </Card>
            )}
          </motion.div>
        </div>

        {/* 文章列表预览 */}
        {generatedContent && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card padding="lg">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">生成的文章列表</h3>
                  <p className="text-gray-600">AI为您创建的相关文章内容</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedContent.articles.map((article, index) => (
                    <motion.div
                      key={index}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-teal-200 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h4 className="font-medium text-gray-900 mb-2">{article.title}</h4>
                      <p className="text-gray-600 text-sm">{article.excerpt}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
