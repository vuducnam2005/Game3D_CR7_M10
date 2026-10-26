import { useEffect, useState } from 'react';
import { AUDIO_KINDS, audioFilesSchema, type AudioKind, type Presentation } from '../../shared/presentation';
import { AudioManager } from './AudioManager';

export function AudioSettings({ files, disabled, onSave }: { files: Presentation['audioFiles']; disabled: boolean; onSave: (files: Presentation['audioFiles']) => void }) {
  const [draft, setDraft] = useState(files);
  const [kind, setKind] = useState<AudioKind>('siuuu');
  const [message, setMessage] = useState('');
  const [audio] = useState(() => new AudioManager());
  const key = JSON.stringify(files);
  useEffect(() => setDraft(JSON.parse(key)), [key]);
  useEffect(() => () => audio.dispose(), [audio]);
  return <details><summary>Audio files / sound check</summary>
    <p>Dat file cua ban trong public/audio. MP3/WAV/OGG, toi da 4 MB / 8 giay / stereo. Bo trong de dung am tong hop, khong co giong that.</p>
    <form onSubmit={event => {
      event.preventDefault(); const parsed = audioFilesSchema.safeParse(draft);
      if (!parsed.success) { setMessage(parsed.error.issues[0].message); return; }
      onSave(parsed.data); setMessage('Da gui cau hinh audio.');
    }}><fieldset disabled={disabled}>
      <label>Sound cue<select value={kind} onChange={event => { setKind(event.target.value as AudioKind); setMessage(''); }}>{AUDIO_KINDS.map(value => <option key={value}>{value}</option>)}</select></label>
      <label>Local audio path<input placeholder="/audio/my-siuuu.wav" value={draft[kind] ?? ''} onChange={event => setDraft(previous => ({ ...previous, [kind]: event.target.value }))} /></label>
      <button>Save audio paths</button>
      <button type="button" onClick={() => {
        const parsed = audioFilesSchema.safeParse(draft);
        if (!parsed.success) { setMessage(parsed.error.issues[0].message); return; }
        audio.configureFiles(parsed.data); audio.setVolume(.6);
        void audio.unlock().then(() => { audio.play('ui'); setMessage('Da unlock sound check. Bam Play cue; file chua tai xong se dung am tong hop.'); }).catch(() => setMessage('Web Audio unavailable.'));
      }}>Unlock sound check</button>
      <button type="button" onClick={() => { audio.play(kind); const d = audio.diagnostics; setMessage(!d.unlocked ? 'Bam Unlock sound check truoc.' : `Local test / ${d.loaded} files ready / ${d.fallback.length} fallback / volume 60%.`); }}>Play cue</button>
      <button type="button" onClick={() => { audio.setVolume(0); setMessage('Sound check muted.'); }}>Stop sound check</button>
    </fieldset></form><p role="status">{message}</p>
  </details>;
}
