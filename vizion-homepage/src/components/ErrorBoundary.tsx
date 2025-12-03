import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  componentName?: string;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('[DEBUG] ErrorBoundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[DEBUG] ErrorBoundary componentDidCatch:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          backgroundColor: '#1a1a1a',
          border: '1px solid #ff0000',
          borderRadius: '8px',
          color: '#ffffff',
          fontFamily: 'monospace'
        }}>
          <h2 style={{ color: '#ff0000' }}>⚠️ Error in {this.props.componentName || 'Component'}</h2>
          <details style={{ marginTop: '10px', whiteSpace: 'pre-wrap' }}>
            <summary>Error details</summary>
            <p>{this.state.error?.message || 'Unknown error'}</p>
            <p>{this.state.error?.stack}</p>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
