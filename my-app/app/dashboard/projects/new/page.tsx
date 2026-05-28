'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Send, 
  Image as ImageIcon, 
  Type, 
  Tag, 
  Layers,
  Globe,
  Upload,
  X
} from 'lucide-react';

import { useBlogStore } from '@/app/store/useBlogStore';
import { sidebarCategories } from '@/app/config/constant';

export default function NewProjectPage() {
  const router = useRouter();
  const { addProject } = useBlogStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form holatlari
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(''); // Rasm URL yoki Base64
  const [projectUrl, setProjectUrl] = useState('');
  const [clientName, setClientName] = useState('');

  /**
   * Kompyuterdan rasm tanlanganda ishlaydi
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Rasmni Base64 formatiga o'tkazib state'ga saqlash
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Ma'lumotlarni saqlash
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category) {
      alert("Iltimos loyiha nomi va kategoriyasini kiriting!");
      return;
    }
    
    try {
      await addProject({
        name,
        category,
        description,
        image,
        // Bu yerda qo'shimcha maydonlarni ham yuborishingiz mumkin (backendda modelni yangilash kerak bo'ladi)
      });
      router.push('/dashboard/projects');
    } catch (error) {
      alert("Xatolik yuz berdi!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Yangi loyiha qo'shish</h1>
            <p className="text-gray-400 text-sm">Portfolio uchun eng yaxshi ishlaringizni joylang.</p>
          </div>
        </div>
        
        <button 
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <Send size={18} />
          <span>Saqlash</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
            {/* Loyiha nomi */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Type size={14} /> Loyiha nomi
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masalan: Zamonaviy Ofis Dizayni"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xl font-bold text-white outline-none focus:border-blue-600/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
              />
            </div>

            {/* Rasm yuklash qismi */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <ImageIcon size={14} /> Loyiha rasmi
              </label>
              
              <div className="flex flex-col gap-4">
                {/* URL orqali rasm qo'shish */}
                <input 
                  type="text" 
                  value={image.startsWith('data:') ? '' : image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Rasm URL manzilini qo'ying (https://...)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-gray-200 outline-none focus:border-blue-600/50"
                />

                <div className="text-center text-gray-600 text-xs">YOKI</div>

                {/* Kompyuterdan yuklash */}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                
                {image ? (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setImage('')}
                      className="absolute top-2 right-2 p-2 bg-black/60 hover:bg-rose-600 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative aspect-video rounded-2xl bg-white/5 border-2 border-dashed border-white/10 flex flex-col items-center justify-center group cursor-pointer hover:border-blue-600/50 hover:bg-white/10 transition-all"
                  >
                    <Upload size={32} className="text-gray-600 mb-2 group-hover:text-blue-400 group-hover:scale-110 transition-all" />
                    <p className="text-sm text-gray-500">Kompyuterdan rasm tanlash</p>
                    <p className="text-xs text-gray-600 mt-1">PNG, JPG (max. 5MB)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tavsif */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Layers size={14} /> Loyiha haqida batafsil
              </label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Loyiha tafsilotlari, ishlatilgan materiallar va dizayn uslubi haqida yozing..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[200px] text-gray-200 leading-relaxed outline-none focus:border-blue-600/50 focus:bg-white/10 transition-all resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Sidebar sozlamalari */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Tag size={18} className="text-blue-400" /> Qo'shimcha ma'lumotlar
            </h3>
            
            {/* Kategoriya tanlash */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Kategoriya</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-gray-300 outline-none focus:border-blue-600/50 cursor-pointer"
              >
                <option value="" className="bg-[#1a1a1a]">Kategoriyani tanlang</option>
                {sidebarCategories.map((group) => (
                  <optgroup key={group.title} label={group.title} className="bg-[#1a1a1a] text-blue-400">
                    {group.items.map((item) => (
                      <option key={item} value={item} className="bg-[#1a1a1a] text-gray-300">
                        {item}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Project URL */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Loyiha havolasi (Project URL)</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
                <input 
                  type="text" 
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  placeholder="https://behance.net/..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-sm text-gray-300 outline-none focus:border-blue-600/50"
                />
              </div>
              <p className="text-[10px] text-gray-600">Loyiha onlayn ko'rinishda bo'lsa havolasini kiriting.</p>
            </div>

            {/* Mijoz nomi */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Mijoz nomi</label>
              <input 
                type="text" 
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Masalan: Alisher Valiyev"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-gray-300 outline-none focus:border-blue-600/50"
              />
            </div>
          </div>

          <div className="bg-blue-600/10 border border-blue-600/20 rounded-3xl p-6">
            <h4 className="text-blue-400 font-bold mb-2">Eslatma</h4>
            <p className="text-xs text-blue-300/70 leading-relaxed">
              Loyiha saqlangandan so'ng u darhol asosiy "Loyihalar" sahifasida barcha foydalanuvchilarga ko'rinadi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
