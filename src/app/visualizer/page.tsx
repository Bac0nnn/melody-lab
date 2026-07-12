// src/app/visualizer/page.tsx
// 👨‍💻🤖 结对：人工设计布局和交互模式，AI 实现可视化模式切换

"use client"

import { useState, useCallback, useRef } from "react"
import Navigation from "@/components/Navigation"
import VisualizerCanvas from "@/components/VisualizerCanvas"
import { getMusicEngine } from "@/components/MusicEngine"
import { generateNotes, midiToFreq } from "@/lib/musicTheory"

type Mode = "spectrum" | "waveform" | "circular"

export default function VisualizerPage() {
  const [mode, setMode] = useState<Mode>("spectrum")
  const [freq, setFreq] = useState(440)
  const [isPlaying, setIsPlaying] = useState(false)
  const engine = getMusicEngine()
  const oscRef = useRef<{ stop: () => void } | null>(null)

  const notes = generateNotes(48, 71)

  const playNote = useCallback((midi: number) => {
    const f = midiToFreq(midi)
    engine.playNote(f, 0.5)
    setFreq(f)
  }, [engine])

  const playTestTone = useCallback(() => {
    // 🤖 AI 生成：测试音发生器，使用 Web Audio API 连续音
    const ctx = new AudioContext()
    if (ctx.state === "suspended") ctx.resume()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = "sine"
    osc.frequency.value = freq
    gain.gain.value = 0.1
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    setIsPlaying(true)
    oscRef.current = {
      stop: () => {
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1)
        setTimeout(() => { osc.stop(); ctx.close() }, 200)
        setIsPlaying(false)
      }
    }
  }, [freq])

  const stopTone = useCallback(() => {
    oscRef.current?.stop()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-center pt-6 pb-2"><Navigation /></div>

      <div className="text-center mt-4 mb-4">
        <h1 className="text-xl font-bold text-white/80">📊 音频可视化</h1>
        <p className="text-sm text-white/30 mt-1">实时音频波形与频谱可视化展示</p>
      </div>

      {/* 模式切换 */}
      <div className="flex justify-center gap-2 mb-4">
        {(["spectrum","waveform","circular"] as Mode[]).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-4 py-1.5 rounded-xl text-sm transition-all
              ${mode === m
                ? "bg-purple-500/20 text-purple-300 border border-purple-400/40"
                : "text-white/40 hover:text-white/70"}`}
          >
            {m === "spectrum" ? "📊 频谱" : m === "waveform" ? "〰️ 波形" : "🌀 圆形"}
          </button>
        ))}
      </div>

      {/* 可视化画布 */}
      <div className="px-4 mb-4">
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden" style={{ height: "360px" }}>
          <VisualizerCanvas mode={mode} />
        </div>
      </div>

      {/* 控制区域 */}
      <div className="flex flex-wrap justify-center items-center gap-4 px-4">
        {/* 频率控制 */}
        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="text-xs text-white/30">频率</span>
          <input
            type="range" min={65} max={1047} step={1}
            value={freq}
            onChange={e => setFreq(Number(e.target.value))}
            className="w-32 accent-purple-500"
          />
          <span className="text-sm font-mono text-white/60 w-16 text-right">{freq.toFixed(0)} Hz</span>
        </div>

        {/* 测试音 */}
        <button onClick={isPlaying ? stopTone : playTestTone}
          className={`px-5 py-2 rounded-xl text-sm font-medium border transition-all
            ${isPlaying
              ? "bg-red-500/20 border-red-400/30 text-red-300"
              : "bg-purple-500/20 border-purple-400/30 text-purple-300 hover:bg-purple-500/30"}`}
        >
          {isPlaying ? "⏹ 停止" : "▶ 测试音"}
        </button>

        {/* 快速音符 */}
        <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 max-w-xs">
          <div className="text-[10px] text-white/20 mb-1">快速试音</div>
          <div className="flex gap-1 flex-wrap">
            {notes.filter((_, i) => i % 2 === 0).slice(0, 12).map(n => (
              <button key={n.midi} onClick={() => playNote(n.midi)}
                className="px-2 py-0.5 text-xs bg-white/5 hover:bg-white/10 rounded text-white/40
                           hover:text-white/70 transition-all"
              >{n.name}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center pt-4 text-[10px] text-white/10">
        调整频率滑块 · 点击琴键或测试音观察可视化变化
      </div>
    </div>
  )
}
