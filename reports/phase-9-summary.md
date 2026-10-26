# Giai doan 9 - Nghiem thu va ban giao

Hoan thanh 2026-10-24 (Asia/Saigon). Pham vi: phien ban local/Mock, toi uu, loi hien thi, kiem thu va tai lieu. TikTok LIVE that va OBS/TikTok LIVE Studio chua duoc nghiem thu tren phien phat song that. `PROMPT.md` giu nguyen; bang doi chieu day du: [final-acceptance.md](final-acceptance.md).

## Thay doi cuoi

- `src/App.tsx`: lazy import theo route, loading state. `src/main.tsx` va `src/ui/ErrorBoundary.tsx`: loi React/module hien ro tren toan app; reload khong reset server state.
- `src/characters/probeAsset.ts`: HEAD no-store, kiem tra HTTP status/URL, HTML masquerading as GLB va file rong. `StadiumPreview.tsx` / `ModelDebug.tsx`: probe timeout 15s; Stadium co model-loading timeout 60s va lien ket reload.
- `src/scene/RendererDiagnostics.tsx`: context loss/restore, shader compiler diagnostics, cleanup listeners. UI hien loi cu the va giu canvas de context co the phuc hoi.
- `shared/live.ts`, `server/live/MockEventAdapter.ts`, `LiveEventProcessor.ts`, `TikTokNormalizer.ts`, `TikTokLiveEventAdapter.ts`, `tikTokTransport.ts`, `server/game/GameEngine.ts`: Like delta, dedupe, dem likes rieng, pulse khan dai 2s, migration snapshot cu, restart xoa pulse/New match reset likes. Khong cong diem/gifts/supporters/members.
- `src/scene/Crowd.tsx`, `Stadium.tsx`, `src/pages/StadiumPreview.tsx`, `MockLiveLab.tsx`, `src/live/OverlayView.tsx`, `useBroadcastEvents.ts`: nut Like x10, crowd glow/cue/audio; co Low/reduced-motion, khong replay am thanh khi hydration. Follow co icon sao tren Overlay.
- `src/pages/Overlay.tsx`: hien loi backend neu chua nhan duoc snapshot. CSS hien loi vua khung broadcast.
- `vite.config.ts`: dev chon port tiep theo neu bi chiem; preview 4173 van strict. `server/index.ts` in URL/backend/source/TikTok. `.env.example` giai thich port.
- `tests/phase9.test.tsx`: 9 tests cho Like, migration, dedupe, audio hydration, renderer, asset va Error Boundary.
- `scripts/verify-stadium-framing.mjs`: nhan duong dan output, giu duoc bang chung lich su. README, checklist va bao cao ban giao da cap nhat.

## GLB va animation

| Thuoc tinh | Ronaldo hien tai | Messi |
|---|---|---|
| File | cristiano_ronaldo.glb | messi_2023_3d_free.glb |
| Kich thuoc | 16,139,240 bytes | 10,881,188 bytes |
| Triangles / meshes / joints / images | 118,395 / 8 / 435 / 9 | 29,554 / 10 / 34 / 8 |
| Embedded clip | Armature.001Action.001 | mixamo.com |
| Duration / tracks | 3.983333s / 1,249 | 1.066667s / 50 |
| Metadata license | CC-BY-4.0 / aleganda | CC-BY-4.0 / Ltti....................Ttg |

Ronaldo la file thay the da duoc nguoi dung xac nhan 2026-10-21. File Ronaldo cu van duoc giu, khong con load. Khong dung thong so 17 joints/6 clips cua file cu cho file moi. Phan tich day du: `phase-9-glb-analysis.json` / `.md`; tac gia/nguon: `../ASSET_CREDITS.md`.

SHA256 file goc va public copy khop nhau, kiem tra lai ngay ban giao:

- Ronaldo: `78f690b490c55a2ed900634b24934dd760a79e9b59242aeb4ec8fbb226546a74`.
- Messi: `92edca0105a42751c4caa793b389d1785fbafb190b01636e1407ae9cd9cbf4e7`.

