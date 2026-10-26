# Ronaldo vs Messi - LIVE Battle

Da hoan thanh Giai doan 9 va ban giao phien ban local/Mock ngay 2026-10-24. Yeu cau goc: `PROMPT.md`; tien do: `PROJECT_PHASES.md`; bao cao cuoi: `reports/phase-9-summary.md`; doi chieu 22 tieu chi va 24 phan prompt: `reports/final-acceptance.md`. TikTok adapter da kiem thu offline; **chua kiem thu phien TikTok LIVE that hoac OBS/TikTok LIVE Studio thuc te**.

## Chay tren Windows

Chay tren may chu Docker: xem [deploy/README.md](deploy/README.md). Ban Docker phuc vu production build qua Caddy va luu snapshot trong Docker volume; truy cap tu may phat LIVE qua SSH tunnel.

Yeu cau Node.js 24 LTS (da thu voi 24.15.0) va npm.

```powershell
cd C:\3d
npm install
npm run dev
```

Giu terminal nay dang chay. Mo URL `Local:` ma Vite in ra, them `/admin` de dieu khien luat tran co ban, `/control` de dieu khien do hoa/TikTok hoac `/overlay` de phat song. `/stadium` (hoac `/`) la san xem thu. Neu gap `ERR_CONNECTION_REFUSED`, kiem tra terminal va chay lai `npm run dev` neu server da dung. Khong can thay DNS hay tat tuong lua de xu ly server chua chay. De cai dung cac version trong lockfile tren may moi, co the dung `npm ci` thay `npm install`.

`npm run dev` khoi dong ca Vite (bat dau tu 5173) va game server 3001. Neu port frontend ban dau bi chiem, Vite tu chon port tiep theo va in URL thuc te. Backend can port trong; neu loi, terminal in nguyen nhan. Neu mot tien trinh dung thi tien trinh con lai cung dung. `npm run dev:web` / `npm run dev:server` dung khi can chay rieng. Backend in URL, snapshot, match va trang thai TikTok; khong tu ket noi TikTok.

Neu 5173 dang duoc du an khac su dung, chon port trong (khong dung tien trinh cua du an do):

```powershell
$env:WEB_PORT='5174'
npm run dev
```

Lan ban giao 2026-10-24 dang chay tai http://localhost:5174/control va http://localhost:5174/overlay, backend 3001. Cac vi du 5173 ben duoi la port mac dinh; thay bang port `Local:` trong terminal. Co the dat WEB_PORT/GAME_PORT trong `.env`; Vite proxy va backend cung doc file nay. WEB_PORT chi doi port bat dau cua frontend; GAME_PORT doi backend va proxy. Khoi dong lai sau khi doi.

De xem production build: chay `npm run build`, giu backend bang `npm run server` trong mot terminal, va chay `npm run preview` trong terminal khac. Mo http://localhost:4173/control hoac `/overlay`. Preview dung port 4173 co dinh va bao loi neu bi chiem. Khong chay them backend neu `npm run dev` da giu port 3001.

## Luat choi don gian

- Trang admin: http://localhost:5173/admin. Chinh thoi gian theo giay hoac chon **Khong gioi han**; chinh toc do rieng cho Ronaldo va Messi truoc khi bat dau.
- Moi hoa/Flower/Rose hop le: Ronaldo +1 diem va 1 luot SIUUU. Moi banh quy/Cookie hop le: Messi +1 diem va 1 luot an banh. Qua khac khong cong diem.
- Ti so luon nam o dau Overlay. Tran mac dinh chi co 1 luot. Khi khong gioi han thoi gian, admin dung **Ket thuc** de chot ket qua.
- Do hoa, VFX, am thanh va TikTok van dieu khien tai `/control`.

## Overlay va Control - Giai doan 6

- Control Dashboard: http://localhost:5173/control
- LIVE Overlay: http://localhost:5173/overlay

Control co live preview 9:16, Start/Pause/Resume/New match, mock gifts/follow/comments, animation thu cong, match rules, gift mapping, camera, volume, VFX va HUD. Preview luon tat audio de tranh phat hai lan. FPS/draw calls/triangles la so do cua preview tren may dang mo Control, khong phai FPS tu xa cua OBS. Panel TikTok LIVE hien cau hinh, Connect, Use Mock/Stop retry va trang thai dong bo tu server.

