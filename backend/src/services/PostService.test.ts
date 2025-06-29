import { PostService } from './PostService';

describe('PostService', () => {
  let postService: PostService;

  beforeEach(() => {
    postService = new PostService();
  });

  test('should load posts from JSON file', async () => {
    const result = await postService.getAllPosts();
    expect(result).toBeDefined();
    expect(result).toHaveProperty('posts');
    expect(Array.isArray(result.posts)).toBe(true);
    expect(result.posts.length).toBeGreaterThan(0);
  });

  test('should return paginated results', async () => {
    const result = await postService.getAllPosts({ page: 1, limit: 2 });
    expect(result).toHaveProperty('posts');
    expect(result).toHaveProperty('total');
    expect(result.posts.length).toBeLessThanOrEqual(2);
  });

  test('should filter posts by tag', async () => {
    const posts = await postService.getAllPosts({ tag: 'Technologie' });
    posts.posts.forEach(post => {
      expect(post.tags.some(tag => tag.includes('Technologie'))).toBe(true);
    });
  });

  test('should search posts by title', async () => {
    const posts = await postService.getAllPosts({ search: 'CMS' });
    posts.posts.forEach(post => {
      const titleMatches = post.title.toLowerCase().includes('cms');
      const excerptMatches = post.excerpt.toLowerCase().includes('cms');
      const contentMatches = post.content.toLowerCase().includes('cms');
      expect(titleMatches || excerptMatches || contentMatches).toBe(true);
    });
  });

  test('should get post by ID', async () => {
    const post = await postService.getPostById('1');
    expect(post).toBeDefined();
    expect(post?.id).toBe('1');
  });

  test('should return null for non-existent post ID', async () => {
    const post = await postService.getPostById('999');
    expect(post).toBeNull();
  });
}); 