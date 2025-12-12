#!/bin/bash

# MaxMate.ai - 一键启动脚本
# 同时启动前端 (Next.js) 和后端 (FastAPI)

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 项目根目录
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"

echo -e "${CYAN}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║   🚀 MaxMate.ai - AI Operating System for Work & Life        ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# 检查并杀掉已运行的进程
cleanup() {
    echo -e "${YELLOW}🧹 Cleaning up existing processes...${NC}"
    
    # 杀掉占用端口的进程
    lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null || true
    lsof -ti:18512 2>/dev/null | xargs kill -9 2>/dev/null || true
    
    sleep 1
}

# 启动后端
start_backend() {
    echo -e "${BLUE}🔧 Starting Backend (FastAPI on port 18512)...${NC}"
    
    cd "$PROJECT_ROOT/backend"
    
    # 检查虚拟环境
    if [ ! -d "venv" ]; then
        echo -e "${YELLOW}   Creating virtual environment...${NC}"
        python3 -m venv venv
    fi
    
    # 激活虚拟环境并安装依赖
    source venv/bin/activate
    
    # 检查是否需要安装依赖
    if [ ! -f "venv/.deps_installed" ]; then
        echo -e "${YELLOW}   Installing dependencies...${NC}"
        pip install -r requirements.txt -q
        touch venv/.deps_installed
    fi
    
    # 后台启动 uvicorn
    nohup python -m uvicorn app.main:app --host 0.0.0.0 --port 18512 --reload > "$PROJECT_ROOT/logs/backend.log" 2>&1 &
    BACKEND_PID=$!
    echo $BACKEND_PID > "$PROJECT_ROOT/.backend.pid"
    
    echo -e "${GREEN}   ✅ Backend started (PID: $BACKEND_PID)${NC}"
}

# 启动前端
start_frontend() {
    echo -e "${BLUE}🎨 Starting Frontend (Next.js on port 3000)...${NC}"
    
    cd "$PROJECT_ROOT/frontend"
    
    # 检查 node_modules
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}   Installing npm dependencies...${NC}"
        npm install --registry=https://registry.npmmirror.com
    fi
    
    # 后台启动 Next.js
    nohup npm run dev > "$PROJECT_ROOT/logs/frontend.log" 2>&1 &
    FRONTEND_PID=$!
    echo $FRONTEND_PID > "$PROJECT_ROOT/.frontend.pid"
    
    echo -e "${GREEN}   ✅ Frontend started (PID: $FRONTEND_PID)${NC}"
}

# 等待服务就绪
wait_for_services() {
    echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
    
    # 等待后端
    for i in {1..30}; do
        if curl -s http://localhost:18512/health > /dev/null 2>&1; then
            echo -e "${GREEN}   ✅ Backend is ready${NC}"
            break
        fi
        sleep 1
    done
    
    # 等待前端
    for i in {1..60}; do
        if curl -s http://localhost:3000 > /dev/null 2>&1; then
            echo -e "${GREEN}   ✅ Frontend is ready${NC}"
            break
        fi
        sleep 1
    done
}

# 显示状态
show_status() {
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}🎉 MaxMate.ai is running!${NC}"
    echo ""
    echo -e "   ${BLUE}Frontend:${NC}  http://localhost:3000"
    echo -e "   ${BLUE}Backend:${NC}   http://localhost:18512"
    echo -e "   ${BLUE}API Docs:${NC}  http://localhost:18512/docs"
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}📋 Logs:${NC}"
    echo -e "   Frontend: $PROJECT_ROOT/logs/frontend.log"
    echo -e "   Backend:  $PROJECT_ROOT/logs/backend.log"
    echo ""
    echo -e "${YELLOW}🛑 To stop:${NC} ./stop.sh"
    echo ""
}

# 主函数
main() {
    # 创建日志目录
    mkdir -p "$PROJECT_ROOT/logs"
    
    # 清理旧进程
    cleanup
    
    # 启动服务
    start_backend
    start_frontend
    
    # 等待服务就绪
    wait_for_services
    
    # 显示状态
    show_status
    
    # 打开浏览器 (macOS)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sleep 2
        open http://localhost:3000
    fi
}

main "$@"

