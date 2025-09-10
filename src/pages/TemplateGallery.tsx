import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Eye, 
  ArrowRight,
  Star,
  Tag,
  Bot,
  Calendar,
  User,
  Clock,
  BookOpen,
  Heart
} from 'lucide-react';
import { blogTemplates, getTemplatesByCategory, getCategories, BlogTemplate } from '../data/templates';
import TemplatePreview from '../components/TemplatePreview';
import '../styles/template-preview.css';

const TemplateGallery: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState<BlogTemplate | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const categories = getCategories();
  const filteredTemplates = useMemo(() => {
    let templates = getTemplatesByCategory(selectedCategory);
    
    if (searchTerm) {
      templates = templates.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return templates;
  }, [selectedCategory, searchTerm]);

  const handleTemplateSelect = (template: BlogTemplate) => {
    navigate('/ai', { 
      state: { 
        selectedTemplate: template,
        templateStyle: template.style 
      } 
    });
  };

  const handlePreviewTemplate = (template: BlogTemplate) => {
    setPreviewTemplate(template);
    setIsFullscreen(false);
  };

  const handleClosePreview = () => {
    setPreviewTemplate(null);
    setIsFullscreen(false);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // 模拟博客文章数据
  const sampleArticles = [
    {
      title: "AI驱动的未来：探索人工智能在内容创作中的无限可能",
      excerpt: "随着人工智能技术的快速发展，AI在内容创作领域展现出了巨大的潜力。本文将深入探讨AI如何改变我们的创作方式...",
      date: "2024年1月15日",
      readTime: "8分钟阅读",
      category: "技术",
      featured: true
    },
    {
      title: "现代Web开发的最佳实践",
      excerpt: "在快速发展的Web开发领域，掌握最佳实践对于构建高质量应用至关重要。本文总结了当前最有效的开发方法...",
      date: "2024年1月12日", 
      readTime: "6分钟阅读",
      category: "开发",
      featured: false
    },
    {
      title: "设计思维在产品开发中的应用",
      excerpt: "设计思维不仅仅是一种设计方法，更是一种解决问题的思维方式。本文将探讨如何在产品开发中有效运用设计思维...",
      date: "2024年1月10日",
      readTime: "5分钟阅读", 
      category: "设计",
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 博客头部 - 参考繁星点点网站 */}
      <motion.header
        className="border-b border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-black rounded flex items-center justify-center">
                <Bot size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black">BlogBuilder</h1>
                <p className="text-gray-600 text-sm">AI驱动的博客生成工具</p>
              </div>
            </div>
            <nav className="flex space-x-6">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-black transition-colors"
              >
                首页
              </button>
              <button
                onClick={() => navigate('/ai')}
                className="text-gray-600 hover:text-black transition-colors"
              >
                生成博客
              </button>
              <button
                onClick={() => navigate('/templates')}
                className="text-black font-medium"
              >
                模板库
              </button>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* 博客内容区域 */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* 页面标题 */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-4xl font-bold text-black mb-4">博客模板库</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            选择适合您需求的博客模板，让AI为您生成专业的内容。每个模板都经过精心设计，确保您的博客既美观又实用。
          </p>
        </motion.div>

        {/* 搜索和筛选 */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索模板..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                全部模板
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 模板列表 - 真正的博客风格 */}
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {filteredTemplates.map((template, index) => (
            <motion.article
              key={template.id}
              className="border-b border-gray-200 pb-12 last:border-b-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* 模板标题和描述 */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-black mb-2 hover:text-gray-700 transition-colors cursor-pointer"
                        onClick={() => handlePreviewTemplate(template)}>
                      {template.name}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Tag className="w-4 h-4 mr-1" />
                        {template.category}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        2024年1月
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        5分钟阅读
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm ml-1">4.8</span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {template.description}
                </p>
              </div>

              {/* 网站首页预览 - 完整的博客首页效果 */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">网站首页预览</h3>
                  <button
                    onClick={() => handlePreviewTemplate(template)}
                    className="px-4 py-2 bg-black text-white rounded text-sm font-medium hover:shadow-sm transition-all duration-300 flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>查看完整效果</span>
                  </button>
                </div>
                
                {/* 模拟的博客首页 */}
                <div className="bg-white rounded border shadow-sm overflow-hidden">
                  {/* 博客头部 */}
                  <div className="border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-8 h-8 rounded flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: template.style.colors.primary }}
                        >
                          B
                        </div>
                        <span className="text-lg font-bold" style={{ color: template.style.colors.text }}>
                          {template.name}
                        </span>
                      </div>
                      <nav className="flex space-x-6 text-sm">
                        <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: template.style.colors.text }}>
                          首页
                        </a>
                        <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: template.style.colors.text }}>
                          文章
                        </a>
                        <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: template.style.colors.text }}>
                          关于
                        </a>
                      </nav>
                    </div>
                  </div>

                  {/* 博客内容区域 */}
                  <div className="px-6 py-6">
                    {/* 博客标题 */}
                    <div className="text-center mb-8">
                      <h1 className="text-3xl font-bold mb-4" style={{ color: template.style.colors.text }}>
                        {template.name}
                      </h1>
                      <p className="text-lg" style={{ color: template.style.colors.text }}>
                        热爱技术与分享的博客作者
                      </p>
                    </div>

                    {/* 最新文章列表 - 参考繁星点点网站 */}
                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-4" style={{ color: template.style.colors.text }}>
                        最新文章
                      </h2>
                      <div className="space-y-4">
                        {sampleArticles.map((article, articleIndex) => (
                          <div key={articleIndex} className="border-b border-gray-100 pb-4 last:border-b-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  {article.featured && (
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                                      精选
                                    </span>
                                  )}
                                  <h3 className="text-lg font-semibold hover:text-gray-600 transition-colors cursor-pointer" 
                                      style={{ color: template.style.colors.text }}>
                                    {article.title}
                                  </h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                  {article.excerpt}
                                </p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <span>{article.date}</span>
                                  <span>{article.readTime}</span>
                                  <span>{article.category}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <button className="text-sm font-medium hover:opacity-70 transition-opacity" 
                                style={{ color: template.style.colors.accent }}>
                          查看全部文章 →
                        </button>
                      </div>
                    </div>

                    {/* 关于博客 */}
                    <div className="bg-gray-50 rounded p-4">
                      <h3 className="text-lg font-semibold mb-2" style={{ color: template.style.colors.text }}>
                        关于博客
                      </h3>
                      <p className="text-sm text-gray-600">
                        一个分享网络知识的博客站点，欢迎来到{template.name}博客。转载请注明出处。
                      </p>
                    </div>
                  </div>

                  {/* 博客页脚 */}
                  <div className="border-t border-gray-200 px-6 py-4 text-center text-sm text-gray-500">
                    <p>© 2024 {template.name}. 保留所有权利.</p>
                  </div>
                </div>
              </div>

              {/* 标签和操作按钮 */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <motion.button
                    onClick={() => handleTemplateSelect(template)}
                    className="px-6 py-2 bg-black text-white rounded font-medium hover:shadow-sm transition-all duration-300 flex items-center space-x-2"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>使用此模板</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* 空状态 */}
        {filteredTemplates.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">未找到匹配的模板</h3>
            <p className="text-gray-600 mb-6">尝试调整搜索条件或选择其他分类</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-black text-white rounded font-medium hover:shadow-sm transition-all duration-300"
            >
              重置筛选
            </button>
          </motion.div>
        )}

        {/* 页脚 */}
        <motion.footer
          className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p>© 2024 BlogBuilder. 保留所有权利.</p>
        </motion.footer>
      </div>

      {/* 模板预览模态框 */}
      {previewTemplate && (
        <TemplatePreview
          template={previewTemplate}
          isOpen={!!previewTemplate}
          onClose={handleClosePreview}
          onSelect={handleTemplateSelect}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
        />
      )}
    </div>
  );
};

export default TemplateGallery;