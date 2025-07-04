import React, { useState, useEffect, useCallback } from 'react'
// Link import entfernt da nicht verwendet
import { apiService } from '../services/apiService'
import { Post } from '../types/Post'
import PostCard from './PostCard'
import SearchFilter from './SearchFilter'
import Pagination from './Pagination'

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    search: '',
    tag: '',
    author: '',
    page: 1,
    limit: 6
  })
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    hasNext: false,
    hasPrev: false
  })

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiService.getPosts(filters)
      setPosts(response.data)
      setPagination(response.pagination)
    } catch (err) {
      setError('Fehler beim Laden der Blog Posts')
      console.error('Error loading posts:', err)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    loadPosts()
  }, [filters, loadPosts])

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1 // Reset to first page when filters change
    }))
  }

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading && posts.length === 0) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        textAlign: 'center', 
        marginBottom: '3rem',
        padding: '2rem 0'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          API-First Headless CMS
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--color-gray-800)',
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          Moderne Content-Architektur mit React Frontend und Node.js API. 
          Demonstriert Microservice-Prinzipien und API-First Development.
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a 
            href="http://localhost:3001/api/posts" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            API Explorer
          </a>
          <a 
            href="https://github.com/steven-bode/HeadlessCmsMicroserviceDemo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Source Code
          </a>
        </div>
      </section>

      {/* Search & Filter */}
      <SearchFilter 
        filters={filters}
        onFilterChange={handleFilterChange}
        totalPosts={pagination.totalPosts}
      />

      {/* Error State */}
      {error && (
        <div className="error">
          <p>{error}</p>
          <button 
            onClick={loadPosts}
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
          >
            Erneut versuchen
          </button>
        </div>
      )}

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <>
          <div className="posts-grid">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              hasNext={pagination.hasNext}
              hasPrev={pagination.hasPrev}
            />
          )}
        </>
      ) : !loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem 0',
          color: 'var(--color-gray-800)'
        }}>
          <h3>Keine Posts gefunden</h3>
          <p>Versuchen Sie es mit anderen Suchkriterien.</p>
        </div>
      )}

      {/* Loading Indicator for Pagination */}
      {loading && posts.length > 0 && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  )
}

export default PostList 