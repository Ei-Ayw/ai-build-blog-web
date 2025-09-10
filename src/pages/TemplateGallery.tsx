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
  Tag
} from 'lucide-react';
import { blogTemplates, getTemplatesByCategory, getCategories, BlogTemplate } from '../data/templates';

const TemplateGallery: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<BlogTemplate | null>(null);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <motion.nav
        className="bg-white border-b border-gray-200 sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-black">模板库</h1>
              <span className="text-gray-500">({filteredTemplates.length} 个模板)</span>
            </div>
            <button
              onClick={() => navigate('/ai')}
              className="px-6 py-2 bg-black text-white rounded-2xl font-medium hover:shadow-lg transition-all duration-300"
            >
              直接生成
            </button>
          </div>
        </div>
      </motion.nav>

      {/* 搜索和筛选区域 */}
      <motion.div
        className="bg-white border-b border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索模板..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* 分类筛选 */}
            <div className="flex gap-2 overflow-x-auto">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-2xl font-medium whitespace-nowrap transition-all duration-300 ${
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
                  className={`px-4 py-2 rounded-2xl font-medium whitespace-nowrap transition-all duration-300 ${
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
        </div>
      </motion.div>

      {/* 模板网格 */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              className="group bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* 模板预览 */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-2xl mx-auto mb-2 flex items-center justify-center text-white text-2xl font-bold"
                      style={{ backgroundColor: template.style.colors.primary }}
                    >
                      {template.name.charAt(0)}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{template.name}</div>
                  </div>
                </div>
                
                {/* 悬停效果 */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <motion.button
                    className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white text-black rounded-2xl font-medium transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-4 h-4 inline mr-2" />
                    预览
                  </motion.button>
                </div>
              </div>

              {/* 模板信息 */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-500">{template.category}</p>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm ml-1">4.8</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{template.description}</p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-xl"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 样式预览 */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
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
                  <div className="flex items-center gap-1">
                    <Type className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">{template.style.typography.heading}</span>
                  </div>
                </div>

                {/* 使用按钮 */}
                <motion.button
                  onClick={() => handleTemplateSelect(template)}
                  className="w-full px-4 py-3 bg-black text-white rounded-2xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>使用此模板</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
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
              className="px-6 py-3 bg-black text-white rounded-2xl font-medium hover:shadow-lg transition-all duration-300"
            >
              重置筛选
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TemplateGallery;
