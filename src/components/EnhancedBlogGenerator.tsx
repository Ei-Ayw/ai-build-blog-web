import React, { useState } from 'react'
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
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="template" label="模板选择">
                    <Select placeholder="选择模板">
                      {templateOptions.map(option => (
                        <Option key={option.value} value={option.value}>
                          <div>
                            <div>{option.label}</div>
                            <Text type="secondary" style={{ fontSize: 12 }}>
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
                    <Select placeholder="选择风格">
                      {styleOptions.map(option => (
                        <Option key={option.value} value={option.value}>
                          <div>
                            <div>{option.label}</div>
                            <Text type="secondary" style={{ fontSize: 12 }}>
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
                <Space>
                  <Button
                    type="primary"
                    icon={<RobotOutlined />}
                    onClick={() => {
                      handleAIGenerate()
                      setCurrentStep(1)
                    }}
                    loading={loading}
                    size="large"
                  >
                    开始AI生成
                  </Button>
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
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Card>
        <Title level={3} style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          <RobotOutlined style={{ color: '#1890ff' }} />
          增强版AI博客生成器
        </Title>
        <Text type="secondary">
          使用腾讯云大模型能力，通过智能步骤引导您创建完美的博客
        </Text>

        <Divider />

        <Steps current={currentStep} style={{ marginBottom: 32 }}>
          {steps.map((step, index) => (
            <Step key={index} title={step.title} description={step.description} />
          ))}
        </Steps>

        {renderStepContent()}
      </Card>
    </div>
  )
}
