# 博客生成器部署指南

## 项目概述

这是一个集成了腾讯云大模型能力的智能博客生成器，支持AI内容生成、优化和云端存储功能。

## 功能特性

### ✅ 已实现功能
- **AI智能生成**: 使用腾讯云大模型生成博客内容
- **内容优化**: AI驱动的标题和内容优化
- **模板系统**: 3种预设模板（极简白、极夜黑、杂志风）
- **Markdown支持**: 导入和解析Markdown文件
- **主题自定义**: 实时预览和自定义主题
- **云端存储**: 腾讯云COS集成（模拟实现）
- **响应式设计**: 适配各种设备尺寸

### 🔄 当前状态
- **AI服务**: 使用模拟服务，可替换为真实腾讯云API
- **存储服务**: 使用模拟服务，可替换为真实腾讯云COS
- **组件库**: 使用Ant Design，可升级为21st.dev组件

## 部署步骤

### 1. 环境准备

```bash
# 克隆项目
git clone <repository-url>
cd blog-build

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 2. 生产构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 3. 部署选项

#### 选项1: 静态网站托管
```bash
# 构建后的文件在 dist/ 目录
# 可以直接部署到任何静态网站托管服务

# GitHub Pages
# 1. 将 dist/ 目录内容推送到 gh-pages 分支
# 2. 在仓库设置中启用 GitHub Pages

# Netlify
# 1. 连接GitHub仓库
# 2. 设置构建命令: npm run build
# 3. 设置发布目录: dist

# Vercel
# 1. 导入项目
# 2. 自动检测Vite配置
# 3. 部署
```

#### 选项2: 服务器部署
```bash
# 使用Nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# 使用Apache
# 在dist目录创建.htaccess文件
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## 配置说明

### 环境变量配置

创建 `.env.production` 文件：

```bash
# 腾讯云配置
VITE_TENCENTCLOUD_SECRET_ID=your_secret_id
VITE_TENCENTCLOUD_SECRET_KEY=your_secret_key
VITE_TENCENTCLOUD_REGION=ap-guangzhou
VITE_TENCENTCLOUD_LKE_ENDPOINT=lkeap.tencentcloudapi.com
VITE_TENCENTCLOUD_DEEPSEEK_MODEL=deepseek-r1

# HyperBrowser API
VITE_HYPERBROWSER_API_KEY=your_api_key
```

### 腾讯云服务配置

#### 1. 大模型服务配置
```typescript
// src/config/tencent.ts
export const TENCENT_CONFIG = {
  SECRET_ID: process.env.VITE_TENCENTCLOUD_SECRET_ID || 'your_secret_id',
  SECRET_KEY: process.env.VITE_TENCENTCLOUD_SECRET_KEY || 'your_secret_key',
  REGION: process.env.VITE_TENCENTCLOUD_REGION || 'ap-guangzhou',
  LKE_ENDPOINT: process.env.VITE_TENCENTCLOUD_LKE_ENDPOINT || 'lkeap.tencentcloudapi.com',
  DEEPSEEK_MODEL: process.env.VITE_TENCENTCLOUD_DEEPSEEK_MODEL || 'deepseek-r1'
}
```

#### 2. COS存储配置
```typescript
// 需要创建腾讯云COS存储桶
// 1. 登录腾讯云控制台
// 2. 创建COS存储桶
// 3. 配置访问权限
// 4. 获取存储桶名称和地域信息
```

## 升级到真实服务

### 1. 替换AI服务

将 `src/services/tencentAI.ts` 中的模拟服务替换为真实的腾讯云API调用：

```typescript
// 替换模拟服务
import { tencentcloud } from 'tencentcloud-sdk-nodejs'

const client = new tencentcloud.lke.v20231130.Client({
  credential: {
    secretId: TENCENT_CONFIG.SECRET_ID,
    secretKey: TENCENT_CONFIG.SECRET_KEY,
  },
  region: TENCENT_CONFIG.REGION,
  profile: {
    httpProfile: {
      endpoint: TENCENT_CONFIG.LKE_ENDPOINT,
    },
  },
})
```

### 2. 替换COS服务

将 `src/services/tencentCOS.ts` 中的模拟服务替换为真实的腾讯云COS API调用：

```typescript
// 替换模拟服务
import { COS } from 'cos-nodejs-sdk-v5'

const cos = new COS({
  SecretId: TENCENT_CONFIG.SECRET_ID,
  SecretKey: TENCENT_CONFIG.SECRET_KEY,
})
```

### 3. 升级组件库

```bash
# 安装21st.dev组件库
npm install @21st.dev/ui

# 替换Ant Design组件
# 参考21st.dev文档进行组件替换
```

## 性能优化

### 1. 代码分割
```typescript
// 使用动态导入
const AIBlogGenerator = lazy(() => import('./components/AIBlogGenerator'))
const EnhancedBlogGenerator = lazy(() => import('./components/EnhancedBlogGenerator'))
```

### 2. 构建优化
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          antd: ['antd'],
          ai: ['./src/services/tencentAI.ts', './src/services/tencentCOS.ts']
        }
      }
    }
  }
})
```

### 3. 缓存策略
```typescript
// 添加Service Worker
// 缓存静态资源
// 离线支持
```

## 监控和分析

### 1. 错误监控
```typescript
// 集成Sentry或其他错误监控服务
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'your-sentry-dsn',
})
```

### 2. 性能监控
```typescript
// 集成Google Analytics或其他分析工具
// 监控用户行为和性能指标
```

### 3. 日志记录
```typescript
// 添加日志记录
console.log('AI生成请求:', request)
console.log('生成结果:', result)
```

## 安全考虑

### 1. API密钥安全
- 使用环境变量存储敏感信息
- 不在客户端代码中暴露密钥
- 使用服务端代理调用API

### 2. 内容安全
- 验证用户输入
- 过滤恶意内容
- 限制文件上传类型和大小

### 3. 访问控制
- 实现用户认证
- 限制API调用频率
- 添加CORS配置

## 故障排除

### 常见问题

1. **构建失败**
   ```bash
   # 清理缓存
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **AI服务调用失败**
   - 检查网络连接
   - 验证API密钥
   - 查看控制台错误信息

3. **文件上传失败**
   - 检查COS配置
   - 验证存储桶权限
   - 确认文件大小限制

### 调试模式

```typescript
// 启用调试模式
const DEBUG = process.env.NODE_ENV === 'development'

if (DEBUG) {
  console.log('调试信息:', data)
}
```

## 更新日志

### v2.0.0 (当前版本)
- ✅ 集成AI内容生成功能
- ✅ 添加内容优化功能
- ✅ 实现云端存储功能
- ✅ 新增增强版生成器
- ✅ 优化用户界面和体验

### 下一步计划
- [ ] 集成真实腾讯云API
- [ ] 升级到21st.dev组件库
- [ ] 添加用户认证系统
- [ ] 实现博客管理功能
- [ ] 添加SEO优化功能
