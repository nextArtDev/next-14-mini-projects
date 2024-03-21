import { FC } from 'react'
import ReactCountdown from './ReactCntdown'

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <ReactCountdown />
    </div>
  )
}

export default page
