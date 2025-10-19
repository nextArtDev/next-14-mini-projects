// import { initialMessageShiva } from '@/app/ai-chatbot/data'
// import { createOpenAI } from '@ai-sdk/openai'
// import { convertToCoreMessages, generateText, streamText } from 'ai'

// const openai = createOpenAI({
//   baseURL: process.env.OPENAI_API_BASE_URL,
//   apiKey: process.env.OPENAI_API_KEY,
// })

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json()

//     const result = await streamText({
//       model: openai('openai/gpt-4o-mini'),
//       system: 'You are a helpful assistant.',
//       messages: [
//         {
//           role: 'system',
//           content: initialMessageShiva.content,
//         },
//         ...convertToCoreMessages(messages),
//       ],
//       // maxSteps: 3,
//     })
//     for await (const delta of result.textStream) {
//       if (delta) {
//         console.log(delta)
//       }
//     }
//     return result.toDataStreamResponse()
//   } catch (error) {
//     console.error('Error in API route:', error)
//     if (error instanceof Error) {
//       return new Response(JSON.stringify({ error: error.message }), {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       })
//     }
//     return new Response(
//       JSON.stringify({ error: 'An unknown error occurred.' }),
//       {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     )
//   }
// }

import { streamText, convertToCoreMessages } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { initialMessageShiva } from '@/app/ai-chatbot/data'

export const runtime = 'edge' // Recommended for streaming performance

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Stream response from Claude 3.5 (latest as of 2025)
    const result = await streamText({
      model: anthropic('claude-sonnet-4-5-20250929') as unknown as any,
      system: 'You are a helpful assistant.',
      messages: [
        {
          role: 'system',
          content: initialMessageShiva.content,
        },
        ...convertToCoreMessages(messages),
      ],
    })

    // Optional logging (shows live text deltas)
    for await (const delta of result.textStream) {
      if (delta) console.log(delta)
    }

    // Return a proper streaming response to client
    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Error in Claude API route:', error)

    const message =
      error instanceof Error ? error.message : 'An unknown error occurred.'

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// import { streamText, convertToCoreMessages } from 'ai'
// import { openai } from '@ai-sdk/openai'
// import { initialMessageShiva } from '@/app/ai-chatbot/data'

// export const runtime = 'edge' // optional, but recommended

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json()

//     // Stream response from GPT-4o-mini
//     const result = await streamText({
//       model: openai('gpt-4o-mini'), // ✅ new syntax (no "openai/" prefix)
//       system: 'You are a helpful assistant.',
//       messages: [
//         {
//           role: 'system',
//           content: initialMessageShiva.content,
//         },
//         ...convertToCoreMessages(messages),
//       ],
//     })

//     // Optional: log streamed chunks
//     for await (const delta of result.textStream) {
//       if (delta) console.log(delta)
//     }

//     // Return a proper streaming response
//     return result.toDataStreamResponse()
//   } catch (error) {
//     console.error('Error in API route:', error)

//     const message =
//       error instanceof Error ? error.message : 'An unknown error occurred.'

//     return new Response(JSON.stringify({ error: message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     })
//   }
// }
