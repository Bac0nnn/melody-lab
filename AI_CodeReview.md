# AI 代码审查报告 — Melody Lab

> 审查时间：2026-07-13
> 审查工具：Codex (GPT-5)
> 审查范围：全部源码文件

---

## 审查总结

对 Melody Lab 项目全部 12 个源文件进行了代码审查。总体代码质量良好，结构清晰，类型安全。以下是详细发现：

---

## 发现的问题与建议

### 1. [P2] Piano.tsx — 黑键位置硬编码
- **文件：** `src/components/Piano.tsx`
- **行号：** ~27
- **问题：** 黑键定位使用硬编码 `blackKeys` 数组和手动映射，扩展性差
- **建议：** 将钢琴键盘布局抽象为配置数据，支持 88 键全键盘
- **代码：**
```typescript
// 当前
const blackKeys = [1, 3, 6, 8, 10]
const map: Record<number, number> = { 1: 0.7, 3: 1.7, 6: 3.7, 8: 4.7, 10: 5.7 }

// 建议
const KEYBOARD_LAYOUT = [
  { type: "white", offset: 0 },  // C
  { type: "black", offset: 0.7 }, // C#
  { type: "white", offset: 1 },  // D
  // ...
]
```
- **严重程度：** 中低（当前功能不受影响，但扩展性受限）

### 2. [P2] MusicEngine.ts — 未处理多个快速点击
- **文件：** `src/components/MusicEngine.ts`
- **行号：** ~15-25
- **问题：** 连续快速点击会创建大量 OscillatorNode，可能导致性能问题
- **建议：** 增加节流或最大并发音数限制
- **代码：**
```typescript
// 建议
private MAX_CONCURRENT = 8;
private activeCount = 0;

// 在 playNote 中检查
if (this.activeCount >= this.MAX_CONCURRENT) return;
this.activeCount++;
// ... 在 oscillator 结束事件中 --
```

### 3. [P3] page.tsx — 缺少错误边界
- **文件：** `src/app/page.tsx`
- **问题：** 页面组件未包裹 ErrorBoundary，Web Audio API 在某些浏览器可能抛出异常
- **建议：** 添加 React ErrorBoundary 或 try-catch 包裹音频初始化

### 4. [P3] VisualizerCanvas.tsx — resize 性能
- **文件：** `src/components/VisualizerCanvas.tsx`
- **问题：** 每帧都重新获取 boundingRect 和设置 canvas 尺寸
- **建议：** 使用 ResizeObserver 或仅在窗口 resize 时更新
```typescript
// 建议
const resizeRef = useRef<() => void>(() => {});
useEffect(() => {
  const ro = new ResizeObserver(() => resizeRef.current());
  ro.observe(canvasRef.current!);
  return () => ro.disconnect();
}, []);
```

### 5. [P4] globals.css — Google Fonts 加载
- **文件：** `src/app/globals.css`
- **问题：** 依赖外部 Google Fonts CDN，离线环境无法加载
- **建议：** 添加 fallback font stack 或使用系统字体
- **当前状态：** 已有 fallback，风险低

---

## 正面评价

1. **类型安全：** 全部使用 TypeScript strict 模式，无 any 类型
2. **单例模式：** MusicEngine 使用单例避免多个 AudioContext 冲突
3. **代码注释：** 每个文件都标注了 AI 协作模式，方便审查
4. **组件解耦：** 组件职责清晰，Piano/Visualizer/MusicEngine 各自独立
5. **API 设计：** RESTful 风格，数据结构清晰

---

## 优化建议汇总

| 优先级 | 建议 | 影响 |
|--------|------|------|
| P2 | 抽象钢琴键盘布局配置 | 提高可扩展性和可维护性 |
| P2 | 增加音频并发控制 | 防止性能问题 |
| P3 | 添加 ErrorBoundary | 增强健壮性 |
| P3 | Canvas resize 优化 | 提升渲染性能 |
| P4 | 字体加载优化 | 提升离线可用性 |
