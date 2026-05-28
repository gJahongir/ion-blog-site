// app/posts/[id]/page.tsx

import PostDetail from './PostDetail'
import axiosIns from '../../config/constant'


export async function generateStaticParams() {
  try {
    const res = await axiosIns.get('/posts')
    const posts = res.data

    return posts.map((post: any) => ({
      id: String(post._id || post.id),
    }))
  } catch (error) {
    console.error('generateStaticParams xatosi:', error)
    return []
  }
}

export default function Page({ params }: { params: { id: string } }) {
  return <PostDetail />
}
