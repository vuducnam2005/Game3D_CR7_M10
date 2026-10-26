import { css } from './styles/classes';
import { lazy, Suspense } from 'react';

const ModelDebug = lazy(() => import('./pages/ModelDebug').then(module => ({ default: module.ModelDebug })));
const StadiumPreview = lazy(() => import('./pages/StadiumPreview').then(module => ({ default: module.StadiumPreview })));
const EngineLab = lazy(() => import('./pages/EngineLab').then(module => ({ default: module.EngineLab })));
const MockLiveLab = lazy(() => import('./pages/MockLiveLab').then(module => ({ default: module.MockLiveLab })));
const Overlay = lazy(() => import('./pages/Overlay').then(module => ({ default: module.Overlay })));
const Admin = lazy(() => import('./pages/Admin').then(module => ({ default: module.Admin })));

function RouteNotice() {
  return (
    <main className={css('route-notice')}>
      <span>LIVE BATTLE</span>
      <h1><a href="/stadium">Stadium</a> / <a href="/debug">Model Lab</a> / <a href="/engine">Engine Lab</a> / <a href="/mock">Mock LIVE</a></h1>
      <p><a href="/control">Control Dashboard</a> / <a href="/admin">Game Admin</a> / <a href="/overlay">LIVE Overlay</a></p>
    </main>
  );
}

export default function App() {
  return <Suspense fallback={<p role="status" className="app-loading">Dang tai LIVE Battle...</p>}><Route /></Suspense>;
}

function Route() {
  const path = window.location.pathname;
  if (path === '/overlay') return <Overlay />;
  if (path === '/control') return <MockLiveLab control />;
  if (path === '/admin') return <Admin />;
  if (path === '/debug') return <ModelDebug />;
  if (path === '/engine') return <EngineLab />;
  if (path === '/mock') return <MockLiveLab />;
  if (path === '/stadium' || path === '/') return <StadiumPreview />;
  return <RouteNotice />;
}
