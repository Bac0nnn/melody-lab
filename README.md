# Melody Lab · 旋律实验室

## 项目简介
一个基于 Web Audio API 的交互式音乐创作与学习工具。包含 **4 个八度（C2–B5）全尺寸钢琴键盘**、和弦/音阶探索器、实时音频可视化、**钢琴录制回放**、**系统音频转谱录制**、以及预设钢琴曲播放功能。

**零依赖体验：** 双击 `index.html` 即可运行。  
**在线体验：** 已部署至 [bac0nnn.github.io/melody-lab](https://bac0nnn.github.io/melody-lab)

---

## 功能特性

### 🎹 交互钢琴（主页）
- **4 个八度全键盘**：C2 到 B5，28 个白键 + 20 个黑键，全宽自适应显示
- **电脑键盘弹奏**：QWERTYUIOP / ASDFGHJKL / ZXCVBNM 映射全部白键，← → 移调
- **和弦/音阶快捷按钮**：一键播放和弦或音阶，钢琴高亮显示
- **录制/回放**：录制弹奏的音符序列，随时回放
- **音频转谱录制**：捕获系统音频（如播放的歌曲），自动识别音高并转为钢琴音符记录
- **预设示范曲**：播放《晴天》钢琴版，对应琴键实时高亮

### 🔬 和弦与音阶探索
- **7 种和弦**：大三、小三、属七、大七、小七、减三、挂留
- **6 种音阶**：大调、自然小调、五声大调、五声小调、布鲁斯、全音
- **根音选择**：可切换根音，钢琴高亮显示组成音
- **播放/琶音**：点击试听和弦或音阶

### 📊 音频可视化
- **三种模式**：频谱柱状图、波形曲线、圆形环绕频谱
- **系统音频捕获**：捕获设备背景音乐，可视化实时跳动
- **上传音频文件**：支持 mp3/wav/ogg 文件播放并可视化
- **测试音发生器**：频率可调的正弦波测试音

---

## 技术栈
- **语言：** JavaScript (ES6+)
- **音频引擎：** Web Audio API（AnalyserNode, OscillatorNode, MediaStreamSource）
- **可视化：** Canvas 2D API
- **部署：** Vercel（Next.js 15 版）/ 零依赖 HTML 直接运行
- **AI 工具：** Codex (GPT-5) 全程辅助

---

## 快速开始

### 零依赖版（推荐）
直接双击打开 `index.html`，无需任何安装。浏览器打开即可看到全部功能。

### Next.js 开发版
```bash
cd melody-lab
npm install
npm run dev      # http://localhost:3000
```

### 部署到 Vercel
方式一：在 [vercel.com](https://vercel.com) 导入 GitHub 仓库自动部署  
方式二：`vercel --prod`（需安装 Vercel CLI）

---

## 键盘映射说明

钢琴键从左到右对应电脑键盘：

| 键盘分区 | 钢琴音域 |
|---------|---------|
| Q W E R T Y U I O P | C2 D2 E2 F2 G2 A2 B2 C3 D3 E3 |
| A S D F G H J K L | F3 G3 A3 B3 C4 D4 E4 F4 G4 |
| Z X C V B N M | A4 B4 C5 D5 E5 F5 G5 |
| ; ' | A5 B5 |

**← → 箭头键**：±12 半音移调

---

## 项目结构
```
melody-lab/
├── index.html                # 零依赖单文件版（955 行，推荐直接使用）
├── package.json              # Next.js 项目配置（用于 Vercel 部署）
├── tsconfig.json / next.config.ts
├── src/                      # Next.js 源码（可选部署方案）
│   ├── app/                   # 页面路由
│   └── components/            # React 组件
├── deploy.bat                # 一键提交脚本
├── vercel.json               # Vercel 部署配置
└── 文档文件
    ├── README.md
    ├── API文档.md
    ├── AI_CodeReview.md
    ├── prompt_log.md
    ├── 个人总结报告.md
    ├── 软件配置说明.md
    └── 部署指南.md
```

---

## Git 提交记录（3 天）

| 天数 | 提交内容 |
|------|---------|
| Day 1 | 项目初始化、钢琴基础功能、和弦/音阶探索、音频可视化 |
| Day 2 | 钢琴扩展至 4 八度、键盘弹奏、录制回放、系统音频捕获 |
| Day 3 | QWERTY 映射、全宽自适应、音频转谱录制、预设示范曲、文档完善 |

---

> 项目仓库：[github.com/Bac0nnn/melody-lab](https://github.com/Bac0nnn/melody-lab)

