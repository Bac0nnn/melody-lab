// src/app/layout.tsx
// ✍️ 人工：布局骨架手写
import type { Metadata } from "next"
import "./globals.css"
export const metadata: Metadata = {
  title: "Melody Lab | 旋律实验室",
  description: "交互式音乐理论学习工具 —— AI 辅助编程实训项目",
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
