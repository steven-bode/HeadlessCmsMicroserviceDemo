export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  imageUrl: string;
  readTime: number;
}

export interface PostFilter {
  page?: number;
  limit?: number;
  tag?: string;
  author?: string;
  search?: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  totalPages: number;
} 