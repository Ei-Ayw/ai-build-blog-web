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
    tags: ['科技', '极简', '现代', '专业']
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
    tags: ['创意', '设计', '作品集', '艺术']
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
    tags: ['商务', '专业', '企业', '正式']
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
    tags: ['生活', '个人', '温馨', '分享']
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
    tags: ['新闻', '媒体', '信息', '权威']
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
    tags: ['时尚', '美妆', '优雅', '前卫']
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
    tags: ['美食', '餐饮', '温暖', '诱人']
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
    tags: ['旅行', '户外', '冒险', '活力']
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
    tags: ['教育', '学习', '知识', '专业']
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
    tags: ['健康', '医疗', '养生', '清新']
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
    tags: ['金融', '投资', '理财', '稳重']
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
    tags: ['游戏', '娱乐', '动感', '科技']
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
