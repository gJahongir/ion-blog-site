'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Box, Typography, Container, Skeleton } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar, Footer } from '../../component'
import axiosIns from '../../config/constant'
import { Post } from '../../types/types'
import { useColorMode } from '../../context/ThemeContext'
import {
  Calendar,
  Eye,
  ArrowLeft,
  Clock,
  Share2,
  BookOpen,
  ChevronRight,
  Heart,
  MessageCircle,
  Bookmark
} from 'lucide-react'

/**
 * PostDetail — Bitta maqolani to'liq ko'rsatuvchi premium sahifa.
 * ID bo'yicha API dan ma'lumot oladi, chiroyli ko'rinishda chiqaradi.
 */
export default function PostDetail() {
  const params = useParams()
  const id = params.id
  const [post, setPost] = useState<Post | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const { mode } = useColorMode()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosIns.get(`/posts/${id}`)
        setPost(response.data)

        // O'xshash maqolalarni yuklash
        try {
          const allPostsRes = await axiosIns.get('/posts')
          const others = allPostsRes.data
            .filter((p: Post) => (p._id || p.id) !== id)
            .slice(0, 3)
          setRelatedPosts(others)
        } catch {}
      } catch (error) {
        console.error("Post topilmadi:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  /** Sanani formatlash */
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  /** O'qish vaqtini taxminlash */
  const getReadTime = (content: string) => {
    const words = content?.split(/\s+/).length || 0
    const minutes = Math.max(1, Math.ceil(words / 250))
    return `${minutes} daqiqa o'qish`
  }

  /** Content dan qisqacha matn olish */
  const getExcerpt = (content: string, maxLen = 100) => {
    if (!content) return ''
    if (content.length <= maxLen) return content
    return content.substring(0, maxLen).trim() + '...'
  }

  /** Paragraflarni ajratish */
  const renderContent = (content: string) => {
    if (!content) return null
    const paragraphs = content.split(/\n+/).filter(p => p.trim())

    return paragraphs.map((paragraph, index) => (
      <Typography
        key={index}
        className={`text-lg leading-[1.9] mb-6 transition-colors duration-300 ${
          mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}
        sx={{ fontFamily: 'Georgia, serif', fontSize: { xs: '1rem', md: '1.125rem' } }}
      >
        {paragraph}
      </Typography>
    ))
  }

  /** URL ni nusxalash */
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      alert('Havola nusxalandi!')
    }
  }

  // ========== LOADING HOLAT ==========
  if (loading) {
    return (
      <Box className={`min-h-screen transition-colors duration-500 ${mode === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
        <Navbar />
        <Container maxWidth="md" className="pt-32 pb-20">
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: '24px', bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }} />
          <Box className="mt-8 space-y-4">
            <Skeleton width="30%" height={24} sx={{ bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }} />
            <Skeleton width="80%" height={40} sx={{ bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }} />
            <Skeleton width="100%" height={20} sx={{ bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }} />
            <Skeleton width="100%" height={20} sx={{ bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }} />
            <Skeleton width="60%" height={20} sx={{ bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }} />
          </Box>
        </Container>
      </Box>
    )
  }

  // ========== POST TOPILMADI ==========
  if (!post) {
    return (
      <Box className={`min-h-screen transition-colors duration-500 ${mode === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
        <Navbar />
        <Box className="flex flex-col items-center justify-center min-h-[70vh]">
          <BookOpen className={`mb-6 ${mode === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} size={80} />
          <Typography variant="h4" className={`font-bold mb-3 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Maqola topilmadi
          </Typography>
          <Typography className="text-gray-500 mb-8">
            Bu maqola o'chirilgan yoki mavjud emas
          </Typography>
          <Link href="/posts">
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all">
              <ArrowLeft size={18} />
              Maqolalarga qaytish
            </button>
          </Link>
        </Box>
        <Footer />
      </Box>
    )
  }

  const imageUrl = post.image || '/sideBor/uy.jpeg'
  const isBase64 = imageUrl.startsWith('data:')

  return (
    <Box className={`min-h-screen transition-colors duration-500 ${mode === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      <Navbar />

      {/* ====== HERO RASM BILAN ====== */}
      <Box className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        {/* Rasm */}
        {isBase64 ? (
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        {/* Gradient overlays */}
        <Box className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <Box className={`absolute inset-0 ${
          mode === 'dark' ? 'bg-black/30' : 'bg-black/20'
        }`} />

        {/* Orqaga qaytish tugmasi */}
        <Box className="absolute top-28 left-0 right-0">
          <Container maxWidth="lg">
            <Link href="/posts">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-xl text-sm font-medium hover:bg-white/20 transition-all border border-white/10">
                <ArrowLeft size={16} />
                Barcha maqolalar
              </button>
            </Link>
          </Container>
        </Box>

        {/* Hero matn */}
        <Box className="absolute bottom-0 left-0 right-0 pb-12">
          <Container maxWidth="lg">
            <Box className="max-w-3xl"
              sx={{
                animation: 'fadeInUp 0.8s ease-out both',
                '@keyframes fadeInUp': {
                  from: { opacity: 0, transform: 'translateY(30px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              {/* Kategoriya */}
              <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-lg mb-5">
                {post.category}
              </span>

              {/* Sarlavha */}
              <Typography
                variant="h2"
                className="text-white font-bold mb-5"
                sx={{ fontSize: { xs: '1.8rem', md: '2.8rem' }, lineHeight: 1.2 }}
              >
                {post.title}
              </Typography>

              {/* Meta ma'lumotlar */}
              <Box className="flex items-center flex-wrap gap-5 text-white/70">
                <Box className="flex items-center gap-2">
                  <Box className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">ION</span>
                  </Box>
                  <span className="text-sm font-medium text-white/90">ION Blog</span>
                </Box>
                <Box className="flex items-center gap-1.5 text-sm">
                  <Calendar size={14} />
                  {post.publishDate ? formatDate(post.publishDate) : "Noma'lum"}
                </Box>
                <Box className="flex items-center gap-1.5 text-sm">
                  <Clock size={14} />
                  {getReadTime(post.content)}
                </Box>
                <Box className="flex items-center gap-1.5 text-sm">
                  <Eye size={14} />
                  {post.views || 0} ko'rish
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* ====== MAQOLA MATNI ====== */}
      <Container maxWidth="lg" className="py-12">
        <Box className="flex flex-col lg:flex-row gap-12">

          {/* ---- Chap: asosiy kontent ---- */}
          <Box className="flex-1 max-w-3xl">
            {/* Amallar paneli */}
            <Box className={`flex items-center gap-3 mb-10 pb-6 border-b ${
              mode === 'dark' ? 'border-white/10' : 'border-black/10'
            }`}>
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  liked
                    ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                    : mode === 'dark'
                      ? 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                      : 'bg-black/5 text-gray-600 hover:bg-black/10 border border-black/10'
                }`}
              >
                <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
                Yoqdi
              </button>
              <button
                onClick={handleShare}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  mode === 'dark'
                    ? 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                    : 'bg-black/5 text-gray-600 hover:bg-black/10 border border-black/10'
                }`}
              >
                <Share2 size={16} />
                Ulashish
              </button>
              <button
                onClick={() => setSaved(!saved)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  saved
                    ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                    : mode === 'dark'
                      ? 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                      : 'bg-black/5 text-gray-600 hover:bg-black/10 border border-black/10'
                }`}
              >
                <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
                Saqlash
              </button>
            </Box>

            {/* Maqola matni */}
            <article className="prose-custom">
              {renderContent(post.content)}
            </article>

            {/* Teglar */}
            <Box className={`mt-12 pt-8 border-t ${mode === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
              <Typography className={`text-sm font-bold mb-4 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Teglar
              </Typography>
              <Box className="flex flex-wrap gap-2">
                {[post.category, 'Dizayn', 'ION', 'Blog'].map((tag) => (
                  <span
                    key={tag}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      mode === 'dark'
                        ? 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                        : 'bg-gray-100 text-gray-600 border border-black/5 hover:bg-gray-200'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </Box>
            </Box>

            {/* Muallif haqida */}
            <Box className={`mt-10 p-8 rounded-3xl border transition-all ${
              mode === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-sm'
            }`}>
              <Box className="flex items-start gap-5">
                <Box className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/20">
                  <span className="text-white text-xl font-bold">ION</span>
                </Box>
                <Box>
                  <Typography className={`font-bold text-lg mb-1 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    ION Design Studio
                  </Typography>
                  <Typography className="text-gray-500 text-sm mb-3">
                    Arxitektura & Interyer Dizayn
                  </Typography>
                  <Typography className={`text-sm leading-relaxed ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    ION — zamonaviy interyer va eksteryer dizayn studiyasi. 6 yillik tajriba, 200+ muvaffaqiyatli loyiha. Biz har bir makonni san'at asariga aylantiramiz.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* ---- O'ng: Sidebar ---- */}
          <Box className="w-full lg:w-80 flex-shrink-0">
            <Box className="lg:sticky lg:top-28 space-y-8">

              {/* O'xshash maqolalar */}
              {relatedPosts.length > 0 && (
                <Box className={`p-6 rounded-3xl border transition-all ${
                  mode === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-sm'
                }`}>
                  <Typography className={`font-bold text-lg mb-6 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    O'xshash maqolalar
                  </Typography>
                  <Box className="space-y-4">
                    {relatedPosts.map((rPost) => {
                      const rPostId = rPost._id || rPost.id
                      const rImageUrl = rPost.image || '/sideBor/uy.jpeg'
                      const rIsBase64 = rImageUrl.startsWith('data:')

                      return (
                        <Link key={rPostId} href={`/posts/${rPostId}`} className="no-underline">
                          <Box className={`group flex gap-4 p-3 rounded-2xl transition-all cursor-pointer ${
                            mode === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'
                          }`}>
                            <Box className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                              {rIsBase64 ? (
                                <img src={rImageUrl} alt={rPost.title} className="w-full h-full object-cover" />
                              ) : (
                                <Image src={rImageUrl} alt={rPost.title} fill sizes="80px" className="object-cover" />
                              )}
                            </Box>
                            <Box className="flex-1 min-w-0">
                              <Typography
                                className={`text-sm font-semibold line-clamp-2 transition-colors group-hover:text-blue-500 ${
                                  mode === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}
                                sx={{ lineHeight: 1.4 }}
                              >
                                {rPost.title}
                              </Typography>
                              <Typography className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                                <Calendar size={10} />
                                {rPost.publishDate ? formatDate(rPost.publishDate) : ""}
                              </Typography>
                            </Box>
                          </Box>
                        </Link>
                      )
                    })}
                  </Box>
                </Box>
              )}

              {/* Obuna bo'lish */}
              <Box className={`p-6 rounded-3xl border text-center transition-all ${
                mode === 'dark' ? 'bg-gradient-to-b from-blue-600/10 to-transparent border-blue-500/20' : 'bg-gradient-to-b from-blue-50 to-white border-blue-500/10 shadow-sm'
              }`}>
                <Box className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-600/10 flex items-center justify-center">
                  <MessageCircle className="text-blue-500" size={24} />
                </Box>
                <Typography className={`font-bold text-lg mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Bog'lanish
                </Typography>
                <Typography className="text-gray-500 text-sm mb-5">
                  Loyihangiz haqida maslahat olish uchun biz bilan bog'laning
                </Typography>
                <Link href="/contact">
                  <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                    Aloqaga chiqish
                  </button>
                </Link>
              </Box>

              {/* Maqola ma'lumotlari */}
              <Box className={`p-6 rounded-3xl border transition-all ${
                mode === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-sm'
              }`}>
                <Typography className={`font-bold text-sm mb-4 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  MAQOLA HAQIDA
                </Typography>
                <Box className="space-y-4">
                  <Box className={`flex justify-between pb-3 border-b ${mode === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                    <span className="text-gray-500 text-sm">Kategoriya</span>
                    <span className={`text-sm font-medium ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{post.category}</span>
                  </Box>
                  <Box className={`flex justify-between pb-3 border-b ${mode === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                    <span className="text-gray-500 text-sm">Ko'rishlar</span>
                    <span className={`text-sm font-medium ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{post.views || 0}</span>
                  </Box>
                  <Box className={`flex justify-between pb-3 border-b ${mode === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                    <span className="text-gray-500 text-sm">O'qish vaqti</span>
                    <span className={`text-sm font-medium ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{getReadTime(post.content)}</span>
                  </Box>
                  <Box className="flex justify-between">
                    <span className="text-gray-500 text-sm">Chop etilgan</span>
                    <span className={`text-sm font-medium ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {post.publishDate ? formatDate(post.publishDate) : "—"}
                    </span>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* ====== PASTKI NAVIGATSIYA ====== */}
      <Box className={`border-t ${mode === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
        <Container maxWidth="lg" className="py-10">
          <Box className="flex items-center justify-between">
            <Link href="/posts">
              <button className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                mode === 'dark'
                  ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                  : 'bg-black/5 text-gray-600 hover:bg-black/10 border border-black/10'
              }`}>
                <ArrowLeft size={16} />
                Barcha maqolalar
              </button>
            </Link>

            {relatedPosts[0] && (
              <Link href={`/posts/${relatedPosts[0]._id || relatedPosts[0].id}`}>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                  Keyingi maqola
                  <ChevronRight size={16} />
                </button>
              </Link>
            )}
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