1. Khi WAITING, chinh **Giay / hiep** / so hiep roi **Save match rules**; chinh **Points** trong **Gift mapping & rules** roi **Save live rules**. Start de bat dau nhan diem.
2. **Set timer** thay doi so giay con lai cua PLAYING hoac PAUSED-from-PLAYING. **New match** xoa du lieu tran, giu luat, mapping va thiet lap hien thi.
3. Nhom **Animation / +0 points** phat 7 animation qua queue server, khong tang diem/gift/supporter. Camera main/ronaldo/messi/victory va Auto celebration camera ap dung tren ca Overlay va preview. Victory focus danh cho camera thu cong; Messi Victory tu dong luon focus Messi.
4. **Background** chon Stadium hoac Transparent. Transparent bo san/khan dai/fog/nen WebGL, giu hai GLB, anh sang va HUD co nen toi de doc ro. **Render quality** va **Reduced motion** giup giam tai. **VFX glow / camera shake** tat VFX/camera shake; **Heavy effects** tat rieng confetti va flash. Chi tiet Giai doan 7 ben duoi.
5. **Show scores/timer/leader/celebrations/feed/hints** an tung nhom HUD. Celebration va lead-change co vung rieng ngoai canvas, khong de chu len mat nhan vat. Feed co sender va gioi han 3 dong; ten/gift dai duoc rut gon tren HUD, chi tiet co trong Control.
6. Master volume 0-100 va Mute luu o server. Mac dinh Mute, volume 60. Bo **Mute overlay audio**, roi click vao Overlay de unlock Web Audio cho chinh tab do. Thay doi o Control khong the thay user gesture cua tab khac. Audio Manager dung am tong hop va file local tuy chon, khong kem nhac/giong that.
7. Tren Overlay, **F** hoac double-click bat/tat fullscreen; **Esc** thoat. Khong co nut test/admin tren Overlay. Neu trinh duyet khong cho Fullscreen API, thong bao tam thoi huong dan mo Chrome/Edge hoac dung F11.
8. Mo hai URL cung luc: game state, diem, timer, cue va thiet lap hien thi nhan tu cung server qua Socket.IO. Refresh khong reset. Mat ket noi hien canh bao snapshot cu va khoa dieu khien; ket noi lai tu dong dong bo, khong tu gui lai lenh.

### OBS / TikTok LIVE Studio

Trong OBS, them **Browser Source**, URL `http://localhost:5173/overlay` (doi port theo terminal), Width **1080**, Height **1920** (hoac **720 x 1280**). Giu source dung ti le 9:16, bat hardware acceleration cua browser/source neu host co tuy chon. Chon Transparent trong Control neu can ghep voi video/nen khac; khong dung custom CSS dat nen opaque. Neu can audio, dung **Interact** de click unlock, bo Mute va kiem tra OBS audio mixer. Browser Source reload can unlock lai theo chinh sach cua host. Chi giu mot nguon audio phat ra stream de tranh echo; Control preview luon im lang.

Trong TikTok LIVE Studio, dung nguon URL neu phien ban ho tro; neu khong, capture cua so trinh duyet mo Overlay va crop dung 9:16. Window capture khong dam bao alpha; dung nen Stadium trong truong hop nay. Da kiem thu trong browser, chua nghiem thu truc tiep trong OBS/TikTok Studio hay phien TikTok LIVE that.

`presentation` luu cung snapshot v2. Snapshot cu tu nhan default; khong reset match. Lenh `presentation` la patch tung truong/HUD, tranh ghi de thiet lap khac tu tab cu. Lenh `animate` validate team/skeleton, su dung cung queue bounded voi gifts va ghi event log +0 points. Tai lieu kiem thu: `reports/phase-6-summary.md`.

## VFX, audio va ket qua - Giai doan 7

