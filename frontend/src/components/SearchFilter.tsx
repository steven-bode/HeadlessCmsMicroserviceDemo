import React, { useState } from 'react'

interface SearchFilterProps {
  filters: {
    search: string;
    tag: string;
    author: string;
    page: number;
    limit: number;
  };
  onFilterChange: (filters: Partial<SearchFilterProps['filters']>) => void;
  totalPosts: number;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ 
  filters, 
  onFilterChange, 
  totalPosts 
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onFilterChange({ search: value })
  }

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onFilterChange({ tag: value })
  }

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onFilterChange({ author: value })
  }

  const clearFilters = () => {
    onFilterChange({ search: '', tag: '', author: '' })
  }

  const hasActiveFilters = filters.search || filters.tag || filters.author

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)',
      marginBottom: '2rem'
    }}>
      {/* Header mit Statistiken */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <div>
          <h3 style={{ margin: 0, color: 'var(--color-gray-800)' }}>
            Blog Posts durchsuchen
          </h3>
          <p style={{ 
            margin: '0.25rem 0 0 0', 
            color: 'var(--color-gray-800)',
            fontSize: '0.9rem'
          }}>
            {totalPosts} Artikel verfügbar
          </p>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn btn-secondary"
          style={{ fontSize: '0.875rem' }}
        >
          {isExpanded ? 'Weniger' : 'Erweiterte Suche'}
        </button>
      </div>

      {/* Hauptsuchfeld */}
      <div style={{ marginBottom: isExpanded ? '1rem' : '0' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Nach Titel, Inhalt oder Autor suchen..."
            value={filters.search}
            onChange={handleSearchChange}
            className="search-input"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--color-gray-200)',
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem',
              transition: 'border-color 0.2s ease',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Erweiterte Filter */}
      {isExpanded && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--color-gray-200)'
        }}>
          {/* Tag Filter */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: 'var(--color-gray-800)',
              fontSize: '0.875rem'
            }}>
              Nach Tag filtern
            </label>
            <input
              type="text"
              placeholder="z.B. React, API..."
              value={filters.tag}
              onChange={handleTagChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid var(--color-gray-300)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.9rem'
              }}
            />
          </div>

          {/* Author Filter */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: 'var(--color-gray-800)',
              fontSize: '0.875rem'
            }}>
              Nach Autor filtern
            </label>
            <input
              type="text"
              placeholder="Autor-Name..."
              value={filters.author}
              onChange={handleAuthorChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid var(--color-gray-300)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.9rem'
              }}
            />
          </div>

          {/* Clear Filters Button */}
          <div style={{
            display: 'flex',
            alignItems: 'end'
          }}>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="btn btn-secondary"
                style={{ 
                  width: '100%',
                  fontSize: '0.875rem'
                }}
              >
                Filter zurücksetzen
              </button>
            )}
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--color-gray-100)',
          flexWrap: 'wrap'
        }}>
          <span style={{
            fontSize: '0.875rem',
            color: 'var(--color-gray-800)',
            marginRight: '0.5rem'
          }}>
            Aktive Filter:
          </span>
          
          {filters.search && (
            <span style={{
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              Suche: "{filters.search}"
              <button
                onClick={() => onFilterChange({ search: '' })}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0 0.125rem',
                  fontSize: '0.75rem'
                }}
              >
                Entfernen
              </button>
            </span>
          )}
          
          {filters.tag && (
            <span style={{
              backgroundColor: 'var(--color-success)',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              Tag: "{filters.tag}"
              <button
                onClick={() => onFilterChange({ tag: '' })}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0 0.125rem',
                  fontSize: '0.75rem'
                }}
              >
                Entfernen
              </button>
            </span>
          )}
          
          {filters.author && (
            <span style={{
              backgroundColor: 'var(--color-warning)',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              Autor: "{filters.author}"
              <button
                onClick={() => onFilterChange({ author: '' })}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0 0.125rem',
                  fontSize: '0.75rem'
                }}
              >
                Entfernen
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchFilter 