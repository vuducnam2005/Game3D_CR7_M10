import { audioFilesSchema, type AudioKind, type Presentation } from '../../shared/presentation';

type Sound = AudioKind | 'chime' | 'boost' | 'none';
type Voice = { source: AudioScheduledSourceNode; gain: GainNode };
const NOTES: Record<AudioKind, number[]> = {
  ui: [700], gift: [520, 780], combo: [440, 660, 880], crowd: [110, 170, 210, 140],
  roundStart: [440, 550, 660], roundEnd: [660, 440, 330], victory: [440, 554, 659, 880],
  siuuu: [160, 230, 460, 370], messi: [660, 880, 990, 1320], countdown: [850], follow: [880, 1100],
};

export class AudioManager {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private volume = 1;
  private lastAt = -Infinity;
  private cooldowns = new Map<AudioKind, number>();
  private voices = new Set<Voice>();
  private files: Presentation['audioFiles'] = {};
  private buffers = new Map<AudioKind, AudioBuffer>();
  private requests = new Map<AudioKind, AbortController>();
  private generation = 0;
  private failed = new Set<AudioKind>();

  get diagnostics() { return { unlocked: this.context?.state === 'running', voices: this.voices.size, loaded: this.buffers.size, fallback: [...this.failed] }; }

  setVolume(value: number) {
    this.volume = Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
    if (this.context && this.master) this.master.gain.setValueAtTime(this.volume, this.context.currentTime);
    if (!this.volume) this.stopAll();
  }

  configureFiles(files: Presentation['audioFiles']) {
    const parsed = audioFilesSchema.parse(files);
    if (JSON.stringify(parsed) === JSON.stringify(this.files)) return;
    this.generation++;
    for (const request of this.requests.values()) request.abort();
    this.requests.clear(); this.buffers.clear(); this.failed.clear();
    this.files = parsed;
    this.preload();
  }

  async unlock() {
    if (!this.context) {
      this.context = new AudioContext();
      this.master = this.context.createGain();
      this.master.gain.setValueAtTime(this.volume, this.context.currentTime);
      this.master.connect(this.context.destination);
    }
    await this.context.resume();
    this.preload();
    return this.context.state === 'running';
  }

  play(sound: Sound) {
    if (sound === 'none') return false;
    const kind = sound === 'chime' ? 'follow' : sound === 'boost' ? 'combo' : sound;
    const context = this.context;
    if (!context || !this.master || context.state !== 'running' || this.volume === 0) return false;
    const now = context.currentTime;
    if (now - this.lastAt < .12 || now - (this.cooldowns.get(kind) ?? -Infinity) < (kind === 'crowd' ? 1.5 : .25)) return false;
    this.lastAt = now; this.cooldowns.set(kind, now);
    while (this.voices.size >= 4) this.stop(this.voices.values().next().value!);
    const buffer = this.buffers.get(kind);
    const source = buffer ? context.createBufferSource() : context.createOscillator();
    const gain = context.createGain();
    const notes = NOTES[kind];
    const duration = buffer ? Math.min(buffer.duration, 8) : kind === 'ui' ? .08 : notes.length * .16;
    if (buffer) (source as AudioBufferSourceNode).buffer = buffer;
    else {
      const oscillator = source as OscillatorNode;
      oscillator.type = kind === 'crowd' || kind === 'siuuu' ? 'triangle' : 'sine';
      notes.forEach((note, i) => oscillator.frequency.setValueAtTime(note, now + i * .16));
    }
    gain.gain.setValueAtTime(buffer ? .22 : kind === 'crowd' ? .025 : .06, now);
    gain.gain.exponentialRampToValueAtTime(.001, now + duration);
    source.connect(gain); gain.connect(this.master);
    const voice = { source, gain }; this.voices.add(voice);
    source.onended = () => this.release(voice);
    source.start(); source.stop(now + duration);
    return true;
  }

  private release(voice: Voice) {
    if (!this.voices.delete(voice)) return;
    voice.source.disconnect(); voice.gain.disconnect();
  }
  private stop(voice: Voice) {
    try { voice.source.stop(); } catch { /* An ended source may already be stopped. */ }
    this.release(voice);
  }
  private stopAll() { for (const voice of [...this.voices]) this.stop(voice); }

  private preload() {
    const context = this.context;
    if (!context) return;
    const generation = this.generation;
    for (const [kind, path] of Object.entries(this.files) as [AudioKind, string][]) {
      if (!path || this.buffers.has(kind) || this.requests.has(kind) || this.failed.has(kind)) continue;
      const controller = new AbortController(); this.requests.set(kind, controller);
      // Decode ahead of time. A late download must never play an old celebration.
      void (async () => {
        const timeout = setTimeout(() => controller.abort(), 8000);
        try {
          const response = await fetch(path, { signal: controller.signal, redirect: 'error' });
          if (!response.ok || !response.body || Number(response.headers.get('content-length')) > 4_000_000) throw new Error('Audio unavailable');
          const reader = response.body.getReader(); const chunks: Uint8Array<ArrayBuffer>[] = []; let size = 0;
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            size += value.byteLength;
            if (size > 4_000_000) { await reader.cancel(); throw new Error('Audio too large'); }
            chunks.push(value);
          }
          const bytes = new Uint8Array(size); let offset = 0;
          for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
          const buffer = await context.decodeAudioData(bytes.buffer);
          if (buffer.duration > 8 || buffer.numberOfChannels > 2) throw new Error('Use a short mono/stereo effect');
          if (generation === this.generation && context === this.context) this.buffers.set(kind, buffer);
        } catch {
          if (generation === this.generation && context === this.context) this.failed.add(kind);
        } finally { clearTimeout(timeout); if (generation === this.generation) this.requests.delete(kind); }
      })();
    }
  }

  dispose() {
    this.stopAll(); this.generation++;
    for (const request of this.requests.values()) request.abort();
    this.requests.clear(); this.buffers.clear(); this.failed.clear(); this.cooldowns.clear(); this.lastAt = -Infinity;
    this.master?.disconnect(); this.master = null;
    void this.context?.close(); this.context = null;
  }
}
