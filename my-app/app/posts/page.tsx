'use client'

import React, { useState, useEffect } from 'react'
import { Box, Typography, Container, Skeleton } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar, Footer } from '../component'
import axiosIns from '../config/constant'
import { Post } from '../types/types'
import { useColorMode } from '../context/ThemeContext'
import { Calendar, Eye, ArrowRight, Search, BookOpen } from 'lucide-react'

/**
 * Posts sahifasi — Barcha blog maqolalarini ko'rsatadi.
 * Qidiruv va kategoriya filtrlari bilan.
 */
export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Hammasi')
  const { mode } = useColorMode()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosIns.get('/posts')
        setPosts(response.data)
      } catch (error) {
        console.error("Postlarni yuklashda xato:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  /** Sanani chiroyli formatga o'zgartirish */
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  /** Content dan qisqacha matn olish */
  const getExcerpt = (content: string, maxLen = 160) => {
    if (!content) return ''
    if (content.length <= maxLen) return content
    return content.substring(0, maxLen).trim() + '...'
  }

  /** O'qish vaqtini taxminlash (250 so'z/daqiqa) */
  const getReadTime = (content: string) => {
    const words = content?.split(/\s+/).length || 0
    const minutes = Math.max(1, Math.ceil(words / 250))
    return `${minutes} daqiqa`
  }

  // Kategoriyalar ro'yxatini olish
  const categories = ['Hammasi', ...Array.from(new Set(posts.map(p => p.category)))]

  // Filter + qidiruv
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Hammasi' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Box className={`min-h-screen transition-colors duration-500 ${
      mode === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'
    }`}>
      <Navbar />

      {/* Hero Section */}
      <Box className="pt-32 pb-12">
        <Container maxWidth="lg">
          <Box className="text-center mb-12">
            <Typography
              variant="overline"
              className="text-blue-500 font-bold tracking-[0.3em] text-sm mb-3 block"
            >
              BLOG
            </Typography>
            <Typography
              variant="h2"
              className={`font-bold tracking-tight mb-4 transition-colors duration-300 ${
                mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
              sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
            >
              Barcha <span className="text-blue-500">Maqolalar</span>
            </Typography>
            <Typography
              className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
                mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Dizayn, arxitektura va interyer haqidagi eng so'nggi va foydali maqolalarimiz
            </Typography>
          </Box>

          {/* Qidiruv va filtrlar */}
          <Box className="flex flex-col md:flex-row gap-4 items-center justify-center mb-12">
            {/* Qidiruv */}
            <Box className={`relative w-full md:w-96 group`}>
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                mode === 'dark' ? 'text-gray-500 group-focus-within:text-blue-400' : 'text-gray-400 group-focus-within:text-blue-600'
              }`} size={18} />
              <input
                type="text"
                placeholder="Maqola qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full border rounded-2xl py-3 pl-12 pr-4 outline-none text-sm transition-all ${
                  mode === 'dark'
                    ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:bg-white/10'
                    : 'bg-white border-black/10 text-black placeholder:text-gray-400 focus:border-blue-500/50 shadow-sm'
                }`}
              />
            </Box>

            {/* Kategoriya filtrlari */}
            <Box className="flex gap-2 flex-wrap justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : mode === 'dark'
                        ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-black/10 shadow-sm'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Posts Grid */}
      <Container maxWidth="lg" className="pb-20">
        {/* Loading */}
        {loading && (
          <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Box
                key={i}
                className={`rounded-3xl overflow-hidden border transition-all ${
                  mode === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-lg'
                }`}
              >
                <Skeleton variant="rectangular" height={220} sx={{ bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }} />
                <Box className="p-6">
                  <Skeleton width="40%" height={20} sx={{ bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)', mb: 1 }} />
                  <Skeleton width="90%" height={28} sx={{ bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)', mb: 1 }} />
                  <Skeleton width="100%" height={16} sx={{ bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }} />
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Bo'sh holat */}
        {!loading && filteredPosts.length === 0 && (
          <Box className={`text-center py-32 rounded-3xl border border-dashed transition-all ${
            mode === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'
          }`}>
            <BookOpen className={`mx-auto mb-4 ${mode === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} size={56} />
            <Typography variant="h6" className={`font-semibold mb-2 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {searchQuery ? 'Hech narsa topilmadi' : 'Hozircha maqolalar yo\'q'}
            </Typography>
            <Typography className="text-gray-500">
              {searchQuery ? 'Boshqa kalit so\'zlarni sinab ko\'ring' : 'Tez orada yangi maqolalar qo\'shiladi'}
            </Typography>
          </Box>
        )}

        {/* Postlar Grid */}
        {!loading && filteredPosts.length > 0 && (
          <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => {
              const postId = post._id || post.id
              const imageUrl = post.image || '/sideBor/uy.jpeg'
              const isBase64 = imageUrl.startsWith('data:')

              return (
                <Link key={postId} href={`/posts/${postId}`} className="no-underline">
                  <Box
                    className={`group flex flex-col rounded-3xl overflow-hidden border h-full transition-all duration-500 hover:-translate-y-2 ${
                      mode === 'dark'
                        ? 'bg-[#111111] border-white/10 hover:border-blue-500/40 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.15)]'
                        : 'bg-white border-black/5 hover:border-blue-500/30 shadow-md hover:shadow-2xl'
                    }`}
                    sx={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`,
                      '@keyframes fadeInUp': {
                        from: { opacity: 0, transform: 'translateY(30px)' },
                        to: { opacity: 1, transform: 'translateY(0)' },
                      },
                    }}
                  >
                    {/* Rasm */}
                    <Box className="relative h-[220px] overflow-hidden">
                      {isBase64 ? (
                        <img
                          src={imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                      {/* Gradient overlay */}
                      <Box className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      {/* Kategoriya badge */}
                      <Box className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-lg">
                          {post.category}
                        </span>
                      </Box>
                    </Box>

                    {/* Ma'lumotlar */}
                    <Box className="flex flex-col flex-grow p-6">
                      {/* Sana va o'qish vaqti */}
                      <Box className="flex items-center gap-4 mb-3">
                        <Typography className={`text-xs flex items-center gap-1.5 ${mode === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                          <Calendar size={12} />
                          {post.publishDate ? formatDate(post.publishDate) : "Sana noma'lum"}
                        </Typography>
                        <Typography className={`text-xs flex items-center gap-1.5 ${mode === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                          <BookOpen size={12} />
                          {getReadTime(post.content)}
                        </Typography>
                      </Box>

                      {/* Sarlavha */}
                      <Typography
                        variant="h6"
                        className={`font-bold mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-blue-500 ${
                          mode === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}
                        sx={{ fontSize: '1.1rem', lineHeight: 1.4 }}
                      >
                        {post.title}
                      </Typography>

                      {/* Qisqa matn */}
                      <Typography
                        className={`text-sm mb-5 line-clamp-3 leading-relaxed flex-grow ${
                          mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {getExcerpt(post.content)}
                      </Typography>

                      {/* Pastki qism */}
                      <Box className="flex items-center justify-between mt-auto pt-4 border-t border-dashed" sx={{
                        borderColor: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
                      }}>
                        <Typography className={`text-xs flex items-center gap-1.5 ${mode === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                          <Eye size={14} />
                          {post.views || 0} ko'rish
                        </Typography>
                        <Box className="flex items-center gap-1.5 text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                          <span className="text-xs font-bold">O'qish</span>
                          <ArrowRight size={14} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              )
            })}
          </Box>
        )}

        {/* Natijalar soni */}
        {!loading && filteredPosts.length > 0 && (
          <Box className="text-center mt-12">
            <Typography className="text-gray-500 text-sm">
              Jami {filteredPosts.length} ta maqola topildi
            </Typography>
          </Box>
        )}
      </Container>

      <Footer />
    </Box>
  )
}
