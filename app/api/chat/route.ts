import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { personalities } from '@/lib/personalities'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(req: NextRequest) {
  try {
    const { message, personality, tools, history } = await req.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { message: 'Please configure your OPENAI_API_KEY in the .env.local file to enable AI responses.' },
        { status: 200 }
      )
    }

    const personalityConfig = personalities[personality as keyof typeof personalities]
    const systemPrompt = personalityConfig.systemPrompt

    const toolsContext = tools && tools.length > 0
      ? `\n\nYou have access to the following tools: ${tools.join(', ')}. Use them when relevant to help the user.`
      : ''

    const messages = [
      {
        role: 'system' as const,
        content: systemPrompt + toolsContext,
      },
      ...history.slice(-10).map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user' as const,
        content: message,
      },
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    })

    const responseMessage = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.'

    return NextResponse.json({ message: responseMessage })
  } catch (error: any) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { message: `Error: ${error.message || 'An error occurred while processing your request.'}` },
      { status: 200 }
    )
  }
}