- Ronaldo: aura do, hat vang, vong sang/tia sang luc SIUUU tiep dat, confetti do-vang. Messi: aura xanh, sao trang, hat sang va confetti xanh-trang. **Messi floating trophy** bat/tat cup game tao bang mesh don gian, bay len tren tay trong Messi Victory; khong sua skeleton/GLB.
- Het hiep/tran: Overlay hien nguoi thang/hoa do server tinh, diem hiep hoac tong diem co nhan ro, Top 3 moi team theo dong gop ca tran. Ket qua tran dua tren so hiep thang. Qua cua doi thua khong doi duoc camera/animation nguoi thang. Draw dua ca hai ve Idle va camera Main. Nut animation thu cong khoa trong luc hien ket qua.
- Co GET READY, ROUND START, countdown 10 giay cuoi, LEAD CHANGED, combo va thong bao supporter dan dau moi. Ten hien bang React text. **Show celebrations** an ca result/supporter HUD; du lieu khong bi xoa.
- Low: 12 particles, 8 confetti, 3 sao/team toi da; Standard: 64/48/8, High: 64/96/8. Chi Messi dung sao. Low tat flash. Auto ha Low khi FPS cham keo dai; Reduced motion tat particles/confetti/stars/flash va camera shake, giu aura tinh va animation nhan vat. Tat VFX se an ca cup.
- Audio Manager co UI, gift, combo, crowd, roundStart/roundEnd, victory, siuuu, messi, countdown va follow. Mac dinh la hieu ung tong hop ngan; SIUUU/Messi la ten cue, **khong phai giong cau thu that**. Toi da 4 voices, cooldown theo cue va rate limit chung. Mute/volume 0 dung nguon dang phat; unmute khong phat lai event cu.
- Gift/celebration sounds theo dong ho clip dang render, ke ca luc cho queue/load model. SIUUU marker tai 2.62s (tiep dat), Messi tai 0.8s; crowd theo sau. Gift van queue/crossfade; ket qua co quyen thay animation va xoa queue de khong an mung sai doi. Chinh clock audio khong thay doi clock/diem server.
- File rieng: dat MP3/WAV/OGG co quyen su dung trong `public/audio/`; mo **Audio files / sound check**, chon cue va nhap `/audio/my-siuuu.wav`, **Save audio paths**. Ten file/subfolder chi ASCII chu/so, `_`, `-`; <=4 MB, <=8 giay, mono/stereo. Khong nhan URL ngoai hay duong dan Windows. Bo trong de dung synth. File thieu/hong/qua gioi han/chua tai xong se dung synth, khong phat event muon sau download.
- **Unlock sound check** / **Play cue** kiem tra rieng tai Control voi volume 60%; **Stop sound check** tat. Day la audio test co chu dich; live preview van im lang. Moi Overlay/OBS Browser Source can gesture unlock rieng. Cau hinh duong dan/volume/mute/VFX luu qua reset/restart; file WAV thu nghiem khong duoc giu trong ban giao.

Bang chung: `reports/phase-7-summary.md`, `phase-7-messi-trophy.jpg`, `phase-7-round-result.jpg`, `phase-7-ronaldo-result-low.jpg`, `phase-7-draw-1080.jpg`, `phase-7-audio-local.jpg`, `phase-7-audio-mobile.jpg`.

## Game engine - Giai doan 4

Mo http://localhost:5173/engine. Day la Engine Lab de thu gameplay; `/stadium` van la scene preview rieng, chua gan ket qua vao animation.

1. Khi WAITING, chinh cau hinh neu can va bam **Luu cau hinh**. Mac dinh 3 hiep x 120 giay, countdown 3 giay, nghi 5 giay.
2. Bam **Start**: COUNTDOWN -> PLAYING. Dung **RONALDO +10** / **MESSI +10** de thu diem thu cong. Day chua phai mock gift.
3. **Pause/Resume** tam dung/tiep tuc ca countdown, hiep dang choi hoac nghi giua hiep. Khong cong diem luc tam dung.
4. **Dat timer** doi so giay con lai cua hiep dang choi. Gia tri 0 ket thuc hiep; neu dang PAUSED thi doi Resume.
5. Het gio: ROUND_END, luu diem va doi thang hiep, roi tu sang hiep tiep theo. Diem hiep reset ve 0, tong diem va so hiep thang van giu. Het tran: MATCH_END.
6. **Reset / New match** tao Match ID moi, xoa toan bo diem/ket qua/du lieu nguoi xem cua tran truoc va ve WAITING. Cau hinh va ket noi duoc giu.

