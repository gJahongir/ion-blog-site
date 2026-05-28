'use client'
import React from 'react'
import { Box, Button } from '@mui/material'

interface ProjectFiltersProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <Box className="flex flex-wrap justify-center gap-3 mb-12">
      <Button
        onClick={() => onCategoryChange('Barchasi')}
        className={`px-6 py-2 rounded-full border transition-all duration-300 ${
          activeCategory === 'Barchasi'
            ? 'bg-blue-500 text-white border-blue-500'
            : 'text-gray-400 border-white/10 hover:border-blue-500/50'
        }`}
        sx={{ textTransform: 'none', borderRadius: '9999px' }}
      >
        Barchasi
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-full border transition-all duration-300 ${
            activeCategory === category
              ? 'bg-blue-500 text-white border-blue-500'
              : 'text-gray-400 border-white/10 hover:border-blue-500/50'
          }`}
          sx={{ textTransform: 'none', borderRadius: '9999px' }}
        >
          {category}
        </Button>
      ))}
    </Box>
  )
}

export default ProjectFilters
