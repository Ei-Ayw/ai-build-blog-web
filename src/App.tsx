import React from 'react'
import { Layout, Menu, Typography } from 'antd'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { RocketOutlined, AppstoreOutlined } from '@ant-design/icons'
import TemplatesPage from './pages/TemplatesPage'
import OneSentencePage from './pages/OneSentencePage'

const { Header, Content } = Layout

const items = [
  { key: '/', icon: <AppstoreOutlined />, label: <Link to="/">模板生成</Link> },
  { key: '/one', icon: <RocketOutlined />, label: <Link to="/one">一句话生成</Link> }
]

export default function App() {
  const location = useLocation()
  const selected = location.pathname === '/' ? ['/'] : [location.pathname]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Typography.Title level={4} style={{ color: '#fff', margin: 0, marginRight: 24 }}>
          Blog Builder
        </Typography.Title>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={selected}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: 24 }}>
        <Routes>
          <Route path="/" element={<TemplatesPage />} />
          <Route path="/one" element={<OneSentencePage />} />
        </Routes>
      </Content>
    </Layout>
  )
}


