'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useCurrentEditor, EditorProvider } from '@tiptap/react'
const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>توضیحات...</p>',
  })

  return <EditorContent editor={editor} />
}

export default Tiptap
