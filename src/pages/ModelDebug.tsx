import { css } from '../styles/classes';
import { Canvas } from '@react-three/fiber';
import {
  Box as BoxIcon,
  Bone,
  ChevronRight,
  CirclePause,
  CirclePlay,
  Gauge,
  Layers3,
  Play,
  Rotate3D,
  ScanLine,
  ShieldCheck,
} from 'lucide-react';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { PCFShadowMap } from 'three';
import type { AnimationPlaybackState } from '../characters/AnimationManager';
import { formatVector } from '../characters/CharacterNormalizer';
import { DebugCharacter, DebugGround } from '../characters/DebugCharacter';
import { CHARACTER_CATALOG, type CharacterId } from '../characters/modelCatalog';
import type { ModelInspection } from '../characters/modelInspection';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { DebugCamera } from './DebugCamera';
import { RendererDiagnostics } from '../scene/RendererDiagnostics';
import { probeAsset } from '../characters/probeAsset';

const ignorePlayback = () => {};

const EMPTY_PLAYBACK: AnimationPlaybackState = {
  current: null,
  paused: false,
  queued: [],
  speed: 1,
};

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className={css('stat-pill')}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function EmptyPanel() {
  return (
    <div className={css('empty-panel')}>
      <span className={css('loader-orbit')} />
      <p>Dang cho GLTFLoader hoan tat...</p>
    </div>
  );
}

