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
  Clock
} from 'lucide-react';
import { blogTemplates, getTemplatesByCategory, getCategories, BlogTemplate } from '../data/templates';
import TemplatePreview from '../components/TemplatePreview';
import '../styles/template-preview.css';
import Input21 from '../components/21st/Input'
import Button21 from '../components/21st/Button'

const TemplateGallery: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState<BlogTemplate | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 限制分类展示数量（保留前5个）
  const categories = getCategories().slice(0, 5);
  const filteredTemplates = useMemo(() => {
    let templates = getTemplatesByCategory(selectedCategory).slice(0, 8);
    
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
    const base = window.location.pathname.startsWith('/ai-build-blog-web') ? '/ai-build-blog-web' : '';
    navigate(`${base}/ai`, {
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
    <div className="min-h-screen">
      {/* Compact Hero Section */}
      <motion.div
        className="relative py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">模板库</h1>
          <p className="text-slate-600 text-base max-w-2xl mx-auto leading-relaxed">简洁、优雅、现代的模板集合。选择风格，快速生成高端的博客站点。</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* 分类切换 - 黑色胶囊风格 */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <Button21
              onClick={() => setSelectedCategory('all')}
              variant={selectedCategory === 'all' ? 'primary' : 'ghost'}
              size="sm"
            >
              全部模板
            </Button21>
            {categories.map((category) => (
              <Button21
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'primary' : 'ghost'}
                size="sm"
              >
                {category}
              </Button21>
            ))}
          </div>
        </motion.div>

        {/* 模板网格 - 紧凑卡片布局 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handlePreviewTemplate(template)}
            >
              <div className="bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-xl p-5 h-full transition-all duration-300 group-hover:bg-white/90 group-hover:shadow-lg group-hover:shadow-slate-200/25 group-hover:-translate-y-1">
                {/* 模板预览截图区域 */}
                <div className="relative mb-4">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br"
                         style={{
                           background: `linear-gradient(135deg, ${template.style.colors.primary}15, ${template.style.colors.secondary}10)`
                         }}>
                      <div className="p-3 h-full flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <div className="h-1.5 bg-white/60 rounded w-3/4"></div>
                          <div className="h-1 bg-white/40 rounded w-1/2"></div>
                          <div className="h-1 bg-white/40 rounded w-2/3"></div>
                        </div>
                        <div className="space-y-1">
                          <div className="h-1 bg-white/40 rounded w-full"></div>
                          <div className="h-1 bg-white/40 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 模板类型标签 */}
                  <div className="absolute top-2 right-2">
                    <span className="px-1.5 py-0.5 bg-white/80 backdrop-blur-sm text-slate-700 text-xs font-medium rounded">
                      {template.category}
                    </span>
                  </div>
                  {/* 评分 */}
                  <div className="absolute top-2 left-2 flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium text-slate-700">4.8</span>
                  </div>
                </div>

                {/* 模板信息 */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-slate-700 transition-colors line-clamp-1">
                      {template.name}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                      {template.description}
                    </p>
                  </div>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex space-x-2">
                    <Button21
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePreviewTemplate(template)
                      }}
                      variant="ghost"
                      size="sm"
                      className="flex-1"
                      icon={<Eye size={12} />}
                    >
                      预览
                    </Button21>
                    <Button21
                      onClick={(e) => {
                        e.stopPropagation()
                        handleTemplateSelect(template)
                      }}
                      size="sm"
                      className="flex-1"
                      icon={<ArrowRight size={12} />}
                    >
                      使用
                    </Button21>
                  </div>
                </div>
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
            <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">未找到匹配的模板</h3>
            <p className="text-slate-600 mb-6 max-w-sm mx-auto">尝试调整搜索条件或选择其他分类</p>
            <Button21
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              size="md"
            >
              重置筛选
            </Button21>
          </motion.div>
        )}

        {/* 页脚 */}
        <motion.footer
          className="mt-16 pt-8 border-t border-slate-200/60 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-slate-500 text-xs">© 2024 BlogBuilder. 保留所有权利.</p>
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