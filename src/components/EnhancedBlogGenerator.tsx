import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, FileText, Palette, User, Download, Check, Zap, Timer, CheckCircle2, UploadCloud, FileText as FileTextIcon } from 'lucide-react'
import {
  Card,
  Button,
  Form,
  Input,
  Select,
  Space,
  Typography,
  message,
  Spin,
  Divider,
  Row,
  Col,
  Tag,
  Tooltip,
  Steps,
  Upload,
  Progress
} from 'antd'
import {
  ThunderboltOutlined,
  RobotOutlined,
  BulbOutlined,
  EditOutlined,
  UploadOutlined,
  CloudUploadOutlined,
  DownloadOutlined,
  EyeOutlined
} from '@ant-design/icons'
import { TencentAIService, type BlogGenerationRequest, type BlogContent } from '../services/tencentAI'
import { TencentCOSService } from '../services/tencentCOS'
import { buildBlogZip, generateHtmlByTemplate } from '../utils/generator'
import { parseMarkdownFiles, type Article } from '../utils/markdown'
import AIContentOptimizer from './AIContentOptimizer'
import Card21 from './21st/Card'
import Button21 from './21st/Button'
import Input21 from './21st/Input'
import Select21 from './21st/Select'

const { Title, Text } = Typography
const { TextArea } = Input
const { Option } = Select
const { Step } = Steps

interface EnhancedBlogGeneratorProps {
  onGenerated?: (content: BlogContent) => void
  onDownload?: (zipBlob: Blob, filename: string) => void
}

