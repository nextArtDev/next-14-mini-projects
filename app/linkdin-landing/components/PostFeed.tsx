import Post from './Post'

const posts = [
  {
    id: 1,
    imageUrl: '/next.svg',
    user: { userId: 1, userImage: '/vercel.svg' },

    comments: ['Its greate!', 'it is ok'],
    likes: [1, 2, 3],
  },
  {
    id: 1,
    imageUrl: '/vercel.svg',
    user: { userId: 2, userImage: '/vercel.svg' },

    comments: ['Its greate!', 'it is ok'],
    likes: [2, 3],
  },
  {
    id: 1,
    imageUrl: '/next.svg',
    user: { userId: 3, userImage: '/vercel.svg' },

    comments: ['Its greate!', 'it is ok'],
    likes: [1, 2],
  },
]
async function PostFeed() {
  return (
    <div className="space-y-2 pb-20">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostFeed
