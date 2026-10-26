# Phase 6 - Overlay / Control Dashboard

Ngay nghiem thu: 2026-10-22. Workspace: `C:\3d`.

## Ket qua

Hoan thanh pham vi Giai doan 6 trong `PROJECT_PHASES.md`: `/overlay` va `/control` la hai URL doc lap, cung nhan authoritative state qua Socket.IO. Khong them timer/reducer tinh diem rieng o frontend. Giu cac trang stadium/debug/engine/mock va hai GLB goc.

## Thay doi

- `shared/presentation.ts`, `shared/game.ts`: schema/defaults cho camera, background, quality, reduced motion, VFX, volume/mute va 6 HUD toggles. Patch tung truong, merge HUD tren server de khong ghi de setting khac. Snapshot cu duoc them defaults.
- `server/game/GameEngine.ts`: commands `presentation`/`animate`; manual animation validate team, queue bounded, log +0 points. Lead change duoc server phat/het han sau3 giay; clear khi hoa/reset/new round. Reset giu presentation. Restart giu settings, xoa cue transient.
- `src/live/OverlayView.tsx`, `src/pages/Overlay.tsx`: HUD 9:16, score share 50/50 khi chua co diem, timer server, status/leader, celebration/combo/lead change, mapping/sender/gift/follow feed. Scene va celebration text co vung rieng de tranh che mat. Offline canh bao snapshot cu.
- `StadiumPreview`, `Lighting`, `ScenePerformance`: broadcast mode khong co chrome/admin controls, transparent WebGL/background/fog/stadium; tai su dung nhan vat/cache/camera. Preview metrics FPS/draw calls/triangles chi hien o Control. Auto quality van co ha Low khi cham keo dai.
- `ControlSettings`, `/control` variant cua `MockLiveLab`: shared preview, match rules/timer, mock desk/mapping/log/supporters, animation 7 clips, camera/HUD/audio/VFX. Khong tao socket/engine phu cho preview. Preview luon mute.
- `MockAudio`: master volume theo state. Overlay gesture unlock rieng theo browser, cue ID khong phat lai khi timer/volume thay doi. Full Audio Manager va audio asset se lam o Giai doan 7.
- Fullscreen qua F/double-click, Esc/double-click lan hai de thoat. Fallback thong bao5 giay neu API bi thieu/tu choi. Khong co nut fullscreen/admin tren ban capture.

## Kiem thu

| Kiem tra | Ket qua |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm test` | 107 tests / 14 files PASS; 91 tests cu giu nguyen |
| `npm run build` | PASS; JS 1,460.44 kB / 407.35 kB gzip; warning chunk > 500 kB |
| Server health | ok; persistenceError=null |
| Presentation validation | Invalid volume/camera/HUD/type/empty patch bi tu choi |
| Migration/reset/restart | Giu match/score va them defaults; settings giu qua reset/restart |
| Real Socket.IO | Hai clients nhan settings/cues; reconnect/restart giu settings, khong cong diem manual |
| UI tests | Khong co button/admin, HUD toggles, offline, audio khong replay, fullscreen lifecycle/fallback |

Browser kiem tra trong in-app browser co WebGL:

1. Control Start, Rose x1 va Cookie x10: Overlay va preview cung 10/100, SIUUU/Messi Celebrate, combo 10, leader/lead change dung team.
2. Pause 01:13; refresh Overlay giu 10/100 va 01:13. Sau phien lam viec bi ngat va dev server duoc khoi dong lai, cung match ID/diem/timer va volume 35 duoc phuc hoi; khong reset.
3. Manual Messi Victory: Overlay nhan cue, score van 10/100. Queue/event log khong thay doi gift points.
4. Set timer 90 -> 01:30; Resume nhan mock gifts tiep, tong toi 220/220. Feed co `@football_fan`, gift/count/points; Follow hien Welcome. Du lieu nay la test local va da reset khi ban giao.
5. Background Transparent, Show feed off, volume 35: hai URL cap nhat; refresh giu setting. Camera Ronaldo/main/auto, VFX off/on da thao tac. Root/body transparent, stadium/fog duoc bo; HUD co nen rieng cho do tuong phan.
6. Match rules 60 giay va Rose 17 points khi WAITING: Overlay 01:00 / Rose +17 sau refresh. Da tra lai 120 giay / Rose 10 truoc ban giao.
7. Fullscreen: DOM state do event `fullscreenchange` cua ung dung xac nhan true khi double-click, false khi double-click lan hai. Doc truc tiep browser API qua cong cu read-only ban dau khong phan anh chinh xac; khong dung phep doc do de ket luan API bi thieu. Unit tests bao phu keyboard F/Escape va unavailable fallback.
8. Overlay 720x1280 va 1080x1920: frame/scroll dimensions khop viewport, zero buttons. Full-body GLB va HUD da quan sat. Control 1440x1000 va 390x844: scrollWidth 1425/375, khong tran ngang; form dieu khien truy cap duoc tren mobile.
9. Console cuoi: zero errors. Con THREE.Clock deprecation warning tu dependency. FPS mau desktop 78 FPS / standard / 116 calls / 309680 triangles chi la preview local tai thoi diem do.

## Anh

- `phase-6-overlay-ready.jpg`: 720x1280, WAITING, scene/HUD day du.
- `phase-6-overlay-1080-full.jpg`: 1080x1920, PAUSED 10/100.
- `phase-6-control-ready.jpg`: desktop 1440x1000, preview va live desk.
- `phase-6-control-mobile.jpg`: mobile 390x844.
- `phase-6-control-settings-mobile.jpg`:camera/background/VFX/animation/HUD tren mobile.
- `phase-6-transparent.jpg`:nhan vat va HUD khi stadium bi an; JPEG duoc browser composite tren nen trang, khong phai bang chung PNG alpha.
- `phase-6-gifts-720.jpg`, `phase-6-victory-1080.jpg`:anh cua phien mo phong, trang thai visual tai thoi diem chup; DOM assertions va socket tests la bang chung cho cue/score sync.

## Bao toan va gioi han

- Ronaldo SHA256: `78f690b490c55a2ed900634b24934dd760a79e9b59242aeb4ec8fbb226546a74`.
- Messi SHA256: `92edca0105a42751c4caa793b389d1785fbafb190b01636e1407ae9cd9cbf4e7`.
- Hai ban public/models trung hash goc. Snapshot truoc khi lam luu tai `data/before-phase-6-2026-10-22.json`.
- Chua kiem thu capture truc tiep trong OBS/TikTok Studio, chua ket noi TikTok LIVE that. README co quy trinh Browser Source va audio unlock de nguoi dung chay tren host cua minh.
- VFX hien tai la glow/text/camera motion. Particle/confetti, Audio Manager day du, supporter/result cinematic va TikTok adapter thuoc Giai doan 7-9. Khong tuyen bo chung da hoan thanh.
- Animation render tren moi tab; score/timer/cue do server quyet dinh. Tab nen bi browser throttle co the khac frame animation; khong cam ket frame lock giua cac renderer.
- Build van can toi uu chunk; chua nghiem thu 60 FPS tren moi phan cung. Dieu khien local tin cay, khong co admin authentication cho public Internet.

Ban giao: WAITING, 3 x 120s, score/gift/follower/member 0; Rose/Cookie 10; stadium/main/auto camera, HUD/VFX on, volume 60, mute. `npm run dev` dang chay tai 5173/3001.
