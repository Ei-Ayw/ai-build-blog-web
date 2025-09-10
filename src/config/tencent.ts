// 腾讯云配置
export const TENCENT_CONFIG = {
  SECRET_ID: process.env.TENCENTCLOUD_SECRET_ID || 'your_secret_id',
  SECRET_KEY: process.env.TENCENTCLOUD_SECRET_KEY || 'your_secret_key',
  REGION: process.env.TENCENTCLOUD_REGION || 'ap-guangzhou',
  LKE_ENDPOINT: process.env.TENCENTCLOUD_LKE_ENDPOINT || 'lkeap.tencentcloudapi.com',
  DEEPSEEK_MODEL: process.env.TENCENTCLOUD_DEEPSEEK_MODEL || 'deepseek-r1'
}

// HyperBrowser API配置
export const HYPERBROWSER_CONFIG = {
  API_KEY: process.env.HYPERBROWSER_API_KEY || 'your_api_key'
}
