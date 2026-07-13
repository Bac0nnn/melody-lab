// src/components/Navigation.tsx
// ✍️ 人工：导航组件手写

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href:"/", label:"Piano", emoji:"🎹" },
  { href:"/explore", label:"Explore", emoji:"🔬" },
  { href:"/visualizer", label:"Visualizer", emoji:"📊" },
]

export default function Navigation() {
  const path = usePathname()
  return (
    <nav className="flex items-center gap-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-3 py-2 shadow-xl">
      {links.map(l => {
        const active = path === l.href
        return (
          <Link key={l.href} href={l.href}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200
              ${active ? "bg-white/15 text-white scale-105 shadow" : "text-white/40 hover:text-white/70 hover:bg-white/5"}`
            }
          >
            <span className="text-base">{l.emoji}</span>
            {l.label}
          </Link>
        )
      })}
    </nav>
  )
}
