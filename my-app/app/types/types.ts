export interface Project {
  id?: string | number;
  _id?: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  path?: string;
  status?: string;
  dateCreated?: string;
  tags?: string[];
}

export interface Post {
  id?: string | number;
  _id?: string;
  title: string;
  category: string;
  content: string;
  image?: string;
  views: number;
  publishDate: string;
}
