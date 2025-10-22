# 单个应用的 Dockerfile
FROM node:18-alpine AS base

# 安装 pnpm
RUN npm install -g pnpm

WORKDIR /app

# 接收构建参数
ARG APP_NAME
ARG PORT=3000

# 复制 package.json 文件
COPY package.json pnpm-workspace.yaml ./
COPY packages/*/package.json ./packages/
COPY shared/package.json ./shared/

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建共享库
RUN cd shared && pnpm build

# 构建指定应用
RUN cd packages/${APP_NAME} && pnpm build

# 生产阶段
FROM nginx:alpine

# 复制构建产物
COPY --from=base /app/packages/${APP_NAME}/dist /usr/share/nginx/html

# 创建 nginx 配置
RUN echo "server { \
    listen ${PORT}; \
    location / { \
        root /usr/share/nginx/html; \
        try_files \$uri \$uri/ /index.html; \
        add_header Access-Control-Allow-Origin *; \
    } \
}" > /etc/nginx/conf.d/default.conf

EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]