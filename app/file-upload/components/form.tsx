import { useFormState } from 'react-dom'
import { SubmitButton } from './submit-button'
import { uploadFile } from '@/actions/upload'
import { ChangeEvent, useState } from 'react'

const initialState = { message: null, status: null }

interface State {
  status: string | null
  message: string | null
}

export function UploadForm() {
  const [state, formAction] = useFormState<State, FormData>(
    uploadFile,
    initialState
  )
  const [files, setFiles] = useState()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fi = e.target.files
    // if (e.target.files) {
    //   setFiles((prev) => prev, e.target.files)
    //   console.log(files?.length)
    // }
    setFiles([...files, ...e.target.files])
    console.log(fi)
    console.log(files)
  }

  return (
    <div className="form-wrapper">
      <form action={formAction}>
        <input
          multiple
          type="file"
          id="file"
          name="file"
          accept="images/*"
          onChange={handleFileChange}
        />
        <SubmitButton />
      </form>
      {state?.status && (
        <div className={`state-message ${state?.status}`}>{state?.message}</div>
      )}
    </div>
  )
}