Ket qua tran dua tren **so hiep thang**, khong phai tong diem. Hoa hiep luon duoc ghi draw. Neu so hiep thang bang nhau sau cac hiep chinh, `Ket thuc hoa` cho MATCH_END/draw; `Choi hiep phu` them hiep cho den khi co doi thang hoac het so hiep phu toi da, khi do van hoa thi draw.

Mo hai tab `/engine` de thu dong bo. Refresh/reconnect nhan snapshot server; khong reset tran. Client khong tu dem nguoc hay tinh nguoi thang. Mat ket noi se khoa nut va danh dau snapshot cu.

### Luu va phuc hoi

- Cau hinh khoi tao: `config/game.config.json` (Zod validate). Khi da co snapshot, cau hinh luu trong snapshot duoc uu tien. Doi cau hinh qua Engine Lab khi WAITING; khong can sua code.
- Snapshot: `data/game-state.json`. Luu sau lenh/chuyen phase va moi khoang 1 giay khi timer chay, ghi file tam roi rename. Khong can database ngoai.
- Khi backend khoi dong lai: giu Match ID, diem, ket qua va timer da luu; tran dang chay duoc phuc hoi o PAUSED. Bam Resume de tiep tuc. WAITING/MATCH_END van giu nguyen.
- Kill/mat dien dot ngot co the mat toi da khoang 1 giay timer chua luu. Snapshot hong se lam backend bao loi va dung; file duoc giu nguyen. Sao luu/kiem tra file do truoc khi khoi dong lai, khong xoa asset.
- `GET /api/health` tra `ok` hoac HTTP 503/degraded neu luu snapshot that bai. `GET /api/state` tra snapshot hien tai. Co the doi `GAME_PORT` va `GAME_SNAPSHOT_PATH` bang bien moi truong; Vite proxy doc cung `GAME_PORT` luc khoi dong.
- Backend chay local tai `127.0.0.1:3001`. Cac lenh dieu khien danh cho moi truong local tin cay, chua co phan quyen admin de cong khai len Internet.

## Mock LIVE - Giai doan 5

Mo http://localhost:5173/mock. Chay local, khong can TikTok/tai khoan/LIVE. Day la Mock Lab de kiem thu rieng; dung `/control` de dieu khien va `/overlay` de capture livestream.

1. Bam **Start**, doi COUNTDOWN -> PLAYING. Rose x1/x10 cong 10/100 cho Ronaldo va xep SIUUU; Cookie x1/x10 cong 10/100 cho Messi va xep Messi Celebrate. Dropdown Gift + Count gui so luong 1-100.
2. **Golden Trophy** la gift dac biet gia lap: 100 diem/qua cho Messi, Messi Victory va mau vang. Tat ca ID/name/diem/action deu chinh duoc.
3. **Combo x3/x5/x10/x20** gui streak cumulative, kem mot event lap va final `repeatEnd`. Vi du Rose Combo x20 mac dinh chi cong 200 diem. **Replay last** gui lai cung request ID: khong duoc tang diem/so gift/follower lan nua.
4. Nhap **User ID** va **Username** de mo phong nguoi khac. **Follow** hien Welcome/star, tang thong ke mot lan theo user; neu chua chon team thi neutral. Comment **CR7/M10/!cr7/!m10** chon team, khong dem trung. Doi team theo checkbox trong Live rules.
5. **Enable sounds** unlock Web Audio; gift/follow dung tone tong hop don gian, khong tai nhac/giong ben ngoai. **Mute sounds** tat am thanh cua tab. Moi tab can unlock rieng.
6. Khi WAITING, sua **Gift mapping & rules** roi **Save live rules**. Co ID/name/team/points/animation/sound/effect/cooldown/priority, Add mapping/Remove. Lua chon animation gioi han theo skeleton; ID phai unique. Luu trong snapshot local, giu qua refresh/restart/New match.
7. Theo doi gift feed, Top 3 moi team, follower/member count, combo va event log. Mo `/engine` hoac tab `/mock` khac se nhan cung state. **New match** xoa du lieu tran va ledger, giu mapping/rules.

