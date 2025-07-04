import React from 'react'
import { Link } from 'react-router-dom'
import { Post } from '../types/Post'

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatReadTime = (minutes: number) => {
    return `${minutes} Min. Lesezeit`;
  };

  return (
    <article className="card">
      {/* Post Image */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={post.imageUrl}
          alt={post.title}
          className="card-image"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://via.placeholder.com/800x400/3182ce/ffffff?text=${encodeURIComponent(post.title.substring(0, 30))}`;
          }}
        />
        
        {/* Read Time Badge */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.75rem',
          fontWeight: '500'
        }}>
          {formatReadTime(post.readTime)}
        </div>
      </div>

      {/* Card Content */}
      <div className="card-content">
        {/* Tags */}
        <div className="tags">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="tag">
              +{post.tags.length - 3}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="card-title">
          <Link 
            to={`/posts/${post.id}`}
            style={{ 
              color: 'inherit', 
              textDecoration: 'none',
              display: 'block'
            }}
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="card-excerpt">
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="card-meta">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>{post.author}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>

        {/* Read More Button */}
        <div style={{ marginTop: '1.5rem' }}>
          <Link 
            to={`/posts/${post.id}`}
            className="btn btn-primary"
            style={{ width: '100%', textAlign: 'center' }}
          >
            Weiterlesen
          </Link>
        </div>
      </div>
    </article>
  )
}

export default PostCard 