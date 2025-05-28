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
import RichTextEditor from './react-text-editor'

type Props = {}
const formSchema = z.object({
  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(1, 'Description is required'),
})

function TipTapForm({}: Props) {
  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  })

  useEffect(() => {
    form.watch().description
  }, [form])

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
                <RichTextEditor
                  content={field.value}
                  onChange={field.onChange}
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

export default TipTapForm
