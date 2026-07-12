# Prompt 日志 — Melody Lab

> 记录本项目开发过程中使用 AI（Codex）的关键 Prompt 及对应输出。

---

## Prompt #1 — 项目初始化
- **文件：** `package.json`, `tsconfig.json`, `next.config.ts`
- **诉求：** 创建一个 Next.js 15 + TypeScript 的音乐项目脚手架
- **Prompt：** "创建一个 Next.js 15 项目，使用 TypeScript，项目名 melody-lab，包含 App Router 配置"
- **AI 输出：** 生成了 package.json（依赖 next@15, react@19, typescript@5）、tsconfig.json（strict 模式）、next.config.ts（空配置）、.gitignore
- **应用：** 直接使用，修改了项目名称和描述

## Prompt #2 — 音乐理论数据结构
- **文件：** `src/lib/musicTheory.ts`
- **诉求：** 设计音乐理论的数据模型（音符、和弦、音阶、测验）
- **Prompt：** "设计一个音乐理论工具库，包含：1) MIDI 转频率函数 2) 音符命名 3) 常用和弦定义（大三、小三、属七、减三等）4) 常用音阶定义（大调、小调、五声、布鲁斯等）5) 随机乐理测验生成"
- **AI 输出：** 生成了完整的 musicTheory.ts，包含 ChordDef/ScaleDef/QuizItem 接口，8 种和弦和 8 种音阶定义，midiToFreq 缓存优化，generateQuiz 函数
- **应用：** 人工核验了音程数据的准确性，修改了少量和弦描述

## Prompt #3 — Web Audio API 音频引擎
- **文件：** `src/components/MusicEngine.ts`
- **诉求：** 实现浏览器音频播放（单音、和弦、琶音、音阶）
- **Prompt：** "实现一个 Web Audio API 引擎类 MusicEngine，支持 playNote（单音）、playChord（和弦）、playArpeggio（琶音）、playScale（音阶）。使用正弦波，带 ADSR 包络。支持单例模式避免多 AudioContext 冲突。"
- **AI 输出：** 生成了完整的 MusicEngine 类，包含 AudioContext 管理、GainNode 包络控制、dispose 回收方法、getMusicEngine 单例
- **应用：** 人工调整了 attack/decay/release 参数使音色更自然

## Prompt #4 — 钢琴键盘组件
- **文件：** `src/components/Piano.tsx`
- **诉求：** 实现可点击的交互式钢琴键盘（2 八度，黑白键准确布局）
- **Prompt：** "实现一个 React 钢琴键盘组件 Piano，2 八度（C3-B4），白键和黑键视觉准确布局，支持点击发音、和弦高亮、compact 模式、touch 支持"
- **AI 输出：** 生成了 Piano 组件，包含黑白键定位算法、highlight 样式切换、点击回调
- **应用：** 人工优化了黑键定位公式，增加了 hover/active 动效

## Prompt #5 — 导航与页面路由
- **文件：** `src/components/Navigation.tsx`, `src/app/page.tsx`
- **诉求：** 实现三页路由导航（Piano / Explore / Visualizer）
- **Prompt：** "创建页面导航组件 Navigation，支持三个链接：/（Piano）、/explore（Explore）、/visualizer（Visualizer），使用 next/link，当前页高亮"
- **AI 输出：** 生成了 Navigation 组件和三个基础页面路由骨架
- **应用：** 人工设计了页面布局和交互流程

## Prompt #6 — 和弦/音阶探索页面
- **文件：** `src/app/explore/page.tsx`
- **诉求：** 实现和弦和音阶的探索交互页面
- **Prompt：** "创建一个页面，左边列出和弦/音阶列表，右边显示选中项的详细信息（音名、描述、播放按钮），下方钢琴高亮显示。支持根音选择器。"
- **AI 输出：** 生成了 ExplorePage，包含 tab 切换、详情卡片、根音选择器、播放/琶音功能
- **应用：** 人工添加了 CSS 过渡和响应式布局

## Prompt #7 — 可视化 Canvas 引擎
- **文件：** `src/components/VisualizerCanvas.tsx`
- **诉求：** 实现三种模式的音频可视化（频谱柱状图、波形线、圆形频谱）
- **Prompt：** "创建一个 Canvas 可视化组件，三种模式：1) spectrum - 彩色柱状频谱 2) waveform - 波形曲线 3) circular - 圆形环绕频谱点。模拟音频振幅变化，实现平滑动画。"
- **AI 输出：** 生成了 VisualizerCanvas，包含三种绘制模式、requestAnimationFrame 循环、HSL 色彩
- **应用：** 人工调整了振幅模拟参数使动画更自然流畅

## Prompt #8 — 可视化页面与测试音
- **文件：** `src/app/visualizer/page.tsx`
- **诉求：** 实现音频可视化控制页面
- **Prompt：** "创建可视化页面，包含模式切换（频谱/波形/圆形）、频率滑块控制、测试音发生器、快速试音按钮"
- **AI 输出：** 生成了 VisualizerPage，包含所有控制和快速音符
- **应用：** 人工增加了测试音的开/关状态管理

## Prompt #9 — API 路由
- **文件：** `src/app/api/chords/route.ts`, `scales/route.ts`, `quiz/route.ts`
- **诉求：** 实现三个 RESTful API 接口
- **Prompt：** "创建三个 Next.js API 路由：1) GET /api/chords 返回所有和弦 2) GET /api/scales 返回所有音阶 3) GET /api/quiz 返回随机乐理题"
- **AI 输出：** 生成了三个 API 路由，chords 和 scales 使用 force-static 缓存，quiz 使用 force-dynamic
- **应用：** 直接使用

## Prompt #10 — 零依赖独立 HTML 版
- **文件：** `index.html`
- **诉求：** 生成一个可以在浏览器中直接打开使用的单文件 HTML 版本
- **Prompt：** "将 Next.js 项目的全部功能合并到一个 index.html 中，包含：三页导航（钢琴/探索/可视化）、Web Audio API、Canvas 可视化、所有 CSS 和 JS。不需要任何外部依赖。"
- **AI 输出：** 生成了完整的 index.html，包含所有功能
- **应用：** 人工调整了钢琴键盘布局 CSS 和视觉配色

## AI 使用总结
本项目中约 80% 的代码由 AI（Codex）生成，人工主要负责：
1. 架构设计和目录结构规划
2. 音乐理论数据的准确性校验
3. UI 交互流程和视觉体验设计
4. 代码质量和性能审查
5. 文档和报告撰写
