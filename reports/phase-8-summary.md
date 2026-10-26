# Giai doan 8 - TikTok LIVE adapter va Mock fallback

Ngay nghiem thu: 2026-10-23. Workspace: C:\3d. Yeu cau: PROMPT.md Phan 9/16 va PROJECT_PHASES.md.

**Hoan thanh tich hop adapter va kiem thu offline. Chua ket noi/kiem thu phien TikTok LIVE that.** Khong co username, API key hay phien LIVE duoc cung cap; khong tao `.env` chua thong tin tai khoan va khong tu ket noi tai khoan.

## Nghien cuu connector

- npm registry: `tiktok-live-connector` latest 2.5.0 tai thoi diem kiem tra, modified 2026-09-16T11:13:54.578Z. Pin exact2.5.0; Node engine >=20.0.0, may nay Node24.15.0/npm12.2.0. npm install --ignore-scripts: audited327 packages,0 vulnerabilities.
- Nguon: https://github.com/zerodytrash/TikTok-Live-Connector va https://www.npmjs.com/package/tiktok-live-connector/v/2.5.0. Doc README trong package va README registry, doi chieu dist/index-DcaLUrMQ.d.ts, lib-DWhiWLli.js va tiktok-live-proto0.2.4/v3. License installed: AGPL-3.0-only (da ghi ASSET_CREDITS.md).
- API that: `new TikTokLiveConnection(username, options)`, async connect()->state.roomId, async disconnect(); WebcastEvent.GIFT/CHAT/FOLLOW/STREAM_END, ControlEvent.ERROR/DISCONNECTED. Da smoke-test import/constructor/disconnect ma khong goi mang.
- README co vi du cu (`user.userId/uniqueId`, `giftDetails.giftType/giftName`). Ban cai2.5.0 thuc te phat protobuf v3: **user.id/displayId/nickname**, **gift.type/name**, **common.msgId/roomId/createTime**, groupId, giftId dang string, repeatCount/repeatEnd dang number. Test encode/decode qua protobuf that de kiem tra hinh dang nay.
- `processInitialData=false`, fetchRoomInfoOnConnect=true, enableExtendedGiftInfo=false, authenticateWs=false, useMobile=false. Khong dung session/cookie/OAuth, khong gui chat. Signing va room resolution co phu thuoc Euler Stream (`tiktok-live-api-sdk0.4.0-beta1`); optional signApiKey chi o backend. Dich vu ngoai co the yeu cau key/quota; Mock khong phu thuoc no.
- SDK khong huy duoc moi HTTP request dang connect qua disconnect(). Adapter retire callbacks va dong lai socket neu promise cu tra thanh cong muon. Outer timeout gioi han trang thai app; no khong cam ket huy ngay tat ca request ben trong SDK. Khong dung timeout got tu README vi runtime2.5.0 tu tach/bo option timeout va dung TIKTOK_CLIENT_TIMEOUT mac dinh10s.

## File va hanh vi

- `server/live/tikTokConfig.ts`: validate .env, default disabled, config loi fallback; public username toi da24ky tu, key khong vao snapshot. `server/index.ts` doc `.env` bang Node loadEnvFile; `.env.example` huong dan. Restart khong tu connect.
- `server/live/tikTokTransport.ts`: lazy-load thu vien, boc interface rieng, giu error listener cho callbacks cu. Thu vien chi xuat hien o server; frontend/core khong doc raw payload.
- `server/live/TikTokNormalizer.ts`: parse Zod protobuf v3; preserve numeric IDs khong mat precision; hash room/type/msg cho event ID va room/user/gift/group cho streak ID. Chi allowlist user/display name, gift, timestamp, team hint va metadata room/baseline; khong luu profile/avatar/raw. Team tinh diem van do mapping server quyet dinh.
- `server/live/TikTokLiveEventAdapter.ts`: chung LiveEventAdapter voi Mock, connect/disconnect chu dong. States unconfigured/disconnected/connecting/connected/retrying/error; timeout30s,5 retries (2/4/8/16/32s), backoff cap60s. Total retry budget theo lan bam Connect; Stream end va Use Mock dung retry. Tokens generation + retire listeners chan event/resolve cu sau stop/shutdown; log loi khong lo URL/token, invalid event log toi da1/5s.
- `server/gameServer.ts`: connect ack ngay, validated match/action, persist + broadcast moi event/trang thai. Connected chi cho TikTok ingest; Mock API va nut UI bi khoa. Connecting/retrying/error/disconnected de Mock san sang. Fallback khong reset tran. Restart reset nguon ve Mock, giu ledger/diem va pause tran dang chay.
- `shared/live.ts`, `shared/game.ts`, GameEngine/LiveEventProcessor: public status co default tuong thich snapshot cu; team/metadata optional, baseline consume high-water mark khong cong diem. Command liveConnection xu ly o transport server, khong o scoring engine.
- `src/live/LiveConnectionPanel.tsx`, MockLiveLab, StadiumPreview va Control CSS: panel Connect/Use Mock, mode/username/room/attempt/retryAt, huong dan config, mapping ID that va log gift chua mapping. Status dong bo tren Control/Mock; giu visual language cu, responsive390px.
- `vite.config.ts`: WEB_PORT va GAME_PORT doc .env hoac env process; strictPort. Da dung5174 vi5173 cua C:\TadicManagement, khong dung tien trinh do. Khong expose bien TIKTOK_* bang VITE_ define.

