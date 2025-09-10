// 博客模板数据定义
export interface BlogTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  style: {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      accent: string;
    };
    typography: {
      heading: string;
      body: string;
      size: 'small' | 'medium' | 'large';
    };
    layout: {
      type: 'minimal' | 'modern' | 'classic' | 'creative';
      spacing: 'compact' | 'comfortable' | 'spacious';
    };
  };
  features: string[];
  tags: string[];
  contentStyle: 'text-focused' | 'image-rich' | 'business' | 'anime' | 'lifestyle' | 'tech';
}

export const blogTemplates: BlogTemplate[] = [
  {
    id: 'minimal-tech',
    name: '极简科技',
    category: '科技公司',
    description: '简洁现代的科技公司风格，适合技术博客和产品介绍',
    preview: 'minimal-tech-preview.jpg',
    style: {
      colors: {
        primary: '#000000',
        secondary: '#f8f9fa',
        background: '#ffffff',
        text: '#333333',
        accent: '#0066cc'
      },
      typography: {
        heading: 'Inter',
        body: 'Inter',
        size: 'medium'
      },
      layout: {
        type: 'minimal',
        spacing: 'spacious'
      }
    },
    features: ['简洁布局', '现代字体', '大量留白', '单色配色'],
    tags: ['科技', '极简', '现代', '专业'],
    contentStyle: 'tech'
  },
  {
    id: 'creative-portfolio',
    name: '创意作品集',
    category: '创意设计',
    description: '富有创意的设计风格，适合设计师和创意工作者',
    preview: 'creative-portfolio-preview.jpg',
    style: {
      colors: {
        primary: '#ff6b6b',
        secondary: '#4ecdc4',
        background: '#f7f7f7',
        text: '#2c3e50',
        accent: '#f39c12'
      },
      typography: {
        heading: 'Poppins',
        body: 'Open Sans',
        size: 'large'
      },
      layout: {
        type: 'creative',
        spacing: 'comfortable'
      }
    },
    features: ['创意布局', '丰富色彩', '动态元素', '视觉冲击'],
    tags: ['创意', '设计', '作品集', '艺术'],
    contentStyle: 'image-rich'
  },
  {
    id: 'business-professional',
    name: '商务专业',
    category: '商务服务',
    description: '专业商务风格，适合企业博客和商业内容',
    preview: 'business-professional-preview.jpg',
    style: {
      colors: {
        primary: '#2c3e50',
        secondary: '#ecf0f1',
        background: '#ffffff',
        text: '#34495e',
        accent: '#3498db'
      },
      typography: {
        heading: 'Roboto',
        body: 'Roboto',
        size: 'medium'
      },
      layout: {
        type: 'classic',
        spacing: 'comfortable'
      }
    },
    features: ['专业布局', '商务配色', '清晰层次', '可信赖感'],
    tags: ['商务', '专业', '企业', '正式'],
    contentStyle: 'business'
  },
  {
    id: 'lifestyle-blog',
    name: '生活方式',
    category: '个人博客',
    description: '温馨的生活风格，适合个人博客和生活方式分享',
    preview: 'lifestyle-blog-preview.jpg',
    style: {
      colors: {
        primary: '#8e44ad',
        secondary: '#f8f9fa',
        background: '#ffffff',
        text: '#2c3e50',
        accent: '#e74c3c'
      },
      typography: {
        heading: 'Lora',
        body: 'Source Sans Pro',
        size: 'medium'
      },
      layout: {
        type: 'modern',
        spacing: 'comfortable'
      }
    },
    features: ['温馨配色', '易读字体', '友好界面', '个人化'],
    tags: ['生活', '个人', '温馨', '分享'],
    contentStyle: 'lifestyle'
  },
  {
    id: 'news-magazine',
    name: '新闻杂志',
    category: '新闻媒体',
    description: '新闻杂志风格，适合新闻网站和媒体博客',
    preview: 'news-magazine-preview.jpg',
    style: {
      colors: {
        primary: '#c0392b',
        secondary: '#ecf0f1',
        background: '#ffffff',
        text: '#2c3e50',
        accent: '#f39c12'
      },
      typography: {
        heading: 'Merriweather',
        body: 'Open Sans',
        size: 'small'
      },
      layout: {
        type: 'classic',
        spacing: 'compact'
      }
    },
    features: ['信息密集', '清晰分类', '快速阅读', '权威感'],
    tags: ['新闻', '媒体', '信息', '权威'],
    contentStyle: 'text-focused'
  },
  {
    id: 'fashion-lifestyle',
    name: '时尚生活',
    category: '时尚美妆',
    description: '时尚前卫的设计风格，适合时尚博客和美妆分享',
    preview: 'fashion-lifestyle-preview.jpg',
    style: {
      colors: {
        primary: '#e91e63',
        secondary: '#fce4ec',
        background: '#ffffff',
        text: '#424242',
        accent: '#ff4081'
      },
      typography: {
        heading: 'Playfair Display',
        body: 'Lato',
        size: 'large'
      },
      layout: {
        type: 'creative',
        spacing: 'spacious'
      }
    },
    features: ['时尚配色', '优雅字体', '精美布局', '视觉美感'],
    tags: ['时尚', '美妆', '优雅', '前卫'],
    contentStyle: 'image-rich'
  },
  {
    id: 'food-blog',
    name: '美食博客',
    category: '美食餐饮',
    description: '温馨的美食风格，适合美食博客和餐厅介绍',
    preview: 'food-blog-preview.jpg',
    style: {
      colors: {
        primary: '#ff5722',
        secondary: '#fff3e0',
        background: '#ffffff',
        text: '#5d4037',
        accent: '#ff9800'
      },
      typography: {
        heading: 'Dancing Script',
        body: 'Roboto',
        size: 'medium'
      },
      layout: {
        type: 'modern',
        spacing: 'comfortable'
      }
    },
    features: ['温暖配色', '手写字体', '美食氛围', '诱人设计'],
    tags: ['美食', '餐饮', '温暖', '诱人'],
    contentStyle: 'image-rich'
  },
  {
    id: 'travel-adventure',
    name: '旅行探险',
    category: '旅行户外',
    description: '充满活力的旅行风格，适合旅行博客和户外探险',
    preview: 'travel-adventure-preview.jpg',
    style: {
      colors: {
        primary: '#00bcd4',
        secondary: '#e0f2f1',
        background: '#ffffff',
        text: '#263238',
        accent: '#ff5722'
      },
      typography: {
        heading: 'Montserrat',
        body: 'Open Sans',
        size: 'medium'
      },
      layout: {
        type: 'modern',
        spacing: 'spacious'
      }
    },
    features: ['活力配色', '现代字体', '开阔布局', '冒险感'],
    tags: ['旅行', '户外', '冒险', '活力'],
    contentStyle: 'image-rich'
  },
  {
    id: 'education-learning',
    name: '教育学习',
    category: '教育培训',
    description: '专业的教育风格，适合教育博客和知识分享',
    preview: 'education-learning-preview.jpg',
    style: {
      colors: {
        primary: '#3f51b5',
        secondary: '#e8eaf6',
        background: '#ffffff',
        text: '#37474f',
        accent: '#ff9800'
      },
      typography: {
        heading: 'Roboto Slab',
        body: 'Roboto',
        size: 'medium'
      },
      layout: {
        type: 'classic',
        spacing: 'comfortable'
      }
    },
    features: ['专业配色', '易读字体', '清晰结构', '学习氛围'],
    tags: ['教育', '学习', '知识', '专业'],
    contentStyle: 'text-focused'
  },
  {
    id: 'health-wellness',
    name: '健康养生',
    category: '健康医疗',
    description: '清新的健康风格，适合健康博客和医疗内容',
    preview: 'health-wellness-preview.jpg',
    style: {
      colors: {
        primary: '#4caf50',
        secondary: '#e8f5e8',
        background: '#ffffff',
        text: '#2e7d32',
        accent: '#ff9800'
      },
      typography: {
        heading: 'Nunito',
        body: 'Open Sans',
        size: 'medium'
      },
      layout: {
        type: 'modern',
        spacing: 'comfortable'
      }
    },
    features: ['清新配色', '健康字体', '舒适布局', '信任感'],
    tags: ['健康', '医疗', '养生', '清新'],
    contentStyle: 'lifestyle'
  },
  {
    id: 'finance-investment',
    name: '金融投资',
    category: '金融理财',
    description: '稳重的金融风格，适合金融博客和投资分析',
    preview: 'finance-investment-preview.jpg',
    style: {
      colors: {
        primary: '#1976d2',
        secondary: '#e3f2fd',
        background: '#ffffff',
        text: '#1565c0',
        accent: '#4caf50'
      },
      typography: {
        heading: 'Roboto',
        body: 'Roboto',
        size: 'small'
      },
      layout: {
        type: 'classic',
        spacing: 'compact'
      }
    },
    features: ['稳重配色', '专业字体', '数据展示', '可信赖'],
    tags: ['金融', '投资', '理财', '稳重'],
    contentStyle: 'business'
  },
  {
    id: 'gaming-entertainment',
    name: '游戏娱乐',
    category: '游戏娱乐',
    description: '动感的游戏风格，适合游戏博客和娱乐内容',
    preview: 'gaming-entertainment-preview.jpg',
    style: {
      colors: {
        primary: '#9c27b0',
        secondary: '#f3e5f5',
        background: '#1a1a1a',
        text: '#ffffff',
        accent: '#ff5722'
      },
      typography: {
        heading: 'Orbitron',
        body: 'Roboto',
        size: 'large'
      },
      layout: {
        type: 'creative',
        spacing: 'comfortable'
      }
    },
    features: ['动感配色', '科技字体', '暗色主题', '游戏感'],
    tags: ['游戏', '娱乐', '动感', '科技'],
    contentStyle: 'anime'
  },
  {
    id: 'anime-manga',
    name: '二次元世界',
    category: '二次元文化',
    description: '充满二次元元素的动漫风格，适合动漫博客和ACG内容分享',
    preview: 'anime-manga-preview.jpg',
    style: {
      colors: {
        primary: '#ff69b4',
        secondary: '#ffe4e1',
        background: '#fff0f5',
        text: '#2c2c2c',
        accent: '#00bfff'
      },
      typography: {
        heading: 'Comic Sans MS',
        body: 'Arial',
        size: 'large'
      },
      layout: {
        type: 'creative',
        spacing: 'comfortable'
      }
    },
    features: ['萌系配色', '可爱字体', '动漫元素', '二次元风格'],
    tags: ['二次元', '动漫', '萌系', 'ACG'],
    contentStyle: 'anime'
  },
  {
    id: 'corporate-business',
    name: '企业商务',
    category: '企业服务',
    description: '正式的企业商务风格，适合公司官网和企业博客',
    preview: 'corporate-business-preview.jpg',
    style: {
      colors: {
        primary: '#1e3a8a',
        secondary: '#f1f5f9',
        background: '#ffffff',
        text: '#1e293b',
        accent: '#3b82f6'
      },
      typography: {
        heading: 'Helvetica',
        body: 'Arial',
        size: 'medium'
      },
      layout: {
        type: 'classic',
        spacing: 'comfortable'
      }
    },
    features: ['正式配色', '商务字体', '专业布局', '企业形象'],
    tags: ['企业', '商务', '正式', '专业'],
    contentStyle: 'business'
  },
  {
    id: 'photography-portfolio',
    name: '摄影作品集',
    category: '摄影艺术',
    description: '以图片为主的摄影风格，适合摄影师和视觉艺术家',
    preview: 'photography-portfolio-preview.jpg',
    style: {
      colors: {
        primary: '#000000',
        secondary: '#f5f5f5',
        background: '#ffffff',
        text: '#333333',
        accent: '#ff6b6b'
      },
      typography: {
        heading: 'Helvetica Neue',
        body: 'Arial',
        size: 'medium'
      },
      layout: {
        type: 'minimal',
        spacing: 'spacious'
      }
    },
    features: ['极简配色', '图片为主', '大量留白', '视觉冲击'],
    tags: ['摄影', '艺术', '视觉', '作品集'],
    contentStyle: 'image-rich'
  },
  {
    id: 'startup-tech',
    name: '科技创业',
    category: '科技创业',
    description: '现代科技创业风格，适合科技公司和创业团队',
    preview: 'startup-tech-preview.jpg',
    style: {
      colors: {
        primary: '#6366f1',
        secondary: '#e0e7ff',
        background: '#ffffff',
        text: '#1f2937',
        accent: '#10b981'
      },
      typography: {
        heading: 'Inter',
        body: 'Inter',
        size: 'medium'
      },
      layout: {
        type: 'modern',
        spacing: 'spacious'
      }
    },
    features: ['现代配色', '科技字体', '创新布局', '创业氛围'],
    tags: ['科技', '创业', '创新', '现代'],
    contentStyle: 'tech'
  },
  {
    id: 'lifestyle-wellness',
    name: '生活美学',
    category: '生活方式',
    description: '优雅的生活美学风格，适合生活方式博主和美学分享',
    preview: 'lifestyle-wellness-preview.jpg',
    style: {
      colors: {
        primary: '#d4af37',
        secondary: '#fefce8',
        background: '#ffffff',
        text: '#374151',
        accent: '#f59e0b'
      },
      typography: {
        heading: 'Playfair Display',
        body: 'Source Sans Pro',
        size: 'large'
      },
      layout: {
        type: 'modern',
        spacing: 'spacious'
      }
    },
    features: ['优雅配色', '美学字体', '精致布局', '生活品味'],
    tags: ['生活', '美学', '优雅', '品味'],
    contentStyle: 'lifestyle'
  }
];

// 根据分类获取模板
export const getTemplatesByCategory = (category: string): BlogTemplate[] => {
  if (category === 'all') {
    return blogTemplates;
  }
  return blogTemplates.filter(template => template.category === category);
};

// 根据ID获取模板
export const getTemplateById = (id: string): BlogTemplate | undefined => {
  return blogTemplates.find(template => template.id === id);
};

// 获取所有分类
export const getCategories = (): string[] => {
  const categories = blogTemplates.map(template => template.category);
  return Array.from(new Set(categories));
};
