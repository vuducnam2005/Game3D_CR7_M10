import { useEffect, useRef, useState } from 'react';
import { DEFAULT_LIVE_CONFIG, animationSchema, liveConfigSchema, type GiftMapping, type LiveConfig, type MockRequest } from '../../shared/live';
import { useGameServer } from '../hooks/useGameServer';
import { MockAudio } from '../live/MockAudio';
import { StadiumPreview } from './StadiumPreview';
import base from '../styles/EngineLab.module.css';
import styles from '../styles/MockLiveLab.module.css';
import controlStyles from '../styles/Control.module.css';
import { OverlayView } from '../live/OverlayView';
import { ControlSettings } from '../live/ControlSettings';
import { LiveConnectionPanel } from '../live/LiveConnectionPanel';
import type { SceneMetrics } from '../scene/ScenePerformance';

export function MockLiveLab({ control = false }: { control?: boolean }) {
  const { snapshot, connected, error, pending, send, sendMock, mockResults } = useGameServer();
  const state = snapshot?.state;
  const [userId, setUserId] = useState('viewer-1');
  const [username, setUsername] = useState('football_fan');
  const [selectedGift, setSelectedGift] = useState('rose');
  const [giftCount, setGiftCount] = useState(1);
  const [config, setConfig] = useState<LiveConfig>(DEFAULT_LIVE_CONFIG);
  const [formError, setFormError] = useState('');
  const [audioOn, setAudioOn] = useState(false);
  const [audio] = useState(() => new MockAudio());
  const [metrics, setMetrics] = useState<SceneMetrics | null>(null);
  const lastRequest = useRef<MockRequest | null>(null);
  const configKey = JSON.stringify(state?.live.config ?? DEFAULT_LIVE_CONFIG);
  useEffect(() => { setConfig(JSON.parse(configKey)); }, [configKey]);
  useEffect(() => () => audio.dispose(), [audio]);
  useEffect(() => audio.setVolume(audioOn ? .6 : 0), [audio, audioOn]);
  const mappings = state?.config.simpleMode ? state.live.config.mappings.filter(gift => gift.id === 'rose' || gift.id === 'cookie') : state?.live.config.mappings ?? DEFAULT_LIVE_CONFIG.mappings;
  useEffect(() => { if (!mappings.some(item => item.id === selectedGift)) setSelectedGift(mappings[0].id); }, [mappings, selectedGift]);
  const disabled = !connected || !state || pending;
  const mockDisabled = disabled || state?.connection.mode !== 'MOCK';
  const giftDisabled = mockDisabled || state?.status !== 'PLAYING';

  function simulate(action: MockRequest['action'], options: Partial<MockRequest> = {}) {
    if (mockDisabled) return;
    if (!state || !userId.trim() || !username.trim()) { setFormError('Nhap User ID va username.'); return; }
    setFormError('');
    const request: MockRequest = { requestId: crypto.randomUUID(), matchId: state.matchId, round: state.round,
      user: { id: userId.trim(), username: username.trim() }, action, ...options };
    lastRequest.current = request;
    void sendMock(request);
  }
  function edit(index: number, patch: Partial<GiftMapping>) {
    setConfig(previous => ({ ...previous, mappings: previous.mappings.map((item, i) => i === index ? { ...item, ...patch } : item) }));
  }
  function simple(type: 'start' | 'pause' | 'resume' | 'reset') { if (state) void send({ type, matchId: state.matchId }); }
  const seconds = Math.ceil((state?.remainingMs ?? 0) / 1000);
  return <main className={`${base.shell} ${styles.shell} ${control ? controlStyles.shell : ''}`} onClickCapture={event => { if (audioOn && event.target instanceof Element && event.target.closest('button')) audio.play('ui'); }}>
    <header className={base.header}><a href="/stadium">R <i>VS</i> M</a><span>{control ? 'LIVE BATTLE / CONTROL ROOM' : 'LIVE BATTLE / MOCK LAB'}</span><nav><a href="/overlay" target="_blank" rel="noreferrer">Open Overlay</a><a href="/admin">Admin</a><a href={control ? '/mock' : '/control'}>{control ? 'Mock Lab' : 'Control'}</a><a href="/debug">Model Lab</a></nav></header>
    <section className={base.intro}><div><p>{control ? 'ONE ARENA. EVERY SCREEN.' : 'GIFTS IN. LEGENDS ON.'}</p><h1>{control ? 'Run the show' : 'Make some noise'}<span>.</span></h1></div><div className={base.connection} data-connected={connected} role="status">{state?.connection.mode ?? 'MOCK'} {connected ? 'READY' : 'DISCONNECTED'}<small>TikTok LIVE: {state?.connection.tiktok.status ?? 'DISCONNECTED'} / {state?.connection.clients ?? 0} clients</small></div></section>
    <p className={base.note}>{control ? 'Live preview 9:16 / am thanh tat trong preview. Diem, timer va hien thi dong bo voi Overlay.' : 'Mo phong local, khong can tai khoan TikTok. Start de nhan diem. Follow/comment hoat dong ca khi tran cho.'}</p>
    {!connected && state && <p className={base.error}>Mat ket noi. Dang hien snapshot cu; cac nut se mo lai khi dong bo.</p>}
    {(error || formError) && <p className={base.error} role="alert">{error || formError}</p>}
    {state && <LiveConnectionPanel state={state} disabled={disabled} send={send} />}
    <div className={styles.scorebar} aria-label="Live scoreboard"><span data-testid="mock-ronaldo-score">CR7 <b>{state?.scores.ronaldo ?? 0}</b></span><div><strong data-testid="mock-status">{state?.status ?? 'CONNECTING'}</strong><small>{state?.config.simpleMode ? '1 FLOWER = 1 SIUUU' : `ROUND ${state?.round ?? 0} / ${state?.config.rounds ?? 3}`} &nbsp; {state?.config.unlimitedTime && ['WAITING', 'PLAYING'].includes(state.status) ? '∞' : `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`}</small></div><span data-testid="mock-messi-score"><b>{state?.scores.messi ?? 0}</b> M10</span></div>
    <div className={control ? controlStyles.battle : styles.battle}>
      <section className={control ? controlStyles.preview : styles.preview} aria-label={control ? 'Live overlay preview' : 'Mock live preview'}>{state && (control ? <OverlayView state={state} connected={connected} onMetrics={setMetrics} /> : <StadiumPreview liveState={state} audio={audioOn ? audio : undefined} />)}
        {control && <div className={controlStyles.debug} aria-label="Preview diagnostics"><span>{metrics ? `${metrics.fps} FPS / ${metrics.level}` : 'Loading renderer...'}</span><span>{metrics?.calls ?? 0} calls / {metrics?.triangles.toLocaleString() ?? 0} triangles</span><span>REV {state?.revision ?? 0} / Preview GPU only</span></div>}
      </section>
      <aside className={styles.desk}>
        <h2>Live desk</h2>
        <div className={base.actions}>
          <button disabled={disabled || state?.status !== 'WAITING'} onClick={() => simple('start')}>Start</button>
          <button disabled={disabled || !['PLAYING', 'COUNTDOWN', 'ROUND_END'].includes(state?.status ?? '')} onClick={() => simple('pause')}>Pause</button>
          <button disabled={disabled || state?.status !== 'PAUSED'} onClick={() => simple('resume')}>Resume</button>
          <button disabled={disabled} onClick={() => simple('reset')}>New match</button>
        </div>
        <div className={styles.identity}><label>User ID<input maxLength={128} value={userId} onChange={event => setUserId(event.target.value)} /></label><label>Username<input maxLength={80} value={username} onChange={event => setUsername(event.target.value)} /></label></div>
        <div className={styles.gifts}>{mappings.map(gift => <div key={gift.id} data-team={gift.team}><span>{gift.name}<small>{state?.config.simpleMode ? 1 : gift.points} pt / {gift.team.toUpperCase()}</small></span>{[1, 10].map(count => <button key={count} disabled={giftDisabled} onClick={() => simulate('gift', { giftId: gift.id, count })}>{gift.name} x{count}</button>)}</div>)}</div>
        <div className={styles.custom}><label>Gift<select value={selectedGift} onChange={event => setSelectedGift(event.target.value)}>{mappings.map(gift => <option key={gift.id} value={gift.id}>{gift.name}</option>)}</select></label><label>Count<input type="number" min={1} max={100} step={1} value={giftCount} onChange={event => setGiftCount(Number(event.target.value))} /></label><button disabled={giftDisabled || !Number.isInteger(giftCount) || giftCount < 1 || giftCount > 100} onClick={() => simulate('gift', { giftId: selectedGift, count: giftCount })}>Send gift</button></div>
        {!state?.config.simpleMode && <><h3>Streak + duplicate test</h3><div className={base.actions}>{[3, 5, 10, 20].map(count => <button key={count} disabled={giftDisabled} onClick={() => simulate('streak', { giftId: selectedGift, count })}>Combo x{count}</button>)}</div></>}
        <div className={base.actions}><button disabled={mockDisabled} onClick={() => simulate('like', { count: 10 })}>Like x10 / Crowd cheer</button><span>Likes: {state?.live.likeCount ?? 0} / +0 points</span></div>
        <p>Moi combo gui cumulative counts, 1 event lap va repeatEnd. Chi phan gift moi duoc cong diem.</p>
        <div className={base.actions}><button disabled={mockDisabled} onClick={() => simulate('follow')}>Follow</button>{['CR7', 'M10', '!cr7', '!m10'].map(text => <button key={text} disabled={mockDisabled} onClick={() => simulate('comment', { text })}>Comment {text}</button>)}</div>
        <div className={base.actions}><button disabled={mockDisabled || !lastRequest.current} onClick={() => lastRequest.current && void sendMock(lastRequest.current)}>Replay last</button>{!control && <button aria-pressed={audioOn} onClick={() => { if (audioOn) setAudioOn(false); else void audio.unlock().then(setAudioOn).catch(() => setFormError('Khong the bat Web Audio.')); }}>{audioOn ? 'Mute sounds' : 'Enable sounds'}</button>}</div>
        {mockResults.length > 0 && <output className={styles.ack} data-testid="mock-ack">+{mockResults.reduce((sum, result) => sum + result.points, 0)} points / {mockResults.filter(result => result.status === 'duplicate').length} duplicate(s)<small>{mockResults.map(result => result.status).join(' / ')}</small></output>}
      </aside>
    </div>
    {control && state && <ControlSettings state={state} disabled={disabled} send={send} />}
    <section className={styles.stats} aria-label="Live statistics">
      <div><span>FOLLOWERS</span><b data-testid="followers">{state?.live.followerCount ?? 0}</b></div><div><span>GIFTS COUNTED</span><b>{state?.live.giftCount ?? 0}</b></div>
      {(['ronaldo', 'messi'] as const).map(team => <div key={team}><span>{team.toUpperCase()} MEMBERS / COMBO</span><b>{state?.teamMembers.filter(member => member.team === team).length ?? 0} / x{state?.combos[team] ?? 0}</b></div>)}
    </section>
    <section className={styles.history}>
      <div><h2>Gift feed</h2><ol>{state?.giftHistory.slice(0, 8).map((gift, index) => <li key={`${gift.eventId}-${index}`}><span>@{gift.username}<small>{gift.giftName} x{gift.count} / {gift.team}</small></span><b>+{gift.points}</b></li>)}</ol>{!state?.giftHistory.length && <p>Chua co gift duoc tinh diem.</p>}</div>
      <div><h2>Top 3 supporters</h2>{(['ronaldo', 'messi'] as const).map(team => <div key={team}><h3>{team.toUpperCase()}</h3><ol>{state?.topSupporters.filter(item => item.team === team).map((supporter, i) => <li key={supporter.userId}><span>#{i + 1} @{supporter.username}<small>{supporter.giftCount} gifts</small></span><b>{supporter.contribution} pts</b></li>)}</ol></div>)}</div>
      <div><h2>Event log</h2><p>{state?.live.suppressedNotices ?? 0} notices limited / {state?.live.droppedEffects ?? 0} effects dropped</p><ol className={styles.eventLog}>{state?.live.log.slice(0, 12).map(item => <li key={item.id}><span>{item.type.toUpperCase()}<small>{item.message}</small></span></li>)}</ol></div>
    </section>
    {!state?.config.simpleMode && <section className={styles.mapping}><h2>Gift mapping & rules</h2><p>Luu khi WAITING. rose/cookie/trophy la ID gia lap. TikTok can ID so dung cua room/khu vuc; ten qua khong quyet dinh team. Gift chua mapping khong cong diem; Event log hien ID de cau hinh. Combo mac dinh chi la hieu ung.</p>
      <form onSubmit={event => { event.preventDefault(); const parsed = liveConfigSchema.safeParse(config); if (!parsed.success) { setFormError(parsed.error.issues[0].message); return; } setFormError(''); if (state) void send({ type: 'liveConfig', matchId: state.matchId, config: parsed.data }); }}>
        <fieldset disabled={disabled || state?.status !== 'WAITING'}>
          <div className={styles.rules}><label><input type="checkbox" checked={config.allowTeamChange} onChange={event => setConfig(previous => ({ ...previous, allowTeamChange: event.target.checked }))} /> Cho phep doi team</label><label><input type="checkbox" checked={config.comboMultiplier} onChange={event => setConfig(previous => ({ ...previous, comboMultiplier: event.target.checked }))} /> Combo nhan diem (x2 tu 5, x3 tu 10, x5 tu 20)</label><label>Combo window (ms)<input type="number" required min={500} max={30000} value={config.comboWindowMs} onChange={event => setConfig(previous => ({ ...previous, comboWindowMs: Number(event.target.value) }))} /></label><label>Notice cooldown (ms)<input type="number" required min={500} max={10000} value={config.notificationCooldownMs} onChange={event => setConfig(previous => ({ ...previous, notificationCooldownMs: Number(event.target.value) }))} /></label></div>
          <div className={styles.mappingRows}>{config.mappings.map((gift, index) => <div className={styles.mappingRow} key={index}>
            <label>Gift ID<input required maxLength={128} value={gift.id} onChange={event => edit(index, { id: event.target.value })} /></label>
            <label>Name<input required maxLength={60} value={gift.name} onChange={event => edit(index, { name: event.target.value })} /></label>
            <label>Team<select value={gift.team} onChange={event => { const team = event.target.value as GiftMapping['team']; edit(index, { team, animation: team === 'messi' ? 'Messi Celebrate' : 'SIUUU' }); }}><option value="ronaldo">Ronaldo</option><option value="messi">Messi</option></select></label>
            <label>Points<input type="number" required min={0} max={10000} value={gift.points} onChange={event => edit(index, { points: Number(event.target.value) })} /></label>
            <label>Animation<select value={gift.animation} onChange={event => edit(index, { animation: event.target.value as GiftMapping['animation'] })}>{animationSchema.options.filter(name => gift.team === 'messi' ? name.startsWith('Messi ') : !name.startsWith('Messi ')).map(name => <option key={name}>{name}</option>)}</select></label>
            <label>Sound<select value={gift.sound} onChange={event => edit(index, { sound: event.target.value as GiftMapping['sound'] })}>{['gift', 'chime', 'boost', 'none'].map(name => <option key={name}>{name}</option>)}</select></label>
            <label>Effect<select value={gift.effect} onChange={event => edit(index, { effect: event.target.value as GiftMapping['effect'] })}>{['red', 'blue', 'gold', 'none'].map(name => <option key={name}>{name}</option>)}</select></label>
            <label>Cooldown ms<input type="number" required min={0} max={30000} value={gift.cooldownMs} onChange={event => edit(index, { cooldownMs: Number(event.target.value) })} /></label>
            <label>Priority<input type="number" required min={0} max={3} value={gift.priority} onChange={event => edit(index, { priority: Number(event.target.value) })} /></label>
            <button type="button" disabled={config.mappings.length < 2} onClick={() => setConfig(previous => ({ ...previous, mappings: previous.mappings.filter((_, i) => i !== index) }))}>Remove</button>
          </div>)}</div>
          <div className={base.actions}><button type="button" disabled={config.mappings.length >= 30} onClick={() => setConfig(previous => ({ ...previous, mappings: [...previous.mappings, { ...DEFAULT_LIVE_CONFIG.mappings[0], id: `gift-${crypto.randomUUID().slice(0, 8)}`, name: 'New gift' }] }))}>Add mapping</button><button type="submit">Save live rules</button></div>
        </fieldset>
      </form>
    </section>}
    <footer className={base.footer}>MATCH {state?.matchId ?? '--'} / {state?.connection.mode ?? 'MOCK'} MODE<br />Diem, ledger va hien thi luu cung snapshot local. Refresh khong reset tran. <a href="/control">Control</a> / <a href="/overlay">Overlay</a></footer>
  </main>;
}
