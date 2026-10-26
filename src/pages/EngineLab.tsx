import { useEffect, useState } from 'react';
import { DEFAULT_CONFIG, type GameConfig, type GameCommand } from '../../shared/game';
import { useGameServer } from '../hooks/useGameServer';
import styles from '../styles/EngineLab.module.css';

const names = { ronaldo: 'RONALDO', messi: 'MESSI', draw: 'HOA' };
export function EngineLab() {
  const { snapshot, connected, error, pending, send } = useGameServer();
  const state = snapshot?.state;
  const [config, setConfig] = useState<GameConfig>(DEFAULT_CONFIG);
  const [timer, setTimer] = useState(30);
  const configKey = JSON.stringify(state?.config ?? DEFAULT_CONFIG);
  useEffect(() => { setConfig(JSON.parse(configKey) as GameConfig); }, [configKey]);
  const disabled = !connected || !state || pending;
  const seconds = Math.ceil((state?.remainingMs ?? 0) / 1000);
  const clock = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  const phase = state?.status === 'PAUSED' ? state.pausedFrom : state?.status;
  const timerLabel = phase === 'COUNTDOWN' ? 'CHUAN BI' : phase === 'ROUND_END' ? 'NGHI GIUA HIEP' : 'THOI GIAN HIEP';
  function simple(type: 'start' | 'pause' | 'resume' | 'reset') {
    if (state) void send({ type, matchId: state.matchId });
  }
  function dispatch(command: GameCommand) { void send(command); }

  return <main className={styles.shell}>
    <header className={styles.header}><a href="/stadium">R <i>VS</i> M</a><span>PHASE 04 / ENGINE LAB</span><nav><a href="/stadium">Stadium</a><a href="/debug">Model Lab</a></nav></header>
    <section className={styles.intro}><div><p>THE MATCH IS IN YOUR HANDS</p><h1>Match engine<span>.</span></h1></div><div className={styles.connection} data-connected={connected} role="status">{connected ? 'SERVER CONNECTED' : 'DISCONNECTED / DANG KET NOI'}<small>{state?.connection.clients ?? 0} clients / TikTok: {state?.connection.live ?? 'DISCONNECTED'}</small></div></section>
    <p className={styles.note}>Kiem thu diem, timer va hiep. Cac nut +10 la diem thu cong. Mo phong gift/follow/comment tai <a href="/mock">Mock LIVE</a>. Mo hai tab de xem cung mot tran.</p>
    {error && <p className={styles.error} role="alert">{error}</p>}
    {!connected && state && <p className={styles.error}>Dang hien snapshot cu. Diem va timer se cap nhat khi server ket noi lai.</p>}
    <section className={styles.board} aria-label="Match state">
      <div className={styles.phase}><span data-testid="match-status">{state?.status ?? 'CONNECTING'}</span><span>{state?.overtime ? 'HIEP PHU' : 'HIEP'} {state?.round ?? 0} / {state?.config.rounds ?? 3}</span></div>
      <div className={styles.scores}>
        <div className={styles.ronaldo}><h2>RONALDO</h2><strong data-testid="ronaldo-score">{state?.scores.ronaldo ?? 0}</strong><p>{state?.roundWins.ronaldo ?? 0} HIEP THANG / {state?.totalScores.ronaldo ?? 0} TONG DIEM</p></div>
        <div className={styles.clock}><small>{timerLabel}</small><strong data-testid="match-timer">{clock}</strong><small>{state?.status === 'PAUSED' ? `PAUSED / ${state.pausedFrom}` : 'SERVER TIMER'}</small></div>
        <div className={styles.messi}><h2>MESSI</h2><strong data-testid="messi-score">{state?.scores.messi ?? 0}</strong><p>{state?.roundWins.messi ?? 0} HIEP THANG / {state?.totalScores.messi ?? 0} TONG DIEM</p></div>
      </div>
      {state?.winner && <h2 className={styles.result} role="status">{state.winner === 'draw' ? 'TRAN DAU HOA' : `${names[state.winner]} WINS!`}</h2>}
      <div className={styles.actions}>
        <button disabled={disabled || state?.status !== 'WAITING'} onClick={() => simple('start')}>Start</button>
        <button disabled={disabled || !['COUNTDOWN', 'PLAYING', 'ROUND_END'].includes(state?.status ?? '')} onClick={() => simple('pause')}>Pause</button>
        <button disabled={disabled || state?.status !== 'PAUSED'} onClick={() => simple('resume')}>Resume</button>
        <button disabled={disabled} onClick={() => simple('reset')}>Reset / New match</button>
      </div>
      <div className={styles.actions}>{(['ronaldo', 'messi'] as const).map(team => <button key={team} disabled={disabled || state?.status !== 'PLAYING'} onClick={() => state && dispatch({ type: 'addScore', matchId: state.matchId, round: state.round, team, points: 10 })}>{names[team]} +10</button>)}</div>
    </section>
    <section className={styles.settings}>
      <form onSubmit={event => { event.preventDefault(); if (state) dispatch({ type: 'configure', matchId: state.matchId, config }); }}>
        <h2>Match rules</h2><p>Chi luu khi WAITING. Moi hiep reset diem hiep; ket qua tran dua tren so hiep thang.</p>
        <fieldset disabled={disabled || state?.status !== 'WAITING'}>
          {([
            ['rounds', 'So hiep', 1, 21], ['roundSeconds', 'Giay / hiep', 1, 3600],
            ['countdownSeconds', 'Countdown (giay)', 0, 30], ['roundBreakSeconds', 'Nghi giua hiep (giay)', 0, 60],
            ['overtimeSeconds', 'Hiep phu (giay)', 1, 3600], ['maxOvertimeRounds', 'Toi da hiep phu', 1, 5],
          ] as const).map(([key, label, min, max]) => <label key={key}>{label}<input type="number" required min={min} max={max} step={1} value={config[key]} onChange={event => setConfig(previous => ({ ...previous, [key]: Number(event.target.value) }))} /></label>)}
          <label>Khi hoa<select value={config.tieBreaker} onChange={event => setConfig(previous => ({ ...previous, tieBreaker: event.target.value as GameConfig['tieBreaker'] }))}><option value="draw">Ket thuc hoa</option><option value="overtime">Choi hiep phu</option></select></label>
          <button type="submit">Luu cau hinh</button>
        </fieldset>
      </form>
      <div><h2>Round clock</h2><p>Ap dung cho PLAYING hoac PAUSED cua hiep dang choi. Dat 0 ket thuc hiep khi timer chay.</p>
        <form className={styles.timerForm} onSubmit={event => { event.preventDefault(); if (state) dispatch({ type: 'setTimer', matchId: state.matchId, seconds: timer }); }}>
          <label>So giay con lai<input type="number" required min={0} max={3600} step={1} value={timer} onChange={event => setTimer(Number(event.target.value))} /></label>
          <button disabled={disabled || phase !== 'PLAYING'}>Dat timer</button>
        </form>
        <h2>Round results</h2>
        <ol className={styles.results}>{state?.roundResults.map(round => <li key={round.round}><span>{round.overtime ? 'PHU' : 'HIEP'} {round.round}</span><b>{round.scores.ronaldo} : {round.scores.messi}</b><span>{names[round.winner]}</span></li>)}</ol>
        {!state?.roundResults.length && <p>Chua co hiep ket thuc.</p>}
      </div>
    </section>
    <footer className={styles.footer}>MATCH {state?.matchId ?? '--'} / REV {state?.revision ?? 0}<br />Snapshot luu tai server. Refresh trang khong tao tran moi. Backend khoi dong lai se phuc hoi va tam dung tran.</footer>
  </main>;
}
