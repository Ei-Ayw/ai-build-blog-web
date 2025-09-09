## Blog Builder（React + Ant Design）

一个用 React + Vite + Ant Design 构建的“个人博客生成器”。用户可通过：

- **模板生成**：从多个模板中选择，填写站点信息，立即打包导出 ZIP。
- **一句话生成**：输入一句话描述（作者、主题、风格等），自动构建基础博客并导出 ZIP。

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

### 使用说明

- 进入首页“模板生成”：选择“极简白/极夜黑/杂志风”等模板 → 预览 → 点击“生成 ZIP”下载完整静态站（含 `index.html`）。
- 进入“一句话生成”：输入如“一个极简的技术博客，作者Ann，主题深色，简介记录AI与Web开发”，可预览并下载 ZIP。

### 技术栈

- React 18、Vite 5
- Ant Design 5（UI）
- JSZip + file-saver（打包下载）
- React Router 6（路由）

### 目录结构

```
blog-build/
  ├─ src/
  │  ├─ pages/
  │  │  ├─ TemplatesPage.tsx      # 模板选择与生成
  │  │  └─ OneSentencePage.tsx     # 一句话生成
  │  ├─ utils/
  │  │  └─ generator.ts            # HTML 生成与 ZIP 打包
  │  ├─ App.tsx
  │  └─ main.tsx
  ├─ index.html
  ├─ vite.config.ts
  ├─ tsconfig.json
  └─ package.json
```

### 环境变量

当前版本为纯前端静态生成，不依赖后端与环境变量。如后续集成后端或 API Key，请在项目根目录创建 `.env` 文件并通过 `import.meta.env` 读取。

### 常见问题

- 首次运行无法下载 ZIP：请确认浏览器未拦截下载。
- 打包体积较大：可按需拆分路由或改为懒加载。

### 许可

MIT

# ai-build-blog-web
