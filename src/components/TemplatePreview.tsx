import React from 'react';
import { motion } from 'framer-motion';
import { X, Maximize2, Minimize2, Eye, Palette, Type, Layout } from 'lucide-react';
import { BlogTemplate } from '../data/templates';

interface TemplatePreviewProps {
  template: BlogTemplate;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: BlogTemplate) => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

// 示例博客内容
const sampleBlogContent = {
  title: "AI驱动的未来：探索人工智能在内容创作中的无限可能",
  excerpt: "随着人工智能技术的快速发展，AI在内容创作领域展现出了巨大的潜力。本文将深入探讨AI如何改变我们的创作方式，以及未来可能的发展趋势。",
  author: "AI内容专家",
  date: "2024年1月15日",
  readTime: "8分钟阅读",
  content: `
    <h2>引言</h2>
    <p>在数字化时代，内容创作已经成为连接世界的重要桥梁。人工智能技术的兴起，为内容创作带来了前所未有的变革机遇。</p>
    
    <h2>AI在内容创作中的应用</h2>
    <p>人工智能在内容创作领域的应用已经非常广泛，从文本生成到图像创作，从视频制作到音频处理，AI正在重新定义创作的可能性。</p>
    
    <h3>文本生成技术</h3>
    <p>现代AI文本生成技术能够理解上下文，生成连贯、有逻辑的内容。无论是新闻报道、技术文档，还是创意写作，AI都能提供强有力的支持。</p>
    
    <h3>视觉内容创作</h3>
    <p>AI图像生成技术让创作者能够快速将想法转化为视觉作品。从概念设计到最终成品，AI大大提高了创作效率。</p>
    
    <h2>未来发展趋势</h2>
    <p>随着技术的不断进步，AI在内容创作中的作用将更加重要。我们期待看到更多创新的应用场景和更智能的创作工具。</p>
    
    <h2>结论</h2>
    <p>AI不是要替代人类创作者，而是要成为他们的得力助手。通过人机协作，我们可以创造出更加丰富、更有价值的内容。</p>
  `,
  tags: ["人工智能", "内容创作", "技术趋势", "未来展望"]
};

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  template,
  isOpen,
  onClose,
  onSelect,
  isFullscreen = false,
  onToggleFullscreen
}) => {
  if (!isOpen) return null;

  const previewStyle = {
    '--primary-color': template.style.colors.primary,
    '--secondary-color': template.style.colors.secondary,
    '--background-color': template.style.colors.background,
    '--text-color': template.style.colors.text,
    '--accent-color': template.style.colors.accent,
    '--heading-font': template.style.typography.heading,
    '--body-font': template.style.typography.body,
    '--font-size': template.style.typography.size === 'small' ? '14px' : 
                   template.style.typography.size === 'large' ? '18px' : '16px',
    '--spacing': template.style.layout.spacing === 'compact' ? '1rem' :
                 template.style.layout.spacing === 'spacious' ? '2rem' : '1.5rem'
  } as React.CSSProperties;

  const getLayoutClass = () => {
    switch (template.style.layout.type) {
      case 'minimal': return 'minimal-layout';
      case 'modern': return 'modern-layout';
      case 'classic': return 'classic-layout';
      case 'creative': return 'creative-layout';
      default: return 'modern-layout';
    }
  };

  return (
    <motion.div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 ${
        isFullscreen ? 'p-0' : ''
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={`bg-white rounded -2xl overflow-hidden ${
          isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-6xl h-[90vh]'
        }`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={previewStyle}
      >
        {/* 预览头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-4">
            <div
              className="w-12 h-12 rounded flex items-center justify-center text-white text-xl font-bold"
              style={{ backgroundColor: template.style.colors.primary }}
            >
              {template.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-black">{template.name}</h2>
              <p className="text-sm text-gray-600">{template.category}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleFullscreen}
              className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-xl transition-all duration-300"
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-xl transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 预览内容 */}
        <div className="flex h-full">
          {/* 左侧：模板信息 */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* 模板描述 */}
              <div>
                <h3 className="text-lg font-bold text-black mb-2">模板描述</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{template.description}</p>
              </div>

              {/* 样式信息 */}
              <div>
                <h3 className="text-lg font-bold text-black mb-3">样式信息</h3>
                <div className="space-y-4">
                  {/* 配色方案 */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Palette size={16} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">配色方案</span>
                    </div>
                    <div className="flex space-x-2">
                      <div
                        className="w-8 h-8 rounded-xl border border-gray-200"
                        style={{ backgroundColor: template.style.colors.primary }}
                        title="主色调"
                      ></div>
                      <div
                        className="w-8 h-8 rounded-xl border border-gray-200"
                        style={{ backgroundColor: template.style.colors.accent }}
                        title="强调色"
                      ></div>
                      <div
                        className="w-8 h-8 rounded-xl border border-gray-200"
                        style={{ backgroundColor: template.style.colors.secondary }}
                        title="次要色"
                      ></div>
                    </div>
                  </div>

                  {/* 字体信息 */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Type size={16} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">字体设置</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>标题字体: {template.style.typography.heading}</div>
                      <div>正文字体: {template.style.typography.body}</div>
                      <div>字体大小: {template.style.typography.size}</div>
                    </div>
                  </div>

                  {/* 布局信息 */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Layout size={16} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">布局设置</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>布局类型: {template.style.layout.type}</div>
                      <div>间距设置: {template.style.layout.spacing}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 特色功能 */}
              <div>
                <h3 className="text-lg font-bold text-black mb-3">特色功能</h3>
                <div className="space-y-2">
                  {template.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 标签 */}
              <div>
                <h3 className="text-lg font-bold text-black mb-3">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-xl"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：博客预览 */}
          <div className="flex-1 overflow-y-auto">
            <div className={`template-preview ${getLayoutClass()}`} style={previewStyle}>
              {/* 博客头部 */}
              <header className="template-header">
                <div className="container">
                  <div className="flex items-center justify-between py-6">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: template.style.colors.primary }}
                      >
                        B
                      </div>
                      <span className="text-xl font-bold" style={{ color: template.style.colors.text }}>
                        BlogBuilder
                      </span>
                    </div>
                    <nav className="flex space-x-6">
                      <a href="#" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: template.style.colors.text }}>
                        首页
                      </a>
                      <a href="#" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: template.style.colors.text }}>
                        博客
                      </a>
                      <a href="#" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: template.style.colors.text }}>
                        关于
                      </a>
                    </nav>
                  </div>
                </div>
              </header>

              {/* 博客内容 */}
              <main className="template-main">
                <div className="container">
                  <article className="template-article">
                    {/* 文章头部 */}
                    <header className="article-header">
                      <h1 className="article-title" style={{ color: template.style.colors.text }}>
                        {sampleBlogContent.title}
                      </h1>
                      <div className="article-meta">
                        <div className="flex items-center space-x-4 text-sm" style={{ color: template.style.colors.text }}>
                          <span>作者: {sampleBlogContent.author}</span>
                          <span>发布时间: {sampleBlogContent.date}</span>
                          <span>阅读时间: {sampleBlogContent.readTime}</span>
                        </div>
                      </div>
                      <p className="article-excerpt" style={{ color: template.style.colors.text }}>
                        {sampleBlogContent.excerpt}
                      </p>
                    </header>

                    {/* 文章内容 */}
                    <div 
                      className="article-content"
                      dangerouslySetInnerHTML={{ __html: sampleBlogContent.content }}
                      style={{ color: template.style.colors.text }}
                    />

                    {/* 文章标签 */}
                    <footer className="article-footer">
                      <div className="flex flex-wrap gap-2">
                        {sampleBlogContent.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm rounded-xl"
                            style={{ 
                              backgroundColor: template.style.colors.secondary,
                              color: template.style.colors.text
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </footer>
                  </article>
                </div>
              </main>
            </div>
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Eye size={16} />
            <span>预览模式 - 实际效果可能与预览略有差异</span>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded font-medium  transition-all duration-300"
            >
              取消
            </button>
            <button
              onClick={() => onSelect(template)}
              className="px-6 py-2 bg-black text-white rounded font-medium  transition-all duration-300"
            >
              使用此模板
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TemplatePreview;
