'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import DashboardSidebar from '../component/dashboard/DashboardSidebar';
import DashboardNavbar from '../component/dashboard/DashboardNavbar';
import { useColorMode } from '../context/ThemeContext';
import { Box, Typography, CircularProgress } from '@mui/material';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { mode } = useColorMode();

  const [status, setStatus] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    // Login sahifasida bo'lsa — har doim ko'rsat
    if (pathname === '/dashboard/login') {
      setStatus('authorized');
      return;
    }

    // Token tekshiruvi
    if (!token) {
      setStatus('unauthorized');
      router.replace('/dashboard/login');
    } else {
      setStatus('authorized');
    }
  }, [pathname, router]);

  // Yuklanish holati
  if (status === 'loading') {
    return (
      <Box className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        mode === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'
      }`}>
        <Box className="text-center space-y-4">
          <CircularProgress size={40} sx={{ color: '#3b82f6' }} />
          <Typography className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Xavfsizlik tekshirilmoqda...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Unauthorized — login ga yo'naltirish
  if (status === 'unauthorized') {
    return (
      <Box className={`min-h-screen flex items-center justify-center ${
        mode === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'
      }`}>
        <Box className="text-center space-y-4">
          <CircularProgress size={40} sx={{ color: '#3b82f6' }} />
          <Typography className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Login sahifasiga yo'naltirilmoqda...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Login sahifasi uchun — sidebar va navbar ko'rsatma
  if (pathname === '/dashboard/login') {
    return <>{children}</>;
  }

  // Dashboard sahifalari uchun to'liq layout
  return (
    <Box className={`min-h-screen transition-colors duration-300 ${
      mode === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'
    }`}>
      <DashboardSidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <DashboardNavbar />
        <main className={`p-8 pt-8 flex-1 overflow-y-auto`}>
          {children}
        </main>
      </div>
    </Box>
  );
}