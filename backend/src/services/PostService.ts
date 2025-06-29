import { readFileSync } from 'fs';
import { join } from 'path';
import { Post, PostFilter, PostsResponse } from '../types/Post';

export class PostService {
  private posts: Post[] = [];

  constructor() {
    this.loadPosts();
  }

  /**
   * Lädt die Posts aus der JSON-Datei
   */
  private loadPosts(): void {
    try {
      const postsPath = join(__dirname, '../../content/posts.json');
      const postsData = readFileSync(postsPath, 'utf-8');
      this.posts = JSON.parse(postsData);
      console.log(` ${this.posts.length} Blog Posts erfolgreich geladen`);
    } catch (error) {
      console.error(' Fehler beim Laden der Posts:', error);
      this.posts = [];
    }
  }

  /**
   * Gibt alle Posts mit optionaler Filterung und Pagination zurück
   */
  async getAllPosts(filter: PostFilter = {}): Promise<PostsResponse> {
    let filteredPosts = [...this.posts];

    // Nach Tag filtern
    if (filter.tag) {
      filteredPosts = filteredPosts.filter(post => 
        post.tags.some(tag => 
          tag.toLowerCase().includes(filter.tag!.toLowerCase())
        )
      );
    }

    // Nach Autor filtern
    if (filter.author) {
      filteredPosts = filteredPosts.filter(post => 
        post.author.toLowerCase().includes(filter.author!.toLowerCase())
      );
    }

    // Volltextsuche
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.author.toLowerCase().includes(searchTerm)
      );
    }

    // Sortierung nach Datum (neueste zuerst)
    filteredPosts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Pagination
    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredPosts.length / limit);

    return {
      posts: paginatedPosts,
      total: filteredPosts.length,
      totalPages
    };
  }

  /**
   * Gibt einen einzelnen Post nach ID zurück
   */
  async getPostById(id: string): Promise<Post | null> {
    const post = this.posts.find(p => p.id === id);
    return post || null;
  }

  /**
   * Gibt alle Posts mit einem bestimmten Tag zurück
   */
  async getPostsByTag(tag: string): Promise<Post[]> {
    return this.posts.filter(post => 
      post.tags.some(postTag => 
        postTag.toLowerCase().includes(tag.toLowerCase())
      )
    );
  }

  /**
   * Gibt alle verfügbaren Tags zurück
   */
  async getAllTags(): Promise<string[]> {
    const tagSet = new Set<string>();
    this.posts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }

  /**
   * Gibt alle verfügbaren Autoren zurück
   */
  async getAllAuthors(): Promise<string[]> {
    const authorSet = new Set<string>();
    this.posts.forEach(post => authorSet.add(post.author));
    return Array.from(authorSet).sort();
  }
} 