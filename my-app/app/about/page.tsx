'use client'

import React from 'react'
import { Navbar, Footer } from '../component'
import { 
    Code2, 
    Cpu, 
    Globe, 
    Layers, 
    Palette, 
    Rocket, 
    Terminal, 
    User,

    ExternalLink
} from 'lucide-react'
import { useRouter } from 'next/navigation'

// Custom brand icons since they were removed from lucide-react v1.0

const Twitter = ({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
)

const Linkedin = ({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
)
import Image from 'next/image'

const AboutPage = () => {
    const router = useRouter()
    
    // push the telegram
    const handleContactClick = () => {
        router.push('https://t.me/joxaprogram')
    }
    const techStack = [
        { name: 'Next.js 14', icon: <Rocket className="w-6 h-6 text-blue-500" />, desc: 'Zamonaviy web ilovalar uchun framework' },
        { name: 'Material UI', icon: <Code2 className="w-6 h-6 text-cyan-400" />, desc: 'UI componentalar' },
        { name: 'Tailwind CSS', icon: <Palette className="w-6 h-6 text-sky-400" />, desc: 'Tezkor stillash uchun framework' },
        { name: 'Node.js & Express', icon: <Terminal className="w-6 h-6 text-green-500" />, desc: 'Backend server dvigitli' },
        { name: 'MongoDB', icon: <Layers className="w-6 h-6 text-emerald-500" />, desc: 'NoSQL ma`lumotlar ombori' },
        { name: 'Lucide React', icon: <Cpu className="w-6 h-6 text-indigo-500" />, desc: 'Chryli icon lar' },
    ]

    return (
        <div className="min-h-screen bg-white dark:bg-[#121212] transition-colors duration-500">
            <Navbar />
            
            <main className="pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto space-y-24">
                    
                    {/* Hero Section */}
                    <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 border border-black/5 dark:border-white/5 p-8 md:p-16">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] -z-10" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] -z-10" />
                        
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[35px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-[30px] overflow-hidden border-2 border-white/20 shadow-2xl">
                                    <Image 
                                        src="/ion_main_logo.jpg" 
                                        alt="Developer" 
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex-1 text-center md:text-left space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold tracking-wide uppercase">
                                    <User size={16} />
                                    <span>Dasturchi haqida</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white leading-tight">
                                    Salom, Men <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Jahongir Gulmirzayev</span>
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl font-medium leading-relaxed">
                                    Full-stack dasturchiman. Men murakkab muammolarni oddiy va chiroyli yechimlarga aylantirishni yaxshi ko'raman. 
                                    Ushbu blog loyihasi mening tajribam va ishlatilgan zamonaviy texnologiyalarni namoyish etish uchun yaratilgan.
                                </p>
                                
                                <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
                                    <button onClick={handleContactClick} className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl">
                                        Bog'lanish
                                    </button>
                                    <div className="flex gap-2">
                                        {[Twitter, Linkedin].map((Icon, i) => (
                                            <button   key={i} className="p-4 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all">
                                                <Icon size={20} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Tech Stack Section */}
                    <section className="space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">Ishlatilgan Texnologiyalar</h2>
                            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                                Loyihada eng so'nggi va samarali vositalardan foydalanilgan.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {techStack.map((tech, index) => (
                                <div 
                                    key={index}
                                    className="group p-8 rounded-[32px] bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/10 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                        {tech.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-black dark:text-white mb-2">{tech.name}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                        {tech.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Project Goals */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white leading-tight">
                                Loyihaning Maqsadi va <br />
                                <span className="text-blue-600">Kelajakdagi Rejalar</span>
                            </h2>
                            <div className="space-y-6">
                                {[
                                    { title: 'Tezlik va Samaradorlik', desc: 'Next.js Server Side Rendering (SSR) orqali maksimal tezlik.' },
                                    { title: 'Zamonaviy Dizayn', desc: 'Foydalanuvchi uchun qulay va ko\'zga yoqimli interfeys.' },
                                    { title: 'Xavfsiz Boshqaruv', desc: 'Admin panel orqali postlarni to\'liq nazorat qilish.' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                                            <div className="w-2 h-2 rounded-full bg-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-black dark:text-white">{item.title}</h4>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-square md:aspect-video bg-gradient-to-br from-blue-600 to-purple-600 rounded-[40px] overflow-hidden shadow-2xl group">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Globe className="w-32 h-32 text-white/20 animate-pulse" />
                            </div>
                            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                                <p className="text-white font-medium text-sm">
                                    "Dasturlash - bu san'at, biz esa uning rassomlarimiz. Har bir kod qatori dunyoni biroz bo'lsa-da o'zgartira oladi."
                                </p>
                            </div>
                        </div>
                    </section>

                </div>
            </main>

            <Footer />
        </div>
    )
}

export default AboutPage
