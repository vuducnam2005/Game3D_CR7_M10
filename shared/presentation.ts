import { z } from 'zod';

export const AUDIO_KINDS = ['ui', 'gift', 'combo', 'crowd', 'roundStart', 'roundEnd', 'victory', 'siuuu', 'messi', 'countdown', 'follow'] as const;
export type AudioKind = typeof AUDIO_KINDS[number];
export const audioPathSchema = z.string().max(180).refine(path => path === '' || /^\/audio\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(?:wav|mp3|ogg)$/i.test(path), 'Dung duong dan /audio/ten-file.mp3, .wav hoac .ogg.');
export const audioFilesSchema = z.object(Object.fromEntries(AUDIO_KINDS.map(kind => [kind, audioPathSchema.optional()])) as Record<AudioKind, z.ZodOptional<typeof audioPathSchema>>).strict();

const hudSchema = z.object({ scores: z.boolean(), timer: z.boolean(), leader: z.boolean(), celebrations: z.boolean(), feed: z.boolean(), hints: z.boolean() }).strict();
export const presentationSchema = z.object({
  background: z.enum(['stadium', 'transparent']), camera: z.enum(['main', 'ronaldo', 'messi', 'victory']),
  autoCamera: z.boolean(), victoryFocus: z.enum(['ronaldo', 'messi']),
  quality: z.enum(['auto', 'low', 'standard', 'high']), reducedMotion: z.boolean(), effects: z.boolean(),
  heavyEffects: z.boolean().default(true), trophy: z.boolean().default(true), audioFiles: audioFilesSchema.default({}),
  volume: z.number().min(0).max(1), muted: z.boolean(), hud: hudSchema,
}).strict();
export const presentationPatchSchema = presentationSchema.partial().extend({ hud: hudSchema.partial().optional(), heavyEffects: z.boolean().optional(), trophy: z.boolean().optional(), audioFiles: audioFilesSchema.optional() }).strict()
  .refine(value => Object.keys(value).length > 0, 'Can it nhat mot thiet lap.');
export type Presentation = z.infer<typeof presentationSchema>;
export type PresentationPatch = z.infer<typeof presentationPatchSchema>;
export const DEFAULT_PRESENTATION: Presentation = {
  background: 'stadium', camera: 'main', autoCamera: true, victoryFocus: 'messi', quality: 'auto',
  reducedMotion: false, effects: true, volume: 0.6, muted: true,
  heavyEffects: true, trophy: true, audioFiles: {},
  hud: { scores: true, timer: true, leader: true, celebrations: true, feed: true, hints: true },
};