SIUUU la ban sao clip Ronaldo goc (cui nguoi, bat nhay/xoay, tiep dat dang tay), Idle lay tu pose cuoi; Calma/Sleep/Power Pose/Point Up la procedural. Messi mixamo.com la dong tac nhay/co goi ngan; khong gan nham la celebration. Runtime mixamo.com la ban sao can chan; Idle/Celebrate/Victory tao tren dung skeleton, co crossfade/queue/return Idle. Victory co hai buoc chan, dang tay/gio tay va cup game tuy chon. Khong khang dinh do giong 100% hay chat luong mocap.

`phase-9-framing.json`: 10 clips x 61 mau = 610 mau CPU skinned geometry nam trong ACTION_BOUNDS. Co original Ronaldo va cac action san; mixamo.com chi dung debug nen khong nam trong tap clip san. Day khong phai do FPS, texture hay chung minh moi pose lien tuc.

## Ket qua kiem thu

| Kiem tra | Ket qua |
|---|---|
| npm run typecheck | PASS |
| npm run test | PASS: 171 tests / 20 files (162 tests cu + 9 moi) |
| npm run build | PASS, build cuoi ngay 2026-10-24 |
| npm run dev | PASS: Vite 5174 + backend 3001, log URL/trang thai |
| Production preview | PASS: /engine ket noi snapshot, khong canvas; /overlay render GLB |
| GLB analyzer / SHA256 | PASS, file goc va public copy nguyen ven |
| Framing | PASS: 610 mau / 10 clips |
| HTTP /api/health | status=ok, persistenceError=null |

Tests bao phu normalization/clone/bones/animation, camera projection, score/timer/round/tie, combo/streak/dedupe/restart, HTTP/Socket.IO, presentation/HUD/audio, TikTok fixtures/fake transport/retry, Like va cac loi moi. Browser that co WebGL2; khong chi dua vao jsdom.

### Browser acceptance

- Rose x1+x10 -> Ronaldo 110; Cookie x1+x10 -> Messi 110. Control va Overlay cung 110/110. Rose Combo x20 -> 310/110; Replay last khong tang diem.
- Comment CR7 gan team, Follow tang thong ke, Like x10 tang likes/crowd +0 points. Diem van do server quyet dinh.
- Pause tai 01:45, 310/110; refresh Overlay va backend restart giu cung diem/trang thai. Resume/Set timer 0 -> ROUND_END -> MATCH_END.
- Ronaldo win 310:110, Messi win 0:100 trong tran thu tiep theo; ket qua va Top3 hien dung doi. Anh ket qua khong duoc dung de khang dinh pose animation da het thoi luong; animation con co tests va bang chung truc quan Giai doan 2/7.
- Overlay 720x1280 va 1080x1920 khop viewport, khong overflow, hai nhan vat toan than/texture hien thi. Control 390x844 scrollWidth=375; 1440x1000 scrollWidth=1425, khong tran ngang.
- QA server tra HTTP 410 cho Ronaldo: hien duong dan va status, khong placeholder. WebGL context bi mat that qua WEBGL_lose_context: hien canh bao; restore xoa canh bao va hai GLB co texture hien lai.
- Console su dung binh thuong khong co loi render moi; con THREE.Clock deprecation. QA context loss co log chu dich. Loi shader duoc unit-test, khong co GPU compiler failure tu nhien de nghiem thu thuc te.

Anh bang chung:

- `phase-9-control-ready.jpg`, `phase-9-control-mobile.jpg`: Control ban giao.
- `phase-9-overlay-ready.jpg`: Overlay sach, WAITING 0/0.
- `phase-9-overlay-720.jpg`: PAUSED 310/110 sau refresh/restart.
- `phase-9-ronaldo-result-720.jpg`, `phase-9-messi-result-1080.jpg`: ket qua hai doi.
- `phase-9-messi-gift-1080.jpg`: gift Messi 100 diem.
- `phase-9-asset-error.jpg`, `phase-9-webgl-lost.jpg`, `phase-9-webgl-restored.jpg`: loi that va recovery. Thanh QA trong anh context chi thuoc server kiem thu tam thoi.
- `phase-9-production-overlay.jpg`: WebGL cua production build.

