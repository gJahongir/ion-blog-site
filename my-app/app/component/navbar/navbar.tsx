'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { navItems } from '@/app/config/constant'
import { Menu, X, Sun, Moon, LayoutDashboard, Lock, AlertCircle } from 'lucide-react'
import { useColorMode } from '@/app/context/ThemeContext'
import axiosIns from '@/app/config/constant'

/**
 * Navbar komponenti - To'liq dizayn va login tizimi bilan.
 */
const Navbar = () => {
    const router = useRouter();
    const { mode, toggleColorMode } = useColorMode();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    // Login holatlari
    const [openLogin, setOpenLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        
        // Tailwind dark class sinxronlash
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [mode]);

    /**
     * Dashboard tugmasi bosilganda
     */
    const handleDashboardClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        
        if (token && token !== 'undefined') {
            router.push('/dashboard');
        } else {
            setOpenLogin(true); // Login oynasini ko'rsatish
        }
    };

    /**
     * Tizimga kirish
     */
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || code.length !== 6) {
            setError('Login va 6 xonali kodni kiriting!');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axiosIns.post('/auth/login', { username, code });
            if (response.data.success) {
                localStorage.setItem('adminToken', response.data.token);
                setOpenLogin(false);
                window.location.href = '/dashboard';
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login yoki kod noto\'g\'ri!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled ? 'py-3' : 'py-6'
        }`}>
            <div className={`max-w-7xl mx-auto px-5 sm:px-6 lg:px-5 py-2 border border-white/10 shadow-md rounded-full bg-[#505050]/50 backdrop-blur-md transition-all duration-300`}>
                <div className="flex justify-between items-center">
                    {/* Logo va Linklar */}
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center group gap-3">
                            <div className="w-16 h-14 overflow-hidden rounded-xl shadow-lg transition-transform group-hover:scale-105">
                                <Image 
                                    src="/ion_main_logo.jpg" 
                                    alt="ION Logo" 
                                    width={100}
                                    height={100}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-white font-bold text-xl hidden lg:block tracking-tight">ION</span>
                        </Link>

                        {/* Desktop menyular */}
                        <div className="hidden md:flex items-center gap-2">
                            {navItems.map((item) => (
                                <Link 
                                    key={item.label} 
                                    href={item.routes}
                                    className="px-4 py-2 text-[15px] font-medium text-gray-300 hover:text-white transition-all rounded-lg hover:bg-white/5"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Rejimlar va Dashboard */}
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={toggleColorMode}
                            className="p-2.5 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-all"
                        >
                            {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button 
                            onClick={handleDashboardClick}
                            className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-xl text-sm font-bold hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </button>

                        <button 
                            className="md:hidden p-2.5 rounded-xl bg-white/5 text-gray-300"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobil menyu */}
            <div className={`md:hidden absolute top-full left-0 right-0 bg-[#505050] border-b border-white/10 overflow-hidden transition-all duration-500 ${
                mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="px-4 pt-4 pb-8 space-y-2">
                    {navItems.map((item) => (
                        <Link 
                            key={item.label} 
                            href={item.routes}
                            className="block px-4 py-4 rounded-xl text-lg font-semibold text-gray-300 hover:bg-white/5 hover:text-white"
                            onClick={() => setMobileOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <button 
                        onClick={handleDashboardClick}
                        className="flex items-center justify-center gap-3 w-full px-5 py-4 bg-white text-black rounded-2xl text-lg font-bold"
                    >
                        <LayoutDashboard size={22} />
                        Dashboard
                    </button>
                </div>
            </div>
        </nav>

        {/* Login Oynasi (Overlay) */}
        {openLogin && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                <div className="bg-[#1a1a1a] border border-white/10 w-full max-w-sm p-8 rounded-[35px] shadow-2xl relative animate-in zoom-in-95 duration-300">
                    <button onClick={() => setOpenLogin(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>

                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-600/10 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Lock size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Admin Kirish</h2>
                        <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest font-medium">Dashboard Himoyalangan</p>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] text-gray-500 ml-2 uppercase font-bold">Login</label>
                            <input 
                                type="text" 
                                placeholder="Masalan: admin.joxa" 
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-all"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] text-gray-500 ml-2 uppercase font-bold">Maxfiy Kod</label>
                            <input 
                                type="password" 
                                placeholder="0 0 0 0 0 0" 
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-center text-xl font-bold tracking-[0.5rem] outline-none focus:border-blue-500 transition-all"
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-rose-500 text-xs bg-rose-500/10 p-4 rounded-xl font-medium">
                                <AlertCircle size={16} />
                                <span>{error}</span>
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-100 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                        >
                            {loading ? 'Tekshirilmoqda...' : 'Kirish'}
                        </button>
                    </form>
                </div>
            </div>
        )}
        </>
    )
}

export default Navbar