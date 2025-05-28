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

import { cn } from '@/lib/utils'
import { MinimalTiptapEditor } from '@/components/minimal-tiptap'

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
                  onValueChange={field.onChange}
                  value={field.value}
                  content={field.value}
                  // throttleDelay={0}
                  className={cn('w-full', {
                    'border-destructive focus-within:border-destructive':
                      form.formState.errors.description,
                  })}
                  // editorContentClassName="some-class"
                  // output="html"
                  // placeholder="Type your description here..."
                  // onCreate={handleCreate}
                  // autofocus={true}
                  // immediatelyRender={true}
                  // editable={true}
                  // injectCSS={true}
                  // editorClassName="focus:outline-none p-5"
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
