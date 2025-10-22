@echo off
setlocal enabledelayedexpansion

echo 🚀 开始部署微前端应用...

:: 检查 Docker 是否安装
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker 未安装，请先安装 Docker
    pause
    exit /b 1
)

:: 检查 Docker Compose 是否安装
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose 未安装，请先安装 Docker Compose
    pause
    exit /b 1
)

:: 选择部署模式
echo 请选择部署模式:
echo 1) 开发环境 (热重载)
echo 2) 生产环境 (nginx)
echo 3) 独立应用服务
set /p choice=请输入选择 (1-3): 

if "%choice%"=="1" (
    echo 🔧 启动开发环境...
    docker-compose up mf-dev
) else if "%choice%"=="2" (
    echo 🏭 构建并启动生产环境...
    docker-compose build mf-prod
    docker-compose up mf-prod
) else if "%choice%"=="3" (
    echo 🔀 启动独立应用服务...
    docker-compose up mf-app1 mf-app2 mf-app3
) else (
    echo ❌ 无效选择
    pause
    exit /b 1
)

echo ✅ 部署完成!
echo 📱 应用访问地址:
echo   - mf_app1 (Provider): http://localhost:3001
echo   - mf_app2 (Consumer): http://localhost:3002
echo   - mf_app3 (Hybrid): http://localhost:3003
pause