export function ModelDebug() {
  const [characterId, setCharacterId] = useState<CharacterId>('ronaldo');
  const [inspection, setInspection] = useState<ModelInspection | null>(null);
  const [selectedClip, setSelectedClip] = useState<string | null>(null);
  const [playRequest, setPlayRequest] = useState(0);
  const [previewTime, setPreviewTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showBounds, setShowBounds] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [comparison, setComparison] = useState(false);
  const [comparisonInspection, setComparisonInspection] = useState<ModelInspection | null>(null);
  const [playback, setPlayback] = useState<AnimationPlaybackState>(EMPTY_PLAYBACK);
  const [assetProbe, setAssetProbe] = useState<{ state: 'checking' | 'ok' | 'error'; detail: string }>({
    state: 'checking',
    detail: 'Checking...',
  });
  const character = CHARACTER_CATALOG[characterId];
  const [rendererError, setRendererError] = useState<string | null>(null);
  const webglAvailable = useMemo(() => WebGL.isWebGL2Available(), []);

  const handleInspection = useCallback((nextInspection: ModelInspection) => {
    setInspection(nextInspection);
    setSelectedClip(previous => {
      if (previous && nextInspection.clips.some(clip => clip.name === previous)) return previous;
      return nextInspection.clips.find(clip => clip.name === character.defaultAnimation)?.name
        ?? nextInspection.clips[0]?.name
        ?? null;
    });
  }, [character.defaultAnimation]);

  const handlePlaybackState = useCallback((state: AnimationPlaybackState) => {
    setPlayback(state);
  }, []);

  const selectCharacter = (id: CharacterId) => {
    if (id === characterId) return;
    setCharacterId(id);
    setInspection(null);
    setSelectedClip(null);
    setPlayback(EMPTY_PLAYBACK);
    setPaused(false);
    setPlayRequest(0);
    setPreviewTime(0);
    setComparisonInspection(null);
  };

  useEffect(() => {
    const controller = new AbortController();
    setAssetProbe({ state: 'checking', detail: 'Checking...' });
    const timeout = setTimeout(() => { setAssetProbe({ state: 'error', detail: `${character.assetUrl}: HTTP timeout (15s)` }); controller.abort(); }, 15000);
    probeAsset(character.assetUrl, controller.signal)
      .then(detail => setAssetProbe({ state: 'ok', detail }))
      .catch(error => {
        if (controller.signal.aborted) return;
        setAssetProbe({ state: 'error', detail: error instanceof Error ? error.message : 'Asset request failed' });
      }).finally(() => clearTimeout(timeout));
    return () => { clearTimeout(timeout); controller.abort(); };
  }, [character.assetUrl]);

  const totalTriangles = inspection?.meshes.reduce((sum, mesh) => sum + mesh.triangles, 0) ?? 0;
  const sourceBounds = inspection?.sourceBounds;

  return (
    <main className={css('debug-shell')} style={{ '--character-accent': character.accent, '--character-soft': character.accentSoft } as React.CSSProperties}>
      <header className={css('topbar')}>
        <div className={css('brand-lockup')}>
          <span className={css('brand-kicker')}>LIVE BATTLE / ASSET LAB</span>
          <div>
            <strong>R<span>VS</span>M</strong>
            <p>Model verification console</p>
          </div>
        </div>
        <div className={css('phase-marker')}>
          <span>PHASE</span>
          <strong>02</strong>
          <p>Skeleton + Animation / <a href="/stadium">Stadium preview</a></p>
        </div>
        <div className={css(`webgl-chip ${webglAvailable ? 'is-ok' : 'is-error'}`)}>
          <ShieldCheck size={17} />
          <span>WebGL2</span>
          <strong>{webglAvailable ? 'READY' : 'UNAVAILABLE'}</strong>
        </div>
      </header>

      <section className={css('debug-grid')}>
        <aside className={css('control-rail')}>
          <section className={css('rail-section character-selector')}>
            <div className={css('section-heading')}>
              <span>01</span>
              <div><strong>SELECT PLAYER</strong><small>Original GLB asset</small></div>
            </div>
            {(Object.keys(CHARACTER_CATALOG) as CharacterId[]).map(id => {
              const option = CHARACTER_CATALOG[id];
              return (
                <button
                  className={css(`player-option ${characterId === id ? 'is-active' : ''}`)}
                  key={id}
                  onClick={() => selectCharacter(id)}
                  type="button"
                >
                  <RendererDiagnostics onError={setRendererError} />
                  <span className={css('player-number')}>{option.shortLabel}</span>
                  <span><strong>{option.label}</strong><small>{option.sourceFile}</small></span>
                  <ChevronRight size={18} />
                </button>
              );
            })}
          </section>

          <section className={css('rail-section')}>
            <div className={css('section-heading')}>
              <span>02</span>
              <div><strong>ANIMATION DECK</strong><small>Crossfade + safe queue</small></div>
            </div>
            <div className={css('clip-list')}>
              {!inspection && <EmptyPanel />}
              {inspection && inspection.clips.length === 0 && <p>GLB khong co animation.</p>}
              {inspection?.clips.map(clip => (
                <button
                  className={css(`clip-row ${selectedClip === clip.name ? 'is-selected' : ''}`)}
                  key={clip.name}
                  onClick={() => setSelectedClip(clip.name)}
                  type="button"
                >
                  {selectedClip === clip.name ? <CirclePlay size={18} /> : <Play size={15} />}
                  <span><strong>{clip.name}</strong><small>{clip.duration.toFixed(3)}s / {clip.tracks} tracks</small></span>
                  <em>{clip.source}</em>
                </button>
              ))}
            </div>
            <p className={css('asset-note')}>GLB: clip goc. DERIVED: ban sao/tu the tu clip goc, gom mixamo.com da can chan. PROC: clip tao bang ma tren skeleton rieng cua tung model. File GLB goc khong bi sua.</p>
            <div className={css('transport')}>
              <button
                className={css('primary-action')}
                disabled={!selectedClip}
                onClick={() => {
                  setPaused(false);
                  setPlayRequest(value => value + 1);
                }}
                type="button"
              >
                <Play size={18} fill="currentColor" /> PLAY
              </button>
              <button
                aria-label={paused ? 'Tiep tuc animation' : 'Tam dung animation'}
                className={css('icon-action')}
                disabled={!playback.current}
                onClick={() => setPaused(value => !value)}
                type="button"
              >
                {paused ? <CirclePlay size={21} /> : <CirclePause size={21} />}
              </button>
            </div>
            <p className={css('asset-note')} data-testid="animation-queue">Queue: {playback.queued.join(' > ') || 'empty'} (max 4, merge duplicates)</p>
            <label className={css('speed-control')}>
              <span><Gauge size={15} /> SPEED</span>
              <strong>{speed.toFixed(2)}x</strong>
              <input
                aria-label="Animation speed"
                max="2.5"
                min="0.1"
                onChange={event => setSpeed(Number(event.target.value))}
                step="0.05"
                type="range"
                value={speed}
              />
            </label>
            <label className={css('speed-control')}>
              <span>POSE PREVIEW (PAUSE)</span><strong>{previewTime.toFixed(2)}s</strong>
              <input
                aria-label="Animation pose time"
                disabled={!paused || !selectedClip}
                type="range"
                min="0"
                max={inspection?.clips.find(clip => clip.name === selectedClip)?.duration ?? 0}
                step="0.01"
                value={previewTime}
                onChange={event => setPreviewTime(Number(event.target.value))}
              />
            </label>
          </section>

          <section className={css('rail-section view-controls')}>
            <div className={css('section-heading')}>
              <span>03</span>
              <div><strong>DIAGNOSTICS</strong><small>Scene helpers</small></div>
            </div>
            <button className={css(showBounds ? 'is-on' : '')} onClick={() => setShowBounds(value => !value)} type="button">
              <BoxIcon size={17} /> Bounding box <span>{showBounds ? 'ON' : 'OFF'}</span>
            </button>
            <button className={css(showSkeleton ? 'is-on' : '')} onClick={() => setShowSkeleton(value => !value)} type="button">
              <Bone size={17} /> Skeleton <span>{showSkeleton ? 'ON' : 'OFF'}</span>
            </button>
            <button aria-pressed={comparison} className={css(comparison ? 'is-on' : '')} onClick={() => { setComparison(value => !value); setComparisonInspection(null); }} type="button">
              <Layers3 size={17} /> Compare both <span>{comparison ? 'ON' : 'OFF'}</span>
            </button>
            {comparison && <p className={css('asset-note')} data-testid="comparison-status">{comparisonInspection ? 'Both models loaded: CR7 left / M10 right. Controls apply to selected player.' : 'Loading second GLB...'}</p>}
          </section>
        </aside>

        <section className={css('viewport-panel')}>
          <div className={css('viewport-heading')}>
            <div>
              <span>LIVE RENDER</span>
              <h1>{comparison ? 'Ronaldo + Messi' : character.label}</h1>
            </div>
            <div className={css('live-state')} data-testid="playback-state">
              <i />
              <span>{playback.paused ? 'PAUSED' : playback.current ?? 'LOADING'}</span>
            </div>
          </div>

            <div className={css('canvas-wrap')} data-testid="model-viewport">
            {!webglAvailable ? (
              <div className={css('fatal-error')} role="alert">
                <span>WEBGL ERROR</span>
                <h2>WebGL2 khong khoi tao duoc</h2>
                <p>Trinh duyet/GPU hien tai khong cung cap WebGL2.</p>
              </div>
            ) : (
              <ErrorBoundary resetKey={characterId}>
                <Canvas
                  camera={{ far: 100, fov: 36, near: 0.01, position: [0, 3, 9] }}
                  dpr={[1, 1.75]}
                  gl={{ alpha: false, antialias: true, powerPreference: 'high-performance' }}
                  shadows={{ type: PCFShadowMap }}
                >
                  <color attach="background" args={['#07110f']} />
                  <fog attach="fog" args={['#07110f', 18, 40]} />
                  <ambientLight intensity={0.85} />
                  <directionalLight intensity={1.4} position={[0, 3, 6]} />
                  <hemisphereLight args={['#bce9ff', '#10251c', 1.15]} />
                  <directionalLight castShadow intensity={2.4} position={[3.5, 6, 4]} shadow-mapSize={[1024, 1024]} shadow-bias={-0.0002} shadow-normalBias={0.025} />
                  <spotLight angle={0.45} color={character.accent} intensity={55} penumbra={0.7} position={[-3, 4.8, 2.5]} />
                  <Suspense fallback={null}>
                    {(comparison ? ['ronaldo', 'messi'] as const : [characterId]).map(id => (
                      <group key={id} position={comparison ? [id === 'ronaldo' ? -1.55 : 1.55, 0, 0] : [0, 0, 0]}>
                        <DebugCharacter
                          character={CHARACTER_CATALOG[id]}
                          onInspection={id === characterId ? handleInspection : setComparisonInspection}
                          onPlaybackState={id === characterId ? handlePlaybackState : ignorePlayback}
                          paused={id === characterId ? paused : false}
                          playRequest={id === characterId ? playRequest : 0}
                          previewTime={id === characterId ? previewTime : 0}
                          selectedClip={id === characterId ? selectedClip : null}
                          showBounds={showBounds}
                          showSkeleton={showSkeleton}
                          speed={id === characterId ? speed : 1}
                        />
                      </group>
                    ))}
                  </Suspense>
                  <DebugGround />
                  <DebugCamera comparison={comparison} />
                </Canvas>
              </ErrorBoundary>
            )}
            {rendererError && <div className={css('fatal-error')} role="alert"><h2>3D RENDER ERROR</h2><p>{rendererError}</p><a href="/debug">Tai lai Model Lab</a></div>}
            <div className={css('viewport-corners')} aria-hidden="true"><i /><i /><i /><i /></div>
            <div className={css('orbit-hint')}><Rotate3D size={16} /> Drag de xoay / scroll de zoom</div>
            <div className={css('ground-readout')}><ScanLine size={16} /> GROUND Y = 0.000</div>
            {characterId === 'messi' && playback.current === 'Messi Victory' && <div className={css('victory-caption')} role="status">MESSI WINS! <small>Animation preview</small></div>}
          </div>

          <div className={css('viewport-footer')}>
            <StatPill label="MESHES" value={inspection?.meshes.length ?? '--'} />
            <StatPill label="TRIANGLES" value={inspection ? totalTriangles.toLocaleString('en-US') : '--'} />
            <StatPill label="BONES" value={inspection?.bones.length ?? '--'} />
            <StatPill label="TEXTURES" value={inspection?.textureCount ?? '--'} />
            <StatPill label="SCALE" value={inspection ? `${inspection.normalizationScale.toFixed(4)}x` : '--'} />
          </div>
        </section>

        <aside className={css('inspection-rail')}>
          <section className={css('inspection-card asset-card')}>
            <div className={css('card-title')}><Layers3 size={17} /><span>ASSET READOUT</span></div>
            <dl>
              <div><dt>URL</dt><dd>{character.assetUrl}</dd></div>
              <div><dt>HTTP probe</dt><dd className={css(`probe-${assetProbe.state}`)}>{assetProbe.detail}</dd></div>
              <div><dt>Target height</dt><dd>{character.targetHeight.toFixed(2)}</dd></div>
              <div><dt>Source ground</dt><dd>{character.sourceGroundY ?? sourceBounds?.min[1].toFixed(3) ?? '--'}</dd></div>
              <div><dt>Source min</dt><dd>{sourceBounds ? formatVector(sourceBounds.min) : '--'}</dd></div>
              <div><dt>Source max</dt><dd>{sourceBounds ? formatVector(sourceBounds.max) : '--'}</dd></div>
              <div><dt>Source size</dt><dd>{sourceBounds ? formatVector(sourceBounds.size) : '--'}</dd></div>
              <div><dt>Materials</dt><dd>{inspection?.materialCount ?? '--'}</dd></div>
            </dl>
          </section>

          <section className={css('inspection-card')}>
            <div className={css('card-title')}><Bone size={17} /><span>SKELETON TREE</span><em>{inspection?.bones.length ?? 0}</em></div>
            <div className={css('bone-list')}>
              {!inspection && <EmptyPanel />}
              {inspection?.bones.map((bone, index) => (
                <div className={css('bone-row')} key={`${bone.name}-${index}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><strong>{bone.name}</strong><small>{bone.parent ?? 'scene root'}</small></div>
                </div>
              ))}
            </div>
          </section>

          <section className={css(`inspection-card validation-card ${inspection?.missingRequiredBones.length ? 'has-error' : ''}`)}>
            <div className={css('card-title')}><ShieldCheck size={17} /><span>RUNTIME CHECK</span></div>
            {!inspection ? <p>Dang doi model...</p> : (
              <>
                <p><i /> GLB scene loaded</p>
                <p className={css(assetProbe.state === 'error' ? 'error-copy' : '')}><i /> Asset request: {assetProbe.detail}</p>
                <p><i /> {inspection.meshes.length} renderable meshes</p>
                <p><i /> {inspection.textureCount} texture bindings</p>
                <p><i /> Ground aligned by parent transform</p>
                {inspection.missingRequiredBones.length > 0 && (
                  <p className={css('error-copy')}>Missing bones: {inspection.missingRequiredBones.join(', ')}</p>
                )}
              </>
            )}
          </section>
        </aside>
      </section>
    </main>
  );
}
