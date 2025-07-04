import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header: React.FC = () => {
  const location = useLocation()

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            Headless CMS Demo
          </Link>
          
          <nav className="nav">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Blog Posts
            </Link>
            <a 
              href="http://localhost:3001" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-link"
            >
              API Docs
            </a>
            <a 
              href="https://github.com/steven-bode/HeadlessCmsMicroserviceDemo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-link"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header 