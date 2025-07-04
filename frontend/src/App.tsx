import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import PostList from './components/PostList'
import PostDetail from './components/PostDetail'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <div className="app">
      <ErrorBoundary>
        <Header />
        <main className="main">
          <div className="container">
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </ErrorBoundary>
    </div>
  )
}

// 404 Komponente
function NotFound() {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '4rem 0',
      color: 'var(--color-gray-800)'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        marginBottom: '1rem',
        color: 'var(--color-gray-800)'
      }}>
        404
      </h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
        Die gesuchte Seite wurde nicht gefunden.
      </p>
      <a href="/" className="btn btn-primary">
        Zurück zur Startseite
      </a>
    </div>
  )
}

export default App 