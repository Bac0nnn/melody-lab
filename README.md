# Melody Lab · 旋律实验室

## 项目简介
一个基于 Web Audio API 的交互式音乐理论学习工具。通过可视化钢琴键盘、和弦/音阶探索器和实时音频可视化，帮助理解和学习音乐理论。

**在线体验：** 双击 `index.html` 即可运行（零依赖）

## 技术栈
- **前端框架：** Next.js 15 (React 19, TypeScript)
- **音频引擎：** Web Audio API
- **可视化：** Canvas API
- **部署：** Vercel
- **AI 工具：** Codex (GPT-5) 全程辅助

## 功能特性
| 路由 | 功能 | 说明 |
|------|------|------|
| `/` | 🎹 交互钢琴 | 2 八度可点击钢琴键盘，支持和弦/音阶高亮 |
| `/explore` | 🔬 和弦与音阶探索 | 选择和弦/音阶类型，钢琴高亮显示，可播放试听 |
| `/visualizer` | 📊 音频可视化 | 频谱/波形/圆形三种可视化模式，频率控制 |
| `/api/chords` | GET 和弦数据接口 | 返回全部和弦定义 |
| `/api/scales` | GET 音阶数据接口 | 返回全部音阶定义 |
| `/api/quiz` | GET 测验接口 | 随机返回一道乐理选择题 |

## 快速开始（零依赖版）
直接双击打开 `index.html`，在浏览器中即可使用全部功能。

## 开发模式
```bash
# 1. 进入项目目录
cd melody-lab

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 浏览器访问 http://localhost:3000
```

## 部署到 Vercel
```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录并部署
vercel
# 按提示完成即可获得线上 URL
```

## 项目结构
```
melody-lab/
├── index.html              # 零依赖单文件版（推荐体验）
├── package.json             # Next.js 项目配置
├── tsconfig.json
├── next.config.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx       # 根布局
│   │   ├── page.tsx         # 首页：交互钢琴
│   │   ├── globals.css      # 全局样式
│   │   ├── explore/page.tsx # 和弦/音阶探索页
│   │   ├── visualizer/page.tsx # 音频可视化页
│   │   └── api/
│   │       ├── chords/route.ts  # GET /api/chords
│   │       ├── scales/route.ts  # GET /api/scales
│   │       └── quiz/route.ts    # GET /api/quiz (随机)
│   ├── components/
│   │   ├── MusicEngine.ts   # Web Audio API 封装
│   │   ├── Piano.tsx        # 钢琴键盘组件
│   │   ├── Navigation.tsx   # 导航栏
│   │   └── VisualizerCanvas.tsx # 可视化 Canvas
│   └── lib/
│       └── musicTheory.ts   # 乐理数据与工具函数
├── prompt_log.md            # AI 协作日志
├── API文档.md               # API 接口文档
├── AI_CodeReview.md         # AI 代码审查报告
├── 个人总结报告.md          # 实训总结报告
└── 软件配置说明.md          # 开发环境配置指南
```

## AI 协作透明度
本项目代码中标注了 AI 协作标签：
- `🤖 AI 生成` — AI 独立完成，人工审核
- `👨‍💻🤖 结对` — 人工主导逻辑，AI 辅助实现
- `✍️ 人工` — 完全手写
- `🔧 AI 优化` — 人工先写，AI 优化
