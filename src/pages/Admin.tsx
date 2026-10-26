import { useEffect, useState } from 'react';
import { useGameServer } from '../hooks/useGameServer';
import type { GameConfig } from '../../shared/game';
import type { MockRequest } from '../../shared/live';
import styles from '../styles/Admin.module.css';

export function Admin() {
  const { snapshot, connected, error, pending, send, sendMock, mockResults } = useGameServer();
  const state = snapshot?.state;
  const [config, setConfig] = useState<GameConfig | null>(null);
  const configKey = JSON.stringify(state?.config ?? null);
  useEffect(() => { if (state) setConfig(state.config); }, [configKey]);
  useEffect(() => { document.title = 'Game Admin / Ronaldo vs Messi'; }, []);
  if (!state || !config) return <main className={styles.page}><p role="status">Đang kết nối game server...</p></main>;
  const disabled = !connected || pending;
  const seconds = Math.ceil(state.remainingMs / 1000);
  const timer = state.config.unlimitedTime && ['WAITING', 'PLAYING'].includes(state.status) ? '∞' : `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  const simple = (type: 'start' | 'pause' | 'resume' | 'reset' | 'finish') => { void send({ type, matchId: state.matchId }); };
  const giftDisabled = disabled || state.status !== 'PLAYING' || state.connection.mode !== 'MOCK';
  const simulateGift = (giftId: 'rose' | 'cookie') => {
    if (giftDisabled) return;
    const request: MockRequest = { requestId: crypto.randomUUID(), matchId: state.matchId, round: state.round,
      user: { id: 'admin-demo', username: 'Admin demo' }, action: 'gift', giftId, count: 1 };
    void sendMock(request);
  };
  return <main className={styles.page}>
    <header className={styles.header}>
      <a className={styles.logo} href="/">R <span>VS</span> M</a>
      <nav><a href="/overlay" target="_blank" rel="noreferrer">Màn hình game</a><a href="/control">Đồ họa & hiệu ứng</a></nav>
    </header>
    <div className={styles.heading}><h1>Điều khiển trận đấu</h1><p>1 hoa = 1 điểm Ronaldo và 1 lần SIUUU. 1 bánh quy = 1 điểm Messi và 1 lần ăn bánh.</p></div>
    {error && <p className={styles.error} role="alert">{error}</p>}
    <section className={styles.scoreboard} aria-label="Tỉ số">
      <div><span>Ronaldo</span><strong>{state.scores.ronaldo}</strong><small>Hoa</small></div>
      <div className={styles.clock}><span>{state.status}</span><strong>{timer}</strong><small>{state.config.unlimitedTime ? 'Không giới hạn' : 'Thời gian còn lại'}</small></div>
      <div><span>Messi</span><strong>{state.scores.messi}</strong><small>Bánh quy</small></div>
    </section>
    <section className={styles.actions} aria-label="Điều khiển">
      <button className={styles.primary} disabled={disabled || state.status !== 'WAITING'} onClick={() => simple('start')}>Bắt đầu</button>
      <button disabled={disabled || !['PLAYING', 'COUNTDOWN', 'ROUND_END'].includes(state.status)} onClick={() => simple('pause')}>Tạm dừng</button>
      <button disabled={disabled || state.status !== 'PAUSED'} onClick={() => simple('resume')}>Tiếp tục</button>
      <button disabled={disabled || !['PLAYING', 'PAUSED'].includes(state.status)} onClick={() => simple('finish')}>Kết thúc</button>
      <button disabled={disabled} onClick={() => simple('reset')}>Trận mới</button>
    </section>
    <section className={styles.giftTest} aria-label="Giả lập tặng quà">
      <div><h2>Giả lập tặng quà</h2><p>Bấm để thử nhanh điểm và hoạt ảnh. Mỗi lần bấm là một quà.</p></div>
      <div className={styles.giftButtons}>
        <button disabled={giftDisabled} onClick={() => simulateGift('rose')}>🌹 Tặng hoa <b>+1 Ronaldo</b></button>
        <button disabled={giftDisabled} onClick={() => simulateGift('cookie')}>🍪 Tặng bánh quy <b>+1 Messi</b></button>
      </div>
      {state.connection.mode !== 'MOCK' && <p className={styles.giftResult}>Đang nhận TikTok LIVE. Chọn Use Mock trong Control để thử quà giả lập.</p>}
      {mockResults.length > 0 && <output className={styles.giftResult} role="status">{mockResults.at(-1)?.message}</output>}
    </section>
    <form className={styles.settings} onSubmit={event => {
      event.preventDefault();
      void send({ type: 'configure', matchId: state.matchId, config: { ...config, simpleMode: true, rounds: 1, countdownSeconds: 0, roundBreakSeconds: 0, tieBreaker: 'draw' } });
    }}>
      <div><h2>Cài đặt cơ bản</h2><p>Chỉnh trước khi bắt đầu. Trận mới chỉ có một lượt chơi.</p></div>
      <fieldset disabled={disabled || state.status !== 'WAITING'}>
        <label>Thời gian
          <select value={config.unlimitedTime ? 'unlimited' : 'timed'} onChange={event => setConfig(previous => previous && ({ ...previous, unlimitedTime: event.target.value === 'unlimited' }))}>
            <option value="timed">Có giới hạn</option><option value="unlimited">Không giới hạn</option>
          </select>
        </label>
        {!config.unlimitedTime && <label>Số giây<input type="number" min={1} max={3600} required value={config.roundSeconds} onChange={event => setConfig(previous => previous && ({ ...previous, roundSeconds: Number(event.target.value) }))} /></label>}
        <label>Tốc độ Ronaldo <b>{config.ronaldoSpeed.toFixed(1)}×</b><input type="range" min={0.5} max={2.5} step={0.1} value={config.ronaldoSpeed} onChange={event => setConfig(previous => previous && ({ ...previous, ronaldoSpeed: Number(event.target.value) }))} /></label>
        <label>Tốc độ Messi <b>{config.messiSpeed.toFixed(1)}×</b><input type="range" min={0.5} max={2.5} step={0.1} value={config.messiSpeed} onChange={event => setConfig(previous => previous && ({ ...previous, messiSpeed: Number(event.target.value) }))} /></label>
        <button className={styles.primary} type="submit">Lưu cài đặt</button>
      </fieldset>
    </form>
  </main>;
}
