import React from 'react'
import { Form, Input, Row, Col } from 'antd'

export type ThemeTokens = {
  bg: string
  fg: string
  sub: string
  primary: string
  card: string
  border: string
}

type Props = {
  value?: ThemeTokens
  onChange?: (v: ThemeTokens) => void
}

const defaults: ThemeTokens = {
  bg: '#ffffff',
  fg: '#000000',
  sub: '#8E8E93',
  primary: '#007AFF',
  card: '#ffffff',
  border: '#f0f0f0'
}

export default function ThemePanel({ value, onChange }: Props) {
  const v = { ...defaults, ...value }
  return (
    <Form
      layout="vertical"
      initialValues={v}
      onValuesChange={(_, all) => onChange?.(all as ThemeTokens)}
    >
      <Row gutter={12}>
        <Col span={12}><Form.Item name="bg" label="背景色"><Input type="color" /></Form.Item></Col>
        <Col span={12}><Form.Item name="fg" label="前景色"><Input type="color" /></Form.Item></Col>
        <Col span={12}><Form.Item name="sub" label="次要文字"><Input type="color" /></Form.Item></Col>
        <Col span={12}><Form.Item name="primary" label="主色"><Input type="color" /></Form.Item></Col>
        <Col span={12}><Form.Item name="card" label="卡片背景"><Input type="color" /></Form.Item></Col>
        <Col span={12}><Form.Item name="border" label="边框色"><Input type="color" /></Form.Item></Col>
      </Row>
    </Form>
  )
}


