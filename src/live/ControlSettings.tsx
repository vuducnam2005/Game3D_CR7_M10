import { useEffect, useState } from 'react';
import type { GameCommand, GameState } from '../../shared/game';
import { animationSchema } from '../../shared/live';
import type { Presentation, PresentationPatch } from '../../shared/presentation';
import { AudioSettings } from './AudioSettings';
import { resultPresentation } from './presentationEvents';
import styles from '../styles/Control.module.css';

export function ControlSettings({ state, disabled, send }: { state: GameState; disabled: boolean; send: (command: GameCommand) => Promise<void> }) {
  const p = state.presentation;
  const [config, setConfig] = useState(state.config);
  const [timer, setTimer] = useState(120);
  const [volume, setVolume] = useState(p.volume * 100);
  const configKey = JSON.stringify(state.config);
  useEffect(() => setConfig(JSON.parse(configKey)), [configKey]);
  useEffect(() => setVolume(p.volume * 100), [p.volume]);
  function patch(value: PresentationPatch) { void send({ type: 'presentation', matchId: state.matchId, patch: value }); }
  return <section className={styles.settings} aria-label="Broadcast settings">
    <div><h2>01 / Scene direction</h2><fieldset disabled={disabled}>
      <label>Camera<select value={p.camera} onChange={event => patch({ camera: event.target.value as Presentation['camera'], autoCamera: false })}>{['main', 'ronaldo', 'messi', 'victory'].map(value => <option key={value}>{value}</option>)}</select></label>
      <label>Victory focus<select value={p.victoryFocus} onChange={event => patch({ victoryFocus: event.target.value as Presentation['victoryFocus'] })}><option value="ronaldo">Ronaldo</option><option value="messi">Messi</option></select></label>
      <label>Background<select value={p.background} onChange={event => patch({ background: event.target.value as Presentation['background'] })}><option value="stadium">Stadium</option><option value="transparent">Transparent</option></select></label>
      <label>Render quality<select value={p.quality} onChange={event => patch({ quality: event.target.value as Presentation['quality'] })}>{['auto', 'low', 'standard', 'high'].map(value => <option key={value}>{value}</option>)}</select></label>
      {([['autoCamera', 'Auto celebration camera'], ['reducedMotion', 'Reduced motion'], ['effects', 'VFX glow / camera shake'], ['heavyEffects', 'Heavy effects / confetti & flash'], ['trophy', 'Messi floating trophy']] as const).map(([key, label]) => <label className={styles.check} key={key}><input type="checkbox" checked={p[key]} onChange={event => patch({ [key]: event.target.checked })} />{label}</label>)}
    </fieldset><p>Auto ha Low neu FPS thap keo dai. Low giam hat/confetti va tat flash; Reduced motion tat hat, confetti va rung. Ket qua tran tu chon camera dung nguoi thang.</p>
    <h3>Animation / +0 points</h3><div className={styles.animations}>{animationSchema.options.map(animation => <button key={animation} disabled={disabled || !!resultPresentation(state)} onClick={() => void send({ type: 'animate', matchId: state.matchId, animation, team: animation.startsWith('Messi ') ? 'messi' : 'ronaldo' })}>{animation}</button>)}</div>{resultPresentation(state) && <p>Dang hien ket qua. Preview animation mo lai khi sang hiep/tran moi.</p>}</div>
    <div><h2>02 / On-air HUD & sound</h2><fieldset disabled={disabled}>
      {(Object.keys(p.hud) as (keyof Presentation['hud'])[]).map(key => <label className={styles.check} key={key}><input type="checkbox" checked={p.hud[key]} onChange={event => patch({ hud: { [key]: event.target.checked } })} />Show {key}</label>)}
      <label className={styles.check}><input type="checkbox" checked={p.muted} onChange={event => patch({ muted: event.target.checked })} />Mute overlay audio</label>
      <form onSubmit={event => { event.preventDefault(); patch({ volume: volume / 100 }); }}><label>Master volume (%)<input type="number" min={0} max={100} required value={volume} onChange={event => setVolume(Number(event.target.value))} /></label><button>Apply volume</button></form>
    </fieldset><p>Preview luon im lang. Click vao trang Overlay de unlock audio; sau do bo Mute tai day. Moi Browser Source/tab can unlock rieng.</p>
    <AudioSettings files={p.audioFiles} disabled={disabled} onSave={files => patch({ audioFiles: files })} />
    <p>Overlay: phim F hoac double-click de fullscreen, Esc de thoat. OBS Browser Source: 1080 x 1920 hoac 720 x 1280.</p></div>
    {!state.config.simpleMode && <div><h2>03 / Game admin</h2><form onSubmit={event => { event.preventDefault(); void send({ type: 'configure', matchId: state.matchId, config }); }}><fieldset disabled={disabled || state.status !== 'WAITING'}>
      <label>So hiep<input type="number" required min={1} max={21} value={config.rounds} onChange={event => setConfig(previous => ({ ...previous, rounds: Number(event.target.value) }))} /></label>
      <label>Giay / hiep<input type="number" required min={1} max={3600} disabled={config.unlimitedTime} value={config.roundSeconds} onChange={event => setConfig(previous => ({ ...previous, roundSeconds: Number(event.target.value) }))} /></label>
      <label className={styles.check}><input type="checkbox" checked={config.unlimitedTime} onChange={event => setConfig(previous => ({ ...previous, unlimitedTime: event.target.checked }))} /> Khong gioi han thoi gian</label>
      <label>Toc do Ronaldo<input type="number" required min={0.5} max={2.5} step={0.1} value={config.ronaldoSpeed} onChange={event => setConfig(previous => ({ ...previous, ronaldoSpeed: Number(event.target.value) }))} /></label>
      <label>Toc do Messi<input type="number" required min={0.5} max={2.5} step={0.1} value={config.messiSpeed} onChange={event => setConfig(previous => ({ ...previous, messiSpeed: Number(event.target.value) }))} /></label>
      <label>Countdown (giay)<input type="number" required min={0} max={30} value={config.countdownSeconds} onChange={event => setConfig(previous => ({ ...previous, countdownSeconds: Number(event.target.value) }))} /></label>
      <label>Nghi giua hiep (giay)<input type="number" required min={0} max={60} value={config.roundBreakSeconds} onChange={event => setConfig(previous => ({ ...previous, roundBreakSeconds: Number(event.target.value) }))} /></label>
      <button>Luu cai dat game</button>
    </fieldset></form><p>Luu luat khi WAITING. New match xoa diem/ket qua, giu mapping va thiet lap hien thi.</p>
    <form onSubmit={event => { event.preventDefault(); void send({ type: 'setTimer', matchId: state.matchId, seconds: timer }); }}><fieldset disabled={disabled || state.config.unlimitedTime || !(state.status === 'PLAYING' || (state.status === 'PAUSED' && state.pausedFrom === 'PLAYING'))}><label>So giay con lai<input type="number" min={0} max={3600} required value={timer} onChange={event => setTimer(Number(event.target.value))} /></label><button>Dat timer</button></fieldset></form>
    </div>}
  </section>;
}
