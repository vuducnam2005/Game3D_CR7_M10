import { emptyTikTokStatus, type LiveEvent, type LiveResult, type TikTokStatus } from '../../shared/live';
import type { LiveEventAdapter } from './LiveEventAdapter';
import { TikTokNormalizer, type TikTokContext } from './TikTokNormalizer';
import { createTikTokTransport, type TikTokTransport, type TikTokTransportFactory, type TransportEvent } from './tikTokTransport';
import type { TikTokSettings } from './tikTokConfig';

type Options = {
  settings: TikTokSettings; context: () => TikTokContext; onStatus: (status: TikTokStatus) => void;
  onLog: (message: string) => void; factory?: TikTokTransportFactory; now?: () => number;
};
export class TikTokLiveEventAdapter implements LiveEventAdapter {
  readonly source = 'tiktok' as const;
  private status: TikTokStatus;
  private generation = 0;
  private active = false;
  private timer?: ReturnType<typeof setTimeout>;
  private retire?: () => void;
  private consumer?: (event: LiveEvent) => LiveResult;
  private readonly now: () => number;
  constructor(private readonly options: Options) {
    this.now = options.now ?? Date.now;
    const { config, error } = options.settings;
    const configured = config.enabled && Boolean(config.username) && !error;
    this.status = { ...emptyTikTokStatus(), configured, username: config.username ?? null,
      status: error ? 'ERROR' : configured ? 'DISCONNECTED' : 'UNCONFIGURED',
      message: error ? 'Cau hinh TikTok khong hop le. Kiem tra .env; Mock san sang.'
        : configured ? 'TikTok san sang cau hinh. Bam Connect de ket noi; Mock dang hoat dong.' : emptyTikTokStatus().message };
  }
  get connected() { return this.status.status === 'CONNECTED'; }
  getStatus() { return structuredClone(this.status); }
  connect(consumer: (event: LiveEvent) => LiveResult): void {
    if (!this.status.configured) throw new Error('Can TIKTOK_ENABLED=true va TIKTOK_USERNAME hop le trong .env.');
    if (this.active) return;
    this.consumer = consumer;
    this.active = true;
    const generation = ++this.generation;
    this.status.attempt = 0;
    void this.attempt(generation);
  }
  disconnect(): void {
    this.active = false;
    ++this.generation;
    clearTimeout(this.timer);
    this.retire?.(); this.retire = undefined; this.consumer = undefined;
    this.update({ status: this.status.configured ? 'DISCONNECTED' : this.options.settings.error ? 'ERROR' : 'UNCONFIGURED',
      attempt: 0, roomId: null, retryAt: null, message: 'TikTok da dung. Mock san sang.' });
  }
  private update(patch: Partial<TikTokStatus>) {
    this.status = { ...this.status, ...patch };
    this.options.onStatus(this.getStatus());
  }
  private async attempt(generation: number) {
    if (!this.active || generation !== this.generation) return;
    const config = this.options.settings.config;
    this.update({ status: 'CONNECTING', attempt: this.status.attempt + 1, roomId: null, retryAt: null,
      message: 'Dang ket noi TikTok; Mock van san sang.' });
    let valid = true;
    let transport: TikTokTransport | undefined;
    let deadline: ReturnType<typeof setTimeout> | undefined;
    const listeners: [TransportEvent, (data: unknown) => void][] = [];
    const current = () => valid && this.active && generation === this.generation;
    const dispose = () => { if (transport) void transport.disconnect().catch(() => {}); };
    const retire = () => {
      valid = false; clearTimeout(deadline);
      for (const [event, listener] of listeners) transport?.off(event, listener);
      dispose();
    };
    this.retire = retire;
    const fail = (message: string, ended = false) => {
      if (!current()) return;
      retire(); this.retire = undefined;
      const retry = !ended && this.status.attempt <= config.maxRetries;
      const delay = Math.min(config.retryMaxMs, config.retryBaseMs * 2 ** (this.status.attempt - 1));
      this.update({ status: ended ? 'DISCONNECTED' : retry ? 'RETRYING' : 'ERROR', roomId: null,
        retryAt: retry ? this.now() + delay : null,
        message: `${message} Mock san sang.${retry ? ` Thu lai sau ${delay / 1000}s.` : ' Bam Connect de thu lai.'}` });
      if (retry) this.timer = setTimeout(() => { void this.attempt(generation); }, delay);
      else this.active = false;
    };
    deadline = setTimeout(() => fail('TikTok qua thoi gian ket noi.'), config.connectTimeoutMs);
    try {
      transport = await (this.options.factory ?? createTikTokTransport)(config);
      if (!current()) { dispose(); return; }
      const on = (event: TransportEvent, listener: (data: unknown) => void) => { listeners.push([event, listener]); transport!.on(event, listener); };
      on('error', () => fail('TikTok gap loi ket noi/du lieu.'));
      on('disconnected', () => fail('TikTok mat ket noi.'));
      on('streamEnd', () => fail('Phien TikTok LIVE da ket thuc.', true));
      const normalizer = new TikTokNormalizer();
      let lastLog = -Infinity;
      for (const type of ['gift', 'comment', 'follow', 'like'] as const) on(type === 'comment' ? 'chat' : type, raw => {
        if (!current() || !this.connected || !this.status.roomId) return;
        try {
          const event = normalizer.normalize(type, raw, this.status.roomId, this.options.context(), this.now());
          this.consumer?.(event);
        } catch {
          if (this.now() - lastLog >= 5000) {
            lastLog = this.now();
            this.options.onLog('Bo qua event TikTok: du lieu/thoi gian/room/ledger khong hop le. Khong luu payload raw.');
          }
        }
      });
      const result = await transport.connect();
      if (!current()) { dispose(); return; }
      if (!/^[1-9]\d{0,39}$/.test(result.roomId)) { fail('TikTok tra ve room ID khong hop le.'); return; }
      clearTimeout(deadline);
      this.update({ status: 'CONNECTED', roomId: result.roomId, retryAt: null, message: 'TikTok Connected. Mock tam khoa; chi nhan su kien LIVE.' });
    } catch { if (!current()) dispose(); else fail('Khong the ket noi TikTok: kiem tra LIVE, mang va dich vu ky.'); }
  }
}
