import React, { useMemo, useState } from 'react'
import { Card, Col, Row, Button, Modal, Form, Input, message, Space, Typography, Tag, Upload, Divider, Tabs } from 'antd'
import { EyeOutlined, ThunderboltOutlined, RobotOutlined } from '@ant-design/icons'
import { buildBlogZip, generateHtmlByTemplate } from '../utils/generator'
import { parseMarkdownFiles, type Article } from '../utils/markdown'
import ThemePanel, { type ThemeTokens } from '../components/ThemePanel'
import AIBlogGenerator from '../components/AIBlogGenerator'

type TemplateMeta = {
  id: string
  name: string
  description: string
  tags: string[]
}

const TEMPLATES: TemplateMeta[] = [
  { id: 'clean', name: '极简白', description: '极简白底，强调阅读体验', tags: ['极简', '白色', '响应式'] },
  { id: 'dark', name: '极夜黑', description: '深色主题，夜间友好', tags: ['暗色', '对比强'] },
  { id: 'magazine', name: '杂志风', description: '封面列表，杂志排版', tags: ['杂志', '卡片'] }
]

export default function TemplatesPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState<TemplateMeta | null>(null)
  const [form] = Form.useForm()
  const [articles, setArticles] = useState<Article[]>([])
  const [theme, setTheme] = useState<Partial<ThemeTokens> | undefined>()
  const [activeTab, setActiveTab] = useState('templates')

  const previewUrl = useMemo(() => {
    return currentTemplate ? `/preview/${currentTemplate.id}` : ''
  }, [currentTemplate])

  const onGenerate = async () => {
    try {
      const values = await form.validateFields()
      const html = generateHtmlByTemplate(values, currentTemplate?.id || 'clean', { articles, themeOverride: theme })
      const zip = await buildBlogZip({
        html,
        assets: []
      })
      await zip.generateAsync({ type: 'blob' }).then(async (blob) => {
        const { saveAs } = await import('file-saver')
        saveAs(blob, `blog-${currentTemplate?.id || 'clean'}.zip`)
      })
      message.success('博客ZIP已生成并下载')
      setModalOpen(false)
    } catch (e) {
      // 校验失败或生成异常
    }
  }

  const handleAIDownload = async (zipBlob: Blob, filename: string) => {
    const { saveAs } = await import('file-saver')
    saveAs(zipBlob, filename)
    message.success('博客ZIP已生成并下载')
  }

  return (
    <>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'templates',
            label: '模板生成',
            icon: <EyeOutlined />,
            children: (
              <Row gutter={[16, 16]}>
                {TEMPLATES.map((tpl) => (
                  <Col key={tpl.id} xs={24} sm={12} md={8}>
                    <Card
                      title={tpl.name}
                      extra={<Space>{tpl.tags.map((t) => <Tag key={t}>{t}</Tag>)}</Space>}
                      actions={[
                        <Button type="link" icon={<EyeOutlined />} onClick={() => { setCurrentTemplate(tpl); setModalOpen(true) }}>预览/生成</Button>,
                        <Button type="link" icon={<ThunderboltOutlined />} onClick={() => { setCurrentTemplate(tpl); setModalOpen(true) }}>立即生成</Button>
                      ]}
                    >
                      <Typography.Paragraph type="secondary">{tpl.description}</Typography.Paragraph>
                    </Card>
                  </Col>
                ))}
              </Row>
            )
          },
          {
            key: 'ai',
            label: 'AI智能生成',
            icon: <RobotOutlined />,
            children: <AIBlogGenerator onDownload={handleAIDownload} />
          }
        ]}
      />

      <Modal
        width={980}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        title={`模板：${currentTemplate?.name || ''}`}
        footer={
          <Space>
            <Button onClick={() => setModalOpen(false)}>取消</Button>
            <Button type="primary" onClick={onGenerate}>生成ZIP</Button>
          </Space>
        }
      >
        <Row gutter={16}>
          <Col span={14}>
            <div style={{ border: '1px solid #eee', height: 520 }}>
              <iframe title="preview" srcDoc={generateHtmlByTemplate({ title: '预览', author: '你', tagline: 'Hello' }, currentTemplate?.id || 'clean', { articles, themeOverride: theme })} style={{ width: '100%', height: '100%', border: 0 }} />
            </div>
          </Col>
          <Col span={10}>
            <Typography.Title level={5} style={{ marginTop: 0 }}>基础信息</Typography.Title>
            <Form form={form} layout="vertical" initialValues={{ title: '我的新博客', author: '作者', tagline: '记录我的技术与生活', about: '这里是关于我...' }}>
              <Form.Item name="title" label="站点标题" rules={[{ required: true, message: '请输入站点标题' }]}>
                <Input maxLength={60} placeholder="如：Ann的技术日志" />
              </Form.Item>
              <Form.Item name="author" label="作者" rules={[{ required: true, message: '请输入作者' }]}>
                <Input maxLength={30} placeholder="你的名字" />
              </Form.Item>
              <Form.Item name="tagline" label="副标题/标语">
                <Input maxLength={120} placeholder="一句话介绍你的博客" />
              </Form.Item>
              <Form.Item name="about" label="关于我（首页简介）">
                <Input.TextArea rows={6} maxLength={500} placeholder="简介、擅长领域、社交链接等" />
              </Form.Item>
            </Form>

            <Divider style={{ margin: '16px 0' }} />
            <Typography.Title level={5} style={{ marginTop: 0 }}>文章导入（Markdown）</Typography.Title>
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

            <Divider style={{ margin: '16px 0' }} />
            <Typography.Title level={5} style={{ marginTop: 0 }}>主题自定义</Typography.Title>
            <ThemePanel value={theme as ThemeTokens} onChange={setTheme} />
          </Col>
        </Row>
      </Modal>
    </>
  )
}