**Like x10 / Crowd cheer** tang 10 likes va kich hoat khan dai sang len trong 2 giay, kem cue crowd tren Overlay neu audio da unlock. Like khong cong diem, gift count, team membership hay supporter; incoming likes trong cung pulse khong keo dai hieu ung lien tuc. Reduced motion giu anh sang tinh; tat VFX se tat hieu ung khan dai. New match reset likes; restart giu tong likes va xoa pulse tam thoi. Replay last khong dem lai cung event.

### Luat combo va chong trung

- Combo gom gift cua cung team trong 5 giay (cau hinh duoc), cac moc 3/5/10/20 chi tang hieu ung theo mac dinh. Neu bat multiplier: qua thu 1-4 x1, 5-9 x2, 10-19 x3, 20+ x5. Tinh theo tung gift moi, khong nhan lai diem cu; 20 Rose =490 diem neu bat multiplier, 200 neu tat.
- Diem chi nhan khi PLAYING va event thuoc dung match/round. Gift trong PAUSED/countdown/nghi/het tran bi bo qua, nhung high-water mark van duoc ghi de khong cong lai khi Resume. Follow/comment van nhan khi tran cho/tam dung.
- Moi streak duoc gan vao round dau tien cua no. Khong day gift cua streak cu sang round tiep theo. Adapter phai cung cap streakId on dinh hoac eventId on dinh; khong the suy ra hai event ID hoan toan khac la cung streak neu nguon khong cho thong tin do.
- Event/streak dedupe va score luu cung JSON snapshot version 2. V1 duoc migrate khong reset tran. V2 thieu ledger se bao loi thay vi am tham cho cong trung. Reconnect khong replay lenh tu dong; nut Replay last dung ID cu.
- Hieu ung co queue toi da 4 pending/team; gop action/effect/sound trung, priority cao duoc uu tien, full queue drop/thay visual uu tien thap. Diem van cong ngay. Animation hien tai khong bi cat; new round/reset clear pending.
- Join/follow notice gioi han mot moi 1500ms, feed toi da 8; thong ke van ghi nhan day du. Gift history toi da 100, log 80. Top 3/team duoc tinh tu full supporter ledger ca tran, khong chi tu history hien thi. Doi membership khong di chuyen gift contribution da gui.
- Ledger toi da 50,000 event keys / 25,000 streaks / 10,000 followers-members / 20,000 supporter-team rows moi tran. Khi day, server tu choi event moi thay vi evict dedupe va tinh trung; New match mo lai dung luong.
- User ID duoc hash theo source, event fingerprint duoc hash, username duoc sanitize va hien bang React text. Khong luu raw comment/email/avatar. Chi luu thong tin can cho gameplay/dedupe.

API: `POST /api/mock` va Socket `live:mock` nhan `{ requestId, matchId, round, user: { id, username }, action, giftId?, count?, text? }`. `action` la `gift`, `streak`, `follow`, `comment`, `like`. Ack tra `results` gom accepted/duplicate/ignored, points/giftCount, va snapshot. Socket `game:command` them `liveConfig` (chi WAITING).

## San van dong - Giai doan 3

- San co arcade, vach trang, vong tron/bong giua san, khan dai, den pha, LED va nen dem. Ronaldo trai/do, Messi phai/xanh; dung hai GLB that.
- Cuon xuong duoi san de dung 5 camera: Main Battle, Ronaldo Focus, Messi Focus, Victory va Debug Orbit. Orbit cho phep keo/xoay va cuon/zoom trong gioi han an toan.
- Ronaldo SIUUU, Messi Celebrate, Messi Victory la nut xem thu animation, khong tao tran dau hay diem. Camera tu focus/theo doi nhe, SIUUU co rung nhe luc tiep dat, sau do ve Main Battle.
- Chon camera thu cong se tat Auto camera. `Reset camera` ve Main Battle va bat lai Auto camera; khong reset animation. `Victory focus` chon nhan vat cho camera Victory thu cong, khong tuyen bo nguoi thang.
- Quality: Low (DPR 1, tat shadow), Standard (DPR 1.5, shadow 1024), High (DPR 2, shadow 2048). Auto bat dau Standard va ha Low neu 3 cua so do lien tiep cham hon 35 ms/frame sau warmup.
- Reduced motion tat auto focus/follow/shake, nhan vat van chay animation; camera thu cong van hoat dong.
- Khung san doi sang 9:16 tren man hinh doc, da thu 720x1280 va 1080x1920. Header va nut nam ngoai khung san nen trang co cuon doc. Day chua phai Overlay livestream fullscreen.

