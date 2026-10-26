import { css } from '../styles/classes';
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  resetKey: string;
  application?: boolean;
  onError?: (error: Error) => void;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('LIVE Battle render failed', error, info.componentStack);
    this.props.onError?.(error);
  }

  componentDidUpdate(previousProps: ErrorBoundaryProps): void {
    if (previousProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className={css('fatal-error')} role="alert">
        <span>{this.props.application ? 'APPLICATION ERROR' : 'MODEL LOAD ERROR'}</span>
        <h2>{this.props.application ? 'Khong the hien thi trang' : 'Khong the hien thi GLB'}</h2>
        <p>{this.state.error.message}</p>
        <small>Kiem tra URL asset, HTTP status, console, WebGL va cau truc skeleton. Khong co placeholder nao duoc dung thay model.</small>
        <p><a href={window.location.pathname}>Tai lai trang (diem van luu o server)</a></p>
      </div>
    );
  }
}
