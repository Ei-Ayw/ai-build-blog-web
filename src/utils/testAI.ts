// 测试腾讯云AI服务连接
import { TencentAIService } from '../services/tencentAI'

export async function testAIConnection() {
  try {
    console.log('测试腾讯云AI服务连接...')
    
    const testRequest = {
      prompt: '创建一个简单的技术博客，主题是前端开发',
      template: 'clean',
      style: 'professional',
      author: '测试用户'
    }
    
    const result = await TencentAIService.generateBlogContent(testRequest)
    console.log('AI服务测试成功:', result)
    return { success: true, data: result }
  } catch (error) {
    console.error('AI服务测试失败:', error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

// 测试内容优化功能
export async function testContentOptimization() {
  try {
    console.log('测试内容优化功能...')
    
    const testContent = '我的技术博客'
    const optimized = await TencentAIService.optimizeBlogContent(testContent, 'title')
    
    console.log('内容优化测试成功:', optimized)
    return { success: true, data: optimized }
  } catch (error) {
    console.error('内容优化测试失败:', error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}
