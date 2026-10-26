# Giai doan 4 - Nghiem thu 2026-10-22

Ket qua: HOAN THANH game engine, state phia server, timer va round theo Phan 2/8/17 cua `PROMPT.md`. Khong sua prompt hay model/animation/camera da nghiem thu.

## Ma nguon

| Phan | File | Trach nhiem |
|---|---|---|
| Contract | `shared/game.ts` | Zod config/state/commands, typed Socket.IO events |
| Gameplay | `server/game/GameEngine.ts` | State machine, authoritative timer, start/pause/resume/reset/config/score |
| Diem/ket qua | `server/game/ScoreManager.ts`, `RoundManager.ts` | Safe integer arithmetic, round winner, match wins, bounded overtime |
| Backend | `server/gameServer.ts`, `server/index.ts` | Express, Socket.IO, scheduler, health, shutdown |
| Storage | `server/storage.ts` | Versioned JSON, validation, temporary write + rename, recovery |
| Cau hinh | `config/game.config.json` | 3 x 120s; countdown 3s; break 5s; default draw |
| Client | `src/services/gameClient.ts`, `src/hooks/useGameServer.ts` | Connect/reconnect, snapshot only, command ack, no offline command replay |
| Trang thu | `src/pages/EngineLab.tsx`, `src/styles/EngineLab.module.css` | `/engine`, manual score, match controls, config, timer and results |
| Khoi dong | `package.json`, `vite.config.ts`, `tsconfig.server.json` | One dev command, API/WebSocket proxy, server typecheck |

## Quy tac da nghiem thu

- WAITING -> COUNTDOWN -> PLAYING -> ROUND_END -> countdown hiep sau hoac MATCH_END. PAUSED giu phase truoc do va remainingMs chinh xac, Resume tiep tuc phase do.
- Diem hiep/combo reset moi hiep. Match totals, round results va round wins giu den Reset/New match. New match tao UUID moi, reset tat ca match data, giu config/connection.
- Doi nhieu diem hon thang hiep; doi nhieu hiep thang hon thang tran. Test Ronaldo 1000 tong diem/1 hiep thang van thua Messi 20 tong diem/2 hiep thang.
- Hoa hiep ghi draw. Hoa so hiep thang sau regulation: draw hoac overtime theo config. Overtime tiep tuc den khi co doi thang, toi da 1-5 hiep; sau gioi han van hoa thi draw.
- Timer dung performance.now(), khong tru 1 giay moi setInterval. Tick tre mang elapsed du qua cac phase. Scheduler 100ms, khong phu thuoc tab/render loop/client ticks.
- Lenh duoc Zod validate, client khong the gui scores/winner/state de ghi de. Diem chi nhan khi PLAYING va dung matchId/round. Pause/countdown/het gio/lenh hiep cu bi tu choi. So am, le, NaN/Infinity/overflow bi tu choi.
- Luu JSON sau lenh/chuyen phase, moi khoang 1 giay khi timer chay va khi shutdown co kiem soat. Restart giu tran, freeze phase dang chay ve PAUSED. Khong tru downtime. Snapshot hong giu nguyen va dung startup; write error hien o `/api/health`.
- `config/game.config.json` chi khoi tao neu chua co snapshot. Config qua API/Engine Lab duoc luu cung snapshot va giu qua Reset.

## Giao thuc

- GET `/api/health`: `{ status: 'ok' | 'degraded', persistenceError }`, HTTP 503 neu luu loi.
- GET `/api/state`: `{ serverTime, state }`, no-store.
- POST `/api/command`: `{ type, matchId, ... }`; score them `{ round, team, points }`, timer them `{ seconds }`, configure them `{ config }`.
- Socket `game:command` dung cung schema, ack `{ ok, snapshot, error? }`; `game:sync` yeu cau snapshot moi; `game:snapshot` phat khi connect, thay doi va tick.
- Client chi format remainingMs thanh mm:ss. Khong co reducer/timer/ket qua doc lap. Mat ket noi khoa lenh, danh dau snapshot cu; reconnect request snapshot. Khong buffer/retry lenh +diem.

