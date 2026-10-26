import type { GameCommand, GameState } from '../../shared/game';
import styles from '../styles/Control.module.css';

export function LiveConnectionPanel({ state, disabled, send }: {
  state: GameState; disabled: boolean; send: (command: GameCommand) => Promise<void>;
}) {
  const live = state.connection.tiktok;
  const active = ['CONNECTED', 'CONNECTING', 'RETRYING'].includes(live.status);
  return <section className={styles.connectionPanel} aria-label="TikTok connection">
    <div><h2>TikTok LIVE <small data-testid="tiktok-status">{live.status}</small></h2>
      <p role="status">{live.message}</p>
      <p>{live.username ? `@${live.username}` : 'Chua chon tai khoan'} / {state.connection.mode} MODE
        {live.roomId && ` / Room ${live.roomId}`}{live.attempt > 0 && ` / Lan thu ${live.attempt}`}
        {live.retryAt && ` / Thu lai luc ${new Date(live.retryAt).toLocaleTimeString()}`}</p>
      {!live.configured && <p>Cau hinh TIKTOK_ENABLED=true va TIKTOK_USERNAME trong .env, khoi dong lai server roi bam Connect.</p>}
      <p>Connector khong chinh thuc, phu thuoc TikTok va dich vu ky Euler Stream. Chua kiem thu voi phien LIVE that.</p>
    </div>
    <div className={styles.connectionActions}>
      <button disabled={disabled || !live.configured || active} onClick={() => void send({ type: 'liveConnection', matchId: state.matchId, action: 'connect' })}>Connect TikTok</button>
      <button disabled={disabled || !active} onClick={() => void send({ type: 'liveConnection', matchId: state.matchId, action: 'mock' })}>Use Mock / Stop retry</button>
      <small>Ket noi that se tam khoa cac nut gia lap. Diem chi nhan khi PLAYING.</small>
    </div>
  </section>;
}
