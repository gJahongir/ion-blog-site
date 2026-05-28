'use client'
import React from 'react'
import Image from 'next/image'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { Project } from '@/app/types/types'
import { useColorMode } from '@/app/context/ThemeContext'

/**
 * ProjectCard komponenti - loyihalarni chiroyli kartochka ko'rinishida ko'rsatadi.
 */
interface ProjectCardProps {
  project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { mode } = useColorMode();

  const imageUrl = project.image || project.path || '/placeholder.jpg';
  const projectId = project._id || project.id;

  return (
    <Box className={`group relative w-full h-[400px] rounded-3xl overflow-hidden border transition-all duration-500 shadow-xl ${
      mode === 'dark' ? 'border-white/10 hover:border-blue-500/50 bg-[#1a1a1a]' : 'border-black/10 hover:border-blue-500/50 bg-gray-100'
    }`}>
      {/* Loyiha rasmi */}
      <Image
        src={imageUrl}
        alt={project.name || "Loyiha rasmi"}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        priority={false}
      />
      
      {/* Rasm ustidagi gradient qatlami (matn ko'rinishi uchun - hamisha to'q bo'lishi maqsadga muvofiq) */}
      <Link href={`/projects/${projectId}`}  className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Ma'lumotlar qismi */}
      <Box className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
        {/* Kategoriya nomi */}
        <Typography variant="overline" className="text-blue-500 font-bold tracking-widest mb-2 block">
          {project.category}
        </Typography>

        {/* Loyiha nomi */}
        <Typography variant="h5" className="text-white font-bold mb-2 group-hover:text-blue-400 transition-colors">
          {project.name}
        </Typography>

        {/* Loyiha tavsifi */}
        <Typography className="text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          {project.description}
        </Typography>
        
        {/* "Batafsil" tugmasi */}
        <Box className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <Box className="h-[2px] w-8 bg-blue-500" />
          <Link 
            href={`/projects/${projectId}`} 
            className="text-white text-xs font-medium cursor-pointer hover:text-blue-400 uppercase tracking-tighter"
          >
            Batafsil ko'rish
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectCard
