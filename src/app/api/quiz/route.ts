// src/app/api/quiz/route.ts
// 🤖 AI 生成：测验 API 由 AI 实现随机逻辑
import { generateQuiz } from "@/lib/musicTheory"
export const dynamic = "force-dynamic"
export async function GET() {
  const quiz = generateQuiz()
  return Response.json(quiz)
}
