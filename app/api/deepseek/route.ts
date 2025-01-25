import OpenAI from 'openai'

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'Who won the 2022 FIFA World Cup?' },
      ],
      model: 'deepseek-chat',
    })

    console.log({ completion })
    console.log(completion.choices[0].message.content)
  } catch (error) {
    console.log({ error })
  }
}
