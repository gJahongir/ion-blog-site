'use client'
import React from 'react'
import { Box, Typography, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material'
import { sidebarCategories } from '../../config/constant'
import { useColorMode } from '../../context/ThemeContext'

interface ProjectSidebarProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ activeFilter, onFilterChange }) => {
  const { mode } = useColorMode();

  return (
    <Box className={`w-full md:w-64 flex-shrink-0 backdrop-blur-xl rounded-3xl border p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar transition-all duration-300 ${
      mode === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10 shadow-sm'
    }`}>
      <Typography 
        variant="h6" 
        className={`font-bold mb-6 flex items-center gap-2 transition-colors duration-300 ${
          mode === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
      >
        <span className="w-2 h-6 bg-blue-500 rounded-full" />
        Kategoriyalar
      </Typography>

      <List component="nav" className="p-0">
        <ListItem disablePadding className="mb-2">
          <ListItemButton
            onClick={() => onFilterChange('Barchasi')}
            className={`rounded-xl transition-all duration-300 ${
              activeFilter === 'Barchasi' 
                ? 'bg-blue-500/20 text-blue-500' 
                : (mode === 'dark' ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-black/5')
            }`}
          >
            <ListItemText 
              primary={
                <Typography variant="body1" sx={{ fontWeight: activeFilter === 'Barchasi' ? 700 : 400 }}>
                  Barchasi
                </Typography>
              } 
            />
          </ListItemButton>
        </ListItem>

        {sidebarCategories.map((group, groupIdx) => (
          <React.Fragment key={group.title}>
            <Divider className={`my-4 transition-colors duration-300 ${mode === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} />
            <Typography className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2 ml-4">
              {group.title}
            </Typography>
            {group.items.map((item) => (
              <ListItem key={item} disablePadding className="mb-1">
                <ListItemButton
                  onClick={() => onFilterChange(item)}
                  className={`rounded-xl transition-all duration-300 ${
                    activeFilter === item 
                      ? 'bg-blue-500/20 text-blue-500 border-l-4 border-blue-500' 
                      : (mode === 'dark' ? 'text-gray-400 hover:bg-white/5 border-l-4 border-transparent' : 'text-gray-600 hover:bg-black/5 border-l-4 border-transparent')
                  }`}
                >
                  <ListItemText 
                    primary={
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontSize: '0.9rem',
                          fontWeight: activeFilter === item ? 600 : 400 
                        }}
                      >
                        {item}
                      </Typography>
                    } 
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </React.Fragment>
        ))}
      </List>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </Box>
  )
}

export default ProjectSidebar
