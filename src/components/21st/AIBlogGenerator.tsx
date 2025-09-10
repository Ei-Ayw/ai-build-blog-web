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
  Lightbulb
} from 'lucide-react'
import Card from './Card'
import Button from './Button'
import Input from './Input'
import Select from './Select'
import Modal from './Modal'
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
  const [showModal, setShowModal] = useState(false)

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
      // 为了演示，我们创建一个模拟的ZIP文件
      const mockZipBlob = new Blob(['Mock blog content'], { type: 'application/zip' })
      const filename = `${generatedContent.title}-blog.zip`
      onDownload?.(mockZipBlob, filename)
    } catch (error) {
      console.error('生成下载失败:', error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* 主标题 */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center space-x-3">
          <Bot className="w-8 h-8 text-purple-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            AI智能博客生成器
          </h1>
        </div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          使用腾讯云大模型能力，根据您的需求智能生成完整的博客内容和设计
        </p>
      </motion.div>

      {/* 表单区域 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="space-y-6">
          <div className="space-y-6">
            <Input
              label="博客需求描述"
              type="textarea"
              rows={4}
              value={formData.prompt}
              onChange={(value) => setFormData({ ...formData, prompt: value })}
              placeholder="例如：我想创建一个技术博客，主要分享前端开发经验，包含React、Vue、Node.js等技术栈，目标读者是初级到中级的前端开发者..."
              icon={<FileText size={16} />}
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
              >
                AI智能生成
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

      {/* 生成结果 */}
      {generatedContent && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <Sparkles className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">生成结果</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 基本信息 */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">博客标题</label>
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
                      {optimizing === 'title' ? '' : '优化'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(generatedContent.title)}
                      icon={copied ? <Check size={14} /> : <Copy size={14} />}
                    >
                      {copied ? '已复制' : '复制'}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">作者</label>
                  <Input
                    value={generatedContent.author}
                    onChange={(value) => setGeneratedContent({ ...generatedContent, author: value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">副标题</label>
                  <Input
                    value={generatedContent.tagline}
                    onChange={(value) => setGeneratedContent({ ...generatedContent, tagline: value })}
                  />
                </div>
              </div>

              {/* 关于我 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">关于我</label>
                <div className="space-y-2">
                  <Input
                    type="textarea"
                    rows={6}
                    value={generatedContent.about}
                    onChange={(value) => setGeneratedContent({ ...generatedContent, about: value })}
                  />
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOptimize('about', generatedContent.about)}
                      loading={optimizing === 'about'}
                      icon={<Wand2 size={14} />}
                    >
                      优化
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(generatedContent.about)}
                      icon={copied ? <Check size={14} /> : <Copy size={14} />}
                    >
                      复制
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* 文章列表 */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">生成的文章列表</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedContent.articles.map((article, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-gray-800/50 rounded-lg border border-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h4 className="font-medium text-white mb-2">{article.title}</h4>
                    <p className="text-gray-400 text-sm">{article.excerpt}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex space-x-4 mt-8">
              <Button
                onClick={handleGenerateAndDownload}
                icon={<Download size={16} />}
                size="lg"
                fullWidth
              >
                生成并下载博客
              </Button>
              
              <Button
                variant="secondary"
                onClick={() => setGeneratedContent(null)}
              >
                重新生成
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
