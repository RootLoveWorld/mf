#!/bin/bash

# 微前端应用部署脚本

set -e

echo "🚀 开始部署微前端应用..."

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    exit 1
fi

# 检查 Docker Compose 是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose 未安装，请先安装 Docker Compose"
    exit 1
fi

# 选择部署模式
echo "请选择部署模式:"
echo "1) 开发环境 (热重载)"
echo "2) 生产环境 (nginx)"
echo "3) 独立应用服务"
read -p "请输入选择 (1-3): " choice

case $choice in
    1)
        echo "🔧 启动开发环境..."
        docker-compose up mf-dev
        ;;
    2)
        echo "🏭 构建并启动生产环境..."
        docker-compose build mf-prod
        docker-compose up mf-prod
        ;;
    3)
        echo "🔀 启动独立应用服务..."
        docker-compose up mf-app1 mf-app2 mf-app3
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo "✅ 部署完成!"
echo "📱 应用访问地址:"
echo "  - mf_app1 (Provider): http://localhost:3001"
echo "  - mf_app2 (Consumer): http://localhost:3002"  
echo "  - mf_app3 (Hybrid): http://localhost:3003"