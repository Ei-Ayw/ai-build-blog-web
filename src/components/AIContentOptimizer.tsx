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
  Modal
} from 'antd'
import { 
  RobotOutlined, 
  EditOutlined,
  BulbOutlined,
  CopyOutlined,
  CheckOutlined
} from '@ant-design/icons'
import { TencentAIService } from '../services/tencentAI'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
const { Option } = Select

interface AIContentOptimizerProps {
  initialContent?: string
  contentType?: 'title' | 'article' | 'about' | 'excerpt'
  onOptimized?: (content: string) => void
}

export default function AIContentOptimizer({ 
  initialContent = '', 
  contentType = 'article',
  onOptimized 
}: AIContentOptimizerProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [optimizedContent, setOptimizedContent] = useState('')
  const [copied, setCopied] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const contentTypeOptions = [
    { value: 'title', label: '标题', description: '优化博客标题，使其更吸引人' },
    { value: 'article', label: '文章内容', description: '优化文章内容，提升可读性' },
    { value: 'about', label: '关于我', description: '优化个人介绍，突出特色' },
    { value: 'excerpt', label: '文章摘要', description: '生成文章摘要' }
  ]

  const styleOptions = [
    { value: 'professional', label: '专业风格', description: '适合技术、商务类内容' },
    { value: 'casual', label: '轻松风格', description: '适合个人、生活类内容' },
    { value: 'creative', label: '创意风格', description: '适合设计、艺术类内容' },
    { value: 'academic', label: '学术风格', description: '适合研究、教育类内容' }
  ]

  const handleOptimize = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      
      const optimized = await TencentAIService.optimizeBlogContent(
        values.content, 
        values.contentType as 'title' | 'article' | 'about'
      )
      
      setOptimizedContent(optimized)
      onOptimized?.(optimized)
      message.success('内容优化完成！')
    } catch (error) {
      message.error('内容优化失败，请稍后重试')
      console.error('优化错误:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(optimizedContent)
      setCopied(true)
      message.success('内容已复制到剪贴板')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      message.error('复制失败')
    }
  }

  const handleUseOptimized = () => {
    form.setFieldsValue({ content: optimizedContent })
    setModalVisible(false)
    message.success('已应用优化后的内容')
  }

  return (
    <>
      <Card size="small">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <RobotOutlined style={{ color: '#1890ff' }} />
          <Text strong>AI内容优化</Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            content: initialContent,
            contentType: contentType,
            style: 'professional'
          }}
        >
          <Form.Item
            name="contentType"
            label="内容类型"
            rules={[{ required: true, message: '请选择内容类型' }]}
          >
            <Select placeholder="选择要优化的内容类型">
              {contentTypeOptions.map(option => (
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

          <Form.Item
            name="content"
            label="原始内容"
            rules={[{ required: true, message: '请输入要优化的内容' }]}
          >
            <TextArea
              rows={4}
              placeholder="请输入要优化的内容..."
              maxLength={2000}
            />
          </Form.Item>

          <Form.Item
            name="style"
            label="优化风格"
            rules={[{ required: true, message: '请选择优化风格' }]}
          >
            <Select placeholder="选择优化风格">
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

          <Form.Item>
            <Space>
              <Button
                type="primary"
                icon={<RobotOutlined />}
                onClick={handleOptimize}
                loading={loading}
              >
                AI优化
              </Button>
              <Button
                icon={<BulbOutlined />}
                onClick={() => {
                  const examples = {
                    title: '我的技术博客 - 分享前端开发经验',
                    article: '今天我想和大家分享一些关于React Hooks的使用技巧...',
                    about: '我是一名前端开发工程师，热爱技术，喜欢分享...',
                    excerpt: '本文介绍了React Hooks的基本概念和使用方法...'
                  }
                  form.setFieldsValue({ content: examples[contentType] })
                }}
              >
                使用示例
              </Button>
            </Space>
          </Form.Item>
        </Form>

        {optimizedContent && (
          <>
            <Divider />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text strong>优化结果</Text>
              <Space>
                <Tooltip title="复制内容">
                  <Button
                    type="text"
                    size="small"
                    icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                    onClick={handleCopy}
                  />
                </Tooltip>
                <Button
                  type="text"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => setModalVisible(true)}
                >
                  应用
                </Button>
              </Space>
            </div>
            <Card size="small" style={{ background: '#f6ffed', border: '1px solid #b7eb8f' }}>
              <Paragraph style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                {optimizedContent}
              </Paragraph>
            </Card>
          </>
        )}
      </Card>

      <Modal
        title="应用优化内容"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            取消
          </Button>,
          <Button key="apply" type="primary" onClick={handleUseOptimized}>
            应用
          </Button>
        ]}
      >
        <div style={{ marginBottom: 16 }}>
          <Text strong>原始内容：</Text>
          <Card size="small" style={{ marginTop: 8, background: '#fafafa' }}>
            <Paragraph style={{ margin: 0 }}>
              {form.getFieldValue('content')}
            </Paragraph>
          </Card>
        </div>
        
        <div>
          <Text strong>优化后内容：</Text>
          <Card size="small" style={{ marginTop: 8, background: '#f6ffed', border: '1px solid #b7eb8f' }}>
            <Paragraph style={{ margin: 0 }}>
              {optimizedContent}
            </Paragraph>
          </Card>
        </div>
      </Modal>
    </>
  )
}
