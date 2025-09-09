import React, { useMemo, useState } from 'react'
import { Card, Button, Typography, Form, Input, Space, message } from 'antd'
import { ThunderboltOutlined } from '@ant-design/icons'
import { buildBlogZip, generateHtmlAuto } from '../utils/generator'

export default function OneSentencePage() {
  const [form] = Form.useForm()
  const [preview, setPreview] = useState('')

  const onPreview = async () => {
    const values = await form.validateFields()
    const html = generateHtmlAuto(values.prompt)
    setPreview(html)
  }

  const onGenerate = async () => {
    const values = await form.validateFields()
    const html = generateHtmlAuto(values.prompt)
    const zip = await buildBlogZip({ html, assets: [] })
    await zip.generateAsync({ type: 'blob' }).then(async (blob) => {
      const { saveAs } = await import('file-saver')
      saveAs(blob, 'blog-auto.zip')
    })
    message.success('博客ZIP已生成并下载')
  }

  const previewDoc = useMemo(() => preview || generateHtmlAuto('一个极简的技术博客，作者Ann，主题深色，简介记录AI与Web开发'), [preview])

  return (
    <Space direction="vertical" size={16} style={{ display: 'flex' }}>
      <Card>
        <Typography.Title level={4} style={{ marginTop: 0 }}>一句话生成</Typography.Title>
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
            <Input.TextArea rows={4} maxLength={300} placeholder="请输入：主题/风格/作者/简介/内容板块..." />
          </Form.Item>

          <Space>
            <Button onClick={onPreview}>预览</Button>
            <Button type="primary" icon={<ThunderboltOutlined />} htmlType="submit">立即生成ZIP</Button>
          </Space>
        </Form>
      </Card>

      <Card title="实时预览">
        <div style={{ border: '1px solid #eee', height: 640 }}>
          <iframe title="preview-auto" srcDoc={previewDoc} style={{ width: '100%', height: '100%', border: 0 }} />
        </div>
      </Card>
    </Space>
  )
}


