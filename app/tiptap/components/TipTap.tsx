'use client'

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

import type { Content, Editor } from '@tiptap/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MinimalTiptapEditor } from '@/components/minimal-tiptap'
import { cn } from '@/lib/utils'

type Props = {}
const formSchema = z.object({
  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(1, 'Description is required'),
})

function TipTap({}: Props) {
  type FormValues = z.infer<typeof formSchema>
  const editorRef = useRef<Editor | null>(null)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  })

  useEffect(() => {
    form.watch().description
  }, [form])
  const handleCreate = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (form.getValues('description') && editor.isEmpty) {
        editor.commands.setContent(form.getValues('description'))
      }
      editorRef.current = editor
    },
    [form]
  )

  const onSubmit = (values) => {
    console.log('==Getting values from form==')
    console.log(values)
    console.log('Success: Values retrieved from form')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Description</FormLabel>
              <FormControl>
                <MinimalTiptapEditor
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                  onValueChange={field.onChange}
                  className="w-full"
                  //   editorContentClassName="p-5"
                  output="html"
                  placeholder="Enter your description..."
                  autofocus={true}
                  editable={true}
                  editorClassName="focus:outline-hidden"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default TipTap
