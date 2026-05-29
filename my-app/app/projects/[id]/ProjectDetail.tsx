'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { Navbar, Footer } from '../../component'
import { Box, Typography, Container, Button } from '@mui/material'
import axiosIns, { projects } from '../../config/constant'
import { Project } from '../../types/types'
import Image from 'next/image'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const ProjectDetail = () => {
  const params = useParams()
  const id = params.id
  const [project, setProject] = React.useState<Project | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchProject = async () => {
      try {
        // Avval bekkentdan qidiramiz
        const response = await axiosIns.get(`/projects/${id}`)
        setProject(response.data)
      } catch (error) {
        console.error("API dan loyiha topilmadi, statikdan qidirilmoqda...")
        // API dan topilmasa, statik ma'lumotlardan qidirib ko'ramiz
        const staticProject = projects.find((p) => p.id.toString() === id)
        if (staticProject) {
          setProject(staticProject as unknown as Project)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [id])

  if (loading) {
    return (
      <Box className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <Typography>Yuklanmoqda...</Typography>
      </Box>
    )
  }

  if (!project) {
    return (
      <Box className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
        <Typography variant="h4">Loyiha topilmadi</Typography>
        <Link href="/projects" className="mt-4 text-blue-500 hover:underline">
          Loyihalarga qaytish
        </Link>
      </Box>
    )
  }

  // Rasm manzilini aniqlash (API dagi 'image' yoki statikdagi 'path')
  const imageUrl = project.image || project.path || '/placeholder.jpg';

  return (
    <Box className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      <Container maxWidth="lg" className="pt-32 pb-20">
        <Link href="/projects">
          <Button 
            startIcon={<ArrowBackIcon />} 
            className="text-gray-400 hover:text-white mb-8 normal-case"
          >
            Orqaga qaytish
          </Button>
        </Link>

        <Box className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Image Section */}
          <Box className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-white/10">
            <Image
              src={imageUrl}
              alt={project.name}
              fill
              className="object-cover"
            />
          </Box>

          {/* Details Section */}
          <Box>
            <Typography className="text-blue-500 font-bold uppercase tracking-widest mb-4">
              {project.category}
            </Typography>
            <Typography variant="h2" className="text-white font-bold mb-6">
              {project.name}
            </Typography>
            <Typography className="text-gray-400 text-lg leading-relaxed mb-8">
              {project.description}
            </Typography>

            <Box className="flex flex-wrap gap-2 mb-8">
              {project.tags?.map((tag) => (
                <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm">
                  #{tag}
                </span>
              ))}
            </Box>

            <Box className="p-8 bg-white/5 border border-white/10 rounded-3xl">
              <Typography className="text-white font-bold mb-4">Loyiha haqida ma'lumot</Typography>
              <Box className="space-y-4">
                <Box className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Mijoz:</span>
                  <span className="text-gray-300">Maxfiy</span>
                </Box>
                <Box className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Yil:</span>
                  <span className="text-gray-300">2024</span>
                </Box>
                <Box className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Manzil:</span>
                  <span className="text-gray-300">Toshkent, O'zbekiston</span>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  )
}

export default ProjectDetail
