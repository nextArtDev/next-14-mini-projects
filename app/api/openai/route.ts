// app/api/chat/route.ts (or pages/api/chat.ts)
import { initialMessage } from '@/app/ai-chatbot/data'
import { createOpenAI } from '@ai-sdk/openai'
import { convertToCoreMessages, generateText } from 'ai'
import OpenAI from 'openai'

// const openai = new OpenAI({
//   baseURL: 'https://ai.liara.ir/api/v1/68304a4f153623bd82f7dbed',
//   apiKey: process.env.OPENAI_API_KEY,
// })
const openai = new OpenAI({
  baseURL: 'https://ai.liara.ir/api/v1/684808d84b02a3e0edf36a8d',
  apiKey: process.env.OPENAI_API_KEY,
})
// const openai = createOpenAI({
//   // custom settings, e.g.
//   compatibility: 'strict', // strict mode, enable when using the OpenAI API
//   baseURL: 'https://ai.liara.ir/api/v1/68304a4f153623bd82f7dbed',
//   apiKey: process.env.OPENAI_API_KEY,
// })
export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // const completion = await openai.chat.completions.create({
    //   model: 'openai/gpt-4o-mini',
    //   messages: [
    //     {
    //       role: 'system',
    //       content: messages,
    //     },
    //     // messages,
    //     // ...convertToCoreMessages(messages),
    //   ],
    //   // messages: [
    //   //   {
    //   //     role: 'user',
    //   //     content: 'معنای زندگی چیست؟',
    //   //   },
    //   // ],
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: 'whats the meaning of life?',
        },
      ],
    })

    console.log(completion.choices[0].message.content)
    return completion.choices[0].message.content
    // console.log(completion.choices[0].message.content)
    // return completion.choices[0].message.content
  } catch (error) {
    console.error('Error in API route:', error)
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    return new Response(
      JSON.stringify({ error: 'An unknown error occurred.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
// import { initialMessage } from '@/app/ai-chatbot/data'
// import { createOpenAI } from '@ai-sdk/openai' // Import createOpenAI
// import { convertToCoreMessages, streamText } from 'ai'

// export const maxDuration = 60

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json()

//     if (!Array.isArray(messages) || messages.length === 0) {
//       return new Response(
//         JSON.stringify({
//           error: 'Messages are required and must be an array.',
//         }),
//         {
//           status: 400,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       )
//     }

//     // --- IMPORTANT: Configure your custom OpenAI instance here ---
//     const customOpenAI = createOpenAI({
//       baseURL: process.env.OPENAI_API_BASE_URL, // Your custom URL
//       apiKey: process.env.OPENAI_API_KEY, // Still use your API key
//       // You might also need to set compatibility if it's not strictly OpenAI
//       // compatibility: 'compatible', // Use 'compatible' for non-strict OpenAI APIs (e.g., some self-hosted models)
//     })
//     // --- End custom OpenAI configuration ---

//     const result = await streamText({
//       model: customOpenAI('openai/gpt-4o-mini'),
//       system: 'You are a helpful assistant.',
//       messages: [
//         {
//           role: 'system',
//           content: initialMessage.content,
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
//     // const formattedMessages = messages.map((msg: any) => ({
//     //   role: msg.role,
//     //   content: msg.content,
//     // }))

//     // const result = streamText({
//     //   model: customOpenAI('openai/gpt-4o-mini'), // Use your customOpenAI instance here
//     //   system:
//     //     'You are a helpful assistant. You are designed to answer questions concisely and accurately.',
//     //   messages: formattedMessages,
//     // })
//     // console.log(result.toDataStreamResponse())
//     // return result.toDataStreamResponse()
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

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json()

//     const completion = await openai.chat.completions.create({
//       messages: [
//         {
//           role: 'system',
//           content: SYSTEM_PROMPT,
//         },
//         ...convertToCoreMessages(messages),
//       ],
//       maxSteps: 3,
//       model: 'openai/gpt-4o-mini',
//     })

//     console.log({ completion })
//     console.log(completion.choices[0].message.content)
//     return completion.choices[0].message.content
//   } catch (error) {
//     console.log({ error })
//   }
// }
