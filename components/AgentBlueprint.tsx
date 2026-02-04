'use client'

import { useStore } from '@/lib/store'
import { motion } from 'framer-motion'

export default function AgentBlueprint() {
  const { selectedTools, toggleTool } = useStore()

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-4">Agent Blueprint</h2>
      <p className="text-white/60 mb-6">Configure tools and capabilities for your AI agent</p>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Available Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedTools.map((tool) => (
              <motion.div
                key={tool.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  tool.enabled
                    ? 'bg-blue-500/20 border-blue-500/50'
                    : 'bg-white/5 border-white/10'
                }`}
                onClick={() => toggleTool(tool.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{tool.name}</h4>
                    <p className="text-white/60 text-sm mt-1">{tool.description}</p>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full transition-colors ${
                      tool.enabled ? 'bg-blue-500' : 'bg-white/20'
                    } relative`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        tool.enabled ? 'left-7' : 'left-1'
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h4 className="text-white font-medium mb-2">Core Features</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>LLM-powered conversations with GPT-4</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Long-term memory with conversation history</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Speech-to-Text voice input</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Multi-language support (English & Urdu mastery)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Customizable personality traits</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Agent orchestration with tool integration</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
