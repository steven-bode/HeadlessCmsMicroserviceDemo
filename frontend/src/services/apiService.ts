import axios from 'axios';
import { Post, PostFilter, PostsResponse, PostDetailResponse } from '../types/Post';

// API-Basis-URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// Axios-Instanz konfigurieren
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request-Interceptor für Logging
apiClient.interceptors.request.use(
  (config) => {
          console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error(' API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response-Interceptor für Error-Handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(` API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(' API Response Error:', error.response?.data || error.message);
    
    // Custom Error-Messages
    if (error.response?.status === 404) {
      throw new Error('Ressource nicht gefunden');
    } else if (error.response?.status === 500) {
      throw new Error('Serverfehler - bitte versuchen Sie es später erneut');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Backend-Server ist nicht erreichbar');
    }
    
    throw error;
  }
);

export class ApiService {
  /**
   * Alle Blog Posts abrufen
   */
  async getPosts(filters: PostFilter = {}): Promise<PostsResponse> {
    const params = new URLSearchParams();
    
    // Filter-Parameter hinzufügen
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.tag) params.append('tag', filters.tag);
    if (filters.author) params.append('author', filters.author);
    if (filters.search) params.append('search', filters.search);

    const response = await apiClient.get<PostsResponse>(`/api/posts?${params}`);
    return response.data;
  }

  /**
   * Einzelnen Blog Post abrufen
   */
  async getPost(id: string): Promise<Post> {
    const response = await apiClient.get<PostDetailResponse>(`/api/posts/${id}`);
    return response.data.data;
  }

  /**
   * Posts nach Tag abrufen
   */
  async getPostsByTag(tag: string): Promise<Post[]> {
    const response = await apiClient.get<{ success: boolean; data: Post[] }>(`/api/posts/tag/${tag}`);
    return response.data.data;
  }

  /**
   * Health Check
   */
  async getHealth(): Promise<{ status: string; timestamp: string }> {
    const response = await apiClient.get('/health');
    return response.data;
  }

  /**
   * API-Statistiken abrufen
   */
  async getApiInfo(): Promise<any> {
    const response = await apiClient.get('/');
    return response.data;
  }
}

// Singleton-Instanz exportieren
export const apiService = new ApiService(); 