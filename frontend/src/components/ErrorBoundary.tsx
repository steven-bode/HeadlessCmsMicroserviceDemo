import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Here you could also log the error to an error reporting service
    // like Sentry, LogRocket, etc.
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: 'var(--color-gray-50)'
        }}>
          <div style={{
            maxWidth: '600px',
            backgroundColor: 'white',
            padding: '3rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              color: 'var(--color-error)'
            }}>
              Oops! Etwas ist schiefgelaufen
            </h1>
            
            <p style={{
              fontSize: '1.125rem',
              marginBottom: '2rem',
              color: 'var(--color-gray-600)'
            }}>
              Es ist ein unerwarteter Fehler aufgetreten. 
              Das sollte normalerweise nicht passieren.
            </p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Seite neu laden
              </button>
              
              <a 
                href="/"
                className="btn btn-secondary"
              >
                Zur Startseite
              </a>
            </div>

            {/* Development Error Details */}
            {import.meta.env.DEV && this.state.error && (
              <details style={{
                marginTop: '2rem',
                textAlign: 'left',
                backgroundColor: 'var(--color-gray-100)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem'
              }}>
                <summary style={{
                  cursor: 'pointer',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: 'var(--color-error)'
                }}>
                  Entwickler-Details (nur in Development sichtbar)
                </summary>
                
                <div style={{
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ color: 'var(--color-error)' }}>Error:</h4>
                  <pre style={{
                    backgroundColor: '#fff',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'auto',
                    fontSize: '0.75rem'
                  }}>
                    {this.state.error.toString()}
                  </pre>
                </div>

                {this.state.errorInfo && (
                  <div>
                    <h4 style={{ color: 'var(--color-error)' }}>Component Stack:</h4>
                    <pre style={{
                      backgroundColor: '#fff',
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'auto',
                      fontSize: '0.75rem'
                    }}>
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary 