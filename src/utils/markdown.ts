import { marked } from 'marked'

export type Article = {
  title: string
  html: string
  slug: string
  excerpt?: string
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/gi, '-')
    .replace(/^-+|-+$/g, '')
}

function stripHtml(html: string): string {
  if (!html) return ''
  const div = typeof window !== 'undefined' ? document.createElement('div') : null
  if (div) {
    div.innerHTML = html
    return (div.textContent || div.innerText || '').trim()
  }
  // fallback（SSR 构建时）
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function extractTitle(md: string, fallback: string): string {
  const lines = md.split(/\r?\n/)
  for (const line of lines) {
    const m = line.match(/^#\s+(.+)$/)
    if (m) return m[1].trim()
  }
  return fallback.replace(/\.(md|markdown)$/i, '')
}

export async function parseMarkdownFiles(files: File[]): Promise<Article[]> {
  const results: Article[] = []
  for (const file of files) {
    const text = await file.text()
    const title = extractTitle(text, file.name)
    const html = marked.parse(text) as string
    const slug = slugify(title || file.name)
    const excerpt = stripHtml(html).slice(0, 120)
    results.push({ title, html, slug, excerpt })
  }
  return results
}


