# Giai doan 7 - VFX, audio, supporter va ket qua

Ngay nghiem thu: 2026-10-22. Workspace: C:\3d. Nguon yeu cau: PROMPT.md Phan 6/7, 13-15.

## Thay doi

- `CelebrationEffects.tsx`: aura do/xanh, particles vang/trang, vong tiep dat, flash ngan, sao Messi, confetti instanced. Khong them postprocessing/bloom hay texture ben ngoai. Tai nguyen geometry/material do R3F quan ly va dispose khi unmount.
- Cup Messi la 5 mesh don gian, xuat hien tu 1.6s den 4.9s cua Messi Victory, bay tu y=3.9 len 4.2. Nam trong framing bound cu, khong chinh bone/skin/GLB. Da xem cup phia tren hai tay, khong che mat; duoc giu lai duoi toggle `trophy`.
- `resultPresentation` lay roundResults/winner tu server. Ket qua tran khong suy ra tu leader/diem hiep cuoi. Round/match result uu tien camera va clip dung doi; draw ve Main + hai Idle. Queue gift van bounded; ket qua clear queue va thay clip. AnimationFrame mang request cua clip dang chay de cue audio khong bi nham voi request dang doi.
- Overlay co GET READY/ROUND START, 10 giay cuoi, lead change/combo, ket qua hiep/tran va Top 3 moi team (hang, username, gift count, contribution ca tran). Thong bao supporter #1 moi ton tai 3s. React text, khong innerHTML. Show celebrations an ca result/supporter HUD.
- `AudioManager`: synth UI/gift/combo/crowd/roundStart/roundEnd/victory/siuuu/messi/countdown/follow. SIUUU va Messi la cue tong hop, khong gia giong cau thu. Web Audio gesture unlock, master gain, mute stop/disconnect, toi da 4 voices, rate limit 120ms chung + cooldown theo cue. File decode xong khong phat event cu.
- Audio marker SIUUU 2.62s, Messi .8s va crowd theo dong ho clip thuc te; gioi han chong lap. Gift mapping sound=none silences celebration; effect=none an VFX cua gift. Mat socket mute audio, unmute/timer snapshot khong replay event cu.
- `AudioSettings`: duong dan local `/audio/...` cho tung cue, local sound check rieng 60%, fallback synth. File <=4MB, <=8s, mono/stereo, MP3/WAV/OGG, timeout8s. Khong download audio/voice/music. Test WAV tu tao da xoa. Preview Control van im lang.
- Schema default `heavyEffects`, `trophy`, `audioFiles` tuong thich snapshot cu; partial patch khong chen default de ghi de lua chon khac. Reset/restart giu settings.

## Gioi han VFX

| Muc | Particles/team | Confetti/team | Sao Messi | Flash |
| --- | ---: | ---: | ---: | --- |
| Low | 12 | 8 | 3 | Off |
| Standard | 64 | 48 | 8 | On |
| High | 64 | 96 | 8 | On |

Heavy effects off: confetti/flash off. Reduced motion: particles/confetti/stars/flash va camera shake off, aura tinh; character animation van chay. VFX off: an tat ca effect/cup. Quality Auto dung heuristic 3 cua so cham lien tiep cua scene co san de ha Low.

## Kiem thu

- `npm run typecheck`: pass.
- `npm run test`: **128 tests / 16 files**, tang 21 tests so voi Giai doan 6. Bao phu round/match outcome khac leader hiep cuoi, ca hai winner/draw, paused round/overtime, Top3 va XSS, round start/countdown/result audio dedupe, migration/patch/reset, invalid paths, budget Low/reduced motion, landing marker, actual clip identity/queue, voice cap/gain/mute/dispose, local buffer/fallback/oversize/duration.
- `npm run build`: pass; JS 1,476.37 kB / gzip 412.38 kB. Con canh bao chunk >500kB.
- `npm run dev`: da khoi dong lai bang mot lenh, Vite5173 + backend3001. Restart giu WAITING/MatchID va settings. Proxy co the bao ECONNREFUSED ngan trong luc backend khoi dong; socket tu reconnect.
- Browser Messi: 6 supporter, 37 gifts; diem150/220. Top3 Ronaldo Bao_7(70), Lan_Red(50), Minh_CR7(30); Messi Nam_Magic(100), Linh_Blue(80), An_M10(40). ROUND_END/MATCH_END hien MESSI WINS, camera victory/result=messi. Cup/stars/confetti quan sat thuc te.
- Browser Ronaldo: Rose20/Cookie1 ->200/10, Low, ket qua RONALDO WINS, camera victory/result=ronaldo. Draw0/0 ->MATCH DRAW, camera main, Ronaldo Idle/Messi Idle. Countdown FINAL SECONDS da quan sat trong DOM; anh round-draw-1080 duoc chup sau khi timer ket thuc, khong gan nhan sai thanh anh countdown.
- Browser audio: Unlock/Play cue hoat dong; `/audio/phase7-missing.wav` ->0 files ready/1 fallback; WAV synth tu tao ->1 files ready/0 fallback. Khong kiem dinh am luong/loa vat ly hay OBS mixer. Pipeline audio duoc kiem tra bang Web Audio unit tests va browser decode/unlock.
- Responsive: Overlay720x1280 va1080x1920 khop viewport/scroll dimensions. Control390x844 scrollWidth375, form audio khong tran ngang. Ket qua/supporter nam ngoai khuon mat nhan vat.
- Performance local: Standard preview co mau89-90 FPS,116 calls/309680 triangles; Low co mau74 FPS,97 calls/154611 triangles khi preview trong viewport. Tab bi an/ngoai viewport co mau1 FPS do host throttle; khong dung mau do de ket luan GPU. Auto da ha Low trong phien test. Khong cam ket60 FPS tren moi may.
- Browser khong ghi nhan React/WebGL error trong cac phien xem ket qua; con warning THREE.Clock cua dependency. Anh screenshot mot so tab cu that bai do host; tao tab moi va lay fullPage de kiem tra1080.

## Bang chung

- `phase-7-messi-trophy.jpg`: cup, tay nang, blue-white stars/confetti.
- `phase-7-round-result.jpg`, `phase-7-messi-result.jpg`: ket qua va Top3 hai doi.
- `phase-7-ronaldo-result-low.jpg`, `phase-7-control-low.jpg`: Ronaldo win, Low va Control.
- `phase-7-draw-1080.jpg`, `phase-7-round-draw-1080.jpg`: hoa, hai Idle, khung1080.
- `phase-7-audio-fallback.jpg`, `phase-7-audio-local.jpg`: sound check.
- `phase-7-control-mobile.jpg`, `phase-7-audio-mobile.jpg`: mobile.
- Backup truoc test: `data/before-phase-7-2026-10-22.json`.

## Asset va ban giao

SHA256 file goc va public copy khong doi:

- Ronaldo: `78f690b490c55a2ed900634b24934dd760a79e9b59242aeb4ec8fbb226546a74`.
- Messi: `92edca0105a42751c4caa793b389d1785fbafb190b01636e1407ae9cd9cbf4e7`.

Ban giao WAITING, diem0/0, gift/follower/member0, 3x120s/countdown3/break5, draw tiebreak, mapping goc. Camera main/auto, stadium, qualityauto, VFX/heavy/trophy/HUD on, reducedmotionoff, volume60/mute, audioFiles rong. MatchID `8b120e28-0095-4c06-b357-1490fcfec781`. Chua ket noi TikTok LIVE/OBS thuc te; Giai doan8-9 con lai.
