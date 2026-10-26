# Giai doan 5 - Nghiem thu 2026-10-22

Ket qua: HOAN THANH trong pham vi Mock LIVE, gift/follow/comment, combo, queue, mapping, supporter va idempotency. Doi chieu Phan 9/10/11/13 va Mock Mode Phan 16 cua `PROMPT.md`.

## Thanh phan

| File | Trach nhiem |
|---|---|
| `shared/live.ts`, `shared/game.ts` | Zod normalized event/mock request/mapping/live state/runtime, typed socket contract |
| `server/live/LiveEventAdapter.ts`, `MockEventAdapter.ts` | Adapter interface; mock gift/streak/follow/comment offline |
| `server/live/LiveEventProcessor.ts` | Delta accounting, dedupe, membership/follow, supporter ledger, sanitize, bounded feed/log |
| `server/live/ComboManager.ts`, `CelebrationQueue.ts` | Combo tiers/multiplier, capped priority queue, merge/cooldown |
| `server/game/GameEngine.ts`, `gameServer.ts`, `storage.ts` | Server authority, endpoints, snapshot v2 + ledger, v1 migration |
| `src/pages/MockLiveLab.tsx`, `src/styles/MockLiveLab.module.css` | `/mock`, Live desk, actual stadium preview, mapping editor, stats/log |
| `src/live/LiveFeedback.tsx`, `MockAudio.ts`, `src/styles/LiveFeedback.module.css` | Blue/red/gold glow, celebration/combo text, follow star, user-unlocked tones |
| `src/pages/StadiumPreview.tsx`, `src/characters/DebugCharacter.tsx`, `AnimationManager.ts` | Reuse real GLB/mixer/cache; consume server cues, clear stale queue without cutting current clip |
| `tests/LiveEvents.test.ts`, `liveServer.test.ts`, `livePresentation.test.ts` | Gameplay, real Socket/HTTP/storage/recovery, actual clip durations, Web Audio |

## Luat va quyet dinh

- Rose/cookie IDs mac dinh la `rose`/`cookie`, 10 points/qua, Ronaldo/SIUUU/red va Messi/Celebrate/blue. `trophy` 100 points, Messi Victory/gold, priority 3. Gift ID/catalog la gia lap, khong khang dinh gift that co tren moi TikTok account.
- UI x1/x10, custom count 1-100, combo 3/5/10/20, special gift, follow, 4 comment forms, Reset/New match, Replay last deu hoat dong. API event repeatCount toi da 10000, request mock toi da 100 qua.
- Ledger key la source + user + gift + streakId, fallback eventId on dinh. Diem = delta tang cua cumulative repeatCount. Count giam/khong doi khong them diem; final chi them delta neu con, roi dong streak. Final-first duoc tinh mot lan; intermediate cu den sau bi bo qua. Event ID reuse voi identity khac bi tu choi.
- Gifts chi tinh khi PLAYING va dung match/round. Phan tang ngoai PLAYING van duoc consume de khong tinh lai sau resume; streak gan round dau tien, khong chuyen round. New match tao ID moi, xoa ledgers; replay match cu bi tu choi.
- Ledger khong evict keys trong tran: fail closed khi 50,000 events / 25,000 streaks. Followers/members cap 10,000; supporter rows cap 20,000. Tranh unbounded growth va duplicate do eviction. Raw source phai co stable streakId hoac stable eventId; truong hop nguon thieu ca hai can adapter policy o Giai doan 8, khong tu doan.
- Combo per-team/window 5s, reset moi round/expire. Tier 3/5/10/20; multiplier default false. Optional multiplier tinh tung gift moi: 1-4 x1, 5-9 x2, 10-19 x3, 20+ x5, batch va streamed cho cung tong (20 Rose =490 khi bat).
- Cue queue moi team: 1 active + toi da 4 pending. Active khong bi cat. Merge cung clip/effect/sound, aggregate count/tier, sort priority; queue full thay pending thap nhat chi khi event moi cao hon, neu khong drop visual. Score/ledger khong phu thuoc viec drop effect. Duration map duoc test voi clips that, camera theo playback manager hien co.
- Follow unique theo user/source, khong assign team. Team membership unique va configurable switching. Notice join/follow global cooldown 1500ms, feed 8; followers/member counts van day du. Top 3 moi team lay full contribution ledger ca tran, khong chi history100. Doi membership khong chuyen contribution gift cu.
- Username chuan hoa/sanitize, text render React escaped. User ID va identity fingerprint hash SHA-256; khong luu raw comments/email/avatar. Strict schemas tu choi unknown fields. Gift mapping co the edit/add/remove khi WAITING, persist/retain qua reset; validate animation dung skeleton va ID unique.
- Snapshot v2 luu game state + dedupe/follower/supporter ledger trong mot JSON replacement. V1 migrate giu match/config/score. V2 missing ledger/follower or gift inconsistency bi reject. Restart giu state PAUSED, khong replay cues cu; pending effects clear, combo expires. Config/state luu local, khong co database ngoai.

