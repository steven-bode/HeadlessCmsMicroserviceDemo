import { Router, Request, Response } from 'express';
import { PostService } from '../services/PostService';
import { Post } from '../types/Post';

const router = Router();
const postService = new PostService();

/**
 * GET /api/posts
 * Alle Blog Posts abrufen mit optionaler Filterung und Pagination
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { 
      page = '1', 
      limit = '10', 
      tag, 
      author,
      search 
    } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    // Validierung
    if (pageNum < 1 || limitNum < 1 || limitNum > 50) {
      return res.status(400).json({
        error: 'Ungültige Parameter',
        message: 'Page muss >= 1 sein, limit zwischen 1 und 50'
      });
    }

    const result = await postService.getAllPosts({
      page: pageNum,
      limit: limitNum,
      tag: tag as string,
      author: author as string,
      search: search as string
    });

    res.json({
      success: true,
      data: result.posts,
      pagination: {
        currentPage: pageNum,
        totalPages: result.totalPages,
        totalPosts: result.total,
        hasNext: pageNum < result.totalPages,
        hasPrev: pageNum > 1
      },
      filters: {
        tag: tag || null,
        author: author || null,
        search: search || null
      }
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der Posts:', error);
    res.status(500).json({
      error: 'Interner Serverfehler',
      message: 'Posts konnten nicht abgerufen werden'
    });
  }
});

/**
 * GET /api/posts/:id
 * Einzelnen Blog Post nach ID abrufen
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: 'Ungültige ID',
        message: 'Post-ID ist erforderlich'
      });
    }

    const post: Post | null = await postService.getPostById(id);

    if (!post) {
      return res.status(404).json({
        error: 'Post nicht gefunden',
        message: `Ein Post mit der ID "${id}" existiert nicht.`,
        suggestion: 'Überprüfen Sie die ID oder rufen Sie /api/posts für alle verfügbaren Posts auf.'
      });
    }

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Fehler beim Abrufen des Posts:', error);
    res.status(500).json({
      error: 'Interner Serverfehler',
      message: 'Post konnte nicht abgerufen werden'
    });
  }
});

/**
 * GET /api/posts/tag/:tag
 * Posts nach Tag filtern
 */
router.get('/tag/:tag', async (req: Request, res: Response) => {
  try {
    const { tag } = req.params;
    const posts = await postService.getPostsByTag(tag);

    res.json({
      success: true,
      data: posts,
      filter: { tag },
      count: posts.length
    });
  } catch (error) {
    console.error('Fehler beim Filtern nach Tag:', error);
    res.status(500).json({
      error: 'Interner Serverfehler',
      message: 'Posts konnten nicht gefiltert werden'
    });
  }
});

export { router as postsRouter }; 