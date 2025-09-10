import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Maximize2, Minimize2, Eye, Palette, Type, Layout, Calendar, Clock, Tag, User, Home, FileText, Archive, Link, Info } from 'lucide-react';
import { BlogTemplate } from '../data/templates';

interface TemplatePreviewProps {
  template: BlogTemplate;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: BlogTemplate) => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  template,
  isOpen,
  onClose,
  onSelect,
  isFullscreen = false,
  onToggleFullscreen
}) => {
  const [currentPage, setCurrentPage] = useState<'home' | 'article' | 'about'>('home');
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

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

  // 根据模板类型生成不同的博客文章数据
  const getBlogArticles = () => {
    const baseArticles = {
      tech: [
        {
          id: 1,
          title: "AI驱动的未来：探索人工智能在内容创作中的无限可能",
          excerpt: "随着人工智能技术的快速发展，AI在内容创作领域展现出了巨大的潜力。本文将深入探讨AI如何改变我们的创作方式，以及未来可能的发展趋势。",
          content: `
            <div style="text-align: center; margin: 20px 0;">
              <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop" alt="AI人工智能" style="width: 100%; max-width: 600px; height: 300px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
            </div>
            
            <h2>引言</h2>
            <p>在数字化时代，内容创作已经成为连接世界的重要桥梁。人工智能技术的兴起，为内容创作带来了前所未有的变革机遇。</p>
            
            <h2>AI在内容创作中的应用</h2>
            <p>人工智能在内容创作领域的应用已经非常广泛，从文本生成到图像创作，从视频制作到音频处理，AI正在重新定义创作的可能性。</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
              <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop" alt="代码编程" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;" />
              <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop" alt="数据分析" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;" />
            </div>
            
            <h3>文本生成技术</h3>
            <p>现代AI文本生成技术能够理解上下文，生成连贯、有逻辑的内容。无论是新闻报道、技术文档，还是创意写作，AI都能提供强有力的支持。</p>
            
            <h3>视觉内容创作</h3>
            <p>AI图像生成技术让创作者能够快速将想法转化为视觉作品。从概念设计到最终成品，AI大大提高了创作效率。</p>
            
            <div style="text-align: center; margin: 20px 0;">
              <img src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=300&fit=crop" alt="AI创作工具" style="width: 100%; max-width: 500px; height: 250px; object-fit: cover; border-radius: 8px;" />
            </div>
            
            <h2>未来发展趋势</h2>
            <p>随着技术的不断进步，AI在内容创作中的作用将更加重要。我们期待看到更多创新的应用场景和更智能的创作工具。</p>
            
            <h2>结论</h2>
            <p>AI不是要替代人类创作者，而是要成为他们的得力助手。通过人机协作，我们可以创造出更加丰富、更有价值的内容。</p>
          `,
          author: "AI内容专家",
          date: "2024年1月15日",
          readTime: "8分钟阅读",
          category: "技术",
          tags: ["人工智能", "内容创作", "技术趋势", "未来展望"],
          featured: true
        },
        {
          id: 2,
          title: "现代Web开发的最佳实践",
          excerpt: "在快速发展的Web开发领域，掌握最佳实践对于构建高质量应用至关重要。本文总结了当前最有效的开发方法和工具。",
          content: `
            <h2>前端开发最佳实践</h2>
            <p>现代前端开发需要关注性能、可维护性和用户体验。以下是一些关键的最佳实践：</p>
            
            <h3>组件化开发</h3>
            <p>使用组件化架构可以提高代码的可重用性和可维护性。React、Vue等框架为组件化开发提供了强大的支持。</p>
            
            <h3>性能优化</h3>
            <p>通过代码分割、懒加载、缓存策略等技术，可以显著提升应用的加载速度和运行性能。</p>
            
            <h2>后端开发最佳实践</h2>
            <p>后端开发同样需要遵循一些基本原则，确保系统的稳定性和可扩展性。</p>
          `,
          author: "Web开发专家",
          date: "2024年1月12日",
          readTime: "6分钟阅读",
          category: "开发",
          tags: ["Web开发", "最佳实践", "性能优化", "前端"],
          featured: false
        }
      ],
      business: [
        {
          id: 1,
          title: "企业数字化转型：构建现代化商业生态",
          excerpt: "在数字化浪潮中，企业如何通过技术手段实现业务转型，提升竞争力，构建可持续发展的商业生态。",
          content: `
            <div style="text-align: center; margin: 20px 0;">
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop" alt="企业数字化转型" style="width: 100%; max-width: 600px; height: 300px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
            </div>
            
            <h2>数字化转型的重要性</h2>
            <p>在当今快速变化的商业环境中，数字化转型已成为企业生存和发展的必然选择。通过引入先进的技术和数字化工具，企业可以提升运营效率，优化客户体验。</p>
            
            <div style="text-align: center; margin: 20px 0;">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop" alt="商业数据分析" style="width: 100%; max-width: 500px; height: 250px; object-fit: cover; border-radius: 8px;" />
            </div>
            
            <h2>关键转型策略</h2>
            <p>成功的数字化转型需要全面的战略规划，包括技术升级、流程优化、人才培养等多个方面。</p>
            
            <h3>技术基础设施建设</h3>
            <p>建立稳定、安全、可扩展的技术基础设施是数字化转型的基础。这包括云计算、大数据、人工智能等核心技术的应用。</p>
            
            <div style="text-align: center; margin: 20px 0;">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=300&fit=crop" alt="云计算技术" style="width: 100%; max-width: 500px; height: 250px; object-fit: cover; border-radius: 8px;" />
            </div>
            
            <h3>业务流程优化</h3>
            <p>通过数字化手段重新设计业务流程，消除冗余环节，提高工作效率，降低成本。</p>
            
            <h2>实施建议</h2>
            <p>数字化转型是一个长期过程，需要持续投入和不断优化。企业应该制定清晰的路线图，分阶段实施。</p>
          `,
          author: "企业战略顾问",
          date: "2024年1月15日",
          readTime: "10分钟阅读",
          category: "商业",
          tags: ["数字化转型", "企业战略", "商业创新", "技术应用"],
          featured: true
        },
        {
          id: 2,
          title: "2024年商业趋势分析：把握市场机遇",
          excerpt: "深入分析2024年全球商业发展趋势，为企业决策者提供前瞻性的市场洞察和战略建议。",
          content: `
            <h2>宏观经济环境</h2>
            <p>全球经济正在经历深刻变革，新兴技术的快速发展为各行各业带来了新的机遇和挑战。</p>
            
            <h2>主要趋势分析</h2>
            <p>从人工智能到可持续发展，从远程工作到数字支付，多个趋势正在重塑商业格局。</p>
          `,
          author: "市场分析师",
          date: "2024年1月12日",
          readTime: "7分钟阅读",
          category: "市场",
          tags: ["商业趋势", "市场分析", "战略规划", "机遇把握"],
          featured: false
        }
      ],
      anime: [
        {
          id: 1,
          title: "二次元文化的发展历程：从亚文化到主流",
          excerpt: "探索二次元文化如何从小众爱好发展成为影响全球的文化现象，以及它对现代社会的深远影响。",
          content: `
            <div style="text-align: center; margin: 20px 0;">
              <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop" alt="二次元文化" style="width: 100%; max-width: 600px; height: 300px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
            </div>
            
            <h2>二次元文化的起源</h2>
            <p>二次元文化起源于日本的动漫、游戏、轻小说等娱乐形式，最初只是小众爱好者的文化圈。</p>
            
            <div style="text-align: center; margin: 20px 0;">
              <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop" alt="动漫角色" style="width: 100%; max-width: 500px; height: 250px; object-fit: cover; border-radius: 8px;" />
            </div>
            
            <h2>文化传播与影响</h2>
            <p>随着互联网的发展，二次元文化迅速传播到世界各地，影响了无数年轻人的生活方式和价值观。</p>
            
            <h3>动漫产业的发展</h3>
            <p>从手绘动画到数字制作，从传统发行到流媒体平台，动漫产业经历了巨大的变革。</p>
            
            <div style="text-align: center; margin: 20px 0;">
              <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=300&fit=crop" alt="游戏文化" style="width: 100%; max-width: 500px; height: 250px; object-fit: cover; border-radius: 8px;" />
            </div>
            
            <h3>游戏文化的兴起</h3>
            <p>电子游戏作为二次元文化的重要组成部分，不仅提供了娱乐体验，更成为了社交和文化交流的平台。</p>
            
            <h2>现代意义</h2>
            <p>二次元文化已经成为现代文化的重要组成部分，影响着艺术、时尚、音乐等多个领域。</p>
          `,
          author: "二次元文化研究者",
          date: "2024年1月15日",
          readTime: "9分钟阅读",
          category: "文化",
          tags: ["二次元", "动漫", "文化研究", "亚文化"],
          featured: true
        },
        {
          id: 2,
          title: "ACG作品推荐：2024年必看动画",
          excerpt: "精选2024年最值得观看的动画作品，涵盖不同类型和风格，为动漫爱好者提供观影指南。",
          content: `
            <h2>热门新番推荐</h2>
            <p>2024年涌现了许多优秀的动画作品，从热血战斗到温馨日常，从科幻冒险到浪漫爱情。</p>
            
            <h2>经典回顾</h2>
            <p>除了新作品，一些经典动画的续作和重制版也值得关注。</p>
          `,
          author: "动漫评论家",
          date: "2024年1月12日",
          readTime: "6分钟阅读",
          category: "推荐",
          tags: ["动画推荐", "ACG", "观影指南", "新番"],
          featured: false
        }
      ],
      'image-rich': [
        {
          id: 1,
          title: "视觉艺术的力量：摄影与设计的完美结合",
          excerpt: "探索摄影艺术如何与设计理念相结合，创造出具有强烈视觉冲击力的作品，传达深刻的情感与思想。",
          content: `
            <div style="text-align: center; margin: 20px 0;">
              <img src="https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=400&fit=crop" alt="摄影艺术" style="width: 100%; max-width: 600px; height: 300px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
            </div>
            
            <h2>摄影的艺术性</h2>
            <p>摄影不仅仅是记录现实，更是一种艺术表达方式。通过构图、光影、色彩等元素的运用，摄影师可以创造出独特的视觉语言。</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
              <img src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop" alt="风景摄影" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;" />
              <img src="https://images.unsplash.com/photo-1542038784456-1ea8e9367c55?w=400&h=300&fit=crop" alt="人像摄影" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;" />
            </div>
            
            <h2>设计思维的融入</h2>
            <p>现代摄影越来越注重设计感的体现，从平面设计到空间设计，各种设计理念都在影响着摄影创作。</p>
            
            <h3>色彩与情感</h3>
            <p>色彩是摄影中最重要的元素之一，不同的色彩搭配可以传达不同的情感和氛围。</p>
            
            <div style="text-align: center; margin: 20px 0;">
              <img src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=300&fit=crop" alt="色彩搭配" style="width: 100%; max-width: 500px; height: 250px; object-fit: cover; border-radius: 8px;" />
            </div>
            
            <h3>构图与平衡</h3>
            <p>良好的构图是优秀摄影作品的基础，通过合理的元素安排，可以创造出视觉上的平衡与美感。</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 20px 0;">
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop" alt="构图示例1" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;" />
              <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop" alt="构图示例2" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;" />
              <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop" alt="构图示例3" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;" />
            </div>
            
            <h2>创作实践</h2>
            <p>理论需要与实践相结合，只有通过不断的拍摄和反思，才能提升摄影技巧和艺术修养。</p>
          `,
          author: "视觉艺术家",
          date: "2024年1月15日",
          readTime: "8分钟阅读",
          category: "艺术",
          tags: ["摄影", "设计", "视觉艺术", "创作"],
          featured: true
        },
        {
          id: 2,
          title: "时尚摄影：捕捉美的瞬间",
          excerpt: "时尚摄影作为摄影艺术的重要分支，如何通过镜头展现时尚的魅力和个性的表达。",
          content: `
            <h2>时尚摄影的特点</h2>
            <p>时尚摄影注重展现服装、配饰的美感，同时也要传达品牌理念和时尚态度。</p>
            
            <h2>拍摄技巧</h2>
            <p>从光线控制到模特指导，时尚摄影需要掌握多种专业技巧。</p>
          `,
          author: "时尚摄影师",
          date: "2024年1月12日",
          readTime: "5分钟阅读",
          category: "时尚",
          tags: ["时尚摄影", "拍摄技巧", "时尚美学", "品牌表达"],
          featured: false
        }
      ],
      lifestyle: [
        {
          id: 1,
          title: "慢生活美学：在快节奏中寻找内心的宁静",
          excerpt: "在忙碌的现代生活中，如何通过慢生活的理念，重新发现生活的美好，找到内心的平衡与宁静。",
          content: `
            <div style="text-align: center; margin: 20px 0;">
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop" alt="慢生活" style="width: 100%; max-width: 600px; height: 300px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
            </div>
            
            <h2>慢生活的理念</h2>
            <p>慢生活不是懒惰，而是一种生活态度。它强调放慢节奏，享受当下，关注内心的感受和需求。</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
              <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop" alt="品茶时光" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;" />
              <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop" alt="阅读时光" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;" />
            </div>
            
            <h2>实践方法</h2>
            <p>从日常生活中的小细节开始，比如慢慢品味一杯茶，认真准备一顿饭，或者花时间阅读一本好书。</p>
            
            <h3>时间管理</h3>
            <p>慢生活并不意味着效率低下，而是要学会合理安排时间，为重要的事情留出充足的时间。</p>
            
            <div style="text-align: center; margin: 20px 0;">
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop" alt="宁静环境" style="width: 100%; max-width: 500px; height: 250px; object-fit: cover; border-radius: 8px;" />
            </div>
            
            <h3>环境营造</h3>
            <p>创造一个舒适、宁静的生活环境，有助于我们更好地享受慢生活的乐趣。</p>
            
            <h2>心理益处</h2>
            <p>慢生活有助于减轻压力，提高生活质量，让我们更加关注自己的身心健康。</p>
          `,
          author: "生活美学博主",
          date: "2024年1月15日",
          readTime: "7分钟阅读",
          category: "生活",
          tags: ["慢生活", "生活美学", "心理健康", "生活品质"],
          featured: true
        },
        {
          id: 2,
          title: "居家美学：打造温馨舒适的生活空间",
          excerpt: "分享如何通过简单的装饰和布置，将家打造成一个既美观又实用的生活空间。",
          content: `
            <h2>空间规划</h2>
            <p>合理的空间规划是打造舒适家居的基础，需要考虑功能性和美观性的平衡。</p>
            
            <h2>色彩搭配</h2>
            <p>色彩的选择直接影响空间的氛围，温暖的色调可以营造温馨的感觉。</p>
          `,
          author: "室内设计师",
          date: "2024年1月12日",
          readTime: "6分钟阅读",
          category: "家居",
          tags: ["居家美学", "室内设计", "空间规划", "生活品质"],
          featured: false
        }
      ],
      'text-focused': [
        {
          id: 1,
          title: "深度思考：在信息时代保持独立思考的能力",
          excerpt: "在信息爆炸的时代，如何培养独立思考的能力，避免被海量信息所淹没，形成自己的观点和判断。",
          content: `
            <h2>信息时代的挑战</h2>
            <p>互联网为我们提供了前所未有的信息获取渠道，但同时也带来了信息过载的问题。如何在海量信息中筛选出有价值的内容，成为现代人必须面对的挑战。</p>
            
            <h2>独立思考的重要性</h2>
            <p>独立思考是形成个人观点和判断的基础。它要求我们不仅要获取信息，更要学会分析、质疑和反思。</p>
            
            <h3>批判性思维</h3>
            <p>批判性思维是独立思考的核心技能。它要求我们对接收到的信息进行客观分析，识别其中的逻辑漏洞和偏见。</p>
            
            <h3>多元视角</h3>
            <p>保持开放的心态，从多个角度思考问题，有助于我们形成更加全面和客观的观点。</p>
            
            <h2>实践方法</h2>
            <p>通过阅读、讨论、写作等方式，不断锻炼自己的思维能力，培养独立思考的习惯。</p>
          `,
          author: "哲学研究者",
          date: "2024年1月15日",
          readTime: "12分钟阅读",
          category: "思考",
          tags: ["独立思考", "批判性思维", "信息素养", "认知能力"],
          featured: true
        },
        {
          id: 2,
          title: "阅读的力量：书籍如何改变我们的世界观",
          excerpt: "探讨阅读对个人成长和世界观形成的重要作用，以及如何培养良好的阅读习惯。",
          content: `
            <h2>阅读的意义</h2>
            <p>阅读不仅是获取知识的途径，更是拓展视野、丰富内心世界的重要方式。</p>
            
            <h2>阅读方法</h2>
            <p>有效的阅读需要掌握一定的方法和技巧，包括精读、泛读、笔记等。</p>
          `,
          author: "文学评论家",
          date: "2024年1月12日",
          readTime: "8分钟阅读",
          category: "阅读",
          tags: ["阅读", "知识获取", "个人成长", "世界观"],
          featured: false
        }
      ]
    };

    return baseArticles[template.contentStyle] || baseArticles.tech;
  };

  const blogArticles = getBlogArticles();

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
        className={`bg-white rounded shadow-2xl overflow-hidden ${
          isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-7xl h-[90vh]'
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
              className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded transition-all duration-300"
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 完整的博客网站预览 */}
        <div className="h-full overflow-hidden">
          <div className="template-preview" style={previewStyle}>
            {/* 博客头部 */}
            <header className="template-header">
              <div className="container">
                <div className="flex items-center justify-between py-6">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: template.style.colors.primary }}
                    >
                      {template.name.charAt(0)}
                    </div>
                    <span className="text-xl font-bold" style={{ color: template.style.colors.text }}>
                      {template.name}
                    </span>
                  </div>
                  <nav className="flex space-x-6">
                    <button 
                      onClick={() => setCurrentPage('home')}
                      className={`text-sm font-medium transition-opacity ${currentPage === 'home' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                      style={{ color: template.style.colors.text }}
                    >
                      首页
                    </button>
                    <button 
                      onClick={() => setCurrentPage('article')}
                      className={`text-sm font-medium transition-opacity ${currentPage === 'article' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                      style={{ color: template.style.colors.text }}
                    >
                      文章
                    </button>
                    <button 
                      onClick={() => setCurrentPage('about')}
                      className={`text-sm font-medium transition-opacity ${currentPage === 'about' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                      style={{ color: template.style.colors.text }}
                    >
                      关于
                    </button>
                  </nav>
                </div>
              </div>
            </header>

            {/* 博客内容 */}
            <main className="template-main">
              <div className="container">
                {currentPage === 'home' && (
                  <div>
                    {/* 博客标题区域 */}
                    <div className="text-center mb-12">
                      <h1 className="text-4xl font-bold mb-4" style={{ color: template.style.colors.text }}>
                        {template.name}
                      </h1>
                      <p className="text-lg opacity-80">
                        热爱技术与分享的博客作者
                      </p>
                    </div>

                    {/* 最新文章 */}
                    <div className="mb-12">
                      <h2 className="text-2xl font-bold mb-6" style={{ color: template.style.colors.text }}>
                        最新文章
                      </h2>
                      <div className="space-y-6">
                        {blogArticles.map((article, index) => (
                          <div key={article.id} className="border-b pb-6 last:border-b-0" style={{ borderColor: template.style.colors.secondary }}>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  {article.featured && (
                                    <span 
                                      className="px-2 py-1 text-xs rounded"
                                      style={{ 
                                        backgroundColor: template.style.colors.accent,
                                        color: 'white'
                                      }}
                                    >
                                      精选
                                    </span>
                                  )}
                                  <h3 
                                    className="text-xl font-semibold hover:opacity-70 transition-opacity cursor-pointer"
                                    onClick={() => {
                                      setSelectedArticle(article.id);
                                      setCurrentPage('article');
                                    }}
                                  >
                                    {article.title}
                                  </h3>
                                </div>
                                <p className="text-sm opacity-80 mb-3 line-clamp-2">
                                  {article.excerpt}
                                </p>
                                <div className="flex items-center space-x-4 text-xs opacity-60">
                                  <span className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {article.date}
                                  </span>
                                  <span className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {article.readTime}
                                  </span>
                                  <span className="flex items-center">
                                    <Tag className="w-3 h-3 mr-1" />
                                    {article.category}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6">
                        <button 
                          className="text-sm font-medium hover:opacity-70 transition-opacity"
                          style={{ color: template.style.colors.accent }}
                        >
                          查看全部文章 →
                        </button>
                      </div>
                    </div>

                    {/* 关于博客 */}
                    <div 
                      className="rounded p-6"
                      style={{ backgroundColor: template.style.colors.secondary }}
                    >
                      <h3 className="text-lg font-semibold mb-3" style={{ color: template.style.colors.text }}>
                        关于博客
                      </h3>
                      <p className="text-sm opacity-80">
                        一个分享网络知识的博客站点，欢迎来到{template.name}博客。转载请注明出处。
                      </p>
                    </div>
                  </div>
                )}

                {currentPage === 'article' && selectedArticle && (
                  <article className="template-article">
                    {(() => {
                      const article = blogArticles.find(a => a.id === selectedArticle);
                      if (!article) return null;
                      
                      return (
                        <>
                          <header className="article-header">
                            <h1 className="article-title" style={{ color: template.style.colors.text }}>
                              {article.title}
                            </h1>
                            <div className="article-meta">
                              <div className="flex items-center space-x-4 text-sm" style={{ color: template.style.colors.text }}>
                                <span>作者: {article.author}</span>
                                <span>发布时间: {article.date}</span>
                                <span>阅读时间: {article.readTime}</span>
                              </div>
                            </div>
                            <p className="article-excerpt" style={{ color: template.style.colors.text }}>
                              {article.excerpt}
                            </p>
                          </header>

                          <div 
                            className="article-content"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                            style={{ color: template.style.colors.text }}
                          />

                          <footer className="article-footer">
                            <div className="flex flex-wrap gap-2">
                              {article.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 text-sm rounded"
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
                        </>
                      );
                    })()}
                  </article>
                )}

                {currentPage === 'about' && (
                  <div>
                    <h1 className="text-3xl font-bold mb-6" style={{ color: template.style.colors.text }}>
                      关于我
                    </h1>
                    <div className="prose max-w-none">
                      <p className="text-lg leading-relaxed mb-6">
                        欢迎来到{template.name}博客！我是一个热爱技术与分享的博客作者，专注于分享网络知识和技术见解。
                      </p>
                      <p className="text-lg leading-relaxed mb-6">
                        在这里，我会分享关于人工智能、Web开发、设计思维等方面的内容，希望能够帮助到更多的读者。
                      </p>
                      <p className="text-lg leading-relaxed">
                        如果您有任何问题或建议，欢迎通过邮件或社交媒体与我联系。
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </main>

            {/* 博客页脚 */}
            <footer className="template-footer">
              <div className="container">
                <div className="text-center py-6 text-sm opacity-60">
                  <p>© 2024 {template.name}. 保留所有权利.</p>
                </div>
              </div>
            </footer>
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Eye size={16} />
            <span>预览模式 - 这是一个完整的可操作博客网站</span>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded font-medium hover:shadow-sm transition-all duration-300"
            >
              取消
            </button>
            <button
              onClick={() => onSelect(template)}
              className="px-6 py-2 bg-black text-white rounded font-medium hover:shadow-sm transition-all duration-300"
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