'use client'

// import { useChat, type UseChatOptions } from 'ai/react'
import { Chat } from './chat'
import { useChat, UseChatOptions } from '@ai-sdk/react'
type ChatDemoProps = {
  initialMessages?: UseChatOptions['initialMessages']
}

export function ChatDemo(props: ChatDemoProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    isLoading,
  } = useChat({ ...props, api: 'http://localhost:3000/api/groq' })
  console.log({ messages })
  return (
    <div className="flex h-[500px] w-full">
      <Chat
        className="grow"
        messages={messages}
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        isGenerating={isLoading}
        stop={stop}
        append={append}
        suggestions={[
          'Generate a tasty vegan lasagna recipe for 3 people.',
          'Generate a list of 5 questions for a job interview for a software engineer.',
          'Who won the 2022 FIFA World Cup?',
        ]}
      />
    </div>
  )
}