## Luat chong cong qua cu

- Core processor luu event/streak high-water mark va mapping frozen cung snapshot. Duplicate/repeatEnd khong cong lai; streak round cu khong sang round moi. Mapping theo ID, khong theo ten; unknown ID log ID/ten sach va0diem.
- Tat initial history. Event phai dung room, timestamp hop le (seconds/ms), khong qua30s cu hay hon5s tuong lai. Khi doi match/round/status/source, bo qua giay giao thoa vi timestamp nguon co the chi co do chinh xac1s.
- Streak moi thay count>1 hoac timestamp cu: consume baseline va gan round0, bo qua ca streak neu chua co ledger. Khi reconnect/resume gap co ledger cu, consume moc dau tien, chi delta sau do moi co the tinh trong round goc. Cac gioi han nay uu tien tranh cong nham; **co the bo sot gift**, khong tu bu gift cua khoang mat mang. Khong xem day la doi soat tai chinh TikTok.
- Payload thieu groupId/msgId/time/user/gift info hop le bi tu choi; loi tong quat va gioi han log. Gioi han ledger giu nguyen; normalizer seen toi da25k/scope, khong evict de cho tinh trung.

## Kiem thu va bang chung

- `npm run typecheck`: pass.
- `npm run test`: **162 tests /19files**, tat ca pass (128 tests cu +34 moi).
- 29 tests trong tiktok.test.ts: installed transport smoke khong network, protobuf roundtrip, invalid IDs/count/group/time/room, nonstreak gift, follow/comment/team, cumulative duplicate/final, reconnect baseline/new match, no config/autoconnect, backoff/exhaustion, disconnect/streamend, sanitization/throttle, late connect sau stop/timeout va factory/import failure.
- 3 tests trong tiktokServer.test.ts: HTTP/Socket.IO ack/broadcast, TikTok30diem + Mock fallback10diem, khoa Mock khi Connected, stop retry, persisted ledger/restart/duplicate, pending-connect shutdown, stale match va forged secret fields.
- 2 tests UI trong tiktokPanel.test.tsx: config-thieu khoa Connect, Connect command chi co action/matchId, retry cho Stop.
- `npm run build`: pass; JS1,478.73kB/gzip413.16kB, CSS43.09kB/gzip9.69kB. Con bundle warning>500kB. Client bundle khong chua connector runtime/signing key.
- `npm run dev` voi WEB_PORT=5174: frontend http://localhost:5174, backend http://127.0.0.1:3001. Browser Control: UNCONFIGURED, Mock san sang, Connect bi khoa; hai GLB render. Start/Countdown/PLAYING; Rose x10=100, Replay last=+0/1duplicate, Pause; New match ve WAITING0/0.
- Browser desktop1265x712 va mobile390x844: panel doc duoc, scrollWidth375 <=390, khong tran ngang. Console khong co error; con THREE.Clock deprecation. Anh: `phase-8-control-ready.jpg`, `phase-8-control-mobile.jpg`.

## Ban giao va gioi han

- WAITING0/0, round0,3x120s/countdown3/break5/draw; mapping mac dinh, gift/follower/member0. Presentation mac dinh duoc giu. Match ID moi `b329891a-c66d-4c14-a54d-d867fa50218a` tao boi browser New match.
- Backup truoc phase: `data/before-phase-8-2026-10-23.json`. GLB goc/public khong doi: Ronaldo SHA256 `78f690b490c55a2ed900634b24934dd760a79e9b59242aeb4ec8fbb226546a74`; Messi `92edca0105a42751c4caa793b389d1785fbafb190b01636e1407ae9cd9cbf4e7`.
- **Chua kiem thu LIVE that**, chua nghiem thu OBS/TikTok LIVE Studio. Khong coi fixture/socket test la ket noi TikTok thanh cong. Can phien LIVE va mapping thuc te de xac minh them.
- Giai doan9 (nghiem thu tong the/toi uu/ban giao) con lai; bundle/performance va admin authentication khong duoc mo rong pham vi o phase nay.
