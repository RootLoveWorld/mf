# 微前端架构项目 (Module Federation)

基于 pnpm + Rsbuild + Module Federation 的微前端架构示例项目。

## 🏗️ 项目结构

```
mf/
├── packages/
│   ├── mf_app1/          # 提供者应用 (Provider)
│   ├── mf_app2/          # 消费者应用 (Consumer)
│   └── mf_app3/          # 混合应用 (Provider + Consumer)
├── shared/               # 共享组件库
├── scripts/              # 部署脚本
├── docker-compose.yml    # Docker Compose 配置
├── Dockerfile           # 生产环境 Dockerfile
├── Dockerfile.dev       # 开发环境 Dockerfile
└── nginx.conf           # Nginx 配置
```

## 🚀 快速开始

### 本地开发

1. 安装依赖
```bash
pnpm install
```

2. 构建共享库
```bash
cd shared && pnpm build
```

3. 启动所有应用
```bash
pnpm dev
```

4. 访问应用
- mf_app1 (Provider): http://localhost:3001
- mf_app2 (Consumer): http://localhost:3002
- mf_app3 (Hybrid): http://localhost:3003

### Docker 部署

#### 方式一：使用部署脚本
```bash
# Linux/Mac
chmod +x scripts/deploy.sh
./scripts/deploy.sh

# Windows
scripts\deploy.bat
```

#### 方式二：直接使用 Docker Compose

**开发环境 (热重载)**
```bash
docker-compose up mf-dev
```

**生产环境 (nginx)**
```bash
docker-compose up mf-prod
```

**独立应用服务**
```bash
docker-compose up mf-app1 mf-app2 mf-app3
```

## 📦 应用说明

### mf_app1 (提供者应用)
- **端口**: 3001
- **功能**: 暴露 Header 和 ProductList 组件
- **暴露组件**:
  - `./Header`: 应用头部组件
  - `./ProductList`: 产品列表组件

### mf_app2 (消费者应用)
- **端口**: 3002
- **功能**: 消费 mf_app1 的远程组件
- **消费组件**: 来自 mf_app1 的 Header 和 ProductList

### mf_app3 (混合应用)
- **端口**: 3003
- **功能**: 既提供组件又消费组件
- **暴露组件**:
  - `./Dashboard`: 仪表板组件
  - `./UserProfile`: 用户资料组件
- **消费组件**: 来自 mf_app1 的组件

### shared (共享组件库)
- **功能**: 提供通用 UI 组件
- **组件**:
  - `Button`: 按钮组件
  - `Card`: 卡片组件

## 🛠️ 技术栈

- **构建工具**: Rsbuild
- **微前端**: Module Federation
- **包管理**: pnpm
- **前端框架**: React 19
- **语言**: TypeScript
- **容器化**: Docker + Docker Compose
- **Web服务器**: Nginx

## 🔧 开发指南

### 添加新的远程组件

1. 在提供者应用中暴露组件:
```typescript
// rsbuild.config.ts
exposes: {
  './NewComponent': './src/components/NewComponent',
}
```

2. 在消费者应用中导入:
```typescript
const RemoteNewComponent = React.lazy(() => import('mf_app1/NewComponent'));
```

### 修改端口配置

修改各应用的 `rsbuild.config.ts` 中的 `server.port` 配置，同时更新 Docker 相关配置文件。

## 📝 部署说明

### 生产环境部署

1. 构建所有应用:
```bash
pnpm build
```

2. 使用 Docker 部署:
```bash
docker-compose up mf-prod
```

### 环境变量

可以通过环境变量配置应用:
- `NODE_ENV`: 环境模式 (development/production)
- `PORT`: 应用端口

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

ISC License
Module Federation
