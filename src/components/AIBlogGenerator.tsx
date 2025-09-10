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
  Tooltip
} from 'antd'
import { 
  ThunderboltOutlined, 
  RobotOutlined, 
  BulbOutlined,
  EditOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { TencentAIService, type BlogGenerationRequest, type BlogContent } from '../services/tencentAI'
import { TencentCOSService } from '../services/tencentCOS'
import { buildBlogZip, generateHtmlByTemplate } from '../utils/generator'
import { parseMarkdownFiles, type Article } from '../utils/markdown'

const { Title, Text } = Typography
const { TextArea } = Input
const { Option } = Select

interface AIBlogGeneratorProps {
  onGenerated?: (content: BlogContent) => void
  onDownload?: (zipBlob: Blob, filename: string) => void
}

export default function AIBlogGenerator({ onGenerated, onDownload }: AIBlogGeneratorProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<BlogContent | null>(null)
  const [optimizing, setOptimizing] = useState<string | null>(null)
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
      message.success('AI生成完成！')
    } catch (error) {
      message.error('AI生成失败，请稍后重试')
      console.error('AI生成错误:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOptimize = async (type: 'title' | 'about', content: string) => {
    try {
      setOptimizing(type)
      const optimized = await TencentAIService.optimizeBlogContent(content, type)
      
      if (type === 'title') {
        setGeneratedContent(prev => prev ? { ...prev, title: optimized } : null)
      } else {
        setGeneratedContent(prev => prev ? { ...prev, about: optimized } : null)
      }
      
      message.success('内容优化完成！')
    } catch (error) {
      message.error('内容优化失败')
    } finally {
      setOptimizing(null)
    }
  }

  const handleGenerateAndDownload = async () => {
    if (!generatedContent) {
      message.warning('请先生成博客内容')
      return
    }

    try {
      setUploading(true)
      
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
      
      // 下载文件
      const filename = `${generatedContent.title}-blog.zip`
      onDownload?.(zipBlob, filename)
      
      message.success(`博客已生成并上传到云端！访问链接：${uploadResult.url}`)
    } catch (error) {
      message.error('生成和上传失败，请稍后重试')
      console.error('生成错误:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Card>
        <Title level={3} style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          <RobotOutlined style={{ color: '#1890ff' }} />
          AI智能博客生成器
        </Title>
        <Text type="secondary">
          使用腾讯云大模型能力，根据您的需求智能生成完整的博客内容和设计
        </Text>

        <Divider />

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            template: 'clean',
            style: 'professional',
            theme: 'clean'
          }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="prompt"
                label="博客需求描述"
                rules={[{ required: true, message: '请输入博客需求描述' }]}
                extra="请详细描述您想要的博客类型、内容主题、目标读者等"
              >
                <TextArea
                  rows={4}
                  placeholder="例如：我想创建一个技术博客，主要分享前端开发经验，目标读者是初级到中级的前端开发者，希望内容专业但易懂，包含React、Vue、Node.js等技术栈..."
                  maxLength={500}
                />
              </Form.Item>
            </Col>
          </Row>

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
                onClick={handleAIGenerate}
                loading={loading}
                size="large"
              >
                AI智能生成
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

        {generatedContent && (
          <>
            <Divider />
            <Title level={4}>生成结果</Title>
            
            <Card size="small" style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Text strong>博客标题：</Text>
                  <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Text>{generatedContent.title}</Text>
                    <Tooltip title="AI优化标题">
                      <Button
                        type="text"
                        size="small"
                        icon={<EditOutlined />}
                        loading={optimizing === 'title'}
                        onClick={() => handleOptimize('title', generatedContent.title)}
                      />
                    </Tooltip>
                  </div>
                </Col>
                <Col span={12}>
                  <Text strong>作者：</Text>
                  <div style={{ marginTop: 4 }}>
                    <Text>{generatedContent.author}</Text>
                  </div>
                </Col>
              </Row>
              
              <Row gutter={16} style={{ marginTop: 12 }}>
                <Col span={24}>
                  <Text strong>副标题：</Text>
                  <div style={{ marginTop: 4 }}>
                    <Text>{generatedContent.tagline}</Text>
                  </div>
                </Col>
              </Row>
              
              <Row gutter={16} style={{ marginTop: 12 }}>
                <Col span={24}>
                  <Text strong>关于我：</Text>
                  <div style={{ marginTop: 4, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <Text style={{ flex: 1 }}>{generatedContent.about}</Text>
                    <Tooltip title="AI优化内容">
                      <Button
                        type="text"
                        size="small"
                        icon={<EditOutlined />}
                        loading={optimizing === 'about'}
                        onClick={() => handleOptimize('about', generatedContent.about)}
                      />
                    </Tooltip>
                  </div>
                </Col>
              </Row>
              
              <Row gutter={16} style={{ marginTop: 12 }}>
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

            <Card size="small" style={{ marginBottom: 16 }}>
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

            <Space>
              <Button
                type="primary"
                icon={<UploadOutlined />}
                onClick={handleGenerateAndDownload}
                loading={uploading}
                size="large"
              >
                生成并下载博客
              </Button>
              <Button
                icon={<ThunderboltOutlined />}
                onClick={() => setGeneratedContent(null)}
              >
                重新生成
              </Button>
            </Space>
          </>
        )}
      </Card>
    </div>
  )
}
