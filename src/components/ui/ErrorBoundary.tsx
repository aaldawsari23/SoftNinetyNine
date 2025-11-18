'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error!} retry={this.retry} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">😵</div>
        <h2 className="text-xl font-bold text-white mb-2">عذراً، حدث خطأ غير متوقع</h2>
        <p className="text-text-secondary mb-6 text-sm">
          {process.env.NODE_ENV === 'development' 
            ? error.message 
            : 'حدث خطأ في التطبيق. نعمل على إصلاحه.'
          }
        </p>
        <div className="space-y-3">
          <button 
            onClick={retry}
            className="btn-primary w-full"
          >
            المحاولة مرة أخرى
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="btn-secondary w-full"
          >
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;