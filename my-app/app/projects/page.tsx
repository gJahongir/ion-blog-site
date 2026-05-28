'use client'
import React, { useState } from 'react'
import { Navbar, Footer, ProjectCard, ProjectSidebar } from '../component'
import { Box, Typography, Container, TextField } from '@mui/material'
import axiosIns, { projects }  from '../config/constant'
import { Project } from '../types/types'
import { useColorMode } from '../context/ThemeContext'

function Projects() {
  const [activeFilter, setActiveFilter] = useState('Barchasi')
  const [searchTerm, setSearchTerm] = useState('')
  const [apiProjects, setApiProjects] = useState<Project[]>([])
  const { mode } = useColorMode();

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosIns.get('/projects')
        setApiProjects(response.data)
      } catch (error) {
        console.error("Loyiha yuklashda xato:", error)
        setApiProjects(projects)
      }
    }
    fetchProjects()
  }, [])

  const filteredProjects = apiProjects.filter((p) => {
    const matchesFilter = activeFilter === 'Barchasi' 
      ? true 
      : (p.tags?.includes(activeFilter) || p.category === activeFilter);
    
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  })

  return (
    <Box className="min-h-screen bg-[var(--background)] transition-colors duration-300">
      <Navbar />
      
      {/* Hero Section */}
      <Box className={`pt-32 pb-10 transition-all duration-500 ${
        mode === 'dark' ? 'bg-gradient-to-b from-blue-900/10 to-transparent' : 'bg-gradient-to-b from-blue-500/5 to-transparent'
      }`}>
        <Container maxWidth="xl">
          <Box className="mb-10 gap-5 text-left px-4">
            <Typography 
              variant="h2" 
              className={`font-bold mb-4 tracking-tight transition-colors duration-300 ${
                mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
              sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
            >
              Bizning <span className="text-blue-500">Loyihalarimiz</span>
            </Typography>
            <Typography className={`text-lg mb-3 max-w-2xl transition-colors duration-300 ${
              mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Interyer va exteryer dizayn sohasidagi eng sara ishlarimiz jamlanmasi. 
              Sizga mos keladigan uslubni tanlang.
            </Typography>
            
            {/* Search Input */}
            <TextField 
              id="outlined-basic" 
              label="Qidirish" 
              variant="outlined" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              className='w-full max-w-2xl'
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: mode === 'dark' ? 'white' : 'black',
                  backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                  '& fieldset': { borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
                  '&:hover fieldset': { borderColor: mode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' },
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                },
                '& .MuiInputLabel-root': { color: mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' },
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxWidth="xl" className="pb-32">
        <Box className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <ProjectSidebar 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />

          {/* Grid Area */}
          <Box className="flex-grow">
            <Box className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Box key={project._id || project.id} className="transition-all duration-700 ease-in-out">
                  <ProjectCard project={project} />
                </Box>
              ))}
            </Box>
            
            {filteredProjects.length === 0 && (
              <Box className={`text-center py-40 rounded-3xl border border-dashed transition-all duration-300 ${
                mode === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
              }`}>
                <Typography className="text-gray-500 text-xl italic">
                  Qidiruv bo'yicha hech narsa topilmadi.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  )
}

export default Projects