## Model Debug

Mo http://localhost:5173/debug. Chon nhan vat, chon clip roi bam PLAY. Pause de dung chuyen dong; thanh POSE PREVIEW cho phep xem tung thoi diem. SPEED thay doi toc do. Keo chuot de xoay camera, cuon de zoom. Bounding box la khung tham chieu rest pose, khong phai khung dong theo animation.

Bat **Compare both** de xem Ronaldo ben trai va Messi ben phai. Cac nut animation chi dieu khien nhan vat dang chon; nhan vat con lai chay Idle. PLAY khi mot clip chay mot lan dang hoat dong se xep hang doi (toi da 4, gop clip trung), khong cat giua dong tac. Het hang doi tu ve Idle.

## Asset hien tai

- Ronaldo: `cristiano_ronaldo.glb` do nguoi dung thay moi, ban sao nguyen ven tai `public/models/`.
- Messi: `messi_2023_3d_free.glb`, giu nguyen file goc.
- Ronaldo co 1 clip goc (3.983 giay). SIUUU la ban sao clip do; Idle duoc tao tu tu the cuoi clip. Calma/Sleep/Power Pose/Point Up duoc tao bang ma tren skeleton moi, khong phai clip co san trong file.
- Messi giu nguyen clip `mixamo.com` trong file goc; ban runtime cung ten la ban sao da dich track hips Y de can chan voi rest ground, gan nhan `DERIVED`. Co them Idle, Celebrate va Victory. Victory buoc len, dang tay, gio tay. Overlay da noi ket qua tran that vao animation/camera va cup game tuy chon; Model Debug van dung preview rieng.
- Nhan `GLB` = clip goc; `DERIVED` = ban sao/tu the tu clip goc; `PROC` = clip tao bang ma. Cac dong tac procedural con don gian, khong tuyen bo chat luong mocap.
- Nguon va giay phep: `ASSET_CREDITS.md`. Chi tiet thay model: `reports/ronaldo-replacement.md`.

```powershell
npm run analyze:models
node scripts/inspect-runtime-model.mjs
node scripts/verify-authored-animations.mjs
node scripts/verify-stadium-framing.mjs
npm run typecheck
npm run test
npm run build
```

Phan tich hien tai duoc ghi vao `reports/current-glb-analysis.*`. Bao cao `reports/glb-analysis.*` la lich su cua file Ronaldo cu, khong dung de suy ra thong so model moi.

Giai doan 7 da dat typecheck, 128 tests / 16 files va production build (JS 1,476.37 kB / gzip 412.38 kB). Chi tiet: reports/phase-7-summary.md. Lich su Giai doan 6: 107 tests / 14 files. Giai doan 6 them 16 tests cho presentation patches/migration/reset/restart, animation +0 points, lead changes, HUD/audio va fullscreen gestures. 91 tests truoc do van dat. Browser da thu hai URL dong bo, refresh/restart, timer/gift points, camera/VFX/HUD/volume, fullscreen, transparent, Overlay 720x1280/1080x1920 va Control desktop/mobile 390x844. Bang chung `reports/phase-6-*`; lich su cac giai doan truoc duoc giu.

Giai doan 3 da xem WebGL/texture/animation, 5 camera, desktop 1440x900, 720x1280 va 1080x1920; 610 mau pose cua 10 clip trong vung camera dat. Bang chung lich su `reports/phase-3-*` duoc giu nguyen. Giai doan 9 da chay lai 610 mau: `reports/phase-9-framing.json`. Day la lay mau CPU skinning, khong thay the kiem tra WebGL va khong chung minh moi pose lien tuc deu dung.

## Neu khong thay nhan vat