`phase-9-overlay-ready.jpg` la anh full-page 720x1280. Cac anh viewport khac co the bi gioi han chieu cao boi panel chup (nhieu anh cao 1108px); khong dung kich thuoc JPEG do de suy ra viewport. So do 720x1280/1080x1920 va overflow duoc doc truc tiep tu DOM khi test.

## Hieu nang va gioi han

Entry JS giam tu 1,478.73 kB (gzip 413.16 kB) xuong 227.11 kB (gzip 71.47 kB). Route 3D tai them shared chunk 1,025.76 kB (gzip 276.82 kB); canh bao chunk >500 kB van con. Ten chunk `probeAsset-*` la ten bundler dat cho khoi shared, khong phai rieng utility probe co kich thuoc 1 MB. EngineLab chi import entry/useGameServer/stylesheet module, khong import chunk Three.

GLB/clip duoc cache; gift khong tao loader/download moi. Clone bones rieng, moi instance dung mot mixer; cleanup mixer/helper/skeleton, dynamic scene resources dispose khi unmount. Asset geometry/material chia se duoc giu trong cache de tai su dung. Khong chay soak test nhieu gio hoac do GPU memory tren nhieu dong may.

Mau Control local Standard 90 FPS / 116 calls / 309,680 triangles chi dai dien cho phien preview may nay. Auto DPR/shadow/Low/Reduced motion va VFX limits da co; khong cam ket 60 FPS tren moi may hoac OBS. Raw GLBs van lon, giu nguyen asset thay vi nen lai. Con warning THREE.Clock; jsdom tests co warning Three CJS dependency, khong phai test failure.

TikTok integration dung tiktok-live-connector 2.5.0 (AGPL-3.0-only), transport/protobuf/retry da test offline. Chua co phien LIVE that; Euler Stream/TikTok co the thay doi/rate-limit/yeu cau key. Khong coi Mock thanh cong la LIVE thanh cong. Stale/partial streak policy co the bo sot qua quanh mat mang/chuyen phase de tranh cong nham. OBS/TikTok LIVE Studio chi co huong dan, chua kiem thu host thuc te. API local chua co admin authentication; JSON checkpoints co the mat toi da khoang 1s timer khi kill dot ngot.

## Trang thai ban giao va lenh chay

Match `ff12e371-ceef-4967-ace9-ddf56711a277`, WAITING, diem/tong diem 0/0, gift/follow/like/members/supporters 0. Cau hinh 3 x 120s, countdown 3s, break 5s, draw; mapping Rose/Cookie 10, Trophy 100. Main/Auto camera, Stadium, Auto quality, HUD/VFX on, volume 60%, muted. Source MOCK, TikTok UNCONFIGURED; khong auto-connect.

Backup truoc kiem thu: `data/before-phase-9-2026-10-23.json`. Snapshot startup thu rieng: `data/phase-9-startup-check.json`, khong duoc app mac dinh doc. Bao cao/asset lich su giu nguyen. Script va server QA 5176/5177 da duoc don; khong dua toolbar QA vao production. Chi frontend 5174 va backend 3001 duoc giu cho nguoi dung; preview kiem thu da dung sau nghiem thu.

```powershell
cd C:\3d
npm install
$env:WEB_PORT='5174'
npm run dev
```

Mo `/control`, `/overlay`, `/debug` tren URL `Local:`. Mot lenh dev khoi dong ca backend/frontend; khong can Docker/cloud/database ngoai/Blender/Meshy/API AI tra phi de choi Mock.

```powershell
npm run typecheck
npm run test
npm run build
node scripts/analyze-glb.mjs --output phase-9-glb-analysis
node scripts/verify-stadium-framing.mjs reports/phase-9-framing.json
```

Huong dan gift/mapping/OBS/audio/blank screen/TikTok: `../README.md`.