## Ket qua kiem thu

- `npm run typecheck`: PASS.
- `npm run test`: 91 tests / 11 files PASS (38 tests moi, 53 tests giai doan 4 van pass).
- `npm run build`: PASS; JS 1,446.47 kB, gzip 403.52 kB. Van warning chunk >500 kB.
- Sau thay doi event fingerprint sang hash, 34 tests live ingestion/server duoc chay lai PASS.
- Unit: mapping/score/count; streak 1->3->3->2->5 + duplicate/final/reconnect; stable event ID no streak; final-first; source/user/gift/streak separation; identity conflict; paused/old-round consumption; restored open/closed streak; reset; invalid/unknown events; follower/membership/rate-limit; sanitize/no raw comment; full supporter ranking; combo/multiplier batch invariance; 30 gifts merge queue; priority/drop/cooldown; mock adapter lifecycle.
- Integration: Express/Socket.IO that, 2 clients nhan cung score/cue, reconnect replay +0, backend restart replay +0, mapping/membership/follow/full supporter persist; v1 migrate giu match; v2 missing ledger startup rejects.
- Presentation: server cue duration matches actual GLB/procedural clips (2 characters); queue clear khong cat current clip; Web Audio unlock/first follow/throttle/none/dispose.
- Browser 1440x1000: Follow neutral Welcome/star/follower=1; Enable sounds unlock; Rose +10 va SIUUU; Cookie x10 +100 va Messi Celebrate/blue; combo x20 +200; replay +0/5 duplicates. CR7 lap khong tang member, doi M10 mot member. Trophy +100 va Messi Victory.
- Refresh giu PAUSED/210-200; tab Engine Lab cung 210-200. Rose point=17 luu qua refresh, Rose x10=170. New match va tra point10 hoat dong.
- Mobile 390x844: scrollWidth375, khong tran ngang; hai model full-body, controls va mapping editor responsive. Desktop scrollWidth1425 <=1440. Anh `phase-5-follow.png`, `phase-5-gifts-desktop.png`, `phase-5-mobile.png`.
- Co mot Vite Windows crash code3221226505 luc khoi dong tab dau tien; concurrently dung backend. Da restart `npm run dev`, tai lai asset, browser tests sau do hoan tat. Gameplay console sau recovery khong ghi nhan error, con warning THREE.Clock deprecated. Health cuoi ok/persistenceError null.
- GLB SHA-256 goc/public copy khong doi: Ronaldo `78f690b490c55a2ed900634b24934dd760a79e9b59242aeb4ec8fbb226546a74`; Messi `92edca0105a42751c4caa793b389d1785fbafb190b01636e1407ae9cd9cbf4e7`. Khong sua GLB, original clips, scale hay camera maths.

## Gioi han dung pham vi

- `/mock` la dashboard nghiem thu co preview that; `/control` va `/overlay` hoan chinh o Giai doan 6. Notification/score/cues da reusable cho Overlay, chua bao cao da test Overlay that.
- Glow/text/star la feedback nhe, sound la synthesized tones voi user gesture; chua phai full VFX/confetti/crowd/voice/music/Audio Manager. Golden Trophy chi la ten gift mock + Victory, chua co trophy mesh.
- Chua ket noi TikTok LIVE that. UI hien MOCK CONNECTED, TikTok DISCONNECTED. Interface adapter da san sang cho Giai doan 8.
- Snapshot la local JSON, khong phai database durability. Truong hop Windows file lock/ghi that bai duoc bao health/log va retry; khong khang dinh survives power failure. Endpoint local tin cay, chua public admin auth.
- Khong bao cao 60 FPS; bundle/performance va full overlay/audio/OBS con o Giai doan 6-9.
- Ban giao: WAITING, 3x120s, count/score/member/follower=0, Rose/Cookie 10, default multiplier false. Chay `npm run dev`, mo `http://localhost:5173/mock`.
