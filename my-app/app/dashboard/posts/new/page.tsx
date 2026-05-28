'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Type, 
  Tag, 
  Eye, 
  Send 
} from 'lucide-react';
import { useBlogStore } from '@/app/store/useBlogStore';

export default function NewPostPage() {
  const router = useRouter();
  const { addPost } = useBlogStore();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [isDraft, setIsDraft] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category) {
      alert("Iltimos sarlavha va kategoriyani tanlang!");
      return;
    }
    
    addPost({
      title,
      category,
      content,
      image: imagePreview || undefined,
    });
    
    router.push('/dashboard/posts');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

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
            <h1 className="text-3xl font-bold text-white">Yangi Post Yaratsh</h1>
            <p className="text-gray-400 text-sm">taza maqola yaratuv.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDraft(!isDraft)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
              isDraft 
                ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' 
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            }`}
          >
            {isDraft ? 'Draft Mode' : 'Ready to Publish'}
          </button>
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <Send size={18} />
            <span>Chop qiluv</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Type size={14} /> Post Mavzusi
              </label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Mavzuni yozing"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xl font-bold text-white outline-none focus:border-blue-600/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <ImageIcon size={14} /> rasmni kiriting
              </label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative aspect-video rounded-2xl bg-white/5 border-2 border-dashed border-white/10 flex flex-col items-center justify-center group cursor-pointer hover:border-blue-600/50 hover:bg-white/10 transition-all overflow-hidden"
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white font-medium flex items-center gap-2">
                        <ImageIcon size={20} /> Rasmni o'zgartirish
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 rounded-full bg-white/5 text-gray-500 group-hover:scale-110 group-hover:text-blue-400 transition-all">
                      <ImageIcon size={32} />
                    </div>
                    <p className="mt-4 text-sm text-gray-500 font-medium">Click to upload or drag & drop</p>
                    <p className="text-xs text-gray-600 mt-1">PNG, JPG or WebP (max. 5MB)</p>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <FileText size={14} /> Content
              </label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your story..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[400px] text-gray-200 leading-relaxed outline-none focus:border-blue-600/50 focus:bg-white/10 transition-all resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Tag size={18} className="text-blue-400" /> Settings
            </h3>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-gray-300 outline-none focus:border-blue-600/50"
              >
                <option value="">Select Category</option>
                <option value="design">Design</option>
                <option value="tech">Technology</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="news">News</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</label>
              <input 
                type="text" 
                placeholder="Add tags separated by comma..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-gray-300 outline-none focus:border-blue-600/50"
              />
            </div>

            <div className="pt-4 border-t border-white/5">
              <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/10 text-sm font-semibold">
                <Eye size={16} />
                Preview Post
              </button>
            </div>
          </div>

          <div className="bg-blue-600/10 border border-blue-600/20 rounded-3xl p-6">
            <h4 className="text-blue-400 font-bold mb-2">Publishing Tip</h4>
            <p className="text-xs text-blue-300/70 leading-relaxed">
              Make sure to use high-quality images and a compelling title to increase engagement. Don't forget to add relevant tags!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileText({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}