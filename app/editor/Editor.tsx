'use client'

import { createPlateEditor, createPlugins, Plate } from '@udecode/plate-common'

import { serializeHtml } from '@udecode/plate-serializer-html'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Editor } from '@/components/plate-ui/editor'

const plugins = createPlugins([], {
  components: createPlateUI(),
})
const editor = createPlateEditor({ plugins })

const html = serializeHtml(editor, {
  nodes: editor.children,
  // if you use @udecode/plate-dnd
  dndWrapper: (props) => <DndProvider backend={HTML5Backend} {...props} />,
})

const initialValue = [
  {
    id: 1,
    type: 'p',
    children: [{ text: '' }],
  },
]

export function PlateEditor() {
  return (
    <Plate
      plugins={plugins}
      onChange={(value) => console.log(value)}
      initialValue={initialValue}
    >
      <Editor placeholder="Type your message here." />
    </Plate>
  )
}
function createPlateUI():
  | Record<string, import('@udecode/plate-common').PlatePluginComponent<any>>
  | undefined {
  throw new Error('Function not implemented.')
}
