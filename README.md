# Blog Builder - AI驱动的博客生成工具

一个现代化的博客生成工具，采用React + Vite + Tailwind CSS构建，支持AI智能生成和丰富的模板库。

## 🌐 在线体验

**GitHub Pages部署地址**: [https://ei-ayw.github.io/ai-build-blog-web/](https://ei-ayw.github.io/ai-build-blog-web/)

## ✨ 主要功能

- **🎨 模板库**: 12个精美模板，涵盖科技、创意、商务、生活等多个分类
- **🤖 AI智能生成**: 基于大语言模型的智能内容生成
- **👁️ 实时预览**: 支持模板预览和全屏查看
- **📱 响应式设计**: 适配各种设备，提供优秀的用户体验
- **🎯 扁平化设计**: 简洁现代的UI设计，参考21st.dev和繁星点点网站风格

### 本地开发

1. 安装依赖：

```bash
npm i
```

2. 启动开发：

```bash
npm run dev
```

3. 构建生产包：

```bash
npm run build
```

4. 预览生产包：

```bash
npm run preview
```

## 📖 使用说明

### 模板库使用
1. 访问[模板库页面](https://ei-ayw.github.io/ai-build-blog-web/templates)
2. 浏览12个精美模板，按分类筛选或搜索
3. 点击"预览效果"查看模板实际效果
4. 点击"使用此模板"开始生成博客

### AI智能生成
1. 访问[AI生成页面](https://ei-ayw.github.io/ai-build-blog-web/ai)
2. 描述您的博客需求（主题、风格、内容等）
3. 选择模板和样式偏好
4. 点击"开始生成博客"让AI为您创建内容
5. 预览生成结果并下载ZIP文件

### 一句话生成
1. 访问[一句话生成页面](https://ei-ayw.github.io/ai-build-blog-web/one)
2. 输入一句话描述您的博客需求
3. 系统自动生成完整的博客内容
4. 预览并下载生成的博客文件

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **样式框架**: Tailwind CSS + 自定义CSS变量
- **UI组件**: 自定义SaaS风格组件库
- **动画效果**: Framer Motion
- **图标库**: Lucide React
- **路由管理**: React Router 6
- **文件处理**: JSZip + file-saver
- **AI集成**: 腾讯云AI服务（模拟）
- **部署**: GitHub Pages

## 📁 项目结构

```
blog-build/
├─ src/
│  ├─ pages/
│  │  ├─ LandingPage.tsx          # 首页/着陆页
│  │  ├─ TemplateGallery.tsx      # 模板库（博客风格）
│  │  ├─ TemplatesPage.tsx        # 模板选择与生成
│  │  └─ OneSentencePage.tsx      # 一句话生成
│  ├─ components/
│  │  ├─ saas/                    # SaaS风格组件库
│  │  │  ├─ Button.tsx
│  │  │  ├─ Card.tsx
│  │  │  ├─ Input.tsx
│  │  │  ├─ Select.tsx
│  │  │  └─ AIBlogGenerator.tsx   # AI博客生成器
│  │  └─ TemplatePreview.tsx      # 模板预览组件
│  ├─ data/
│  │  └─ templates.ts             # 模板数据定义
│  ├─ styles/
│  │  ├─ saas-theme.css           # SaaS主题样式
│  │  └─ template-preview.css     # 模板预览样式
│  ├─ utils/
│  │  └─ generator.ts             # HTML生成与ZIP打包
│  ├─ App.tsx
│  └─ main.tsx
├─ index.html
├─ vite.config.ts
├─ tailwind.config.js
├─ postcss.config.js
├─ tsconfig.json
└─ package.json
```

## 🎨 模板库特色

### 12个精美模板
- **科技公司**: 极简科技风格 - 简洁现代，适合技术博客
- **创意设计**: 创意作品集风格 - 富有创意，适合设计师
- **商务服务**: 商务专业风格 - 专业稳重，适合企业博客
- **个人博客**: 生活方式风格 - 温馨友好，适合个人分享
- **新闻媒体**: 新闻杂志风格 - 信息密集，适合新闻网站
- **时尚美妆**: 时尚生活风格 - 时尚前卫，适合时尚博客
- **美食餐饮**: 美食博客风格 - 温暖诱人，适合美食分享
- **旅行户外**: 旅行探险风格 - 充满活力，适合旅行博客
- **教育培训**: 教育学习风格 - 专业清晰，适合知识分享
- **健康医疗**: 健康养生风格 - 清新健康，适合健康内容
- **金融理财**: 金融投资风格 - 稳重可信，适合金融分析
- **游戏娱乐**: 游戏娱乐风格 - 动感科技，适合游戏内容

### 设计风格
- **扁平化设计**: 简洁现代的UI设计
- **小圆角**: 精致的圆角设计，参考繁星点点网站风格
- **轻微阴影**: 优雅的阴影效果，不会过于突出
- **响应式布局**: 完美适配各种设备尺寸

## 🚀 部署说明

### GitHub Pages部署
项目已配置GitHub Pages自动部署，每次推送到master分支都会自动更新在线版本。

### 本地部署
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 🔧 环境变量

当前版本为纯前端静态生成，不依赖后端与环境变量。如后续集成后端或 API Key，请在项目根目录创建 `.env` 文件并通过 `import.meta.env` 读取。

## ❓ 常见问题

- **首次运行无法下载 ZIP**: 请确认浏览器未拦截下载
- **打包体积较大**: 可按需拆分路由或改为懒加载
- **模板预览不显示**: 请检查网络连接和浏览器兼容性

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

---

**在线体验**: [https://ei-ayw.github.io/ai-build-blog-web/](https://ei-ayw.github.io/ai-build-blog-web/)

