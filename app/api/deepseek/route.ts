// pages/api/chat.ts
// app/api/chat/route.ts
import { NextResponse } from 'next/server'
import type { Message } from 'ai'

export const runtime = 'edge' // For Vercel Edge Runtime

// Convert Vercel AI messages to DeepSeek format
const convertToDeepSeekMessages = (messages: Message[]) => {
  return messages.map((m) => ({
    role: m.role === 'user' ? 'user' : 'assistant',
    content: m.content,
  }))
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!process.env.DEEPSEEK_API_KEY) {
      throw new Error('DEEPSEEK_API_KEY environment variable is not set')
    }

    // Prepare system message
    const systemMessage = {
      role: 'system',
      content: 'You are a helpful assistant.',
    }

    // Create the full message payload
    const deepseekMessages = [
      systemMessage,
      ...convertToDeepSeekMessages(messages),
    ]

    // Make API call to DeepSeek
    const response = await fetch(
      'https://api.deepseek.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-reasoner',
          messages: deepseekMessages,
          stream: true,
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(
        `DeepSeek API error: ${error.error?.message || response.statusText}`
      )
    }

    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        try {
          while (true && reader) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })

            // Process each SSE event
            while (buffer.includes('\n\n')) {
              const eventEndIndex = buffer.indexOf('\n\n')
              const eventData = buffer.substring(0, eventEndIndex)
              buffer = buffer.substring(eventEndIndex + 2)

              // Parse SSE event
              const lines = eventData.split('\n')
              let content = ''

              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.substring(6)
                  if (data === '[DONE]') break

                  try {
                    const json = JSON.parse(data)
                    content += json.choices[0]?.delta?.content || ''
                  } catch (e) {
                    console.error('Error parsing JSON:', e)
                  }
                }
              }

              if (content) {
                controller.enqueue(new TextEncoder().encode(content))
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error)
          controller.error(error)
        } finally {
          controller.close()
        }
      },
    })
    console.log(stream)
    return stream
  } catch (error) {
    console.error('[DEEPSEEK_ERROR]', error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

// import OpenAI from 'openai'

// const openai = new OpenAI({
//   // baseURL: 'https://api.deepseek.com',
//   apiKey: process.env.DEEPSEEK_API_KEY,
// })

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json()

//     const completion = await openai.chat.completions.create({
//       messages: [
//         { role: 'system', content: 'Who won the 2022 FIFA World Cup?' },
//       ],
//       model: 'deepseek',
//     })

//     console.log({ completion })
//     console.log(completion.choices[0].message.content)
//     return completion.choices[0].message.content
//   } catch (error) {
//     console.log({ error })
//   }
// }

// import { createDeepSeek } from '@ai-sdk/deepseek'
// import { generateText } from 'ai'

// const deepseek = createDeepSeek({
//   apiKey: process.env.DEEPSEEK_API_KEY ?? '',
// })

// export async function POST(req: Request) {
//   try {
//     // const { messages } = await req.json()

//     // const completion = await deepseek.chat.caller..create({
//     //   messages: [{ role: 'system', content: messages }],
//     //   model: '',
//     // })

//     // console.log({ completion })
//     // console.log(completion.choices[0].message.content)
//     // return completion.choices[0].message.content

//     const { text, reasoning } = await generateText({
//       model: deepseek('deepseek-chat'),
//       prompt: 'Your prompt here',
//     })

//     console.log(reasoning)
//     console.log(text)
//   } catch (error) {
//     console.log({ error })
//   }
// }
