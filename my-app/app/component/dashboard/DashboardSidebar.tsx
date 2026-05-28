'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useColorMode } from '@/app/context/ThemeContext';
import axiosIns from '@/app/config/constant';

const menuItems = [
  { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Projects', icon: FolderKanban, href: '/dashboard/projects' },
  { name: 'Posts', icon: FileText, href: '/dashboard/posts' },
  { name: 'Users', icon: Users, href: '/dashboard/users' },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { mode } = useColorMode();

  const handleLogout = async () => {
    try {
      await axiosIns.post('/auth/logout');
      localStorage.removeItem('adminToken');
      router.push('/');
    } catch (error) {
      console.error("Logoutda xato:", error);
      localStorage.removeItem('adminToken');
      router.push('/');
    }
  };

  return (
    <aside className={`fixed left-0 top-0 h-full w-64 backdrop-blur-xl border-r flex flex-col z-50 transition-all duration-500 ${
      mode === 'dark' ? 'bg-[#141414]/80 border-white/10' : 'bg-white/80 border-black/10 shadow-xl'
    }`}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <span className={`text-xl font-bold tracking-tight ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
            Admin<span className="text-blue-500">Panel</span>
          </span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-500 border border-blue-600/20' 
                    : (mode === 'dark' ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-black/5 hover:text-black')
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500'} />
                  <span className="font-medium">{item.name}</span>
                </div>
                {isActive && <ChevronRight size={16} />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className={`mt-auto p-6 border-t ${mode === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-rose-500 hover:bg-rose-500/5 rounded-xl transition-all duration-300"
        >
          <LogOut size={20} />
          <span className="font-medium">Chiqish</span>
        </button>
      </div>
    </aside>
  );
}
