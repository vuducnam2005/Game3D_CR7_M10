import type { TikTokConfig } from './tikTokConfig';

export type TransportEvent = 'gift' | 'chat' | 'follow' | 'like' | 'disconnected' | 'error' | 'streamEnd';
export interface TikTokTransport {
  connect(): Promise<{ roomId: string }>;
  disconnect(): Promise<void>;
  on(event: TransportEvent, listener: (data: unknown) => void): void;
  off(event: TransportEvent, listener: (data: unknown) => void): void;
}
export type TikTokTransportFactory = (config: TikTokConfig) => Promise<TikTokTransport>;

// Lazy import keeps Mock operational even when the optional integration cannot load.
export const createTikTokTransport: TikTokTransportFactory = async config => {
  const { TikTokLiveConnection, ControlEvent, WebcastEvent } = await import('tiktok-live-connector');
  const names = { gift: WebcastEvent.GIFT, chat: WebcastEvent.CHAT, follow: WebcastEvent.FOLLOW, like: WebcastEvent.LIKE,
    streamEnd: WebcastEvent.STREAM_END, error: ControlEvent.ERROR, disconnected: ControlEvent.DISCONNECTED };
  const connection = new TikTokLiveConnection(config.username!, {
    processInitialData: false, fetchRoomInfoOnConnect: true, enableExtendedGiftInfo: false,
    authenticateWs: false, useMobile: false, signApiKey: config.signApiKey,
    wsClientOptions: { handshakeTimeout: config.connectTimeoutMs },
  });
  // Retired attempts may still emit errors while their network requests settle.
  connection.on(ControlEvent.ERROR, () => {});
  return {
    connect: async () => { const state = await connection.connect(); return { roomId: String(state.roomId) }; },
    disconnect: () => connection.disconnect(),
    on: (event, listener) => { connection.on(names[event], listener); },
    off: (event, listener) => { connection.off(names[event], listener); },
  };
};