1. Kiem tra frontend/backend dang chay va mo dung URL `Local:`. Vite co the doi sang port tiep theo neu port ban dau bi chiem; dung cung port cho Control va Overlay. Backend khong san sang thi Overlay hien loi ket noi.
2. Loi asset hien duong dan va HTTP status. Mo `/models/cristiano_ronaldo.glb` va `/models/messi_2023_3d_free.glb` tren cung host; doi chieu `public/models/`. HTTP 200 nhung tra HTML hoac file rong cung bi tu choi. Probe timeout 15 giay, model loading timeout 60 giay co thong bao. Nut tai lai trang thu lai ca loader; diem van o server.
3. Neu WebGL2 khong kha dung, bat hardware acceleration va kiem tra driver. Neu **WEBGL CONTEXT LOST**, cho GPU restore; app xoa canh bao sau khi context khoi phuc. Neu van loi, chon Low trong Control, dong cac tab 3D khong can thiet roi reload Overlay. **SHADER ERROR** hien thong bao va chi tiet compiler trong console.
4. `/debug` cho phep kiem tra texture, skeleton/bounds, clip va scale; `/stadium` co camera/quality rieng. App Error Boundary hien loi React/module; khong dung nhan vat placeholder. Neu san hien nhung mat nhan vat, doi Main camera, tat transparent de quan sat, kiem tra console va bao cao loi cu the.

## Kiem thu va toi uu cuoi

Giai doan 9 dat typecheck, **171 tests / 20 files** va production build. Them tests cho Like/dedupe/migration, GLB HTTP/HTML/file rong, WebGL context/shader va Error Boundary. Browser da thu HTTP 410 that, mat/phuc hoi WebGL context, gift/ket qua hai doi, dong bo/refresh/restart, Control desktop/mobile va Overlay 720x1280/1080x1920.

Tach route bang lazy import: entry JS 227.11 kB (gzip 71.47 kB), so voi 1,478.73 kB truoc do. `/engine` khong can tai scene 3D; route 3D van tai shared chunk ~1,025.76 kB (gzip 276.82 kB), nen **canh bao chunk >500 kB van con**. GLB/animation duoc cache, SkeletonUtils.clone tach bones, moi instance co mixer rieng; gift khong reload asset. Helpers, skeleton va dynamic geometry/material duoc dispose khi unmount; source assets dung chung van o cache.

Mau Control local Standard dat khoang 90 FPS / 116 calls / 309,680 triangles; khong cam ket 60 FPS tren moi GPU hay trong OBS. Dependency con warning THREE.Clock va Three CJS trong test jsdom. Model Ronaldo ~16.14 MB va Messi ~10.88 MB van nguyen chat luong; khong nen/ghi de GLB goc. Anh va gioi han chi tiet: `reports/phase-9-summary.md`.

## TikTok LIVE - Giai doan 8

Tich hop `tiktok-live-connector@2.5.0` (Node >=20, da thu Node 24.15.0). Day la connector **khong chinh thuc**, su dung TikTok va dich vu ky **Euler Stream**; co the loi khi TikTok doi giao thuc, tai khoan offline, bi gioi han khu vuc/rate limit, hoac dich vu ky khong san sang. Khong can tai khoan/key de choi Mock. Khong cam ket dich vu ngoai mien phi hay luon hoat dong.

