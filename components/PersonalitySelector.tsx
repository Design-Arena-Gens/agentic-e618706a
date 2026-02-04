'use client'

import { useStore } from '@/lib/store'
import { personalities, PersonalityKey } from '@/lib/personalities'
import { motion } from 'framer-motion'

export default function PersonalitySelector() {
  const { personality, setPersonality } = useStore()

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-4">Choose Your Assistant</h2>
      <p className="text-white/60 mb-6">Select your AI companion's personality</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(Object.keys(personalities) as PersonalityKey[]).map((key) => {
          const p = personalities[key]
          const isSelected = personality === key

          return (
            <motion.div
              key={key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPersonality(key)}
              className={`p-6 rounded-xl cursor-pointer transition-all ${
                isSelected
                  ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-2 border-purple-500'
                  : 'bg-white/5 border-2 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                  style={{ background: p.color }}
                >
                  {p.name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{p.name}</h3>
                  {isSelected && (
                    <span className="text-xs text-purple-400 font-medium">SELECTED</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {p.traits.map((trait, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-purple-400 text-sm">•</span>
                    <span className="text-white/70 text-sm">{trait}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 bg-white/5 rounded-lg p-4 border border-white/10">
        <h4 className="text-white font-medium mb-2">Personality Blend</h4>
        <p className="text-white/70 text-sm">
          Both personalities share: Loyalty & devotion, Calm intelligence, Fire & passion.
          They are soft protectors with a dangerous edge - loyal heart, sharp mind, wild soul.
        </p>
      </div>
    </div>
  )
}
