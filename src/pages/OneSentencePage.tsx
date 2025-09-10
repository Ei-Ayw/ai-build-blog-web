import React, { useMemo, useState } from 'react'
import { Card, Button, Typography, Form, Input, Space, message, Upload, Divider, Tabs } from 'antd'
import { ThunderboltOutlined, RobotOutlined } from '@ant-design/icons'
import { buildBlogZip, generateHtmlAuto } from '../utils/generator'
import { parseMarkdownFiles, type Article } from '../utils/markdown'
import ThemePanel, { type ThemeTokens } from '../components/ThemePanel'
import AIBlogGenerator from '../components/AIBlogGenerator'

export default function OneSentencePage() {
  const [form] = Form.useForm()
  const [preview, setPreview] = useState('')
  const [articles, setArticles] = useState<Article[]>([])
  const [theme, setTheme] = useState<Partial<ThemeTokens> | undefined>()
  const [activeTab, setActiveTab] = useState('simple')

  const onPreview = async () => {
    const values = await form.validateFields()
    const html = generateHtmlAuto(values.prompt, { articles, themeOverride: theme })
    setPreview(html)
  }

  const onGenerate = async () => {
    const values = await form.validateFields()
    const html = generateHtmlAuto(values.prompt, { articles, themeOverride: theme })
    const zip = await buildBlogZip({ html, assets: [] })
    await zip.generateAsync({ type: 'blob' }).then(async (blob) => {
      const { saveAs } = await import('file-saver')
      saveAs(blob, 'blog-auto.zip')
    })
    message.success('博客ZIP已生成并下载')
  }

  const previewDoc = useMemo(() => preview || generateHtmlAuto('一个极简的技术博客，作者Ann，主题深色，简介记录AI与Web开发', { articles, themeOverride: theme }), [preview, articles, theme])

  const handleAIDownload = async (zipBlob: Blob, filename: string) => {
    const { saveAs } = await import('file-saver')
    saveAs(zipBlob, filename)
    message.success('博客ZIP已生成并下载')
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'simple',
            label: '简单生成',
            icon: <ThunderboltOutlined />,
            children: (
              <div className="space-y-6">
                <Card className="shadow-sm">
                  <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 16 }}>一句话生成</Typography.Title>
                  <Form
                    layout="vertical"
                    form={form}
                    initialValues={{ prompt: '一个极简的技术博客，作者Ann，主题深色，简介记录AI与Web开发' }}
                    onFinish={onGenerate}
                  >
                    <Form.Item
                      name="prompt"
                      label="一句话描述你的博客（无需模板）"
                      rules={[{ required: true, message: '请输入一句话需求' }]}
                      extra="示例：一个简洁的个人成长博客，作者Alice，主题白色，包含关于我、文章列表、联系方式"
                    >
                      <Input.TextArea rows={3} maxLength={300} placeholder="请输入：主题/风格/作者/简介/内容板块..." />
                    </Form.Item>

                    <div className="flex space-x-3">
                      <Button onClick={onPreview} size="large">预览</Button>
                      <Button type="primary" icon={<ThunderboltOutlined />} size="large" htmlType="submit">立即生成ZIP</Button>
                    </div>
                  </Form>
                </Card>

                <Card title="实时预览" className="shadow-sm">
                  <div style={{ border: '1px solid #eee', height: 480, borderRadius: 8 }}>
                    <iframe title="preview-auto" srcDoc={previewDoc} style={{ width: '100%', height: '100%', border: 0, borderRadius: 8 }} />
                  </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card title="文章导入" className="shadow-sm">
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
                      className="border-2 border-dashed hover:border-blue-400 transition-colors"
                    >
                      <div className="p-6 text-center">
                        <p className="text-gray-600 font-medium">拖拽 Markdown 文件到此处</p>
                        <p className="text-gray-400 text-sm mt-1">支持 .md, .markdown 文件</p>
                      </div>
                    </Upload.Dragger>
                  </Card>

                  <Card title="主题自定义" className="shadow-sm">
                    <div className="max-h-64 overflow-y-auto">
                      <ThemePanel value={theme as ThemeTokens} onChange={setTheme} />
                    </div>
                  </Card>
                </div>
              </div>
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
    </div>
  )
}


