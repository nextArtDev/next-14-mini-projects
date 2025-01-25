import { generateText, Message, streamText } from 'ai'
import { groq } from '@ai-sdk/groq'
import { initialMessage } from '../../ai-chatbot/data'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { GoogleGenerativeAI } from '@google/generative-ai'
// const google = createGoogleGenerativeAI({
//   apiKey: process.env.GEMINI_API_KEY || '',
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
  ...messages.map((message) => ({
    id: message.id || generateId(),
    role: message.role,
    content: message.content,
  })),
]

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    //   const stream = await streamText({
    //     model: groq(''),
    //     messages: buildGoogleGenAIPrompt(messages),
    //     temperature: 0.7,
    //   })
    console.log({ messages })
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
    console.log(process.env.GEMINI_API_KEY)

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })
    const result = await model.generateContent(messages)
    console.log(result)
    const streamGemini = await model.generateContentStream({
      contents: [
        {
          id: generateId(),
          role: 'user',
          content: initialMessage.content,
          // content:
        },
        ...messages.map((message: { id: any; role: any; content: any }) => ({
          id: message.id || generateId(),
          role: message.role,
          content: message.content,
        })),
      ],
    })
    // const stream = await streamText({
    //   model: google('gemini-1.5-flash'),
    //   messages: buildGoogleGenAiPrimps(messages),
    //   temperature: 0.7,
    // })
    console.log((await streamGemini.response).text)
    console.log(await streamGemini.stream)
    // return stream?.toDataStreamResponse()
    return streamGemini.stream
  } catch (error) {
    console.log(error)
  }
}

// import { generateText, Message, streamText } from 'ai'
// import { groq } from '@ai-sdk/groq'
// import { initialMessage } from '../../ai-chatbot/data'
// import { createOpenAI } from '@ai-sdk/openai'
// import Groq from 'groq-sdk'

// // const google = createGoogleGenerativeAI({
// //   apiKey: process.env.GROQ_API_KEY || '',
// // })

// export const runtime = 'edge'

// const generateId = () => Math.random().toString(36).slice(2, 15)

// const buildGoogleGenAiPrimps = (messages: Message[]): Message[] => [
//   {
//     id: generateId(),
//     role: 'user',
//     content: initialMessage.content,

//     // content:
//   },
//   ...(messages?.map((message) => ({
//     id: message.id || generateId(),
//     role: message.role,
//     content: message.content,
//   })) || {}),
// ]

// export async function POST(request: Request) {
//   const groq = new Groq({
//     apiKey: process.env.GROQ_API_KEY,
//   })

//   const reqGroqAI = async (content: any) => {
//     const res = await groq.chat.completions.create({
//       messages: [
//         {
//           role: 'user',
//           content,
//         },
//       ],
//       model: 'llama3-8b-8192',
//     })
//     return res
//   }
//   // const groq = createOpenAI({
//   //   baseURL: 'https://api.groq.com/openai/v1',
//   //   apiKey: process.env.GROQ_API_KEY,
//   // })
//   try {
//     const { messages } = await request.json()
//     console.log({ messages })
//     //   const stream = await streamText({
//     //     model: groq(''),
//     //     messages: buildGoogleGenAIPrompt(messages),
//     //     temperature: 0.7,
//     //   })
//     // console.log({ messages })

//     const stream = await streamText({
//       model: groq('llama-3.1-8b-instant'),
//       messages: buildGoogleGenAiPrimps(messages),
//       temperature: 0.7,
//     })
//     console.log(stream?.toDataStreamResponse())
//     return stream?.toDataStreamResponse()
//   } catch (error) {
//     console.log({ error })
//   }
// }
