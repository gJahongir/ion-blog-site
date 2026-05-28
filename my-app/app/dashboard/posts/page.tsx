'use client';

import React from 'react';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useBlogStore } from '@/app/store/useBlogStore';

export default function DashboardPosts() {

  const router = useRouter();
  const { posts, deletePost, fetchPosts, loading } = useBlogStore();
  
  React.useEffect(() => {
    fetchPosts();
  }, []);

  function handleNewPost() {
    router.push('/dashboard/posts/new')
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Posts Management</h1>
          <p className="text-gray-400">Write, edit and publish your blog articles.</p>
        </div>
        <button 
          onClick={handleNewPost}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-2xl font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-95 group"
        >
          <Plus className="group-hover:rotate-90 transition-transform duration-300" size={20} />
          <span>New Article</span>
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Filter articles..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-12 pr-4 outline-none focus:border-blue-600/50"
            />
          </div>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-gray-300 hover:bg-white/10 transition-colors">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-white/5">
                <th className="px-6 py-4 font-medium">Article Title</th>
                <th className="px-6 py-4 font-medium">Views</th>
                <th className="px-6 py-4 font-medium">Publish Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-20 text-gray-500">Yuklanmoqda...</td>
                </tr>
              ) : posts.map((post) => (
                <tr key={post._id || post.id} className="hover:bg-white/2 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-white font-medium group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </span>
                      <span className="text-xs text-gray-500">{post.category}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-gray-400 text-sm">{post.views?.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {post.publishDate ? new Date(post.publishDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => deletePost(post._id || (post.id as string))}
                        className="p-2 text-gray-500 hover:text-rose-400 hover:bg-rose-400/5 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {posts.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              Hech qanday maqola topilmadi.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
