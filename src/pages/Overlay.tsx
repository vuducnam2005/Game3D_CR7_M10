import { useEffect, useState } from 'react';
import { useGameServer } from '../hooks/useGameServer';
import { MockAudio } from '../live/MockAudio';
import { OverlayView } from '../live/OverlayView';
import styles from '../styles/Overlay.module.css';

export function Overlay() {
  const { snapshot, connected, error } = useGameServer();
  const [audio] = useState(() => new MockAudio());
  const [fullscreenNotice, setFullscreenNotice] = useState('');
  const [fullscreenActive, setFullscreenActive] = useState(false);
  useEffect(() => {
    document.documentElement.classList.add('broadcast-page');
    let noticeTimer: ReturnType<typeof setTimeout>;
    const unavailable = () => {
      setFullscreenNotice('Fullscreen unavailable here. Open Overlay in Chrome/Edge and press F or F11.');
      clearTimeout(noticeTimer);
      noticeTimer = setTimeout(() => setFullscreenNotice(''), 5000);
    };
    const unlock = () => { void audio.unlock().catch(() => undefined); };
    const fullscreen = () => {
      if (document.fullscreenElement) { void document.exitFullscreen().catch(unavailable); return; }
      if (!document.documentElement.requestFullscreen) { unavailable(); return; }
      void document.documentElement.requestFullscreen().catch(unavailable);
    };
    const key = (event: KeyboardEvent) => {
      unlock();
      if (event.key.toLowerCase() === 'f') fullscreen();
      if (event.key === 'Escape' && document.fullscreenElement) void document.exitFullscreen().catch(() => undefined);
    };
    const fullscreenChanged = () => setFullscreenActive(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', fullscreenChanged);
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', key);
    window.addEventListener('dblclick', fullscreen);
    return () => {
      document.documentElement.classList.remove('broadcast-page');
      clearTimeout(noticeTimer);
      window.removeEventListener('pointerdown', unlock); window.removeEventListener('keydown', key); window.removeEventListener('dblclick', fullscreen);
      document.removeEventListener('fullscreenchange', fullscreenChanged);
      audio.dispose();
    };
  }, [audio]);
  return <main className={styles.screen} aria-label="LIVE overlay" data-fullscreen={fullscreenActive}>{snapshot ? <OverlayView state={snapshot.state} connected={connected} audio={audio} /> : <p role="status">{error ?? 'Connecting to the arena...'}</p>}{fullscreenNotice && <div className={styles.fullscreenNotice} role="status">{fullscreenNotice}</div>}</main>;
}
