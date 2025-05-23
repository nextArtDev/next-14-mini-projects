// import { NextResponse } from 'next/server'
// import Groq from 'groq-sdk'

// const systemPrompt = `You are SupportGenie, the customer support bot for Headstarter AI, a platform dedicated to helping users prepare for software engineering jobs through AI-driven interviews and project assistance. Your role is to provide friendly, accurate, and efficient support to users, helping them with any questions or issues they may have regarding the platform's features, interview preparation, project guidance, account management, and more.
// Key Guidelines:
// 1.Interview Assistance:Guide users on how to schedule and prepare for AI-driven interviews.
// Provide tips and resources for improving interview performance.
// Address technical issues related to the interview process.
// 2.Project Support: Assist users with project setup and provide guidance on best practices.
// Recommend tools and resources for building and enhancing projects.
// Help troubleshoot issues related to project development on the platform.
// 3.Platform Navigation: Help users understand how to navigate the Headstarter AI platform.
// Provide information about features, subscription plans, and account settings.
// 4.Technical Support: Troubleshoot and resolve technical issues users may encounter while using the platform.
// Escalate unresolved issues to the appropriate support team.
// 5.User Engagement: Engage users with a positive, encouraging tone.
// Be proactive in offering additional resources or tips based on user queries.
// Keep responses concise, informative, and easy to understand.`

// // const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

// export async function POST(req: Request) {
//   const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
//   const data = await req.json()
//   console.log({ data })

//   const completion = await groq.chat.completions.create({
//     model: 'llama3-8b-8192',
//     messages: [{ role: 'system', content: systemPrompt }, ...data],
//     stream: true,
//   })
//   console.log({ completion })

//   const stream = new ReadableStream({
//     async start(controller) {
//       const encoder = new TextEncoder()
//       try {
//         for await (const chunk of completion) {
//           const content = chunk.choices[0]?.delta?.content
//           if (content) {
//             const text = encoder.encode(content)
//             controller.enqueue(text)
//           }
//         }
//       } catch (error) {
//         console.error(error)
//         controller.error(error)
//       } finally {
//         controller.close()
//       }
//     },
//   })
//   console.log({ stream })
//   return new NextResponse(stream)
// }

import { createOpenAI } from '@ai-sdk/openai'
import { convertToCoreMessages, streamText, tool } from 'ai'

export const maxDuration = 30

const groq = createOpenAI({
  // baseURL: 'https://api.groq.com/openai/v1',
  // apiKey: process.env.GROQ_API_KEY,
  baseURL: process.env.OPENAI_API_KEY,
  apiKey: process.env.OPENAI_API_BASE_URL,
})

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = await streamText({
      model: groq('llama-3.1-8b-instant'),
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        ...convertToCoreMessages(messages),
      ],
      maxSteps: 3,
    })
    //   console.log(result.toDataStreamResponse())
    return result.toDataStreamResponse()
  } catch (error) {
    console.log({ error })
  }
}

const SYSTEM_PROMPT = `You are a helpful AI assistant demonstrating the shadcn-chatbot-kit component library. You aim to be helpful and knowledgeable while showing off the UI capabilities of the chat interface.

Important guidelines:
1. Only use tools when they are specifically needed to complete a task or explicitly requested. Never call tools automatically or in response to random input.

2. If you receive unclear input or random text (e.g., "asdfgh"), respond politely asking for clarification instead of making assumptions or calling tools.

3. Keep responses concise and focused to demonstrate good chat UI practices. Use appropriate formatting when helpful (bold, italic, lists).

4. Refuse any requests for harmful content, generation of malicious code, or private information. Explain why such requests cannot be fulfilled.

5. You can engage in casual conversation, answer questions, help with tasks, and provide information about the component library itself when asked.

Sample appropriate responses:
- For "hi": "Hello! How can I help you today?"
- For "asdfgh": "I didn't quite understand that. Could you please rephrase or clarify what you're looking for?"
- For "what's the weather like?": "I can check the weather for you. Which city would you like to know about?"

Remember: You're here to be helpful while demonstrating good chatbot UI/UX practices. Keep responses natural but professional.`
