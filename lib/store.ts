import { create } from 'zustand'

export type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export type AgentPersonality = 'mikasa' | 'shinobu'

export type Tool = {
  id: string
  name: string
  description: string
  enabled: boolean
}

export type ThemeColor = 'blue' | 'purple' | 'pink' | 'green' | 'orange' | 'red'

type Store = {
  messages: Message[]
  personality: AgentPersonality
  selectedTools: Tool[]
  theme: ThemeColor
  isListening: boolean
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  clearMessages: () => void
  setPersonality: (personality: AgentPersonality) => void
  toggleTool: (toolId: string) => void
  setTheme: (theme: ThemeColor) => void
  setIsListening: (isListening: boolean) => void
}

const defaultTools: Tool[] = [
  { id: 'search', name: 'Web Search', description: 'Search the internet for information', enabled: true },
  { id: 'calendar', name: 'Calendar', description: 'Manage appointments and schedules', enabled: false },
  { id: 'email', name: 'Email', description: 'Send and read emails', enabled: false },
  { id: 'weather', name: 'Weather', description: 'Get weather information', enabled: true },
  { id: 'reminder', name: 'Reminders', description: 'Set and manage reminders', enabled: false },
  { id: 'calculator', name: 'Calculator', description: 'Perform calculations', enabled: true },
]

export const useStore = create<Store>((set) => ({
  messages: [],
  personality: 'mikasa',
  selectedTools: defaultTools,
  theme: 'blue',
  isListening: false,

  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      ...message,
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
    }]
  })),

  clearMessages: () => set({ messages: [] }),

  setPersonality: (personality) => set({ personality }),

  toggleTool: (toolId) => set((state) => ({
    selectedTools: state.selectedTools.map(tool =>
      tool.id === toolId ? { ...tool, enabled: !tool.enabled } : tool
    )
  })),

  setTheme: (theme) => set({ theme }),

  setIsListening: (isListening) => set({ isListening }),
}))
