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

import { createDeepSeek } from '@ai-sdk/deepseek'
import { generateText } from 'ai'

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY ?? '',
})

export async function POST(req: Request) {
  try {
    // const { messages } = await req.json()

    // const completion = await deepseek.chat.caller..create({
    //   messages: [{ role: 'system', content: messages }],
    //   model: '',
    // })

    // console.log({ completion })
    // console.log(completion.choices[0].message.content)
    // return completion.choices[0].message.content

    const { text, reasoning } = await generateText({
      model: deepseek('deepseek-chat'),
      prompt: 'Your prompt here',
    })

    console.log(reasoning)
    console.log(text)
  } catch (error) {
    console.log({ error })
  }
}
