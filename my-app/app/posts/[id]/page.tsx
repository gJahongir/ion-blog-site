import PostDetail from './PostDetail'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL}/posts`)
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