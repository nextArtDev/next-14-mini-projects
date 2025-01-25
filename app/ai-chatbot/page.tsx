import React from 'react'
import { ChatDemo } from './components/chat-demo'
import { Card } from '@/components/ui/card'

//pnpm install react-markdown remark-gfm shiki
//npm install framer-motion@11 remeda@2
//https://github.com/Blazity/shadcn-chatbot-kit/tree/main

type Props = {}

const page = (props: Props) => {
  return (
    <div className="flex items-center justify-center min-h-screen max-w-sm mx-auto">
      <Card className="p-3">
        <ChatDemo />
      </Card>
    </div>
  )
}

export default page