1. Neu chua co `.env`, sao chep `.env.example` thanh `.env`. Khong ghi de file cau hinh da co. Dat `TIKTOK_ENABLED=true`, `TIKTOK_USERNAME=ten_tai_khoan` (khong phai URL, co the co dau @). `TIKTOK_SIGN_API_KEY` la tuy chon neu dich vu ky yeu cau. Khong dat secret trong bien `VITE_*`.
2. Khoi dong lai `npm run dev`, mo `/control` hoac `/mock`, bam **Connect TikTok**. Khong tu ket noi khi start/restart, ke ca da co username. App chi doc su kien public; khong nhan cookie/session OAuth va khong gui chat/gift len TikTok.
3. Khi Connected, nguon chuyen TIKTOK va khoa tat ca nut gia lap. Khi connecting/retrying/error/disconnected, Mock luon san sang. **Use Mock / Stop retry** huy retry va bo qua callbacks den muon. Mat ket noi khong reset diem hay tran. Stream end dung retry; bam Connect cho phien moi.
4. Mac dinh timeout30s; toi da5 retries sau lan dau, backoff2/4/8/16/32s, cap60s. Budget khong reset sau moi lan ket noi thanh cong trong cung mot lan bam Connect, de tranh reconnect vo han. Tuy chinh cac bien `TIKTOK_*` trong `.env.example`. Nut Connect nhan ack ngay, khong cho mang TikTok.
5. Trong WAITING, dung **Gift mapping & rules** de them ID so thuc cua gift, ten hien thi, team, diem va animation. `rose/cookie/trophy` la ID gia lap, khong phai ID TikTok. Khong suy ra gift/team tu ten qua. Gift chua mapping bi bo qua va log ID/ten da lam sach; sua mapping truoc khi bat dau tran moi. Cung ID gift duoc dung o Mock de thu mapping.
6. Gift streak tinh cumulative delta; event ID va streak ID on dinh theo room/message/group/user/gift. Dedupe luu cung snapshot. Gift trong PAUSED/nghi hiep khong duoc bu diem ve sau. Follow/comment CR7/M10 va Like dung chung processor voi Mock. Like lay `count` delta tu protobuf v3, khong cong lai `total` cua ca room.

De tranh cong nham qua cu, adapter tat `processInitialData`, kiem tra room va timestamp; bo qua su kien cu hon30s va giay giao thoa khi doi match/round/status/mode. Neu streak xuat hien lan dau voi count>1, ghi moc cumulative va bo qua ca streak do trong round (khong biet no bat dau luc nao). Streak da co ledger trong round thi reconnect chi consume count dau tien, cac delta moi sau do moi tinh. Cach nay co the **bo sot** qua o thoi diem chuyen trang thai/mat mang; khong tu bu qua da mat. Thieu ID/time/group cho streak thi tu choi; chua co doi soat voi so du TikTok.

Log cong khai chi co thong bao co dinh va ID/ten gift da sanitize; khong gui raw payload/URL loi/key/cookie xuong frontend hay vao snapshot. Event khong hop le duoc gioi han log mot lan/5s. Username hien thi public va ID hash trong ledger van la du lieu gameplay. Cac API dieu khien van danh cho may/mang local tin cay, chua co admin authentication.

Bang chung: `tests/tiktok.test.ts` (protobuf v3 roundtrip + adapter), `tests/tiktokServer.test.ts` (Socket.IO/HTTP/restart), `tests/tiktokPanel.test.tsx` (UI). Tong **162 tests /19files**, typecheck/build dat. Khong co tai khoan/phien LIVE de xac minh E2E: **chua kiem thu LIVE that**. Giay phep connector la AGPL-3.0-only; xem `ASSET_CREDITS.md` va license thu vien truoc khi phan phoi.

## Pham vi ban giao

Phien ban local/Mock va tai lieu da hoan thanh 9 giai doan. TikTok that can tai khoan dang LIVE/cau hinh phu hop de nghiem thu rieng; OBS/TikTok LIVE Studio can thu tren host phat song thuc te. Khong kem music/voice cua cau thu. Game khong can Docker, cloud, database ngoai, Blender, Meshy hay API AI tra phi de chay Mock.

## Giai doan 10 - Buoi LIVE dau tien

Nguoi dung chon **TikTok LIVE Studio**, chua phat LIVE. Lam theo [LIVE_STUDIO_SETUP.md](LIVE_STUDIO_SETUP.md): chuan bi preview9:16, thu Mock/audio, sau do username/.env/Connect va mapping qua that. Giai doan10 chi dong khi co bang chung phien LIVE that; preflight/soak local khong thay the ket qua nay.

```powershell
npm run check:live -- --url=http://localhost:5174
npm run test:soak -- --seconds=600 --output=reports/phase-10-soak.json
```

Preflight chi doc app va ghi report. Soak chay backend rieng tren port tu chon, dung snapshot rieng, khong ket noi TikTok hay thay doi tran hien tai. Soak do server+hai test clients, khong do WebGL/LIVE Studio. Gioi han va tien do: `reports/phase-10-summary.md`.
