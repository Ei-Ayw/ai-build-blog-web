import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Eye, 
  Palette, 
  Type, 
  Layout,
  ArrowRight,
  Star,
  Tag,
  Bot,
  Calendar,
  User,
  Clock
} from 'lucide-react';
import { blogTemplates, getTemplatesByCategory, getCategories, BlogTemplate } from '../data/templates';
import TemplatePreview from '../components/TemplatePreview';
import '../styles/template-preview.css';

const TemplateGallery: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<BlogTemplate | null>(null);
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
    setSelectedTemplate(template);
    // 将模板样式传递给AI生成器
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

  return (
    <div className="min-h-screen bg-white">
      {/* 博客头部 */}
      <motion.header
        className="border-b border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-6 py-8">
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
            {/* 搜索框 */}
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

            {/* 分类筛选 */}
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

        {/* 模板列表 - 博客文章风格 */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {filteredTemplates.map((template, index) => (
            <motion.article
              key={template.id}
              className="border-b border-gray-200 pb-8 last:border-b-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* 模板预览图 */}
                <div className="lg:w-64 flex-shrink-0">
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded overflow-hidden group cursor-pointer"
                       onClick={() => handlePreviewTemplate(template)}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div 
                          className="w-16 h-16 rounded mx-auto mb-2 flex items-center justify-center text-white text-2xl font-bold"
                          style={{ backgroundColor: template.style.colors.primary }}
                        >
                          {template.name.charAt(0)}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">{template.name}</div>
                      </div>
                    </div>
                    
                    {/* 悬停效果 */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white text-black rounded font-medium transition-all duration-300">
                        <Eye className="w-4 h-4 inline mr-2" />
                        预览
                      </div>
                    </div>
                  </div>
                </div>

                {/* 文章内容 */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="text-2xl font-bold text-black mb-2 hover:text-gray-700 transition-colors cursor-pointer"
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

                  <p className="text-gray-600 leading-relaxed mb-4">
                    {template.description}
                  </p>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 样式预览 */}
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <Palette className="w-4 h-4 text-gray-400" />
                      <div className="flex gap-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: template.style.colors.primary }}
                        ></div>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: template.style.colors.accent }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Type className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{template.style.typography.heading}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Layout className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{template.style.layout.type}</span>
                    </div>
                  </div>

                  {/* 操作按钮 */}
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
                    <motion.button
                      onClick={() => handlePreviewTemplate(template)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded font-medium hover:shadow-sm transition-all duration-300 flex items-center space-x-2"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Eye className="w-4 h-4" />
                      <span>预览效果</span>
                    </motion.button>
                  </div>
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