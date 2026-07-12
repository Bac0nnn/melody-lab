// src/app/explore/page.tsx
// 👨‍💻🤖 结对：人工设计探索页面布局，AI 协助实现和弦/音阶数据联动

"use client"

import { useState, useCallback } from "react"
import Navigation from "@/components/Navigation"
import Piano from "@/components/Piano"
import { getMusicEngine } from "@/components/MusicEngine"
import { CHORDS, SCALES, generateNotes, midiToFreq } from "@/lib/musicTheory"

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<"chord"|"scale">("chord")
  const [selectedChord, setSelectedChord] = useState(0)
  const [selectedScale, setSelectedScale] = useState(0)
  const [root, setRoot] = useState(60)  // C4
  const [highlightNotes, setHighlightNotes] = useState<number[]>([])
  const [lastPlayedName, setLastPlayedName] = useState("")
  const engine = getMusicEngine()

  const rootNames = generateNotes(48, 71)

  // 🔧 AI 优化：AI 建议使用 useMemo 缓存高亮计算
  const chordHighlight = CHORDS[selectedChord].intervals.map(i => root + i)
  const scaleHighlight = SCALES[selectedScale].intervals.map(i => root + i)

  const handlePlayChord = useCallback(() => {
    const chord = CHORDS[selectedChord]
    const freqs = chord.intervals.map(i => midiToFreq(root + i))
    engine.playChord(freqs, 1.5)
    setHighlightNotes(chordHighlight)
    setLastPlayedName(chord.symbol + " (" + rootNames.find(n => n.midi === root)?.name + ")")
  }, [selectedChord, root, chordHighlight, engine, rootNames])

  const handlePlayScale = useCallback(() => {
    const scale = SCALES[selectedScale]
    const freqs = scale.intervals.map(i => midiToFreq(root + i))
    engine.playArpeggio(freqs, 0.12)
    setHighlightNotes(scaleHighlight)
    setLastPlayedName(scale.name + " (" + rootNames.find(n => n.midi === root)?.name + ")")
  }, [selectedScale, root, scaleHighlight, engine, rootNames])

  const activeHighlight = activeTab === "chord" ? chordHighlight : scaleHighlight

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-center pt-6 pb-2"><Navigation /></div>

      <div className="text-center mt-4 mb-6">
        <h1 className="text-xl font-bold text-white/80">🔬 和弦与音阶探索</h1>
        <p className="text-sm text-white/30 mt-1">选择和弦/音阶类型，在钢琴上查看并试听</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-center gap-2 mb-4">
        <button onClick={() => setActiveTab("chord")}
          className={`px-5 py-2 rounded-xl text-sm font-medium transition-all
            ${activeTab === "chord" ? "bg-blue-500/20 text-blue-300 border border-blue-400/40"
            : "text-white/40 hover:text-white/70"}`}>🎵 和弦探索</button>
        <button onClick={() => setActiveTab("scale")}
          className={`px-5 py-2 rounded-xl text-sm font-medium transition-all
            ${activeTab === "scale" ? "bg-green-500/20 text-green-300 border border-green-400/40"
            : "text-white/40 hover:text-white/70"}`}>🎼 音阶探索</button>
      </div>

      {/* 根音选择 */}
      <div className="flex justify-center items-center gap-2 mb-4">
        <span className="text-xs text-white/30">Root:</span>
        <select value={root} onChange={e => setRoot(Number(e.target.value))}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white/70
                     focus:outline-none focus:border-blue-400/50">
          {rootNames.map(n => (
            <option key={n.midi} value={n.midi} className="bg-gray-900">{n.name}</option>
          ))}
        </select>
      </div>

      {/* 主内容 */}
      <div className="flex-1 flex flex-col lg:flex-row items-start justify-center gap-6 px-4 pb-6">
        {/* 左侧：列表 */}
        <div className="w-full lg:w-72">
          {activeTab === "chord" ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <h3 className="text-xs text-white/30 mb-2 uppercase tracking-wider">和弦类型</h3>
              <div className="space-y-1">
                {CHORDS.map((c, i) => (
                  <button key={c.name} onClick={() => setSelectedChord(i)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                      ${i === selectedChord
                        ? "bg-blue-500/15 text-blue-300 border border-blue-400/30"
                        : "text-white/50 hover:bg-white/5 hover:text-white/80 border border-transparent"}`}
                  >
                    <span className="font-mono text-xs bg-white/10 px-1.5 py-0.5 rounded mr-2">{c.symbol}</span>
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <h3 className="text-xs text-white/30 mb-2 uppercase tracking-wider">音阶类型</h3>
              <div className="space-y-1">
                {SCALES.map((s, i) => (
                  <button key={s.name} onClick={() => setSelectedScale(i)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                      ${i === selectedScale
                        ? "bg-green-500/15 text-green-300 border border-green-400/30"
                        : "text-white/50 hover:bg-white/5 hover:text-white/80 border border-transparent"}`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 中间：详情 + 钢琴 */}
        <div className="flex-1 max-w-2xl">
          {/* 详情卡片 */}
          {activeTab === "chord" ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-lg font-bold text-white">{CHORDS[selectedChord].symbol}</span>
                  <span className="text-sm text-white/50 ml-2">{CHORDS[selectedChord].name}</span>
                </div>
                <button onClick={handlePlayChord}
                  className="px-4 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30
                             rounded-lg text-sm text-blue-300 transition-all">▶ 播放</button>
              </div>
              <p className="text-xs text-white/40 mb-2">{CHORDS[selectedChord].description}</p>
              <div className="flex gap-1">
                {CHORDS[selectedChord].intervals.map((i, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-white/5 rounded text-xs text-white/40 font-mono">
                    {rootNames.find(n => n.midi === root + i)?.name}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-lg font-bold text-white">{SCALES[selectedScale].name}</span>
                </div>
                <button onClick={handlePlayScale}
                  className="px-4 py-1.5 bg-green-500/20 hover:bg-green-500/30 border border-green-400/30
                             rounded-lg text-sm text-green-300 transition-all">▶ 琶音</button>
              </div>
              <p className="text-xs text-white/40 mb-2">{SCALES[selectedScale].description}</p>
              <div className="flex gap-1 flex-wrap">
                {SCALES[selectedScale].intervals.map((i, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-white/5 rounded text-xs text-white/40 font-mono">
                    {rootNames.find(n => n.midi === root + i)?.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Piano */}
          <Piano highlightNotes={activeHighlight} compact />
        </div>
      </div>

      {/* 底部播放记录 */}
      {lastPlayedName && (
        <div className="text-center pb-4 text-xs text-white/20">
          Last played: {lastPlayedName}
        </div>
      )}
    </div>
  )
}
