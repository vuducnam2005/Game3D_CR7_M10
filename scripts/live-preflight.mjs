import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const args = Object.fromEntries(process.argv.slice(2).map(arg => {
  const at = arg.indexOf('=');
  if (!arg.startsWith('--') || at < 0) throw new Error('Use --url=http://localhost:5174 --output=reports/live-preflight.json');
  return [arg.slice(2, at), arg.slice(at + 1)];
}));
const base = new URL(args.url ?? 'http://localhost:5174');
if (!['localhost', '127.0.0.1', '[::1]'].includes(base.hostname) || base.protocol !== 'http:' || base.username || base.password) {
  throw new Error('Preflight only inspects a local HTTP game server.');
}
const checks = [];
async function check(name, path, validate, method = 'GET') {
  try {
    const response = await fetch(new URL(path, base), { method, signal: AbortSignal.timeout(5000), redirect: 'error' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const detail = await validate(response);
    checks.push({ name, status: 'PASS', detail });
  } catch (error) {
    checks.push({ name, status: 'FAIL', detail: error instanceof Error ? error.message : 'Request failed' });
  }
}
await check('Persistence health', '/api/health', async response => {
  const health = await response.json();
  if (health.status !== 'ok' || health.persistenceError) throw new Error('Persistence is degraded; inspect the server terminal.');
  return 'ok';
});
let state;
await check('Shared game snapshot', '/api/state', async response => {
  state = (await response.json()).state;
  if (!state?.matchId || !state.config || !state.live?.config?.mappings || !state.connection?.tiktok) throw new Error('Not a game snapshot');
  return { status: state.status, rounds: state.config.rounds, roundSeconds: state.config.roundSeconds, source: state.connection.mode };
});
for (const route of ['/control', '/overlay', '/debug']) {
  await check(`Route ${route}`, route, async response => {
    if (!response.headers.get('content-type')?.includes('text/html') || !(await response.text()).includes('id="root"')) {
      throw new Error('Expected application HTML');
    }
    return 'Application HTML served; WebGL needs a visual check';
  });
}
for (const [file, bytes] of [['cristiano_ronaldo.glb', 16139240], ['messi_2023_3d_free.glb', 10881188]]) {
  await check(`GLB ${file}`, `/models/${file}`, async response => {
    if (response.headers.get('content-type')?.includes('text/html')) throw new Error('HTML returned instead of GLB');
    if (Number(response.headers.get('content-length')) !== bytes) throw new Error('Unexpected asset length; verify the supplied model');
    return { bytes };
  }, 'HEAD');
}
const live = {
  configured: state?.connection.tiktok.configured ?? false,
  status: state?.connection.tiktok.status ?? 'UNKNOWN',
  simpleGiftFallback: Boolean(state?.config?.simpleMode),
  numericGiftMappings: state?.live.config.mappings.filter(item => /^\d+$/.test(item.id)).length ?? 0,
  audioMuted: state?.presentation.muted ?? null,
  pending: ['Verify an actual LIVE session and real events', 'Verify LIVE Studio picture and sound on the receiving phone'],
};
if (!live.configured) live.pending.unshift('Set TIKTOK_ENABLED and your public TIKTOK_USERNAME in .env, restart, then Connect');
if (!live.numericGiftMappings && !live.simpleGiftFallback) live.pending.unshift('Add observed TikTok numeric gift IDs; rose/cookie/trophy are Mock IDs');
if (live.simpleGiftFallback) live.pending.unshift('Verify real TikTok gift names match Flower/Rose and Cookie; other names require an updated gift rule before LIVE');
const report = { checkedAt: new Date().toISOString(), url: base.origin, localPassed: checks.every(check => check.status === 'PASS'), checks, live,
  note: 'Read-only check. Does not connect TikTok, start a match or broadcast. Local PASS does not mean real LIVE acceptance.' };
const output = resolve(args.output ?? 'reports/live-preflight.json');
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
for (const item of checks) console.log(`${item.status} ${item.name}`);
console.log(`TikTok: ${live.status}; numeric mappings: ${live.numericGiftMappings}; audio muted: ${live.audioMuted}`);
console.log(`Report: ${output}`);
if (!report.localPassed) process.exitCode = 1;
