'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Search, Bell, User, Home } from 'lucide-react';
import Link from 'next/link';
import { useColorMode } from '@/app/context/ThemeContext';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/projects': 'Projects',
  '/dashboard/posts': 'Posts',
  '/dashboard/users': 'Users',
  '/dashboard/settings': 'Settings',
};

export default function DashboardNavbar() {
  const pathname = usePathname();
  const { mode } = useColorMode();

  const currentTitle = pageTitles[pathname] || 'Dashboard';

  return (
    <header className={`h-16 backdrop-blur-xl border-b sticky top-0 z-40 px-8 flex items-center justify-between transition-all duration-300 ${
      mode === 'dark' 
        ? 'bg-[#0a0a0a]/80 border-white/5' 
        : 'bg-white/80 border-black/5 shadow-sm'
    }`}>
      {/* Chap tomon: Sahifa nomi */}
      <div className="flex items-center gap-4">
        <h2 className={`text-lg font-bold transition-colors ${
          mode === 'dark' ? 'text-white' : 'text-black'
        }`}>
          {currentTitle}
        </h2>
      </div>

      {/* O'ng tomon: Qidiruv, bildirishnoma, profil */}
      <div className="flex items-center gap-4">
        {/* Qidiruv */}
        <div className="relative group hidden md:block">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
            mode === 'dark' ? 'text-gray-500 group-focus-within:text-blue-400' : 'text-gray-400 group-focus-within:text-blue-600'
          }`} size={16} />
          <input 
            type="text" 
            placeholder="Qidirish..." 
            className={`w-56 border rounded-xl py-2 pl-10 pr-4 outline-none text-sm transition-all ${
              mode === 'dark' 
                ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-600/50 focus:bg-white/10' 
                : 'bg-black/[0.02] border-black/10 text-black placeholder:text-gray-400 focus:border-blue-600/50 focus:bg-white'
            }`}
          />
        </div>

        {/* Home ga qaytish */}
        <Link 
          href="/"
          className={`p-2 rounded-xl transition-all ${
            mode === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'
          }`}
          title="Bosh sahifaga qaytish"
        >
          <Home size={20} />
        </Link>

        {/* Bildirishnoma */}
        <button className={`relative p-2 rounded-xl transition-all ${
          mode === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-black/5'
        }`}>
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
        </button>
        
        {/* Ajratgich */}
        <div className={`h-8 w-px mx-1 ${mode === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}></div>

        {/* Profil */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className={`text-sm font-semibold transition-colors ${
              mode === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-black group-hover:text-blue-600'
            }`}>Admin</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center border-2 border-white/10 group-hover:border-blue-600/50 transition-all shadow-lg overflow-hidden">
            <User className="text-white" size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}
