import { MinimalTiptapEditor } from '@/components/minimal-tiptap'
import React from 'react'
import TipTap from './components/TipTap'
import TipTapMini from './components/mini-tiptap'
//https://shadcn-minimal-tiptap.vercel.app/
type Props = {}

function page({}: Props) {
  return (
    <div>
      {/* <TipTap /> */}

      <TipTapMini />
    </div>
  )
}

export default page
