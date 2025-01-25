'use server'

export const getAi = async () => {
  try {
    // const res = await fetch('http://localhost:3000/api/groq', {
    const res = await fetch('https://api.groq.com/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`, // Replace with your Groq API key
      },
      body: JSON.stringify({ messages: 'hi there' }),
    })
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
  }
}