export default function EnhancedBlogGenerator({ onGenerated, onDownload }: EnhancedBlogGeneratorProps) {
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<BlogContent | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [formSnapshot, setFormSnapshot] = useState<any>({ template: 'clean', style: 'professional', theme: 'clean', author: '' })
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [previewKey, setPreviewKey] = useState(0)
  const previewAreaRef = useRef<HTMLDivElement>(null)
  const [previewHeight, setPreviewHeight] = useState<number>(0)

  const templateOptions = [
    { value: 'clean', label: '极简白', description: '极简白底，强调阅读体验' },
    { value: 'dark', label: '极夜黑', description: '深色主题，夜间友好' },
    { value: 'magazine', label: '杂志风', description: '封面列表，杂志排版' }
  ]

  const styleOptions = [
    { value: 'professional', label: '专业风格', description: '适合技术博客、企业博客' },
    { value: 'personal', label: '个人风格', description: '适合个人生活记录、随笔' },
    { value: 'creative', label: '创意风格', description: '适合设计、艺术类博客' },
    { value: 'minimalist', label: '极简风格', description: '适合专注内容的博客' }
  ]

  const steps = [
    {
      title: '需求描述',
      description: '描述您的博客需求'
    },
    {
      title: 'AI生成',
      description: '智能生成博客内容'
    },
    {
      title: '内容优化',
      description: '优化和完善内容'
    },
    {
      title: '生成发布',
      description: '生成博客并发布'
    }
  ]

  // 实时预览HTML
  const livePreviewHtml = useMemo(() => {
    try {
      if (generatedContent) {
        const articlesPreview: Article[] = generatedContent.articles.map((a, i) => ({
          title: a.title,
          html: a.content,
          slug: `article-${i + 1}`,
          excerpt: a.excerpt
        }))
        return generateHtmlByTemplate(
          {
            title: generatedContent.title,
            author: generatedContent.author,
            tagline: generatedContent.tagline,
            about: generatedContent.about
          },
          (generatedContent.theme as 'clean' | 'dark' | 'magazine') || 'clean',
          { articles: articlesPreview }
        )
      }

      const values = formSnapshot
      const baseArticles: Article[] = articles.length
        ? articles
        : [
            { title: '欢迎使用增强生成', html: '<p>这里会实时展示生成效果。</p>', slug: 'welcome', excerpt: '实时预览示例' }
          ]

      return generateHtmlByTemplate(
        {
          title: values?.title || '我的新博客',
          author: values?.author || '作者',
          tagline: values?.tagline || '让AI帮你更快地发布',
          about: values?.about || '这里是关于我的简介……'
        },
        (values?.template as 'clean' | 'dark' | 'magazine') || 'clean',
        { articles: baseArticles }
      )
    } catch (e) {
      return '<html><body><div style="padding:16px;font-family:Inter,system-ui">预览加载中...</div></body></html>'
    }
  }, [generatedContent, articles, formSnapshot])

  // 注入覆盖样式，去除模板内部的最大宽度限制并消除默认边距
  const augmentedPreviewHtml = useMemo(() => {
    const injection = `\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />\n<style>\n  html, body { margin: 0; padding: 0; width: 100%; height: 100%; }\n  body { -webkit-font-smoothing: antialiased; }\n  /* 解除常见容器的最大宽度限制，便于在预览中自适应 */\n  .container, main, header, footer, [class*=max-w-] { max-width: 100% !important; }\n  img, video, canvas, iframe { max-width: 100%; height: auto; }\n  /* 防止模板内层设置的固定宽影响预览 */\n  [style*=max-width] { max-width: 100% !important; }\n</style>\n`;
    if (livePreviewHtml.includes('</head>')) {
      return livePreviewHtml.replace('</head>', `${injection}</head>`)
    }
    // 简单兜底
    return `<!doctype html><html><head>${injection}</head><body>${livePreviewHtml}</body></html>`
  }, [livePreviewHtml])

  // 计算中栏可用高度（首屏自适应，窗口变化时更新）
  useEffect(() => {
    const calc = () => {
      const el = previewAreaRef.current
      if (!el) return
      const top = el.getBoundingClientRect().top
      const h = Math.max(420, Math.floor(window.innerHeight - top - 24))
      setPreviewHeight(h)
    }
    const ro = new ResizeObserver(calc)
    if (previewAreaRef.current) ro.observe(previewAreaRef.current)
    calc()
    window.addEventListener('resize', calc)
    return () => {
      window.removeEventListener('resize', calc)
      ro.disconnect()
    }
  }, [])

  const handleAIGenerate = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      
      const request: BlogGenerationRequest = {
        prompt: values.prompt,
        template: values.template,
        style: values.style,
        author: values.author,
        theme: values.theme
      }

      const content = await TencentAIService.generateBlogContent(request)
      setGeneratedContent(content)
      onGenerated?.(content)
      setCurrentStep(2)
      message.success('AI生成完成！')
    } catch (error) {
      message.error('AI生成失败，请稍后重试')
      console.error('AI生成错误:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleContentOptimized = (type: string, content: string) => {
    if (generatedContent) {
      const updated = { ...generatedContent }
      if (type === 'title') updated.title = content
      else if (type === 'about') updated.about = content
      setGeneratedContent(updated)
    }
  }

  const handleGenerateAndPublish = async () => {
    if (!generatedContent) {
      message.warning('请先生成博客内容')
      return
    }

    try {
      setUploading(true)
      setUploadProgress(0)
      
      // 模拟上传进度
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // 将AI生成的文章转换为Article格式
      const articles: Article[] = generatedContent.articles.map((article, index) => ({
        title: article.title,
        html: article.content,
        slug: `article-${index + 1}`,
        excerpt: article.excerpt
      }))

      // 生成HTML
      const html = generateHtmlByTemplate(
        {
          title: generatedContent.title,
          author: generatedContent.author,
          tagline: generatedContent.tagline,
          about: generatedContent.about
        },
        generatedContent.theme as 'clean' | 'dark' | 'magazine',
        { articles }
      )

      // 创建ZIP文件
      const zip = await buildBlogZip({ html, assets: [] })
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      
      // 上传到COS
      const uploadResult = await TencentCOSService.uploadBlogZip(
        zipBlob, 
        generatedContent.title.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '-')
      )
      
      clearInterval(progressInterval)
      setUploadProgress(100)
      
      // 下载文件
      const filename = `${generatedContent.title}-blog.zip`
      onDownload?.(zipBlob, filename)
      
      message.success(`博客已生成并上传到云端！访问链接：${uploadResult.url}`)
      setCurrentStep(3)
    } catch (error) {
      message.error('生成和上传失败，请稍后重试')
      console.error('生成错误:', error)
    } finally {
      setUploading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card>
            <Title level={4} style={{ marginTop: 0 }}>描述您的博客需求</Title>
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                template: 'clean',
                style: 'professional',
                theme: 'clean'
              }}
            >
              <Form.Item
                name="prompt"
                label="博客需求描述"
                rules={[{ required: true, message: '请输入博客需求描述' }]}
                extra="请详细描述您想要的博客类型、内容主题、目标读者等"
              >
                <TextArea
                  rows={6}
                  placeholder="例如：我想创建一个技术博客，主要分享前端开发经验，目标读者是初级到中级的前端开发者，希望内容专业但易懂，包含React、Vue、Node.js等技术栈..."
                  maxLength={1000}
                  style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="template" label="模板选择">
                    <Select
                      placeholder="选择模板"
                      dropdownStyle={{ maxWidth: 480, whiteSpace: 'normal' }}
                      dropdownMatchSelectWidth={false}
                      optionLabelProp="label"
                    >
                      {templateOptions.map(option => (
                        <Option key={option.value} value={option.value} label={option.label}>
                          <div style={{ maxWidth: '100%' }}>
                            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>
                              {option.label}
                            </div>
                            <Text type="secondary" style={{ fontSize: 12, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                              {option.description}
                            </Text>
                          </div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="style" label="内容风格">
                    <Select
                      placeholder="选择风格"
                      dropdownStyle={{ maxWidth: 480, whiteSpace: 'normal' }}
                      dropdownMatchSelectWidth={false}
                      optionLabelProp="label"
                    >
                      {styleOptions.map(option => (
                        <Option key={option.value} value={option.value} label={option.label}>
                          <div style={{ maxWidth: '100%' }}>
                            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>
                              {option.label}
                            </div>
                            <Text type="secondary" style={{ fontSize: 12, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                              {option.description}
                            </Text>
                          </div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="author" label="作者名称">
                    <Input placeholder="您的名字" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Space style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  <Button21
                    onClick={() => {
                      handleAIGenerate()
                      setCurrentStep(1)
                    }}
                    loading={loading}
                    size="md"
                  >
                    开始AI生成
                  </Button21>
                  <Button
                    icon={<BulbOutlined />}
                    onClick={() => {
                      form.setFieldsValue({
                        prompt: '我想创建一个技术博客，主要分享前端开发经验，包含React、Vue、Node.js等技术栈，目标读者是初级到中级的前端开发者'
                      })
                    }}
                  >
                    使用示例
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        )

      case 1:
        return (
          <Card>
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Spin size="large" />
              <div style={{ marginTop: 16 }}>
                <Title level={4}>AI正在生成您的博客内容...</Title>
                <Text type="secondary">这可能需要几秒钟时间，请耐心等待</Text>
              </div>
            </div>
          </Card>
        )

      case 2:
        return (
          <div>
            {generatedContent && (
              <>
                <Card style={{ marginBottom: 16 }}>
                  <Title level={4} style={{ marginTop: 0 }}>生成结果</Title>
                  
                  <Row gutter={16}>
                    <Col span={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Text strong>博客标题：</Text>
                        <div style={{ marginTop: 4 }}>
                          <Text>{generatedContent.title}</Text>
                        </div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ marginBottom: 16 }}>
                        <Text strong>作者：</Text>
                        <div style={{ marginTop: 4 }}>
                          <Text>{generatedContent.author}</Text>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>副标题：</Text>
                    <div style={{ marginTop: 4 }}>
                      <Text>{generatedContent.tagline}</Text>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: 16 }}>
                    <Text strong>关于我：</Text>
                    <div style={{ marginTop: 4 }}>
                      <Text>{generatedContent.about}</Text>
                    </div>
                  </div>
                  
                  <Row gutter={16}>
                    <Col span={12}>
                      <Text strong>推荐主题：</Text>
                      <div style={{ marginTop: 4 }}>
                        <Tag color="blue">{generatedContent.theme}</Tag>
                      </div>
                    </Col>
                    <Col span={12}>
                      <Text strong>风格：</Text>
                      <div style={{ marginTop: 4 }}>
                        <Tag color="green">{generatedContent.style}</Tag>
                      </div>
                    </Col>
                  </Row>
                </Card>

                <Row gutter={16}>
                  <Col span={12}>
                    <AIContentOptimizer
                      initialContent={generatedContent.title}
                      contentType="title"
                      onOptimized={(content) => handleContentOptimized('title', content)}
                    />
                  </Col>
                  <Col span={12}>
                    <AIContentOptimizer
                      initialContent={generatedContent.about}
                      contentType="about"
                      onOptimized={(content) => handleContentOptimized('about', content)}
                    />
                  </Col>
                </Row>

                <Card style={{ marginTop: 16 }}>
                  <Title level={5}>生成的文章列表</Title>
                  {generatedContent.articles.map((article, index) => (
                    <div key={index} style={{ marginBottom: 12, padding: 12, background: '#f5f5f5', borderRadius: 6 }}>
                      <Text strong>{article.title}</Text>
                      <div style={{ marginTop: 4 }}>
                        <Text type="secondary">{article.excerpt}</Text>
                      </div>
                    </div>
                  ))}
                </Card>

                <Card style={{ marginTop: 16 }}>
                  <Title level={5} style={{ marginTop: 0 }}>文章导入（Markdown）</Title>
                  <Upload.Dragger
                    multiple
                    maxCount={20}
                    accept=".md,.markdown,text/markdown"
                    beforeUpload={async (file) => {
                      const parsed = await parseMarkdownFiles([file])
                      setArticles((prev) => [...prev, ...parsed])
                      message.success(`${file.name} 已解析`)
                      return false
                    }}
                    showUploadList={{ showRemoveIcon: true, showPreviewIcon: false }}
                    onRemove={(file) => {
                      const name = file.name.replace(/\.(md|markdown)$/i, '')
                      setArticles((prev) => prev.filter(a => a.title !== name))
                    }}
                  >
                    <p>将 Markdown 文件拖拽到此处或点击上传</p>
                  </Upload.Dragger>
                </Card>

                <div style={{ textAlign: 'center', marginTop: 24 }}>
                  <Space>
                    <Button onClick={() => setCurrentStep(0)}>
                      重新生成
                    </Button>
                    <Button
                      type="primary"
                      icon={<CloudUploadOutlined />}
                      onClick={handleGenerateAndPublish}
                      loading={uploading}
                      size="large"
                    >
                      生成并发布博客
                    </Button>
                  </Space>
                </div>
              </>
            )}
          </div>
        )

      case 3:
        return (
          <Card>
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: 48, color: '#52c41a', marginBottom: 16 }}>
                ✓
              </div>
              <Title level={3} style={{ color: '#52c41a' }}>博客生成完成！</Title>
              <Text type="secondary" style={{ fontSize: 16 }}>
                您的博客已经成功生成并上传到云端
              </Text>
              
              {uploadProgress > 0 && (
                <div style={{ marginTop: 24 }}>
                  <Progress percent={uploadProgress} status={uploadProgress === 100 ? 'success' : 'active'} />
                </div>
              )}

              <div style={{ marginTop: 24 }}>
                <Space>
                  <Button
                    icon={<DownloadOutlined />}
                    onClick={() => {
                      if (generatedContent) {
                        const filename = `${generatedContent.title}-blog.zip`
                        // 这里可以触发下载
                      }
                    }}
                  >
                    下载博客文件
                  </Button>
                  <Button
                    type="primary"
                    icon={<EyeOutlined />}
                    onClick={() => {
                      // 这里可以打开预览
                    }}
                  >
                    预览博客
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentStep(0)
                      setGeneratedContent(null)
                      setArticles([])
                      setUploadProgress(0)
                    }}
                  >
                    创建新博客
                  </Button>
                </Space>
              </div>
            </div>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* 顶部介绍移除（恢复前版本的三栏，但不显示Hero） */}

      <div className="w-full px-4 lg:px-6 2xl:px-8 overflow-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch mt-6 min-h-[calc(100vh-140px)] overflow-hidden">
          {/* 左侧：制作信息 */}
          <div className="xl:col-span-3 h-full flex flex-col ant-wrap-fix">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">增强版AI博客生成器</h2>
                <p className="text-slate-600 text-sm mt-0.5">使用腾讯云大模型能力，通过智能步骤引导您创建完美的博客</p>
              </div>
            </div>

            <Divider style={{ margin: '0 0 12px' }} />

            <div className="mb-6">
              <Steps current={currentStep}>
                {steps.map((step, index) => (
                  <Step key={index} title={step.title} description={step.description} />
                ))}
              </Steps>
            </div>

            <div className="flex-1 overflow-auto" style={{ height: previewHeight }}>
              {renderStepContent()}
            </div>
          </div>

          {/* 中间：实时预览（不可滚动，去掉外层限制） */}
          <div className="xl:col-span-7 h-full flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200/60 flex items-center justify-end gap-2">
                <button onClick={() => setPreviewDevice('desktop')} className={`px-2 py-1 text-xs rounded border ${previewDevice === 'desktop' ? 'bg-black text-white border-black' : 'border-slate-300 text-slate-700'}`}>桌面</button>
                <button onClick={() => setPreviewDevice('mobile')} className={`px-2 py-1 text-xs rounded border ${previewDevice === 'mobile' ? 'bg-black text-white border-black' : 'border-slate-300 text-slate-700'}`}>移动</button>
                <button onClick={() => setPreviewKey(k => k + 1)} className="px-2 py-1 text-xs rounded border border-slate-300 text-slate-700">刷新</button>
              </div>
              <div ref={previewAreaRef} className="flex-1 bg-slate-50 flex items-stretch justify-stretch overflow-hidden">
                {previewDevice === 'desktop' ? (
                  <div className="w-full bg-white shadow-2xl flex flex-col rounded-2xl border-2 border-slate-300" style={{ height: previewHeight }}>
                    {/* macOS Safari top bar */}
                    <div className="h-11 flex items-center px-3 border-b border-slate-300 bg-gradient-to-b from-slate-100 to-slate-50 rounded-t-2xl">
                      <div className="flex items-center space-x-2 mr-3">
                        <span className="w-3 h-3 rounded-full bg-red-400"></span>
                        <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                        <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                      </div>
                      <div className="flex-1 h-7 bg-white border border-slate-300 rounded-full text-[11px] text-slate-500 flex items-center px-3 truncate shadow-inner">
                        https://preview.local
                      </div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <iframe key={previewKey} title="live-preview" srcDoc={livePreviewHtml} style={{ width: '100%', height: '100%', border: 0 }} />
                    </div>
                  </div>
                ) : (
                  <div className="w-[420px] max-w-full mx-auto" style={{ height: previewHeight }}>
                    <div className="relative w-full h-full bg-black rounded-[36px] border-2 border-slate-300 shadow-2xl overflow-hidden">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-7 bg-black rounded-b-2xl z-10" />
                      <div className="absolute inset-0 p-3 pt-9 bg-black">
                        <div className="w-full h-full bg-white rounded-[28px] overflow-hidden">
                          <iframe key={previewKey} title="live-preview" srcDoc={livePreviewHtml} style={{ width: '100%', height: '100%', border: 0 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            
          </div>

          {/* 右侧：概览/发布 */}
          <div className="xl:col-span-2 h-full flex flex-col">
            <div className="sticky top-20 overflow-auto space-y-6" style={{ maxHeight: previewHeight }}>
              <Card21 className="p-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">流程概览</h3>
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <div key={index} className={`flex items-center justify-between text-sm rounded-lg border ${index === currentStep ? 'border-black bg-black text-white' : 'border-slate-200 text-slate-700'} px-3 py-2`}>
                      <span>{step.title}</span>
                      <span className={`text-xs ${index === currentStep ? 'opacity-90' : 'text-slate-400'}`}>{step.description}</span>
                    </div>
                  ))}
                </div>
              </Card21>

              <div className="grid grid-cols-3 gap-3">
                <Card21 className="p-4">
                  <div className="text-xs text-slate-500 mb-1">预计用时</div>
                  <div className="flex items-center space-x-2">
                    <Timer className="w-4 h-4 text-slate-700" />
                    <div className="text-sm font-semibold text-slate-900">2-5 分钟</div>
                  </div>
                </Card21>
                <Card21 className="p-4">
                  <div className="text-xs text-slate-500 mb-1">内容质量</div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-700" />
                    <div className="text-sm font-semibold text-slate-900">高</div>
                  </div>
                </Card21>
                <Card21 className="p-4">
                  <div className="text-xs text-slate-500 mb-1">文章数</div>
                  <div className="flex items-center space-x-2">
                    <FileTextIcon className="w-4 h-4 text-slate-700" />
                    <div className="text-sm font-semibold text-slate-900">3-8 篇</div>
                  </div>
                </Card21>
              </div>

              <Card21 className="p-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">发布提示</h3>
                <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                  <li>内容生成后可在左侧进行优化与补充</li>
                  <li>支持导入 Markdown 文章丰富站点内容</li>
                  <li>生成完成后可一键下载或上传到云端</li>
                </ul>
                <div className="pt-4">
                  <Button21 icon={<UploadCloud size={14} />} fullWidth>
                    生成并发布
                  </Button21>
                </div>
              </Card21>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
