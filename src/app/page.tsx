// src/app/page.tsx
// 👨‍💻🤖 结对：主页面布局由人工设计，AI 辅助实现状态管理和组件组合

"use client"

import { useState, useCallback } from "react"
import Navigation from "@/components/Navigation"
import Piano from "@/components/Piano"
import { getMusicEngine } from "@/components/MusicEngine"
import { CHORDS, SCALES, generateNotes, midiToFreq } from "@/lib/musicTheory"

export default function Home() {
  const [lastNote, setLastNote] = useState<string>("--")
  const [lastMidi, setLastMidi] = useState<number>(60)
  const [showChord, setShowChord] = useState(false)
  const [selectedChord, setSelectedChord] = useState(0)
  const [selectedScale, setSelectedScale] = useState(0)
  const [highlightNotes, setHighlightNotes] = useState<number[]>([])
  const engine = getMusicEngine()

  const handleNotePlay = useCallback((midi: number) => {
    const notes = generateNotes(48, 71)
    const note = notes.find(n => n.midi === midi)
    if (note) {
      setLastNote(note.name)
      setLastMidi(midi)
    }
  }, [])

  const playChord = useCallback((chordIdx: number) => {
    const root = lastMidi
    const chord = CHORDS[chordIdx]
    const freqs = chord.intervals.map(i => midiToFreq(root + i))
    engine.playChord(freqs, 1.2)
    setHighlightNotes(chord.intervals.map(i => root + i))
    setSelectedChord(chordIdx)
    setShowChord(true)
  }, [lastMidi, engine])

  const playScale = useCallback((scaleIdx: number) => {
    const root = lastMidi
    const scale = SCALES[scaleIdx]
    const freqs = scale.intervals.map(i => midiToFreq(root + i))
    engine.playArpeggio(freqs, 0.1)
    setHighlightNotes(scale.intervals.map(i => root + i))
    setSelectedScale(scaleIdx)
  }, [lastMidi, engine])

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶栏 */}
      <div className="flex justify-center pt-6 pb-2">
        <Navigation />
      </div>

      {/* 标题 */}
      <div className="text-center mt-6 mb-4">
        <h1 className="text-2xl font-bold text-white/90 tracking-tight">Melody Lab</h1>
        <p className="text-sm text-white/30 mt-1">交互式音乐理论与创作工具</p>
      </div>

      {/* 当前音符显示 */}
      <div className="flex justify-center items-center gap-4 mb-4">
        <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-center min-w-[120px]">
          <div className="text-[10px] text-white/30 uppercase tracking-wider">Last Note</div>
          <div className="text-3xl font-bold text-white mt-1 font-mono">{lastNote}</div>
          <div className="text-xs text-white/20">MIDI: {lastMidi}</div>
        </div>
        {/* 🤖 AI 生成：和弦快速播放区由 AI 提议并实现 */}
        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
          <div className="text-[10px] text-white/30 mb-1">🎵 Quick Chord</div>
          <div className="flex gap-1 flex-wrap max-w-[240px]">
            {CHORDS.slice(0, 5).map((c, i) => (
              <button key={c.name} onClick={() => playChord(i)}
                className={`px-2 py-1 text-xs rounded-lg border transition-all
                  ${selectedChord === i && showChord
                    ? "bg-blue-500/20 border-blue-400/50 text-blue-300"
                    : "bg-white/5 border-white/10 text-white/50 hover:text-white/80"}`}
              >{c.symbol}</button>
            ))}
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
          <div className="text-[10px] text-white/30 mb-1">🎼 Quick Scale</div>
          <div className="flex gap-1 flex-wrap max-w-[240px]">
            {SCALES.slice(0, 5).map((s, i) => (
              <button key={s.name} onClick={() => playScale(i)}
                className={`px-2 py-1 text-xs rounded-lg border transition-all
                  ${selectedScale === i
                    ? "bg-green-500/20 border-green-400/50 text-green-300"
                    : "bg-white/5 border-white/10 text-white/50 hover:text-white/80"}`}
              >{s.name.slice(0, 4)}</button>
            ))}
          </div>
        </div>
      </div>

      {/* 钢琴 */}
      <div className="flex-1 flex items-start justify-center px-4 pb-8">
        <div className="w-full max-w-3xl">
          <Piano highlightNotes={highlightNotes} onNotePlay={handleNotePlay} />
        </div>
      </div>

      {/* 底部信息 */}
      <div className="text-center pb-4 text-[10px] text-white/10">
        点击琴键发音 · 选择 Chord/Scale 高亮音阶
      </div>
    </div>
  )
}
