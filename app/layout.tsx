import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JARVIS AI Agent',
  description: 'Your personal AI assistant with long-term memory, tools, and voice interaction',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
