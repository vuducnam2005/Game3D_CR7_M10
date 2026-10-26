import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Camera, Check, CirclePlay, Gauge, RotateCcw, Sparkles } from 'lucide-react';
import { ACESFilmicToneMapping, PCFShadowMap } from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { DebugCharacter } from '../characters/DebugCharacter';
import { CHARACTER_CATALOG, type CharacterId } from '../characters/modelCatalog';
import type { AnimationFrame, AnimationPlaybackState } from '../characters/AnimationManager';
import { CameraController, type MotionFrames } from '../scene/CameraController';
import { CAMERA_FAR, CAMERA_FOV, CAMERA_NEAR, PLAYER_X, type CameraMode } from '../scene/cameraRig';
import { Lighting } from '../scene/Lighting';
import { Stadium } from '../scene/Stadium';
import { ScenePerformance, type SceneMetrics } from '../scene/ScenePerformance';
import { QUALITY, type QualityChoice, type QualityLevel } from '../scene/quality';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import styles from '../styles/StadiumPreview.module.css';
import type { GameState } from '../../shared/game';
import { LiveFeedback } from '../live/LiveFeedback';
import type { MockAudio } from '../live/MockAudio';
import { resultPresentation } from '../live/presentationEvents';
import { CelebrationEffects } from '../scene/CelebrationEffects';
import { RendererDiagnostics } from '../scene/RendererDiagnostics';
import { probeAsset } from '../characters/probeAsset';

const CAMERAS: { id: CameraMode; label: string }[] = [
  { id: 'main', label: 'Main Battle' }, { id: 'ronaldo', label: 'Ronaldo Focus' },
  { id: 'messi', label: 'Messi Focus' }, { id: 'victory', label: 'Victory' }, { id: 'orbit', label: 'Debug Orbit' },
];
const emptyPlayback: AnimationPlaybackState = { current: null, paused: false, queued: [], speed: 1 };

