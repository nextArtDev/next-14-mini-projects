// import { generateText, Message, streamText } from 'ai'
// import { groq } from '@ai-sdk/groq'
// import { initialMessage } from '../../ai-chatbot/data'
// import { createGoogleGenerativeAI } from '@ai-sdk/google'
// const google = createGoogleGenerativeAI({
//   apiKey: process.env.GEMINI_API_KEY || '',
// })

// export const runtime = 'edge'

// const generateId = () => Math.random().toString(36).slice(2, 15)

// const buildGoogleGenAiPrimps = (messages: Message[]): Message[] => [
//   {
//     id: generateId(),
//     role: 'user',
//     content: initialMessage.content,
//     // content:
//   },
//   ...messages.map((message) => ({
//     id: message.id || generateId(),
//     role: message.role,
//     content: message.content,
//   })),
// ]

// export default async function POST(request: Request) {
//   const { messages } = await request.json()
//   //   const stream = await streamText({
//   //     model: groq(''),
//   //     messages: buildGoogleGenAIPrompt(messages),
//   //     temperature: 0.7,
//   //   })
//   console.log({ messages })
//   const stream = await streamText({
//     model: google('gemini-1.5-flash-001'),
//     messages: buildGoogleGenAiPrimps(messages),
//     temperature: 0.7,
//   })
//   console.log({ stream })
//   return stream?.toDataStreamResponse()
// }

import { generateText, Message, streamText } from 'ai'
import { groq } from '@ai-sdk/groq'
import { initialMessage } from '../../ai-chatbot/data'
import { createOpenAI } from '@ai-sdk/openai'
import Groq from 'groq-sdk'

// const google = createGoogleGenerativeAI({
//   apiKey: process.env.GROQ_API_KEY || '',
// })

export const runtime = 'edge'

const generateId = () => Math.random().toString(36).slice(2, 15)

const buildGoogleGenAiPrimps = (messages: Message[]): Message[] => [
  {
    id: generateId(),
    role: 'user',
    content: initialMessage.content,

    // content:
  },
  ...(messages?.map((message) => ({
    id: message.id || generateId(),
    role: message.role,
    content: message.content,
  })) || {}),
]

export async function POST(request: Request) {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  })

  const reqGroqAI = async (content: any) => {
    const res = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content,
        },
      ],
      model: 'llama3-8b-8192',
    })
    return res
  }
  // const groq = createOpenAI({
  //   baseURL: 'https://api.groq.com/openai/v1',
  //   apiKey: process.env.GROQ_API_KEY,
  // })
  try {
    const { messages } = await request.json()
    console.log({ messages })
    //   const stream = await streamText({
    //     model: groq(''),
    //     messages: buildGoogleGenAIPrompt(messages),
    //     temperature: 0.7,
    //   })
    // console.log({ messages })

    const stream = await streamText({
      model: groq('llama-3.1-8b-instant'),
      messages: buildGoogleGenAiPrimps(messages),
      temperature: 0.7,
    })
    console.log(stream?.toDataStreamResponse())
    return stream?.toDataStreamResponse()
  } catch (error) {
    console.log({ error })
  }
}
