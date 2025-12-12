#!/bin/bash

# MaxMate.ai - 停止脚本

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"

echo -e "${YELLOW}🛑 Stopping MaxMate.ai services...${NC}"

# 从 PID 文件停止
if [ -f "$PROJECT_ROOT/.backend.pid" ]; then
    BACKEND_PID=$(cat "$PROJECT_ROOT/.backend.pid")
    kill -9 $BACKEND_PID 2>/dev/null || true
    rm "$PROJECT_ROOT/.backend.pid"
    echo -e "${GREEN}   ✅ Backend stopped${NC}"
fi

if [ -f "$PROJECT_ROOT/.frontend.pid" ]; then
    FRONTEND_PID=$(cat "$PROJECT_ROOT/.frontend.pid")
    kill -9 $FRONTEND_PID 2>/dev/null || true
    rm "$PROJECT_ROOT/.frontend.pid"
    echo -e "${GREEN}   ✅ Frontend stopped${NC}"
fi

# 确保端口释放
lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null || true
lsof -ti:18512 2>/dev/null | xargs kill -9 2>/dev/null || true

echo -e "${GREEN}🎉 All services stopped${NC}"