## Kiem thu

- `npm run typecheck`: PASS.
- `npm run test`: PASS, 53 tests / 8 files. 27 tests moi trong `tests/GameEngine.test.ts` va `tests/gameServer.test.ts`; 26 tests truoc do van dat.
- Test engine: 6 status, boundary/fractional time, catch-up, zero-duration phases, pause/resume tung phase, timer override, invalid commands/config/score, reset, snapshot isolation, overtime winner/cap, restart tung phase va MATCH_END.
- Test integration: Express/Socket.IO that tren port tam; 2 clients dong bo, reconnect va tao client moi mo phong refresh, server restart doc JSON. Tran 1 giay voi scheduler that tu ket thuc va broadcast winner; khong can client tick.
- Them 3 regression cases cho HTTP read / Socket sync / new connection dung luc het gio: ket qua MATCH_END phai duoc luu ngay va broadcast cho cac client con lai, ke ca truoc scheduler tick.
- `npm run build`: PASS; JS 1,423.52 kB / gzip 397.26 kB, con warning chunk >500 kB.
- `npm run dev`: PASS; Vite 5173 + backend 3001 cung chay. Da thay tien trinh Vite cu cua chinh project bang lenh dev moi.
- Browser tai `/engine`: luu config, Start, Ronaldo +10, Pause, mo tab 2, refresh, set timer 0, Resume, ROUND_END -> MATCH_END, hai tab cung ket qua RONALDO WINS!, Reset va tra config mac dinh. Khong ghi nhan error console.
- Viewport desktop 849x884 / scrollWidth 834; mobile 390x844 / scrollWidth 375. Da quan sat cac score/timer/nut va layout mobile; khong tran ngang. Screenshot: `phase-4-engine-desktop.png`, `phase-4-engine-mobile.png`.
- Trong phien dev co mot lan Windows bao EPERM khi rename snapshot; lan luu tiep theo/khoi dong lai da phuc hoi, health cuoi tra `ok` / persistenceError null. Hot reload backend tao ECONNRESET tam thoi o Vite proxy; client tu reconnect, giu nguyen Match ID. Man hinh ban giao mac dinh: `phase-4-engine-ready.png`.
- SHA-256 file goc va public copy khop: Ronaldo `78f690b490c55a2ed900634b24934dd760a79e9b59242aeb4ec8fbb226546a74`; Messi `92edca0105a42751c4caa793b389d1785fbafb190b01636e1407ae9cd9cbf4e7`.

## Gioi han va ban giao

- `/engine` la trang nghiem thu, diem +10 thu cong khong phai gift. Viewer/gift/combo/supporter fields da duoc khai bao/reset; xu ly su kien, multiplier va gift idempotency thuoc Giai doan 5.
- `/overlay` va `/control` thuc te chua trien khai. Nen tang snapshot/reconnect da test qua Engine Lab va Socket clients; test browser Overlay de lai cho Giai doan 6. Chua noi score/winner vao 3D celebration.
- TikTok: mode NONE, DISCONNECTED; khong ket noi LIVE va khong tuyen bo da test LIVE.
- JSON checkpoint khong phai transaction database. Kill/mat dien dot ngot co the mat khoang 1 giay timer chua checkpoint. Write error khong lam dung tran trong RAM, duoc bao qua health/log; can sua quyen/duong dan neu xay ra.
- Moi truong local tin cay; endpoint dieu khien chua co authentication de public Internet. 60 FPS toan game va toi uu bundle thuoc cac giai doan sau.
- Cuoi nghiem thu: WAITING, 3 x 120s, countdown 3s, break 5s, default draw, diem 0. Mo `http://localhost:5173/engine`; `npm run dev` la lenh khoi dong.