export function StadiumPreview({ liveState, audio, broadcast = false, onMetrics }: { liveState?: GameState; audio?: MockAudio; broadcast?: boolean; onMetrics?: (value: SceneMetrics) => void } = {}) {
  const [localCamera, setCamera] = useState<CameraMode>('main');
  const [directedCamera, setDirectedCamera] = useState<CameraMode>('main');
  const [localAutomatic, setAutomatic] = useState(true);
  const [localWinner, setWinner] = useState<CharacterId>('messi');
  const [localQuality, setQuality] = useState<QualityChoice>('auto');
  const [autoLevel, setAutoLevel] = useState<QualityLevel>('standard');
  const [localReducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const settings = broadcast ? liveState?.presentation : undefined;
  const camera = settings?.camera ?? localCamera;
  const automatic = settings?.autoCamera ?? localAutomatic;
  const winner = settings?.victoryFocus ?? localWinner;
  const quality = settings?.quality ?? localQuality;
  const reducedMotion = (settings?.reducedMotion ?? localReducedMotion) || (broadcast && settings?.effects === false);
  const transparent = settings?.background === 'transparent';
  const [ronaldoRequest, setRonaldoRequest] = useState(0);
  const [ronaldoClip, setRonaldoClip] = useState('SIUUU');
  const [messiRequest, setMessiRequest] = useState(0);
  const [messiClip, setMessiClip] = useState('Messi Celebrate');
  const [ronaldo, setRonaldo] = useState(emptyPlayback);
  const [messi, setMessi] = useState(emptyPlayback);
  const [loaded, setLoaded] = useState({ ronaldo: false, messi: false });
  const [assetError, setAssetError] = useState<string | null>(null);
  const [rendererError, setRendererError] = useState<string | null>(null);
  const [renderFailed, setRenderFailed] = useState(false);
  const frames = useRef<MotionFrames>({});
  const webgl = useMemo(() => WebGL.isWebGL2Available(), []);
  const level = quality === 'auto' ? autoLevel : quality;
  const handleRonaldoFrame = useCallback((frame: AnimationFrame) => { frames.current.ronaldo = frame; }, []);
  const handleMessiFrame = useCallback((frame: AnimationFrame) => { frames.current.messi = frame; }, []);
  const handleRonaldoLoaded = useCallback(() => setLoaded(previous => ({ ...previous, ronaldo: true })), []);
  const handleMessiLoaded = useCallback(() => setLoaded(previous => ({ ...previous, messi: true })), []);
  const reduceQuality = useCallback(() => setAutoLevel('low'), []);
  const renderFailure = useCallback(() => setRenderFailed(true), []);
  const lastCue = useRef({ ronaldo: '', messi: '' });
  const result = liveState ? resultPresentation(liveState) : null;
  const lastResult = useRef('');
  const lastScope = useRef('');
  useEffect(() => {
    if (!liveState) return;
    const scope = `${liveState.matchId}:${liveState.round}`;
    if (result) {
      if (!loaded.ronaldo || !loaded.messi || result.id === lastResult.current) return;
      lastResult.current = result.id;
      setRonaldoClip(result.outcome === 'ronaldo' ? 'SIUUU' : 'Idle'); setRonaldoRequest(value => value + 1);
      setMessiClip(result.outcome === 'messi' ? 'Messi Victory' : 'Messi Idle'); setMessiRequest(value => value + 1);
      for (const team of ['ronaldo', 'messi'] as const) lastCue.current[team] = liveState.live.celebrations[team].active?.id ?? '';
      return;
    }
    if (lastResult.current || lastScope.current !== scope) {
      lastResult.current = ''; lastScope.current = scope;
      setRonaldoClip('Idle'); setRonaldoRequest(value => value + 1);
      setMessiClip('Messi Idle'); setMessiRequest(value => value + 1);
    }
    for (const team of ['ronaldo', 'messi'] as const) {
      const cue = liveState.live.celebrations[team].active;
      if (!loaded[team] || !cue || cue.id === lastCue.current[team]) continue;
      lastCue.current[team] = cue.id;
      if (team === 'ronaldo') { setRonaldoClip(cue.animation); setRonaldoRequest(value => value + 1); }
      else { setMessiClip(cue.animation); setMessiRequest(value => value + 1); }
    }
  }, [liveState, loaded]);

  useEffect(() => {
    const controller = new AbortController();
    setAssetError(null);
    const timeout = setTimeout(() => { setAssetError('GLB HTTP probe timeout (15s). Kiem tra server va public/models.'); controller.abort(); }, 15000);
    Promise.all(Object.values(CHARACTER_CATALOG).map(character => probeAsset(character.assetUrl, controller.signal)))
      .catch(error => { if (!controller.signal.aborted) setAssetError(error instanceof Error ? error.message : 'Asset request failed'); })
      .finally(() => clearTimeout(timeout));
    return () => { clearTimeout(timeout); controller.abort(); };
  }, []);

  useEffect(() => {
    if (loaded.ronaldo && loaded.messi) {
      setRendererError(previous => previous?.startsWith('GLB LOAD TIMEOUT') ? null : previous);
      return;
    }
    if (!webgl || assetError || renderFailed) return;
    const timer = setTimeout(() => setRendererError('GLB LOAD TIMEOUT (60s): chua du hai nhan vat. Kiem tra GLB URL/texture/console va tai lai trang.'), 60000);
    return () => clearTimeout(timer);
  }, [loaded, webgl, assetError, renderFailed]);

  function preview(id: CharacterId, clip?: string) {
    setCamera('main'); setAutomatic(true);
    if (id === 'ronaldo') { setRonaldoClip('SIUUU'); setRonaldoRequest(value => value + 1); }
    else { setMessiClip(clip ?? 'Messi Celebrate'); setWinner('messi'); setMessiRequest(value => value + 1); }
  }

  const ready = loaded.ronaldo && loaded.messi;
  return <div className={broadcast ? styles.broadcast : styles.shell}>
    {!liveState && <header className={styles.header}>
      <a className={styles.wordmark} href="/stadium" aria-label="Stadium preview"><span>R</span><i>VS</i><span>M</span></a>
      <div className={styles.phase}><span>PHASE 03 / SCENE PREVIEW</span><strong>Under the floodlights.</strong></div>
      <a className={styles.labLink} href="/debug">Model Lab <ArrowUpRight size={15} /></a>
    </header>}

    <section className={styles.stage} aria-label="Stadium 3D preview" data-testid="stadium-stage" data-camera={directedCamera} data-quality={level} data-ronaldo-animation={ronaldo.current} data-messi-animation={messi.current} data-result={result?.outcome ?? 'none'}>
      <div className={styles.scene}>
        {!webgl || assetError ? <div className={styles.error} role="alert"><strong>{!webgl ? 'WEBGL2 UNAVAILABLE' : 'ASSET ERROR'}</strong><p>{assetError ?? 'GPU/trinh duyet khong ho tro WebGL2. Khong the hien thi san 3D.'}</p><a href={window.location.pathname}>Tai lai trang sau khi sua loi</a></div> :
          <ErrorBoundary resetKey="stadium" onError={renderFailure}>
            <Canvas shadows={{ type: PCFShadowMap }} dpr={[1, QUALITY[level].dpr]}
              camera={{ fov: CAMERA_FOV, near: CAMERA_NEAR, far: CAMERA_FAR, position: [0, 3.5, 17] }}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMapping: ACESFilmicToneMapping }}>
              <RendererDiagnostics onError={setRendererError} />
              <Lighting quality={level} transparent={transparent} />
              {!transparent && <Stadium quality={level} cheering={!!liveState?.live.crowdUntil && liveState.presentation.effects} reducedMotion={reducedMotion} />}
              <Suspense fallback={null}>
                <group position={[PLAYER_X.ronaldo, 0, 0]}>
                  <DebugCharacter interrupt={!!result} queueScope={liveState ? `${liveState.matchId}:${liveState.round}` : undefined} character={CHARACTER_CATALOG.ronaldo} selectedClip={ronaldoClip} playRequest={ronaldoRequest} previewTime={0} paused={false} speed={liveState?.config.ronaldoSpeed ?? 1}
                    showBounds={false} showSkeleton={false} onInspection={handleRonaldoLoaded} onPlaybackState={setRonaldo} onAnimationFrame={handleRonaldoFrame} />
                </group>
                <group position={[PLAYER_X.messi, 0, 0]}>
                  <DebugCharacter interrupt={!!result} queueScope={liveState ? `${liveState.matchId}:${liveState.round}` : undefined} character={CHARACTER_CATALOG.messi} selectedClip={messiClip} playRequest={messiRequest} previewTime={0} paused={false} speed={liveState?.config.messiSpeed ?? 1}
                    showBounds={false} showSkeleton={false} onInspection={handleMessiLoaded} onPlaybackState={setMessi} onAnimationFrame={handleMessiFrame} />
                </group>
              </Suspense>
              {liveState && <CelebrationEffects state={liveState} frames={frames} level={level} requests={{ ronaldo: ronaldoRequest, messi: messiRequest }} audio={broadcast ? audio : undefined} />}
              <CameraController mode={result ? result.outcome === 'draw' || reducedMotion ? 'main' : 'victory' : camera} automatic={!result && automatic} winner={result && result.outcome !== 'draw' ? result.outcome : automatic && messi.current === 'Messi Victory' ? 'messi' : winner} frames={frames} reducedMotion={reducedMotion} onDirection={setDirectedCamera} />
              <ScenePerformance choice={quality} level={level} onReduce={reduceQuality} onMetrics={onMetrics} />
            </Canvas>
          </ErrorBoundary>}
        {rendererError && <div className={styles.error} role="alert"><strong>3D RENDER ERROR</strong><p>{rendererError}</p><a href={window.location.pathname}>Tai lai trang</a></div>}
      </div>

      {!broadcast && <><div className={styles.stageTitle}><span>THE NIGHT BELONGS TO</span><h1>THE LEGENDS<span>.</span></h1><p>RONALDO <i>VS</i> MESSI</p></div>
      <div className={styles.stageNote}><i /> {liveState ? `${liveState.connection.mode} LIVE PREVIEW` : 'STADIUM PREVIEW'}<span>{liveState ? `${liveState.status} / ROUND ${liveState.round}` : 'NO MATCH IN PROGRESS'}</span></div>
      {liveState && !broadcast && <LiveFeedback state={liveState} audio={audio} />}
      <div className={styles.cameraTag} data-testid="camera-state"><Camera size={13} /> {CAMERAS.find(mode => mode.id === directedCamera)?.label}</div>
      <div className={styles.teams}>
        <div><span>01 / PORTUGAL</span><strong>RONALDO</strong><small>CR7 <i /> {ronaldo.current ?? 'Loading GLB'}</small></div>
        <b>VS</b>
        <div><span>02 / ARGENTINA</span><strong>MESSI</strong><small>M10 <i /> {messi.current ?? 'Loading GLB'}</small></div>
      </div>
      <div className={styles.stageFooter}><span>REAL GLB / REAL-TIME 3D</span><span>NIGHT SESSION / 03</span></div></>}
      {!ready && !assetError && !rendererError && !renderFailed && webgl && <div className={styles.loading} role="status">Dang tai hai GLB goc...</div>}
    </section>

    {!liveState && <section className={styles.controls} aria-label="Scene preview controls">
      <div className={styles.controlIntro}><span>DIRECTOR'S DESK</span><h2>Explore the arena.</h2><p>Xem thu scene va camera. Mo <a href="/admin">Game Admin</a> de chinh luat va bat dau; <a href="/control">Control Dashboard</a> de gui qua, ket noi TikTok va chinh do hoa. <a href="/overlay">Overlay</a> de capture livestream.</p><div className={styles.ready} data-testid="stadium-status"><Check size={14} /> {ready ? 'Both original models loaded' : 'Loading models...'}</div></div>
      <div className={styles.controlBody}>
        <div className={styles.controlRow}><span><Camera size={14} /> CAMERA</span><div className={styles.buttons}>{CAMERAS.map(mode => <button key={mode.id} aria-pressed={camera === mode.id} onClick={() => { setCamera(mode.id); setAutomatic(false); }}>{mode.label}</button>)}</div></div>
        <div className={styles.controlRow}><span><CirclePlay size={14} /> PREVIEW</span><div className={styles.buttons}>
          <button className={styles.redButton} disabled={!ready} onClick={() => preview('ronaldo')}>Ronaldo SIUUU</button>
          <button className={styles.blueButton} disabled={!ready} onClick={() => preview('messi')}>Messi Celebrate</button>
          <button disabled={!ready} onClick={() => preview('messi', 'Messi Victory')}>Messi Victory</button>
          <button onClick={() => { setCamera('main'); setAutomatic(true); }}><RotateCcw size={13} /> Reset camera</button>
        </div></div>
        <div className={styles.settings}>
          <label><Gauge size={14} /> Quality<select aria-label="Scene quality" value={quality} onChange={event => { setQuality(event.target.value as QualityChoice); setAutoLevel('standard'); }}><option value="auto">Auto</option><option value="low">Low</option><option value="standard">Standard</option><option value="high">High</option></select></label>
          <label>Victory focus<select aria-label="Victory focus" value={winner} onChange={event => setWinner(event.target.value as CharacterId)}><option value="messi">Messi</option><option value="ronaldo">Ronaldo</option></select></label>
          <label><input type="checkbox" checked={automatic} onChange={event => setAutomatic(event.target.checked)} /> Auto camera</label>
          <label><input type="checkbox" checked={reducedMotion} onChange={event => setReducedMotion(event.target.checked)} /> Reduced motion</label>
        </div>
        <p className={styles.qualityNote} data-testid="scene-quality"><Sparkles size={12} /> {level} / DPR cap {QUALITY[level].dpr} / shadow {QUALITY[level].shadowSize || 'off'} {quality === 'auto' && '/ Tu giam xuong Low neu cham keo dai'}</p>
        <p className={styles.qualityNote} data-testid="stadium-playback">CR7: {ronaldo.current ?? 'loading'} / M10: {messi.current ?? 'loading'} / Queue: {[...ronaldo.queued, ...messi.queued].join(', ') || 'empty'}</p>
        {reducedMotion && <p className={styles.qualityNote}>Reduced motion: tat auto celebration camera va landing shake; van chay animation nhan vat.</p>}
        {camera === 'orbit' && <p className={styles.qualityNote}>Debug Orbit: keo de xoay, cuon de zoom. Gioi han goc/khoang cach de giu ca hai nhan vat trong khung.</p>}
      </div>
    </section>}
    {liveState && !broadcast && <p className={styles.qualityNote} data-testid="live-playback">CR7: {ronaldo.current ?? 'loading'} / M10: {messi.current ?? 'loading'} / Pending: {ronaldo.queued.length + messi.queued.length}</p>}
  </div>;
}
