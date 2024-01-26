'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="submit-button border px-2 py-1 rounded"
      aria-disabled={pending}
    >
      {pending ? 'Uploading...' : 'File Upload'}
    </button>
  )
}
