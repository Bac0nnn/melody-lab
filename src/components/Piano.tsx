// src/components/Piano.tsx
// 👨‍💻🤖 结对：人工设计钢琴键盘布局和交互逻辑，AI 辅助实现渲染

"use client"

import { useCallback, useRef, useEffect } from "react"
import { generateNotes, midiToFreq } from "@/lib/musicTheory"
import { getMusicEngine } from "./MusicEngine"

interface Props {
  highlightNotes?: number[]   // MIDI numbers to highlight
  onNotePlay?: (midi: number) => void
  compact?: boolean
}

export default function Piano({ highlightNotes = [], onNotePlay, compact = false }: Props) {
  const notes = useRef(generateNotes(48, 71))   // C3 to B4
  const engine = useRef(getMusicEngine())

  const isBlack = (name: string) => name.includes("#")
  const blackKeys = [1, 3, 6, 8, 10] // semitone positions within octave

  // 🔧 AI 优化：AI 建议使用 CSS transform 代替逐像素定位，提升性能
  const getPositionInOctave = (noteName: string): number => {
    const semitones: Record<string, number> = { C:0, "C#":1, D:2, "D#":3, E:4, F:5, "F#":6, G:7, "G#":8, A:9, "A#":10, B:11 }
    const name = noteName.replace(/\d/, "")
    return semitones[name] || 0
  }

  const handleClick = useCallback((midi: number) => {
    const freq = midiToFreq(midi)
    engine.current.playNote(freq, 0.5)
    onNotePlay?.(midi)
  }, [onNotePlay])

  const isHighlighted = (midi: number) => highlightNotes.includes(midi)

  const whiteKeys = notes.current.filter(n => !isBlack(n.name))
  const blackKeyNotes = notes.current.filter(n => isBlack(n.name))

  return (
    <div className={`relative ${compact ? "max-w-2xl" : "max-w-3xl"} mx-auto`}>
      {/* 🖤 黑键层 */}
      <div className="relative flex justify-center" style={{ height: compact ? 80 : 100 }}>
        {blackKeyNotes.map((note) => {
          const pos = getPositionInOctave(note.name)
          const octave = parseInt(note.name.replace(/[^0-9]/g, ""))
          const octaveOffset = (octave - 3) * 7 // white keys per octave
          const whitePositions = [0, 1, 2, 3, 4, 5, 6]
          const whiteIdx = whitePositions.filter(p => !blackKeys.includes(p))
          const blackIdx = blackKeys.indexOf(pos)
          // Calculate position relative to white keys
          const leftPos = (octaveOffset + [0, 1, undefined, 2, 3, undefined, 4, 5, 6][pos]!) * (100 / 2)
          const exactLeft = (() => {
            // Map semitone to position between white keys
            const map: Record<number, number> = { 1: 0.7, 3: 1.7, 6: 3.7, 8: 4.7, 10: 5.7 }
            const inOctave = octave - 3
            return (inOctave * 7 + (map[pos] || 0)) * (100 / 7) - 1.5
          })()

          return (
            <button
              key={note.name}
              onMouseDown={() => handleClick(note.midi)}
              className={`
                absolute bottom-0 z-10 w-[3%] rounded-b-md transition-all duration-75
                ${isHighlighted(note.midi)
                  ? "bg-gradient-to-b from-blue-400 to-blue-600 shadow-blue-500/50"
                  : "bg-gradient-to-b from-gray-700 to-gray-900"}
                hover:from-gray-500 hover:to-gray-700 active:scale-y-95
                shadow-lg
              `}
              style={{
                height: compact ? "75%" : "70%",
                left: `${exactLeft}%`,
                minWidth: compact ? "14px" : "20px",
              }}
              title={`${note.name} (${note.midi})`}
            />
          )
        })}
      </div>

      {/* ⚪ 白键层 */}
      <div className="flex justify-center gap-px -mt-1">
        {whiteKeys.map((note) => (
          <button
            key={note.name}
            onMouseDown={() => handleClick(note.midi)}
            className={`
              flex-1 h-32 sm:h-36 rounded-b-lg border border-gray-600
              transition-all duration-75 font-mono text-xs
              ${isHighlighted(note.midi)
                ? "bg-blue-100 border-blue-400 text-blue-700 shadow-inner shadow-blue-200"
                : "bg-white text-gray-400 hover:bg-gray-50"}
              active:scale-y-[0.97] active:shadow-inner
              ${compact ? "h-24 sm:h-28 text-[10px]" : ""}
            `}
            style={{ minWidth: compact ? "24px" : "36px" }}
            title={`${note.name} (${note.midi})`}
          >
            <span className="block mt-auto pb-1 sm:pb-2">{note.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
