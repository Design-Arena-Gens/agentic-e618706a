'use client'

import { useState } from 'react'
import ChatSection from '@/components/ChatSection'
import AgentBlueprint from '@/components/AgentBlueprint'
import PersonalitySelector from '@/components/PersonalitySelector'
import ThemeSelector from '@/components/ThemeSelector'
import { useStore } from '@/lib/store'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'chat' | 'blueprint' | 'personality' | 'theme'>('chat')
  const { theme } = useStore()

  const themeGradients = {
    blue: 'from-blue-900 via-blue-800 to-black',
    purple: 'from-purple-900 via-purple-800 to-black',
    pink: 'from-pink-900 via-pink-800 to-black',
    green: 'from-green-900 via-green-800 to-black',
    orange: 'from-orange-900 via-orange-800 to-black',
    red: 'from-red-900 via-red-800 to-black',
  }

  return (
    <main className={`min-h-screen bg-gradient-to-br ${themeGradients[theme]} transition-all duration-500`}>
      <div className="container mx-auto px-4 py-8 h-screen flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">JARVIS AI Agent</h1>
          <p className="text-white/60">Your personal AI assistant with long-term memory, tools, and voice interaction</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'chat'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            💬 Chat
          </button>
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'blueprint'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            🔧 Agent Blueprint
          </button>
          <button
            onClick={() => setActiveTab('personality')}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'personality'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            👤 Personality
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'theme'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            🎨 Theme
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'chat' && (
            <div className="h-full bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
              <ChatSection />
            </div>
          )}
          {activeTab === 'blueprint' && (
            <div className="h-full overflow-y-auto">
              <AgentBlueprint />
            </div>
          )}
          {activeTab === 'personality' && (
            <div className="h-full overflow-y-auto">
              <PersonalitySelector />
            </div>
          )}
          {activeTab === 'theme' && (
            <div className="h-full overflow-y-auto">
              <ThemeSelector />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
