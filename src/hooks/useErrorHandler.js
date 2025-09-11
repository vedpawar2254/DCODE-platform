import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { ErrorBoundary } from '../pages/Error';

export const useErrorHandler = () => {
  const navigate = useNavigate();

  const handleError = useCallback((error, errorInfo = {}) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    
    // Navigate to error page with state
    navigate('/error', { 
      state: { 
        error: error.message || 'An unexpected error occurred',
        errorType: errorInfo.type || 'unknown',
        ...errorInfo
      },
      replace: true
    });
  }, [navigate]);

  const handle404 = useCallback(() => {
    navigate('/404', { replace: true });
  }, [navigate]);

  const handleNetworkError = useCallback(() => {
    navigate('/error', {
      state: {
        errorType: 'network',
        error: 'Network connection lost'
      },
      replace: true
    });
  }, [navigate]);

  return {
    handleError,
    handle404,
    handleNetworkError
  };
};

// HOC for wrapping components with error boundaries
export const withErrorBoundary = (Component) => {
  return function WrappedComponent(props) {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};

export default useErrorHandler;
