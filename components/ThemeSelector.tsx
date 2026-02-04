'use client'

import { useStore, ThemeColor } from '@/lib/store'
import { motion } from 'framer-motion'

const themes: { color: ThemeColor; name: string; gradient: string }[] = [
  { color: 'blue', name: 'Ocean Blue', gradient: 'from-blue-500 to-cyan-500' },
  { color: 'purple', name: 'Royal Purple', gradient: 'from-purple-500 to-pink-500' },
  { color: 'pink', name: 'Sakura Pink', gradient: 'from-pink-500 to-rose-500' },
  { color: 'green', name: 'Forest Green', gradient: 'from-green-500 to-emerald-500' },
  { color: 'orange', name: 'Sunset Orange', gradient: 'from-orange-500 to-amber-500' },
  { color: 'red', name: 'Crimson Red', gradient: 'from-red-500 to-rose-500' },
]

export default function ThemeSelector() {
  const { theme, setTheme } = useStore()

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-4">Environment Theme</h2>
      <p className="text-white/60 mb-6">Choose your preferred color theme</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {themes.map((t) => (
          <motion.div
            key={t.color}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(t.color)}
            className={`relative p-6 rounded-xl cursor-pointer transition-all ${
              theme === t.color
                ? 'ring-2 ring-white ring-offset-2 ring-offset-black/20'
                : ''
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} rounded-xl opacity-80`}></div>
            <div className="relative z-10">
              <div className="text-white font-medium text-center">{t.name}</div>
              {theme === t.color && (
                <div className="mt-2 text-center">
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">Active</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
