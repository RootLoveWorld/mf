# 多阶段构建 Dockerfile
FROM node:18-alpine AS base

# 安装 pnpm
RUN npm install -g pnpm

WORKDIR /app

# 复制 package.json 和 pnpm 配置
COPY package.json pnpm-workspace.yaml ./
COPY packages/*/package.json ./packages/
COPY shared/package.json ./shared/

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建共享库
RUN cd shared && pnpm build

# 构建阶段 - mf_app1
FROM base AS build-app1
RUN cd packages/mf_app1 && pnpm build

# 构建阶段 - mf_app2  
FROM base AS build-app2
RUN cd packages/mf_app2 && pnpm build

# 构建阶段 - mf_app3
FROM base AS build-app3
RUN cd packages/mf_app3 && pnpm build

# 生产阶段 - nginx
FROM nginx:alpine AS production

# 复制构建产物
COPY --from=build-app1 /app/packages/mf_app1/dist /usr/share/nginx/html/app1
COPY --from=build-app2 /app/packages/mf_app2/dist /usr/share/nginx/html/app2
COPY --from=build-app3 /app/packages/mf_app3/dist /usr/share/nginx/html/app3

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]