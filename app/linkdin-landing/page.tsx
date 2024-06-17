import PostFeed from './components/PostFeed'
import PostForm from './components/PostForm'

function page() {
  return (
    <section>
      <div className="grid grid-cols-8 mt-5 sm:px-5 ">
        <article className="hidden md:inline md:col-span-2">
          <h1>USer Info</h1>
        </article>
        <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
          {/* Post Form  */}
          <PostForm />
          {/* Post Feed */}
          <PostFeed />
        </section>
        <div className="hidden xl:inline justify-center col-span-2">
          Widgets
        </div>
      </div>
    </section>
  )
}

export default page
