import type { GameState } from '../../shared/game';
import { StadiumPreview } from '../pages/StadiumPreview';
import type { SceneMetrics } from '../scene/ScenePerformance';
import type { MockAudio } from './MockAudio';
import styles from '../styles/Overlay.module.css';
import { resultPresentation } from './presentationEvents';
import { useBroadcastEvents } from './useBroadcastEvents';
import { Star } from 'lucide-react';

export function formatClock(ms: number) {
  const seconds = Math.ceil(Math.max(0, ms) / 1000);
  return `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}
export function scoreShare(ronaldo: number, messi: number) { return ronaldo + messi === 0 ? 50 : ronaldo / (ronaldo + messi) * 100; }

export function OverlayView({ state, connected, audio, onMetrics }: { state: GameState; connected: boolean; audio?: MockAudio; onMetrics?: (value: SceneMetrics) => void }) {
  const { presentation: p, scores, live } = state;
  const supporterNotice = useBroadcastEvents(state, connected, audio);
  const result = resultPresentation(state);
  const seconds = Math.ceil(state.remainingMs / 1000);
  const countdown = state.status === 'PLAYING' && seconds > 0 && seconds <= 10;
  const roundStarted = state.status === 'PLAYING' && state.remainingMs > (state.overtime ? state.config.overtimeSeconds : state.config.roundSeconds) * 1000 - 2000;
  const leader = scores.ronaldo === scores.messi ? null : scores.ronaldo > scores.messi ? 'ronaldo' : 'messi';
  const share = scoreShare(scores.ronaldo, scores.messi);
  const phase = state.status === 'PAUSED' ? `PAUSED / ${state.pausedFrom}` : state.status;
  return <div className={styles.frame} data-testid="overlay-frame" data-background={p.background} data-effects={p.effects && !p.reducedMotion}>
    <div className={styles.arena}><StadiumPreview liveState={state} audio={audio} broadcast onMetrics={onMetrics} /></div>
    <header className={styles.top}>
      {state.config.simpleMode ? <><div className={styles.scores} aria-label="Overlay scores">
        <div data-team="ronaldo"><span>RONALDO</span><strong data-testid="overlay-ronaldo-score" data-long={String(scores.ronaldo).length > 7}>{scores.ronaldo.toLocaleString('en-US')}</strong><small>🌹 1 HOA = 1 SIUUU</small></div>
        <div data-team="messi"><span>MESSI</span><strong data-testid="overlay-messi-score" data-long={String(scores.messi).length > 7}>{scores.messi.toLocaleString('en-US')}</strong><small>🍪 1 BANH = 1 LAN AN</small></div>
      </div>{p.hud.scores && <div className={styles.power} aria-label={`Ronaldo ${Math.round(share)}%, Messi ${Math.round(100 - share)}%`}><i style={{ width: `${share}%` }} /><i style={{ width: `${100 - share}%` }} /></div>}
      {p.hud.timer && <div className={styles.round}><span>RONALDO VS MESSI</span><strong data-testid="overlay-timer">{state.config.unlimitedTime && (state.status === 'WAITING' || state.status === 'PLAYING' || state.pausedFrom === 'PLAYING') ? '∞' : formatClock(state.remainingMs)}</strong><span data-testid="overlay-status">{phase}</span></div>}</> : <>
        <div className={styles.brand}><span>RONALDO <i>VS</i> MESSI</span><small>THE LIVE BATTLE</small></div>
        {p.hud.timer && <div className={styles.round}><span>{state.overtime ? 'OVERTIME' : 'ROUND'} {state.round || 1}<small> / {state.config.rounds}</small></span><strong data-testid="overlay-timer">{formatClock(state.remainingMs)}</strong><span data-testid="overlay-status">{phase}</span></div>}
        {p.hud.scores && <><div className={styles.scores} aria-label="Overlay scores">{(['ronaldo', 'messi'] as const).map(team => <div key={team} data-team={team}><span>TEAM {team.toUpperCase()}</span><strong data-testid={`overlay-${team}-score`} data-long={String(scores[team]).length > 7}>{scores[team].toLocaleString('en-US')}</strong><small>{state.roundWins[team]} ROUND WINS</small></div>)}</div><div className={styles.power} aria-label={`Ronaldo ${Math.round(share)}%, Messi ${Math.round(100 - share)}%`}><i style={{ width: `${share}%` }} /><i style={{ width: `${100 - share}%` }} /></div></>}
        {p.hud.leader && <div className={styles.leader} data-team={leader ?? 'neutral'}>{state.winner ? state.winner === 'draw' ? 'MATCH DRAW' : `${state.winner.toUpperCase()} WINS!` : leader ? `${leader.toUpperCase()} LEADS` : 'EVERY GIFT CAN CHANGE THE GAME'}</div>}
      </>}
    </header>
    {p.hud.celebrations && <div className={styles.celebrations} aria-live="polite">
      {result ? <div className={styles.resultTitle} data-team={result.outcome}><small>{result.match ? 'FINAL RESULT' : `ROUND ${state.round} COMPLETE`}</small><strong>{result.outcome === 'draw' ? result.match ? 'MATCH DRAW' : 'ROUND DRAW' : `${result.outcome.toUpperCase()} WINS!`}</strong><span>{result.scores.ronaldo.toLocaleString('en-US')} : {result.scores.messi.toLocaleString('en-US')}{result.match && ' / TOTAL POINTS'}</span></div> : <>
      {state.leadChange && <div className={styles.leadChanged} key={`${state.leadChange.team}-${state.leadChange.endsAt}`}>LEAD CHANGED / {state.leadChange.team.toUpperCase()}</div>}
      <div className={styles.cues}>{(['ronaldo', 'messi'] as const).map(team => {
        const cue = live.celebrations[team].active;
        return <div key={team} data-team={team} data-effect={p.effects ? cue?.effect : 'none'}>{cue && <div key={cue.id}>
          <strong>{cue.animation === 'SIUUU' ? 'SIUUUU!' : cue.animation === 'Messi Eat Cookie' ? 'MESSI ĂN BÁNH!' : cue.animation === 'Messi Celebrate' ? 'MESSI MAGIC!' : cue.animation.toUpperCase()}</strong>
          {cue.tier > 0 && <b>COMBO x{cue.tier}</b>}
        </div>}</div>;
      })}</div></>}
    </div>}
    {p.hud.celebrations && !result && <div className={styles.phaseCue} data-urgent={countdown}>
      {state.status === 'COUNTDOWN' ? <>GET READY <strong>{seconds}</strong></> : countdown ? <>FINAL SECONDS <strong key={seconds}>{seconds}</strong></> : roundStarted ? 'ROUND START / MAKE SOME NOISE' : state.live.crowdUntil ? 'CROWD CHEER / THANKS FOR THE LIKES' : supporterNotice}
    </div>}
    <footer className={styles.bottom}>
      {result && p.hud.celebrations ? <section className={styles.supporters} aria-label="Top supporters"><h2>THE FANS BEHIND THE LEGENDS <small>TOP 3 / MATCH CONTRIBUTIONS</small></h2><div>{(['ronaldo', 'messi'] as const).map(team => <div key={team} data-team={team}><h3>TEAM {team.toUpperCase()}</h3>{state.topSupporters.filter(item => item.team === team).slice(0, 3).map((item, index) => <div className={styles.supporter} key={item.userId}><b>{index + 1}</b><span title={item.username}>@{item.username}<small>{item.giftCount} GIFTS</small></span><strong>{item.contribution.toLocaleString('en-US')}<small>PTS</small></strong></div>)}{!state.topSupporters.some(item => item.team === team) && <p>No gifts this match</p>}</div>)}</div></section> : <>
      {p.hud.hints && <div className={styles.hints}>{(['ronaldo', 'messi'] as const).map(team => <div key={team} data-team={team}><b>{team === 'ronaldo' ? 'CR7' : 'M10'}</b><span>{state.config.simpleMode ? team === 'ronaldo' ? '1 FLOWER = 1 POINT' : '1 COOKIE = 1 POINT' : live.config.mappings.filter(gift => gift.team === team).slice(0, 2).map(gift => `${gift.name} +${gift.points}`).join(' / ') || 'Comment to join'}</span><small>{state.config.simpleMode ? team === 'ronaldo' ? 'SIUUU EACH FLOWER' : 'EAT EACH COOKIE' : `COMMENT ${team === 'ronaldo' ? 'CR7' : 'M10'} TO JOIN`}</small></div>)}</div>}
      {p.hud.feed && <div className={styles.feed} aria-label="Gift and follow feed" aria-live="polite">{live.feed.length ? live.feed.slice(0, 3).map(item => <div key={item.id} data-team={item.team ?? 'neutral'}><span>{item.kind === 'follow' ? <Star aria-label="Follow star" size="1em" /> : item.kind.toUpperCase()}</span><p>{item.kind === 'gift' && <b>@{item.username} </b>}{item.text}</p></div>) : <div><span>WELCOME</span><p>Choose your legend. Make some noise.</p></div>}</div>}</>}
      {!connected && <div className={styles.offline} role="status">RECONNECTING / SHOWING LAST UPDATE</div>}
    </footer>
  </div>;
}
