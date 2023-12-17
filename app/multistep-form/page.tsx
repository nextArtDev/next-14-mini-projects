import { FC } from 'react'
import Form from './components/form'

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <section className="bg-slate-400 py-24">
      <div className="container">
        <Form />
      </div>
    </section>
  )
}

export default page
