import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--color-gray-800)',
      color: 'var(--color-gray-300)',
      padding: '3rem 0 2rem',
      marginTop: '4rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Project Info */}
          <div>
            <h3 style={{ 
              color: 'white', 
              marginBottom: '1rem',
              fontSize: '1.25rem'
            }}>
              Headless CMS Demo
            </h3>
            <p style={{ 
              lineHeight: '1.6',
              color: 'var(--color-gray-600)'
            }}>
              Eine moderne Demonstration von API-First Development 
              und Microservice-Architektur mit React und Node.js.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 style={{ 
              color: 'white', 
              marginBottom: '1rem',
              fontSize: '1.1rem'
            }}>
              Tech Stack
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              color: 'var(--color-gray-600)'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>React + TypeScript</li>
              <li style={{ marginBottom: '0.5rem' }}>Node.js + Express</li>
              <li style={{ marginBottom: '0.5rem' }}>Vite Build Tool</li>
              <li style={{ marginBottom: '0.5rem' }}>CSS Custom Properties</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ 
              color: 'white', 
              marginBottom: '1rem',
              fontSize: '1.1rem'
            }}>
              Links
            </h4>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.5rem'
            }}>
              <a 
                href="http://localhost:3001" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: 'var(--color-primary)',
                  textDecoration: 'none'
                }}
              >
                Backend API
              </a>
              <a 
                href="https://github.com/steven-bode/HeadlessCmsMicroserviceDemo" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: 'var(--color-primary)',
                  textDecoration: 'none'
                }}
              >
                GitHub Repository
              </a>
              <a 
                href="http://localhost:3001/health" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: 'var(--color-primary)',
                  textDecoration: 'none'
                }}
              >
                Health Check
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid var(--color-gray-700)',
          paddingTop: '1.5rem',
          textAlign: 'center',
          color: 'var(--color-gray-200)',
          fontSize: '0.875rem'
        }}>
          <p>
            © 2024 Steven Bode - Headless CMS Demo | 
            Erstellt für Bewerbungszwecke | 
            <a 
              href="https://github.com/steven-bode" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: 'var(--color-primary)',
                textDecoration: 'none',
                marginLeft: '0.5rem'
              }}
            >
              GitHub Profile
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 