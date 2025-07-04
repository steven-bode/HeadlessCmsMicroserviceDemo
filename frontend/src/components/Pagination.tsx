import React from 'react'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
  hasPrev
}) => {
  const getVisiblePages = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= Math.min(4, totalPages); i++) {
          pages.push(i);
        }
        if (totalPages > 4) {
          pages.push(-1);
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        if (totalPages > 4) {
          pages.push(-1); 
        }
        for (let i = Math.max(totalPages - 3, 2); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1); 
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-2); 
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="pagination">
      {/* Previous Button */}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        title="Vorherige Seite"
      >
        Zurück
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => {
        if (page === -1 || page === -2) {
          // Ellipsis
          return (
            <span
              key={`ellipsis-${index}`}
              style={{
                padding: '0.5rem',
                color: 'var(--color-gray-800)',
                userSelect: 'none'
              }}
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
            title={`Seite ${page}`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        title="Nächste Seite"
      >
        Weiter
      </button>

      {/* Page Info */}
      <div style={{
        marginLeft: '1rem',
        color: 'var(--color-gray-800)',
        fontSize: '0.875rem',
        display: 'flex',
        alignItems: 'center'
      }}>
        Seite {currentPage} von {totalPages}
      </div>
    </div>
  )
}

export default Pagination 