import JSZip from 'jszip'
import type { Article } from './markdown'

export type ThemeTokens = {
  bg: string
  fg: string
  sub: string
  primary: string
  card: string
  border: string
}

type BasicInfo = {
  title: string
  author: string
  tagline?: string
  about?: string
}

export function buildBlogZip({ html, assets }: { html: string; assets: Array<{ path: string; content: string | Uint8Array | ArrayBuffer }> }) {
  const zip = new JSZip()
  zip.file('index.html', html)
  const assetFolder = zip.folder('assets')
  assets.forEach((a) => assetFolder?.file(a.path, a.content))
  return zip
}

export function generateHtmlByTemplate(info: Partial<BasicInfo>, templateId: string, opts?: { articles?: Article[]; themeOverride?: Partial<ThemeTokens> }) {
  const theme = pickTheme(templateId)
  const title = info.title || '我的新博客'
  const author = info.author || '作者'
  const tagline = info.tagline || ''
  const about = info.about || ''

  return baseHtml({ title, author, tagline, about, theme, articles: opts?.articles, themeOverride: opts?.themeOverride })
}

export function generateHtmlAuto(prompt: string, opts?: { articles?: Article[]; themeOverride?: Partial<ThemeTokens> }) {
  const lower = prompt.toLowerCase()
  const isDark = /(深色|暗色|dark)/.test(prompt)
  const theme = isDark ? 'dark' : /(白|light|简洁|极简)/.test(prompt) ? 'clean' : 'magazine'
  const authorMatch = prompt.match(/作者([:：]?)([\w\u4e00-\u9fa5]+)/)
  const author = authorMatch ? authorMatch[2] : '作者'
  const titleMatch = prompt.match(/(博客|站点|网站)?(名称|标题)?[:：]?([\w\u4e00-\u9fa5]{2,20})/)
  const title = titleMatch ? titleMatch[3] : '我的新博客'
  const about = prompt

  return baseHtml({ title, author, tagline: '', about, theme, articles: opts?.articles, themeOverride: opts?.themeOverride })
}

function pickTheme(id: string) {
  if (id === 'dark') return 'dark'
  if (id === 'magazine') return 'magazine'
  return 'clean'
}

function baseHtml({ title, author, tagline, about, theme, articles, themeOverride }: { title: string; author: string; tagline: string; about: string; theme: 'clean' | 'dark' | 'magazine'; articles?: Article[]; themeOverride?: Partial<ThemeTokens> }) {
  const paletteDefault = theme === 'dark' ? {
    bg: '#000', fg: '#fff', sub: '#8E8E93', primary: '#007AFF', card: '#111', border: '#1f1f1f'
  } : theme === 'magazine' ? {
    bg: '#fafafa', fg: '#000', sub: '#8E8E93', primary: '#007AFF', card: '#fff', border: '#eaeaea'
  } : {
    bg: '#fff', fg: '#000', sub: '#8E8E93', primary: '#007AFF', card: '#fff', border: '#f0f0f0'
  }
  const palette = { ...paletteDefault, ...(themeOverride || {}) }

  const defaultArticles = [
    { title: '第一篇：开篇词', excerpt: '记录我的学习与成长路径。', slug: 'post-1', html: '' },
    { title: '第二篇：组件化思维', excerpt: '谈谈前端组件设计与复用。', slug: 'post-2', html: '' },
    { title: '第三篇：AI辅助开发实践', excerpt: '用AI提升效率的几个小技巧。', slug: 'post-3', html: '' }
  ]

  const listData = (articles && articles.length > 0 ? articles.map(a => ({ title: a.title, excerpt: a.excerpt || '', slug: a.slug })) : defaultArticles)

  const list = listData.map(a => `
    <a class="post" href="#${a.slug}">
      <h3>${a.title}</h3>
      <p>${a.excerpt || ''}</p>
    </a>
  `).join('')

  const firstArticleSection = (articles && articles.length > 0) ? `<section class="article" id="${articles[0]?.slug || 'article'}">${articles[0]?.html || ''}</section>` : ''

  return `<!doctype html>
  <html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      :root { --bg:${palette.bg}; --fg:${palette.fg}; --sub:${palette.sub}; --primary:${palette.primary}; --card:${palette.card}; --border:${palette.border}; }
      * { box-sizing: border-box; }
      body { margin: 0; font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial; background: var(--bg); color: var(--fg); }
      a { color: inherit; text-decoration: none; }
      header { padding: 40px 20px 16px; border-bottom: 1px solid var(--border); }
      .container { max-width: 980px; margin: 0 auto; }
      .title { font-size: 32px; font-weight: 700; }
      .sub { color: var(--sub); margin-top: 8px; }
      .grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); margin-top: 24px; }
      .post { background: var(--card); border: 1px solid var(--border); padding: 16px; border-radius: 10px; transition: border .2s ease; }
      .post:hover { border-color: var(--primary); }
      .post h3 { margin: 0 0 8px; font-size: 18px; }
      .post p { margin: 0; color: var(--sub); }
      .about { background: var(--card); border: 1px solid var(--border); padding: 16px; border-radius: 10px; margin-top: 24px; }
      footer { text-align: center; color: var(--sub); padding: 24px; }
      .button { display:inline-block; background: var(--primary); color:#fff; padding: 10px 14px; border-radius: 8px; margin-top: 16px; }
      .article { background: var(--card); border: 1px solid var(--border); padding: 16px; border-radius: 10px; margin-top: 24px; }
      .article h1, .article h2, .article h3 { margin-top: 1.4em; }
    </style>
  </head>
  <body>
    <header>
      <div class="container">
        <div class="title">${title}</div>
        <div class="sub">作者：${author}${tagline ? ' · ' + tagline : ''}</div>
      </div>
    </header>
    <main>
      <div class="container">
        <section class="grid">${list}</section>
        <section class="about">
          <h3>关于我</h3>
          <p style="white-space:pre-wrap; line-height:1.8;">${about}</p>
          <a class="button" href="#">联系我</a>
        </section>
        ${firstArticleSection}
      </div>
    </main>
    <footer>Powered by Blog Builder</footer>
  </body>
  </html>`
}


