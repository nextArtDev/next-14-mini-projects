'use server'
import { revalidatePath } from 'next/cache'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
// import sharp from 'sharp'

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION!,
  //   endpoint: process.env.LIARA_ENDPOINT!,
  endpoint: 'https://storage.iran.liara.space',
  //   endpoint: 'https://ams3.digitaloceanspaces.com',
  //   endpointProvider: process.env.LIARA_ENDPOINT!,

  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID!,

    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY!,
  },
})

async function uploadFileToS3(file: Buffer, fileName: string) {
  const fileBuffer = file
  //   const fileBuffer = await sharp(file)
  //     .jpeg({ quality: 50 })
  //     .resize(800, 400)
  //     .toBuffer()
  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: 'image/jpg',
  }

  const command = new PutObjectCommand(params)
  try {
    const response = await s3Client.send(command)

    console.log('File uploaded successfully:', response)
    return fileName
  } catch (error) {
    console.log(error)
    throw error
  }
}

export interface FormState {
  message: string
  status: string
  // file?: File
}

export async function uploadFile(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // console.log(formData.getAll('file'))

    const files = formData.getAll('file') as File[]
    if (!files || files.length === 0) {
      return { status: 'error', message: 'Please select a file.' }
    }
    for (const f in files) {
      const file = formData.get('file') as File
      console.log(file)

      // const buffer = Buffer.from(await file.arrayBuffer())
      // await uploadFileToS3(buffer, file.name)

      // return { status: 'success', message: 'File has been upload.' }
    }
    revalidatePath('/')
    return { status: 'success', message: 'Files has been upload.' }
  } catch (error) {
    return { status: 'error', message: 'Failed to upload file.' }
  }
}
