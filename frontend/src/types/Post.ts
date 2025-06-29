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
  success: boolean;
  data: Post[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters?: {
    tag: string | null;
    author: string | null;
    search: string | null;
  };
}

export interface PostDetailResponse {
  success: boolean;
  data: Post;
} 