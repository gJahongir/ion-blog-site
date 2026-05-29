import PostDetail from './PostDetail'

export async function generateStaticParams() {
  try {
    const res = await fetch('https://ion-blog-site.onrender.com/api/posts')
    const posts = await res.json()
    return posts.map((post: any) => ({
      id: String(post._id || post.id),
    }))
  } catch {
    return []
  }
}

export default function Page() {
  return <PostDetail />
}