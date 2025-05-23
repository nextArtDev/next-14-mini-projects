'use client'
import { MinimalTiptapEditor } from '@/components/minimal-tiptap'
import React, { useState } from 'react'
import { Content } from '@tiptap/react'

type Props = {}

function TipTapMini({}: Props) {
  const [value, setValue] = useState<Content>('')

  return (
    <div className="flex flex-col gap-8">
      <MinimalTiptapEditor
        value={value}
        onChange={setValue}
        className="w-full"
        editorContentClassName="p-5"
        output="html"
        placeholder="Enter your description..."
        autofocus={true}
        editable={true}
        editorClassName="focus:outline-hidden"
      />
      <div>{typeof value === 'string' ? value : JSON.stringify(value)}</div>
    </div>
  )
}

export default TipTapMini
