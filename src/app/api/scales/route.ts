// src/app/api/scales/route.ts
// 🤖 AI 生成：API 路由由 AI 根据数据结构自动生成
import { SCALES } from "@/lib/musicTheory"
export const dynamic = "force-static"
export async function GET() {
  return Response.json({
    count: SCALES.length,
    data: SCALES.map((s, i) => ({
      id: i, name: s.name, intervals: s.intervals,
      intervalCount: s.intervals.length, description: s.description,
    }))
  })
}
