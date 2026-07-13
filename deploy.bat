@echo off
REM ==========================================
REM Melody Lab — 一键提交到 GitHub + 部署到 Vercel
REM 使用方法：
REM   1. 把 melody-lab/ 目录复制到一个不限制网络的地方
REM   2. 双击运行本脚本
REM ==========================================

echo ========================================
echo  Melody Lab 提交与部署工具
echo ========================================
echo.

cd /d "%~dp0melody-lab"

echo [1/7] 初始化 Git 仓库...
if not exist .git (
    git init
)

echo [2/7] 添加远程仓库...
git remote remove origin 2>nul
git remote add origin https://github.com/Bac0nnn/melody-lab.git

echo [3/7] 第一次提交...
git add package.json tsconfig.json next.config.ts .gitignore
git commit -m "feat: init Next.js project with TypeScript and App Router"

echo [4/7] 添加音乐理论模块 + 音频引擎...
git add src/lib/musicTheory.ts src/components/MusicEngine.ts src/app/globals.css src/app/layout.tsx
git commit -m "feat: add music theory data module and Web Audio API sound engine"

echo [5/7] 添加组件和页面...
git add src/components/ src/app/
git commit -m "feat: add Piano, Navigation, Visualizer components and page routes"

echo [6/7] 添加 API + 文档 + 报告...
git add src/app/api/ prompt_log.md API文档.md README.md AI_CodeReview.md 个人总结报告.md 软件配置说明.md
git commit -m "feat: add REST API routes and complete documentation"

echo [7/7] 推送到 GitHub...
git push -u origin main

if %errorlevel% EQU 0 (
    echo.
    echo ? 已推送到 GitHub！
    echo.
    echo ========================================
    echo  下一步：部署到 Vercel
    echo ========================================
    echo.
    echo 方式一：使用命令行
    echo   npm install -g vercel
    echo   vercel login
    echo   vercel --prod
    echo.
    echo 方式二：在 Vercel 官网连接 GitHub 仓库
    echo   1. 打开 https://vercel.com
    echo   2. 点击 "Add New" → "Project"
    echo   3. 选择 Bac0nnn/melody-lab
    echo   4. 点击 "Deploy"
    echo.
    echo 部署完成后会得到一个 URL，例如：
    echo   https://melody-lab.vercel.app
    echo.
) else (
    echo.
    echo ? 推送失败，请检查：
    echo   1. 网络是否正常
    echo   2. GitHub 仓库是否存在 (https://github.com/Bac0nnn/melody-lab)
    echo   3. 是否有推送权限
)

pause
