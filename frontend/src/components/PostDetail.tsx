import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiService } from '../services/apiService'
import { Post } from '../types/Post'

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const loadPost = async () => {
      try {
        setLoading(true)
        setError(null)
        const postData = await apiService.getPost(id)
        setPost(postData)
      } catch (err) {
        setError('Blog Post konnte nicht geladen werden')
        console.error('Error loading post:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatContent = (content: string) => {
    // Einfache Formatierung: Absätze durch \n\n trennen
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
        {paragraph}
      </p>
    ))
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="error">
        <h2>Fehler beim Laden</h2>
        <p>{error || 'Blog Post nicht gefunden'}</p>
        <Link to="/" className="btn btn-primary"        >
          Zurück zur Übersicht
        </Link>
      </div>
    )
  }

  return (
    <article style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Back Navigation */}
      <div style={{ marginBottom: '2rem' }}>
        <Link 
          to="/" 
          className="btn btn-secondary"
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          Zurück zur Übersicht
        </Link>
      </div>

      {/* Hero Image */}
      <div style={{ 
        marginBottom: '2rem',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <img
          src={post.imageUrl}
          alt={post.title}
          style={{
            width: '100%',
            height: '400px',
            objectFit: 'cover'
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://via.placeholder.com/800x400/3182ce/ffffff?text=${encodeURIComponent(post.title.substring(0, 30))}`;
          }}
        />
      </div>

      {/* Article Header */}
      <header style={{ marginBottom: '3rem' }}>
        {/* Tags */}
        <div className="tags" style={{ marginBottom: '1rem' }}>
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 style={{ 
          fontSize: '2.5rem',
          marginBottom: '1rem',
          lineHeight: '1.2',
          color: 'var(--color-gray-900)'
        }}>
          {post.title}
        </h1>

        {/* Excerpt */}
        <p style={{
          fontSize: '1.25rem',
          color: 'var(--color-gray-600)',
          marginBottom: '1.5rem',
          fontStyle: 'italic'
        }}>
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 0',
          borderTop: '1px solid var(--color-gray-200)',
          borderBottom: '1px solid var(--color-gray-200)',
          fontSize: '0.9rem',
          color: 'var(--color-gray-600)'
        }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <span><strong>{post.author}</strong></span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>{post.readTime} Min. Lesezeit</span>
          </div>
          
          {post.updatedAt !== post.publishedAt && (
            <div style={{ fontSize: '0.8rem' }}>
              Aktualisiert: {formatDate(post.updatedAt)}
            </div>
          )}
        </div>
      </header>

      {/* Article Content */}
      <div style={{
        fontSize: '1.1rem',
        lineHeight: '1.8',
        color: 'var(--color-gray-700)',
        marginBottom: '3rem'
      }}>
        {formatContent(post.content)}
      </div>

      {/* Article Footer */}
      <footer style={{
        borderTop: '2px solid var(--color-gray-200)',
        paddingTop: '2rem',
        textAlign: 'center'
      }}>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color-gray-600)' }}>
          Hat Ihnen dieser Artikel gefallen?
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link to="/" className="btn btn-primary">
            Weitere Artikel
          </Link>
          <a 
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Teilen
          </a>
        </div>
      </footer>
    </article>
  )
}

export default PostDetail 