import React, { type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> { //error boundaries can only be class components
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h4>{this.props.fallback}</h4>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;