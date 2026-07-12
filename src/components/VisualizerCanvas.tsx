// src/components/VisualizerCanvas.tsx
// 🤖 AI 生成：Canvas 可视化引擎由 AI 根据需求生成，人工调整了视觉参数

"use client"

import { useRef, useEffect, useCallback } from "react"
import { getMusicEngine } from "./MusicEngine"
import { midiToFreq } from "@/lib/musicTheory"

const DRAW_MODES = ["spectrum", "waveform", "circular"] as const
type DrawMode = typeof DRAW_MODES[number]

interface Props {
  mode?: DrawMode
}

export default function VisualizerCanvas({ mode = "spectrum" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const barsRef = useRef<{ freq: number; amp: number; phase: number }[]>([])
  const timeRef = useRef(0)

  // Initialize bars
  useEffect(() => {
    const count = mode === "circular" ? 64 : mode === "spectrum" ? 32 : 128
    barsRef.current = Array.from({ length: count }, (_, i) => ({
      freq: 50 + i * (2000 / count),
      amp: 0,
      phase: (i / count) * Math.PI * 2,
    }))
  }, [mode])

  // 🖌 绘制循环
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    const w = rect.width, h = rect.height

    timeRef.current += 0.02

    // 背景
    ctx.fillStyle = "#0a0a1a"
    ctx.fillRect(0, 0, w, h)

    // 更新振幅
    const bars = barsRef.current
    bars.forEach((b, i) => {
      // Simulate audio amplitude with smooth oscillation
      const target = (Math.sin(timeRef.current * b.freq * 0.001) * 0.5 + 0.5) * 0.8 +
                     (Math.sin(timeRef.current * b.freq * 0.003 + b.phase) * 0.3 + 0.3) * 0.2
      b.amp += (target - b.amp) * 0.1  // smooth
    })

    if (mode === "spectrum") {
      // 频谱柱状图
      const barW = w / bars.length
      bars.forEach((b, i) => {
        const barH = b.amp * h * 0.7
        const hue = (i / bars.length) * 240 + 200
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.8)`
        ctx.shadowColor = `hsla(${hue}, 80%, 60%, 0.3)`
        ctx.shadowBlur = 8
        ctx.fillRect(i * barW, h - barH, barW - 1, barH)
      })
      ctx.shadowBlur = 0
    } else if (mode === "waveform") {
      // 波形图
      ctx.beginPath()
      ctx.strokeStyle = "#6C63FF"
      ctx.lineWidth = 2
      ctx.shadowColor = "#6C63FF"
      ctx.shadowBlur = 10
      bars.forEach((b, i) => {
        const x = (i / bars.length) * w
        const y = h / 2 + b.amp * h * 0.4 * Math.sin(i * 0.1 + timeRef.current * 2)
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      })
      ctx.stroke()
      ctx.shadowBlur = 0
    } else if (mode === "circular") {
      // 圆形频谱
      const cx = w / 2, cy = h / 2, radius = Math.min(w, h) * 0.3
      bars.forEach((b, i) => {
        const angle = (i / bars.length) * Math.PI * 2 - Math.PI / 2
        const r = radius + b.amp * radius * 0.5
        const x = cx + Math.cos(angle) * r
        const y = cy + Math.sin(angle) * r
        const hue = (i / bars.length) * 360
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.6)`
        ctx.shadowColor = `hsla(${hue}, 80%, 60%, 0.3)`
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.arc(x, y, 3 + b.amp * 4, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.shadowBlur = 0
    }

    animRef.current = requestAnimationFrame(draw)
  }, [mode])

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-xl"
      style={{ minHeight: "300px" }}
    />
  )
}
