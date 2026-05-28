'use client'
import React, { useState, useEffect } from 'react'
import { Box, Typography, Container, Skeleton } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import axiosIns from '../../config/constant'
import { Post } from '../../types/types'
import { useColorMode } from '../../context/ThemeContext'

/**
 * MainPagePosts — Bosh sahifada blog postlarini chiroyli kartochka ko'rinishida ko'rsatadi.
 * Ma'lumotlar bazasidan postlarni oladi va ularni grid formatda chiqaradi.
 */
export default function MainPagePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
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
  const getExcerpt = (content: string, maxLen = 120) => {
    if (!content) return ''
    if (content.length <= maxLen) return content
    return content.substring(0, maxLen).trim() + '...'
  }

  return (
    <Box
      className={`w-full py-20 transition-colors duration-500 ${
        mode === 'dark'
          ? 'bg-gradient-to-b from-transparent via-blue-900/5 to-transparent'
          : 'bg-gradient-to-b from-transparent via-blue-500/5 to-transparent'
      }`}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box className="mb-14 text-center">
          <Typography
            variant="overline"
            className="text-blue-500 font-bold tracking-[0.3em] text-sm mb-3 block"
          >
            BLOG
          </Typography>
          <Typography
            variant="h3"
            className={`font-bold tracking-tight transition-colors duration-300 ${
              mode === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
            sx={{ fontSize: { xs: '2rem', md: '2.8rem' } }}
          >
            So'nggi <span className="text-blue-500">Maqolalar</span>
          </Typography>
          <Typography
            className={`mt-4 text-lg max-w-2xl mx-auto transition-colors duration-300 ${
              mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Dizayn, arxitektura va interyer haqidagi eng so'nggi maqolalarimiz
          </Typography>
        </Box>

        {/* Loading Skeletons */}
        {loading && (
          <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Box
                key={i}
                className={`rounded-3xl overflow-hidden border transition-all duration-300 ${
                  mode === 'dark'
                    ? 'bg-white/5 border-white/10'
                    : 'bg-white border-black/5 shadow-lg'
                }`}
              >
                <Skeleton
                  variant="rectangular"
                  height={220}
                  sx={{
                    bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
                  }}
                />
                <Box className="p-6">
                  <Skeleton
                    width="40%"
                    height={20}
                    sx={{ bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)', mb: 1 }}
                  />
                  <Skeleton
                    width="90%"
                    height={28}
                    sx={{ bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)', mb: 1 }}
                  />
                  <Skeleton
                    width="100%"
                    height={16}
                    sx={{ bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }}
                  />
                  <Skeleton
                    width="70%"
                    height={16}
                    sx={{ bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Bo'sh holat */}
        {!loading && posts.length === 0 && (
          <Box
            className={`text-center py-32 rounded-3xl border border-dashed transition-all duration-300 ${
              mode === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
            }`}
          >
            <Typography className="text-5xl mb-4">📝</Typography>
            <Typography
              variant="h6"
              className={`font-semibold mb-2 ${
                mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Hozircha maqolalar yo'q
            </Typography>
            <Typography className="text-gray-500">
              Tez orada yangi maqolalar qo'shiladi
            </Typography>
          </Box>
        )}

        {/* Postlar Ro'yxati */}
        {!loading && posts.length > 0 && (
          <Box className="flex flex-col gap-8">
            {posts.map((post, index) => {
              const postId = post._id || post.id
              const imageUrl = post.image || '/sideBor/uy.jpeg'
              const isBase64 = imageUrl.startsWith('data:')

              return (
                <Link
                  key={postId}
                  href={`/posts/${postId}`}
                  className="no-underline"
                >
                  <Box
                    className={`group flex flex-col md:flex-row rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 ${
                      mode === 'dark'
                        ? 'bg-[#111111] border-white/10 hover:border-blue-500/40 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.15)]'
                        : 'bg-white border-black/5 hover:border-blue-500/30 shadow-lg hover:shadow-2xl'
                    }`}
                    sx={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.12}s both`,
                      '@keyframes fadeInUp': {
                        from: { opacity: 0, transform: 'translateY(30px)' },
                        to: { opacity: 1, transform: 'translateY(0)' },
                      },
                    }}
                  >
                    {/* Chap tomon — Rasm */}
                    <Box className="relative w-full md:w-[380px] lg:w-[440px] flex-shrink-0 h-[240px] md:h-auto md:min-h-[280px] overflow-hidden">
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
                          sizes="(max-width: 768px) 100vw, 440px"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                      {/* Gradient overlay */}
                      <Box
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          mode === 'dark'
                            ? 'bg-gradient-to-r from-transparent to-[#111111]/40 opacity-60'
                            : 'bg-gradient-to-r from-transparent to-white/30 opacity-40'
                        }`}
                      />
                    </Box>

                    {/* O'ng tomon — Maqola ma'lumotlari */}
                    <Box className="flex flex-col justify-center flex-grow p-6 md:p-8 lg:p-10">
                      {/* Kategoriya badge */}
                      <Box className="mb-3">
                        <Typography
                          component="span"
                          className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                          sx={{
                            backgroundColor:
                              mode === 'dark' ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)',
                            color: '#3b82f6',
                            border: '1px solid rgba(59,130,246,0.25)',
                          }}
                        >
                          {post.category}
                        </Typography>
                      </Box>

                      {/* Sarlavha */}
                      <Typography
                        variant="h5"
                        className={`font-bold mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-blue-500 ${
                          mode === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}
                        sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' }, lineHeight: 1.4 }}
                      >
                        {post.title}
                      </Typography>

                      {/* Qisqa matn */}
                      <Typography
                        className={`text-sm mb-5 line-clamp-3 leading-relaxed max-w-2xl ${
                          mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {getExcerpt(post.content, 200)}
                      </Typography>

                      {/* Pastki qism: sana, ko'rishlar, tugma */}
                      <Box className="flex items-center justify-between flex-wrap gap-4 mt-auto">
                        <Box className="flex items-center gap-4">
                          <Typography
                            className={`text-xs flex items-center gap-1.5 ${
                              mode === 'dark' ? 'text-gray-500' : 'text-gray-400'
                            }`}
                          >
                            <span>📅</span>
                            {post.publishDate ? formatDate(post.publishDate) : "Sana noma'lum"}
                          </Typography>
                          <Typography
                            className={`text-xs flex items-center gap-1.5 ${
                              mode === 'dark' ? 'text-gray-500' : 'text-gray-400'
                            }`}
                          >
                            <span>👁</span>
                            {post.views || 0} ko'rish
                          </Typography>
                        </Box>

                        <Box className="flex items-center gap-2">
                          <Box className="h-[2px] w-6 bg-blue-500 transition-all duration-300 group-hover:w-10" />
                          <Typography
                            className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 group-hover:text-blue-500 ${
                              mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            Batafsil o'qish →
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              )
            })}
          </Box>
        )}
      </Container>
    </Box>
  )
}