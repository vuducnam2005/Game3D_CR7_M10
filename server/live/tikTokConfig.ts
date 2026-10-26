import { z } from 'zod';

const schema = z.object({
  enabled: z.boolean(), username: z.string().regex(/^[A-Za-z0-9_.]{2,24}$/).optional(),
  signApiKey: z.string().trim().max(2048).optional(),
  connectTimeoutMs: z.number().int().min(1000).max(120000),
  retryBaseMs: z.number().int().min(1000).max(60000),
  retryMaxMs: z.number().int().min(1000).max(300000), maxRetries: z.number().int().min(0).max(10),
}).refine(value => value.retryMaxMs >= value.retryBaseMs);
export type TikTokConfig = z.infer<typeof schema>;
export type TikTokSettings = { config: TikTokConfig; error: boolean };
export function readTikTokConfig(env: NodeJS.ProcessEnv = process.env): TikTokSettings {
  const defaults: TikTokConfig = { enabled: false, connectTimeoutMs: 30000, retryBaseMs: 2000, retryMaxMs: 60000, maxRetries: 5 };
  const enabled = env.TIKTOK_ENABLED ?? 'false';
  const parsed = schema.safeParse({
    ...defaults, enabled: enabled === 'true', username: env.TIKTOK_USERNAME?.trim().replace(/^@/, '') || undefined,
    signApiKey: env.TIKTOK_SIGN_API_KEY?.trim() || undefined,
    ...Object.fromEntries([
      ['TIKTOK_CONNECT_TIMEOUT_MS', 'connectTimeoutMs'], ['TIKTOK_RETRY_BASE_MS', 'retryBaseMs'],
      ['TIKTOK_RETRY_MAX_MS', 'retryMaxMs'], ['TIKTOK_MAX_RETRIES', 'maxRetries'],
    ].filter(([key]) => env[key] !== undefined).map(([key, property]) => [property, Number(env[key])])),
  });
  if (!parsed.success || !['true', 'false'].includes(enabled)) return { config: defaults, error: true };
  return { config: parsed.data, error: false };
}
