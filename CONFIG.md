# 环境配置说明

## 环境变量配置

创建 `.env.local` 文件并添加以下配置：

```bash
# 腾讯云配置
TENCENTCLOUD_SECRET_ID=your_secret_id
TENCENTCLOUD_SECRET_KEY=your_secret_key
TENCENTCLOUD_REGION=ap-guangzhou
TENCENTCLOUD_LKE_ENDPOINT=lkeap.tencentcloudapi.com
TENCENTCLOUD_DEEPSEEK_MODEL=deepseek-r1

# HyperBrowser API
HYPERBROWSER_API_KEY=your_api_key
```

## 安全说明

- 请勿将真实的API密钥提交到代码仓库
- 使用环境变量来管理敏感信息
- 在生产环境中通过服务器环境变量配置
