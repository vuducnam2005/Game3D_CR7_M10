import { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import type { GameState } from '../../shared/game';
import type { MockAudio } from './MockAudio';
import styles from '../styles/LiveFeedback.module.css';

export function LiveFeedback({ state, audio }: { state: GameState; audio?: MockAudio }) {
  const seen = useRef(new Set<string>());
  useEffect(() => {
    const active = Object.values(state.live.celebrations).flatMap(lane => lane.active ? [{ id: lane.active.id, sound: lane.active.sound }] : []);
    const follows = state.live.feed.filter(item => item.kind === 'follow').map(item => ({ id: item.id, sound: 'follow' as const }));
    for (const item of [...active, ...follows]) {
      if (!seen.current.has(item.id)) { seen.current.add(item.id); audio?.play(item.sound); }
    }
    const visible = new Set([...active, ...follows].map(item => item.id));
    for (const id of seen.current) if (!visible.has(id)) seen.current.delete(id);
  }, [state.live, audio]);
  return <div className={styles.layer} aria-label="Live feedback">
    {(['ronaldo', 'messi'] as const).map(team => {
      const cue = state.live.celebrations[team].active;
      if (!cue) return null;
      return <div key={cue.id} className={styles.celebration} data-team={team} data-effect={cue.effect} data-tier={cue.tier}>
        <div className={styles.aura} />
        <strong>{cue.animation === 'SIUUU' ? 'SIUUUU!' : cue.animation === 'Messi Celebrate' ? 'MESSI MAGIC!' : cue.animation.toUpperCase()}</strong>
        {cue.tier > 0 && <b>COMBO x{cue.tier}</b>}
        <small>{cue.count} GIFTS</small>
      </div>;
    })}
    <div className={styles.notices} aria-live="polite">
      {state.live.feed.filter(item => item.kind !== 'gift').slice(0, 2).map(item => <div key={item.id} data-team={item.team ?? 'neutral'}><Star size={20} /><span>{item.text}</span></div>)}
    </div>
  </div>;
}
