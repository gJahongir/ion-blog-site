import { create } from 'zustand';
import axiosIns from '../config/constant';
import { Project, Post } from '../types/types';

/**
 * BlogStore - Maqolalar va loyihalarni boshqarish uchun markaziy xotira.
 * Bu yerda bekkent bilan bog'lanish va ma'lumotlarni saqlash mantiqi joylashgan.
 */
interface BlogStore {
  posts: Post[];
  projects: Project[];
  loading: boolean;
  
  // Ma'lumotlarni bekkentdan yuklab olish
  fetchPosts: () => Promise<void>;
  fetchProjects: () => Promise<void>;
  
  // Yangi ma'lumot qo'shish
  addPost: (post: Partial<Post>) => Promise<void>;
  addProject: (project: Partial<Project>) => Promise<void>;
  
  // Ma'lumotlarni o'chirish
  deletePost: (id: string | number) => Promise<void>;
  deleteProject: (id: string | number) => Promise<void>;
}

export const useBlogStore = create<BlogStore>((set, get) => ({
  posts: [],
  projects: [],
  loading: false,

  /**
   * Barcha maqolalarni bekkentdan olish
   */
  fetchPosts: async () => {
    set({ loading: true });
    try {
      const response = await axiosIns.get('/posts');
      set({ posts: response.data });
    } catch (error) {
      console.error("Postlarni yuklashda xato:", error);
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Barcha loyihalarni bekkentdan olish
   */
  fetchProjects: async () => {
    set({ loading: true });
    try {
      const response = await axiosIns.get('/projects');
      set({ projects: response.data });
    } catch (error) {
      console.error("Loyihalarni yuklashda xato:", error);
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Yangi maqola qo'shish va bekkentga saqlash
   */
  addPost: async (postData) => {
    try {
      const response = await axiosIns.post('/posts', postData);
      // Yangi postni ro'yxatning boshiga qo'shish
      set((state) => ({ posts: [response.data, ...state.posts] }));
    } catch (error) {
      console.error("Post yaratishda xato:", error);
      throw error;
    }
  },

  /**
   * Yangi loyiha qo'shish va bekkentga saqlash
   */
  addProject: async (projectData) => {
    try {
      const response = await axiosIns.post('/projects', projectData);
      // Yangi loyihani ro'yxatning boshiga qo'shish
      set((state) => ({ projects: [response.data, ...state.projects] }));
    } catch (error) {
      console.error("Loyiha yaratishda xato:", error);
      throw error;
    }
  },

  /**
   * Maqolani o'chirish
   */
  deletePost: async (id) => {
    try {
      await axiosIns.delete(`/posts/${id}`);
      set((state) => ({ 
        posts: state.posts.filter(p => (p._id || p.id) !== id) 
      }));
    } catch (error) {
      console.error("Post o'chirishda xato:", error);
    }
  },

  /**
   * Loyihani o'chirish
   */
  deleteProject: async (id) => {
    try {
      await axiosIns.delete(`/projects/${id}`);
      set((state) => ({ 
        projects: state.projects.filter(p => (p._id || p.id) !== id) 
      }));
    } catch (error) {
      console.error("Loyiha o'chirishda xato:", error);
    }
  },
}));
