'use client'
import { FC, useEffect, useState } from 'react'
import { MinimalTiptapEditor } from '@/components/minimal-tiptap'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface TextEditorFormProps {}

const TextEditorForm: FC<TextEditorFormProps> = ({}) => {
  const [content, setContent] = useState('')
  const formSchema = z.object({
    description: z
      .string({
        required_error: 'Description is required',
      })
      .min(1, 'Description is required'),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  })

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
  })

  const editorContent = form.watch('description')

  // Sync form state with the editor's content
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(editorContent || '')
    }
  }, [editor, editorContent])

  useEffect(() => {
    if (!editor) {
      return
    }

    const update = () => {
      setContent('description', editor.getHTML(), { shouldValidate: true })
    }

    editor.on('update', update)

    return () => {
      editor.off('update', update)
    }
  }, [editor, setContent])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    if (!editor) {
      return
    }

    const htmlContent = editor.getHTML()
    setContent(htmlContent)
  }

  return (
    <section className="flex flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Description</FormLabel>
                <FormControl>
                  <MinimalTiptapEditor
                    {...field}
                    onValueChange={field.onChange}
                    outputValue="json"
                    className={cn('w-full', {
                      'border-red-500 focus-within:border-red-500':
                        form.formState.errors.description,
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  )
}

export default TextEditorForm
