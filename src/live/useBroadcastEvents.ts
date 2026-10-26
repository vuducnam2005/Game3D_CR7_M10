import { useEffect, useRef, useState } from 'react';
import type { GameState } from '../../shared/game';
import type { MockAudio } from './MockAudio';
import { resultPresentation } from './presentationEvents';

export function useBroadcastEvents(state: GameState, connected: boolean, audio?: MockAudio) {
  const seen = useRef(new Set<string>());
  const previous = useRef<GameState | null>(null);
  const [notice, setNotice] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    audio?.setVolume(state.presentation.muted || !connected ? 0 : state.presentation.volume);
    audio?.configureFiles(state.presentation.audioFiles);
    const old = previous.current;
    if (!old || old.matchId !== state.matchId) { seen.current.clear(); clearTimeout(timer.current); setNotice(''); }
    const emit = (key: string, kind: Parameters<MockAudio['play']>[0]) => {
      if (!seen.current.has(key)) { seen.current.add(key); audio?.play(kind); }
    };
    const base = `${state.matchId}:${state.round}`;
    const result = resultPresentation(state);
    if (old?.matchId === state.matchId) {
      if (state.live.crowdUntil && state.live.crowdUntil !== old.live.crowdUntil) emit(`crowd:${state.live.crowdUntil}`, 'crowd');
      if (state.status === 'PLAYING') {
        if (old.status === 'COUNTDOWN' || old.round !== state.round || old.status === 'WAITING') emit(`${base}:start`, 'roundStart');
        const second = Math.ceil(state.remainingMs / 1000);
        if (second > 0 && second <= 10) emit(`${base}:tick:${second}`, 'countdown');
      }
      if (result && result.id !== resultPresentation(old)?.id) emit(result.id, result.match && result.outcome !== 'draw' ? 'victory' : 'roundEnd');
      if (state.leadChange && state.leadChange.endsAt !== old.leadChange?.endsAt) emit(`${base}:lead:${state.leadChange.endsAt}`, 'combo');
      for (const team of ['ronaldo', 'messi'] as const) {
        const lane = state.live.celebrations[team];
        const previousCue = old.live.celebrations[team].active;
        if (lane.active && lane.active.id === previousCue?.id && lane.active.tier > previousCue.tier && lane.active.sound !== 'none') emit(`${lane.active.id}:combo:${lane.active.tier}`, 'combo');
      }
      for (const team of ['ronaldo', 'messi'] as const) {
        const top = state.topSupporters.find(item => item.team === team);
        const before = old.topSupporters.find(item => item.team === team);
        if (top && top.userId !== before?.userId) {
          setNotice(`NEW ${team.toUpperCase()} SUPPORTER #1 / @${top.username}`);
          clearTimeout(timer.current); timer.current = setTimeout(() => setNotice(''), 3000);
        }
      }
    }
    for (const item of state.live.feed) if (item.kind === 'follow') emit(`follow:${item.id}`, 'follow');
    // Bounded across long matches; recent feed IDs survive mute and reconnect snapshots.
    if (seen.current.size > 512) seen.current = new Set([...seen.current].slice(-256));
    previous.current = state;
  }, [state, connected, audio]);
  return notice;
}
