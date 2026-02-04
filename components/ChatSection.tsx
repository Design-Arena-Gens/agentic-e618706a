'use client'

import { useState, useRef, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { personalities } from '@/lib/personalities'

export default function ChatSection() {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, addMessage, clearMessages, personality, theme, isListening, setIsListening, selectedTools } = useStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    addMessage({ role: 'user', content: userMessage })
    setIsLoading(true)

    try {
      const enabledTools = selectedTools.filter(t => t.enabled).map(t => t.name)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          personality,
          tools: enabledTools,
          history: messages.slice(-10),
        }),
      })

      const data = await response.json()
      addMessage({ role: 'assistant', content: data.message })
    } catch (error) {
      addMessage({ role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.')
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      setIsListening(false)
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const themeColors = {
    blue: 'from-blue-500/20 via-cyan-500/20 to-blue-500/20',
    purple: 'from-purple-500/20 via-pink-500/20 to-purple-500/20',
    pink: 'from-pink-500/20 via-rose-500/20 to-pink-500/20',
    green: 'from-green-500/20 via-emerald-500/20 to-green-500/20',
    orange: 'from-orange-500/20 via-amber-500/20 to-orange-500/20',
    red: 'from-red-500/20 via-rose-500/20 to-red-500/20',
  }

  const currentPersonality = personalities[personality]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`bg-gradient-to-r ${themeColors[theme]} backdrop-blur-sm border-b border-white/10 p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
              {currentPersonality.name[0]}
            </div>
            <div>
              <h2 className="text-white font-semibold">{currentPersonality.name}</h2>
              <p className="text-white/60 text-sm">AI Assistant</p>
            </div>
          </div>
          <button
            onClick={clearMessages}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-blue-500/20 text-white'
                    : 'bg-white/5 text-white'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <span className="text-xs text-white/40 mt-2 block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={startVoiceRecognition}
            className={`px-4 py-3 rounded-lg transition-colors ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400'
            }`}
            disabled={isLoading}
          >
            🎤
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
