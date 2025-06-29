import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { postsRouter } from './routes/posts';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Sicherheits-Headers
app.use(compression()); // Gzip-Komprimierung
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Health Check Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'headless-cms-backend',
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/posts', postsRouter);

// Root endpoint mit API-Dokumentation
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Headless CMS API',
    version: '1.0.0',
    endpoints: {
      'GET /health': 'Health check',
      'GET /api/posts': 'Alle Blog Posts abrufen',
      'GET /api/posts/:id': 'Einzelnen Blog Post abrufen'
    },
    documentation: 'https://github.com/stevenbode/headless-cms-microservice-demo',
    author: 'Steven Bode'
  });
});

// 404 Handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Endpoint nicht gefunden',
    message: `Die Route ${req.originalUrl} existiert nicht.`,
    availableEndpoints: ['/health', '/api/posts', '/api/posts/:id']
  });
});

// Error Handler (muss als letztes Middleware definiert werden)
app.use(errorHandler);

// Server starten
app.listen(PORT, () => {
  console.log(`Headless CMS Backend läuft auf Port ${PORT}`);
  console.log(`API-Dokumentation: http://localhost:${PORT}`);
  console.log(`Health Check: http://localhost:${PORT}/health`);
  console.log(`Posts API: http://localhost:${PORT}/api/posts`);
});

export default app; 