// src/app/api/chords/route.ts
// 🤖 AI 生成：API 路由由 AI 根据数据结构自动生成
import { CHORDS } from "@/lib/musicTheory"
export const dynamic = "force-static"
export async function GET() {
  return Response.json({
    count: CHORDS.length,
    data: CHORDS.map((c, i) => ({
      id: i, name: c.name, symbol: c.symbol,
      intervals: c.intervals, description: c.description,
      noteCount: c.intervals.length,
    }))
  })
}
