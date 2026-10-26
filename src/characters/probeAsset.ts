export async function probeAsset(url: string, signal: AbortSignal): Promise<string> {
  const response = await fetch(url, { method: 'HEAD', cache: 'no-store', signal });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status} ${response.statusText}`);
  if (response.headers.get('content-type')?.includes('text/html')) throw new Error(`${url}: HTTP ${response.status} tra ve HTML, khong phai GLB. Kiem tra public/models va Vite base URL.`);
  const length = response.headers.get('content-length');
  if (length !== null && Number(length) === 0) throw new Error(`${url}: file rong.`);
  return `HTTP ${response.status}${length ? ` / ${Number(length).toLocaleString('en-US')} bytes` : ''}`;
}
