import { createRoot } from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './ui/ErrorBoundary';
import './styles/global.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('React root element #root was not found in index.html.');
}

createRoot(root).render(<ErrorBoundary resetKey="app" application><App /></ErrorBoundary>);
