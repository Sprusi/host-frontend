import React, { ReactNode } from 'react';

import { ErrorView } from './error-view/ErrorView';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) return <ErrorView error={error} />;
    return children;
  }
}

export default ErrorBoundary;
