# KE HOACH VA DOI CHIEU DU AN

Tai lieu nguon bat buoc: `PROMPT.md`.

## Quy tac theo doi

- `PROMPT.md` la source of truth. Tai lieu nay chi chia nhom cong viec theo quan he phu thuoc, khong thay the, rut gon hay sua yeu cau goc.
- Moi giai doan chi duoc danh dau `[x]` khi tat ca tieu chi cua giai doan da co bang chung kiem thu.
- Neu ket qua thuc te khac mo ta trong prompt, phai ghi ro sai khac; khong duoc gia dinh hoac bao cao sai.
- Khong chuyen sang hieu ung/gameplay phuc tap neu model va animation chua dat cac cong kiem thu bat buoc.
- Khong xoa, ghi de hoac chinh sua GLB goc. Ronaldo hien tai la `cristiano_ronaldo.glb` theo thay doi duoc nguoi dung xac nhan ben duoi; Messi giu nguyen.
- Mock Mode phai hoan chinh truoc TikTok Mode. Khong danh dong Mock Mode voi ket noi TikTok LIVE that.
- Moi lan dong mot giai doan phai cap nhat muc "Bang chung va ket qua" trong chinh file nay.

## Thay doi asset do nguoi dung xac nhan - 2026-10-21

- Nguoi dung da thay file Ronaldo va yeu cau: "toi da thay the file ronaldo bang file nay roi C:\3d\cristiano_ronaldo.glb phan tich va chinh lai cho toi".
- Duong dan Ronaldo trong Phan 1/3/6 cua prompt duoc ap dung theo file moi. Khong sua `PROMPT.md`, khong loai bo cac yeu cau khac.
- Bao cao Giai doan 1 ben duoi la lich su cua file cu. Khong dung thong so 17 joints/6 clips cua file cu cho model moi.
- [x] Phan tich lai GLB moi va ghi vao `reports/current-glb-analysis.json` / `.md`; giu bao cao cu `reports/glb-analysis.*` nguyen ven.
- [x] Cap nhat asset URL/preload/public copy; checksum ban sao trung file goc, khong sua asset.
- [x] Kiem tra WebGL, skeleton, texture, SIUUU/Idle, camera/ground va hoi quy Messi.
- [x] Ghi metadata tac gia/CC BY 4.0 trong `ASSET_CREDITS.md`.
- Chi tiet va gioi han: `reports/ronaldo-replacement.md`. Khong con tai/preload file cu; asset cu khong duoc dua len kho Git cong khai vi chua ro giay phep.

## Trang thai tong quan

- [x] Giai doan 1 - Kiem ke moi truong va xac minh hai GLB (`HOAN THANH 2026-10-21`)
- [x] Giai doan 2 - Model Debug, chuan hoa nhan vat va animation (`HOAN THANH 2026-10-21`)
- [x] Giai doan 3 - San van dong 3D, anh sang va camera (`HOAN THANH 2026-10-22`)
- [x] Giai doan 4 - Game engine, state phia server, timer va round (`HOAN THANH 2026-10-22`)
- [x] Giai doan 5 - Mock LIVE events, gift, follow, comment, combo va idempotency (`HOAN THANH 2026-10-22`)
- [x] Giai doan 6 - Overlay 9:16, Control Dashboard va dong bo Socket.IO (`HOAN THANH 2026-10-22`)
- [x] Giai doan 7 - VFX, audio, HUD, supporter va man hinh ket qua (`HOAN THANH 2026-10-22`)
- [x] Giai doan 8 - TikTok LIVE adapter that va fallback (`HOAN THANH TICH HOP 2026-10-23; chua kiem thu LIVE that`)
- [x] Giai doan 9 - Kiem thu tong the, toi uu, tai lieu va ban giao (`HOAN THANH 2026-10-24; phien ban local/Mock`)
- [ ] Giai doan 10 - Nghiem thu livestream thuc te tren TikTok LIVE Studio (`DANG CHUAN BI 2026-10-24; cho phien LIVE dau tien`)

---

## Giai doan 1 - Kiem ke moi truong va xac minh hai GLB

Pham vi prompt: Phan 1.1-1.2, thong so asset trong Phan 18, kiem tra asset trong Phan 19, buoc phan tich truoc Phase 1 cua Phan 20, Phan 22 va phan phan tich cua Uu tien 1 trong Phan 24. Viec load/hien thi truc quan cua Phase 1 Phan 20 nam o Giai doan 2.

- [x] Xac nhan duong dan lam viec la `C:\3d`.
- [x] Xac nhan co hai file GLB goc va ghi nhan kich thuoc/checksum.
- [x] Xac nhan co the truy cap o `C:` va khong can dung asset thay the.
- [x] Kiem ke Node.js, npm va Python tren may.
- [x] Tao va chay cong cu doc GLB 2.0 tu file that.
- [x] In ten mesh va thong tin primitive/triangle.
- [x] In ten bone, skin va skeleton hierarchy.
- [x] In ten animation clip, duration, channel/track va interpolation.
- [x] Liet ke bone/node duoc animation dieu khien.
- [x] Tinh bounding box trong world transform, kich thuoc va chieu cao.
- [x] Xac minh truc dung, root transform, ground/vi tri chan.
- [x] Xac minh texture, material, skin va metadata giay phep co trong file.
- [x] Doi chieu ket qua that voi cac thong so so bo trong `PROMPT.md`.
- [x] Tao bao cao may-doc va bao cao con-nguoi-doc.
- [x] Xac nhan checksum file goc khong thay doi sau khi phan tich.

Cong hoan thanh: dat cho pham vi phan tich asset. Load WebGL va kiem tra truc quan la cong dau tien cua Giai doan 2, dung theo thu tu bat buoc cua prompt.

### Bang chung va ket qua

- Moi truong ngay 2026-10-21: Node.js `v24.15.0`, npm `12.2.0`, Python `3.12.6`.
- Tai thoi diem bat dau, thu muc chi co `PROMPT.md` va hai GLB; khong phai Git repository.
- Cong cu: `scripts/analyze-glb.mjs`; `node --check` dat va chay khong can sua/chuyen doi asset.
- Bao cao day du: `reports/glb-analysis.md`; du lieu may-doc: `reports/glb-analysis.json`; tom tat: `reports/phase-1-summary.md`.
- Ronaldo: 3,256,648 bytes; 17,392 triangles; 1 mesh/skin; 17 joints; 6 PNG textures; 6 clips. Bounds min `[-0.697003, 0.028, -0.26]`, max `[0.697003, 3.399, 0.46]`, cao Y `3.371`.
- Messi: 10,881,188 bytes; 29,554 triangles; 10 meshes; 1 skin; 34 joints; 8 PNG textures; clip `mixamo.com` dai `1.066667s` voi 50 tracks. Bounds min `[-0.693483, -0.484724, -0.157187]`, max `[0.586148, 0.478421, 0.091944]`, cao Y `0.963145`.
- Messi co root conversion xoay `-90 do` quanh X va scale trung gian `0.01`; toa do bone bind khong duoc dung truc tiep lam ground. Giai doan 2 phai do lai `Box3` sau khi `GLTFLoader` cap nhat world/skeleton.
- Khronos validator phat hien loi export: Ronaldo co 33 animation input accessor thieu bounds; Messi co 50 animation output accessor dung `byteStride`. Khong sua GLB goc; Giai doan 2 phai xac minh Three.js tai va chay clip thuc te.
- Messi co metadata CC BY 4.0 voi author/source trong file; Ronaldo khong co metadata license, vi vay khong duoc tu khang dinh quyen thuong mai.
- SHA-256 sau phan tich van la Ronaldo `f1c0daf2165a7c993eeb77ea31c69318cf5777a7b13fd8de8ae7f2975d0f1327`; Messi `92edca0105a42751c4caa793b389d1785fbafb190b01636e1407ae9cd9cbf4e7`.

---

## Giai doan 2 - Model Debug, chuan hoa nhan vat va animation

Pham vi prompt: Phan 4.2 man hinh C, Phan 6, Phan 7, Phan 18 va Phase 1-2 cua Phan 20.

- [x] Khoi tao React + TypeScript + Vite + Three.js + React Three Fiber + Drei.
- [x] Sao che hai model hien tai vao `public/models/` ma khong sua file goc.
- [x] Tao `/debug` voi chon Ronaldo/Messi, bone list, animation list, Play/Pause, speed, Orbit Camera, bounding box va asset error.
- [x] Load dung texture, material, mesh, skin va skeleton cua ca hai model.
- [x] Chuan hoa uniform scale, huong, chieu cao va ground alignment bang parent transform an toan.
- [x] Khong sua vertex goc, khong pha bind pose/skeleton, khong gia dinh hai skeleton giong nhau.
- [x] Ronaldo mac dinh loop `Idle`; cac clip `SIUUU`, `Calma`, `Sleep`, `Power Pose`, `Point Up` co the duoc chon/chay.
- [x] Ronaldo crossfade, play-once, queue/cooldown va quay lai `Idle` dung cach.
- [x] Kiem tra truc quan muc do giong thuc te cua `SIUUU`; ghi ro neu khong the ket luan 100%.
- [x] Messi chay clip `mixamo.com` va ghi nhan hanh dong thuc te.
- [x] Xac minh ten bone Mixamo that truoc khi dieu khien.
- [x] Tao Messi Idle nhe, Celebrate nang hai tay/ngang mat va tro ve Idle.
- [x] Tao Messi Victory voi buoc chan, dang tay, gio tay va chu `MESSI WINS!` trong debug preview. Trophy Celebration la muc tuy chon, duoc theo doi rieng o Giai doan 7.
- [x] Khong dung track Ronaldo truc tiep cho Messi; giu rest pose/bind pose, khong gay meo mesh.
- [x] Dung `SkeletonUtils.clone` khi can; khong tao mixer/loader lap lai.
- [x] Co React Error Boundary va thong bao asset/WebGL cu the, khong de man hinh den im lang.
- [x] Kiem tra Ronaldo/Messi hien thi rieng le, texture, skeleton, chan tren mat dat va khong bien dang nghiem trong.
- [x] Kiem tra ca hai nhan vat dung canh nhau, animation khong bien dang nghiem trong; cache clips/assets, skeleton rieng tung instance, dispose khi unmount, DPR/shadow co gioi han. Chua nghiem thu muc tieu 60 FPS toan game.
- [x] Chuyen stylesheet giao dien sang CSS Modules theo Phan 2; global CSS chi giu reset/base.

Cong hoan thanh: ca hai nhan vat phai hien thi dung va chay duoc animation on dinh.

### Bang chung va ket qua cap nhat 2026-10-21

- Ronaldo moi: 16,139,240 bytes; 118,395 triangles; 8 meshes; 435 joints; 9 textures; 1 clip `Armature.001Action.001` dai 3.983333s / 1,249 tracks. Co metadata aleganda / CC BY 4.0.
- Runtime skinned rest height 1.826373, scale 1.724728 -> chieu cao tham chieu 3.15. Ground nguon Y=0 duoc kiem tra qua 81 mau pose; camera du headroom cho jump. Khong dung bounds unskinned de can vi tri.
- Clip goc co dong tac cui nguoi, bat nhay, xoay nua vong va tiep dat dang tay. `SIUUU` la ban sao doc lap; `Idle` la tu the cuoi clip co nhip tho nhe. Khong khang dinh giong thuc te 100%.
- `Calma`, `Sleep`, `Power Pose`, `Point Up` khong ton tai trong GLB moi. Da tao 4 clip procedural rieng, moi clip 3 giay, tren skeleton Rigify 435 joints, lay tu the cuoi lam moc. Giao dien ghi `PROC`, khong dung track 17-joint cu hay goi chung la clip goc.
- Messi `mixamo.com` da quan sat la chuyen dong nhay/co goi ngan, khong tu coi la celebration. Runtime bone names duoc GLTFLoader bo dau `:`; clip procedural dung ten that.
- Messi Celebrate nang hai tay, ngua mat va tro lai Idle da kiem tra lai. Victory 5.3 giay da thay ban truot cu: hai buoc chan co nhac chan/giu chan tru, dang tay, gio hai tay, giu pose roi tro ve vi tri/Idle. Chu `MESSI WINS!` co nhan `Animation preview`, chua phai ket qua game.
- Browser WebGL2 da load ca hai model, HTTP 200; pause/resume, pose preview, speed, skeleton/bounds va SIUUU -> Idle hoat dong. Khong con loi console; co warning dependency THREE.Clock deprecated.
- `Compare both` hien Ronaldo trai / Messi phai, scale tham chieu 3.15 cho ca hai; doi nhan vat de chon bo dieu khien. Da quan sat texture, chan, skeleton helpers va animation trong cung scene.
- Camera/mobile 720x1280: ca hai nhan vat va toan than Ronaldo khi nhay trong canvas; scrollWidth=705 <=720. Khung 1080x1920 co scrollWidth=1065 <=1080, khong tran ngang hay cat nhan vat khi nhay. Day la debug, khong phai overlay livestream.
- Anh moi: `reports/phase-2-comparison-mobile.jpg`, `reports/phase-2-siuuu-comparison-mobile.jpg`, `reports/phase-2-messi-victory.jpg`, `reports/phase-2-point-up.jpg`. Cac anh thay model truoc do van duoc giu lai.
- Kiem tra cuoi: `npm run typecheck`, `npm run test` (14 tests / 5 files), `npm run build` dat. `node scripts/verify-authored-animations.mjs` da cap nhat `reports/authored-animation-samples.json`. Build con warning JS bundle lon (1,262.48 kB / 350.14 kB gzip); chua khang dinh 60 FPS.
- Test GLB that xac minh rest pose khong doi, binding/bounds huu han, chan tru, tay tren dau, hai clone khong chia se bones, cache clip va queue toi da 4/merge duplicate/ve Idle. SHA-256 hai file goc va public copy van khop; file Ronaldo cu duoc bao toan.
- `README.md` mo ta dung pham vi hien tai; `ASSET_CREDITS.md` ghi metadata. Cac huong dan gameplay/OBS/TikTok con lai se hoan thien khi tinh nang duoc trien khai.
- Ket luan: HOAN THANH Giai doan 2 trong pham vi model/debug/animation. Cac clip procedural la dong tac don gian, chua khang dinh do tu nhien nhu mocap hay SIUUU giong 100%. Chi tiet: `reports/phase-2-summary.md`. Giai doan 3 chua bat dau.

---

## Giai doan 3 - San van dong 3D, anh sang va camera

Pham vi prompt: Phan 4.1, Phan 5, cac muc scene/camera cua Phan 18 va Phase 5 cua Phan 20.

Ke hoach thuc hien: (1) dung san/khan dai/den/LED va giu hai GLB da nghiem thu; (2) camera responsive, celebration va quality presets; (3) kiem thu WebGL + framing + hoi quy, cap nhat bang chung. Trang `/stadium` la scene preview; khong thay `/debug` hoac tu nhan la Overlay/Control Dashboard da hoan thanh.

Tien do: HOAN THANH 2026-10-22; da doi chieu prompt, kiem thu WebGL/viewport, hoi quy animation, tests va build. Hieu ung celebration nang/confetti/audio van thuoc Giai doan 7, khong bi bo qua.

- [x] Tao san co arcade, vach trang, vong tron giua san va bong neu phu hop.
- [x] Tao khan dai, den pha, bang LED va phong nen san van dong ban dem.
- [x] Ronaldo ben trai voi anh sang do; Messi ben phai voi anh sang xanh.
- [x] Camera chinh nhin tu truoc, thay ro toan than va nhan vat chiem ty le lon tren man hinh dien thoai.
- [x] Khong co vat the che mat/che nguoi; khong lam san qua lon.
- [x] Main Battle, Ronaldo Focus, Messi Focus, Victory va Debug Orbit Camera.
- [x] Celebration zoom/theo doi nhe, shake khi can va quay lai camera mac dinh.
- [x] Camera khong xuyen model, khong mat nhan vat, near/far clipping hop ly.
- [x] Cinematic lighting, bright effects, football arcade/chibi-friendly, khong mang dang dashboard thong thuong.
- [x] Toi uu pixel ratio, shadow resolution va kha nang giam chat luong tren may yeu.

Cong hoan thanh: scene 3D on dinh o desktop va khung 9:16, ca hai nhan vat luon nam trong khung.

### Bang chung va ket qua - 2026-10-22

- Doi chieu tung nhom yeu cau va ma nguon: `reports/phase-3-summary.md`. Scene tai `/stadium` va `/`; `/debug` van la Model Lab. Khong coi preview la Overlay hoac Control Dashboard.
- WebGL that: hai GLB, texture, san/line/bong, khan dai, den, LED va nen dem hien thi. Ronaldo trai/do, Messi phai/xanh; khong them vat chan nhan vat.
- Desktop 1440x900 va portrait 720x1280/1080x1920 khong tran ngang (scrollWidth 1425/705/1065); ca hai nhan vat toan than. Portrait stage 9:16, header/controls o ngoai stage nen trang co cuon doc.
- 5 camera hoat dong; SIUUU -> Ronaldo Focus -> Main Battle va Messi Victory -> Victory -> Main Battle. Reduced motion tat auto camera/shake. Low/Standard/High/Auto hien dung DPR/shadow; Auto da ha Low khi cham keo dai.
- `npm run typecheck`, `npm run test` (26 tests / 6 files), `npm run build`: PASS. Build van canh bao JS chunk lon ~1.28 MB / 356.49 kB gzip; chua khang dinh 60 FPS.
- `node scripts/verify-stadium-framing.mjs`: 610 mau/10 clips deu trong action bounds. Test projection 16:9, 9:16, 1:1, 0.4, hai Victory targets va camera blend. Du lieu: `reports/stadium-framing-analysis.json`.
- Anh: `reports/phase-3-desktop.jpg`, `reports/phase-3-portrait-720.jpg`, `reports/phase-3-portrait-1080.jpg`, `reports/phase-3-siuuu-1080.jpg`, `reports/phase-3-debug-messi-grounded.jpg`.
- Hoi quy Messi: giu ban can chan runtime `mixamo.com`, nhan DERIVED dung voi thay doi; test bao toan original tracks. Hai GLB goc/public copies va ban Ronaldo cu van nguyen hash. Credit da cap nhat.
- Console khong ghi nhan error; con warning dependency THREE.Clock deprecated. Da khoi dong lai Vite tren 5173 sau loi connection refused; README ghi cach chay/giu server mo.
- Ket luan: HOAN THANH Giai doan 3 trong pham vi san/anh sang/camera. Giai doan 4-9 van chua danh dau; chua co game state, gift, Socket.IO, audio hay TikTok LIVE.

---

## Giai doan 4 - Game engine, state phia server, timer va round

Pham vi prompt: Phan 2 backend/testing, Phan 8, Phan 17 va cac kiem thu gameplay lien quan trong Phan 20.

- [x] Node.js + TypeScript + Express + Socket.IO + Zod.
- [x] Server la nguon du lieu chinh duy nhat cho score, timer, round va ket qua.
- [x] State gom match ID, round, remaining time, hai score/combo, team members, gift history, top supporters, match status va connection status.
- [x] Trang thai `WAITING`, `COUNTDOWN`, `PLAYING`, `PAUSED`, `ROUND_END`, `MATCH_END`.
- [x] Mac dinh 3 hiep x 120 giay va cho phep cau hinh.
- [x] Tinh thang hiep, thang tran, hoa/hiep phu theo cau hinh; new match reset dung du lieu.
- [x] Start, pause, resume, reset va dieu khien timer chi xu ly phia server.
- [x] Client ket noi/reconnect nhan snapshot hien tai; refresh Overlay khong reset tran.
- [x] Luu snapshot local JSON hoac SQLite neu phu hop; khong can database ngoai.
- [x] Unit test score, timer, round transition va ket qua.

Cong hoan thanh: server tu van hanh tron ven tran dau va test logic dat.

### Bang chung va ket qua - 2026-10-22

- Engine: `server/game/GameEngine.ts`, `ScoreManager.ts`, `RoundManager.ts`; schema/type chung: `shared/game.ts`. Server tinh diem, remainingMs, chuyen hiep va ket qua; client chi gui lenh va hien snapshot.
- Mac dinh 3 x 120s, countdown 3s, nghi 5s. Moi hiep reset diem/combo hiep; giu totalScores va roundResults. Thang tran theo so hiep thang, khong theo tong diem. Hoa hiep ghi draw; neu hoa tran co the ket thuc draw hoac choi toi da 1-5 hiep phu (mac dinh 3 x 30s), sau gioi han van hoa thi draw.
- Timer dung elapsed time monotonic, bu du thoi gian qua cac phase khi event loop cham. Pause/resume ho tro COUNTDOWN, PLAYING, ROUND_END. Set timer 0 ket thuc hiep dang chay; neu PAUSED thi doi Resume. Diem den khi het gio/thuoc hiep cu bi tu choi.
- `server/gameServer.ts`: Express GET `/api/health`, GET `/api/state`, POST `/api/command`; Socket.IO `game:snapshot`, `game:command`, `game:sync`. Zod validate lenh/config; matchId va round ngan lenh cu ap vao tran/hiep moi. Broadcast 100ms khi timer chay, ngay sau lenh va ket noi.
- `server/storage.ts`: JSON local `data/game-state.json`, schema version 1, ghi temporary + rename; luu sau lenh/chuyen phase va toi da moi 1 giay khi timer chay. Restart phuc hoi cung matchId/diem/config/ket qua, tam dung phase dang chay; downtime khong tru timer. Snapshot hong duoc giu nguyen va startup bao loi. Mat dien/kill dot ngot co the mat toi da khoang 1 giay timer chua checkpoint; khong tuyen bo durability database.
- Trang `/engine` cho phep start/pause/resume/reset, diem thu cong +10, cau hinh tran va set timer. Socket client/hook dung lai duoc cho giai doan 6. Khong tao state gameplay phia client. Combo/members/giftHistory/topSupporters da co schema va reset, nhung logic LIVE events thuoc Giai doan 5.
- Test reconnect/refresh o giai doan nay dung 2 Socket.IO clients va 2 tab `/engine`; ca hai giu matchId/diem/timer, cung nhan MATCH_END. `/overlay` chua duoc tao: kiem tra trang Overlay thuc te van la cong Giai doan 6, khong coi Engine Lab la Overlay.
- `npm run typecheck`, `npm run test` (53 tests / 8 files), `npm run build`: PASS. Co 27 tests moi cho score/timer/round/hoa/hiep phu/reset/invalid input/restart va HTTP/Socket.IO/persistence. 26 tests model/animation/camera cu van dat. Test integration co tran 1 giay tu ket thuc bang scheduler that.
- `npm run dev` da chay dong thoi Vite 5173 va backend 3001. Browser: cau hinh/start/+10/pause/refresh/resume/set timer/ket qua/reset hoat dong; khong ghi nhan console error. Viewport desktop 849x884, mobile 390x844 khong tran ngang (scrollWidth 834/375). Anh `reports/phase-4-engine-desktop.png`, `reports/phase-4-engine-mobile.png`.
- Hai GLB goc/public copies van khop SHA-256 (Ronaldo `78f690b490c55a2ed900634b24934dd760a79e9b59242aeb4ec8fbb226546a74`, Messi `92edca0105a42751c4caa793b389d1785fbafb190b01636e1407ae9cd9cbf4e7`). Khong sua model/animation/camera.
- Bao cao: `reports/phase-4-summary.md`. Build con warning bundle lon ~1,423.52 kB / 397.26 kB gzip; chua nghiem thu 60 FPS toan game. TikTok DISCONNECTED / mode NONE; Giai doan 5-9 chua hoan thanh.
- Ket luan: HOAN THANH Giai doan 4 trong pham vi engine/server/timer/round va nen tang dong bo. Sau nghiem thu da tra tran ve WAITING, cau hinh 3 x 120s, diem 0.

---

## Giai doan 5 - Mock LIVE events, gift, follow, comment, combo va idempotency

Pham vi prompt: Phan 9, Phan 10, Phan 11, Phan 13 va Mock Mode trong Phan 16.

- [x] Interface `LiveEventAdapter` va du lieu noi bo duoc Zod validate.
- [x] `MockEventAdapter` hoat dong khong can TikTok/tai khoan/LIVE.
- [x] Rose -> Ronaldo, Cookie -> Messi, diem/gift count co the cau hinh.
- [x] Dashboard mo phong Rose/Cookie x1, x10, Follow, Comment CR7/M10, combo, gift dac biet va Reset.
- [x] Rose cong diem ngay va kich hoat SIUUU neu san sang; su kien moi duoc queue/merge, khong cat animation.
- [x] Cookie cong diem va kich hoat Messi Celebrate/blue effects.
- [x] Follow hien Welcome, star/sound, thong ke; khong tu gan team neu chua chon.
- [x] Comment `CR7`, `M10`, `!cr7`, `!m10`; mot user khong bi dem trung, doi team theo cau hinh.
- [x] Gioi han thong bao join/follow de khong spam Overlay.
- [x] Idempotency theo event ID, gift ID, user ID, repeat count/end, streak ID va reconnect.
- [x] Khong cong lai tong streak o moi event trung gian; co test gift lien tiep/duplicate/reconnect.
- [x] Combo x3/x5/x10/x20, mac dinh chi VFX; multiplier tuy cau hinh.
- [x] Event queue, animation priority/cooldown, aggregation, max length va drop/merge policy.
- [x] Gift Mapping chinh duoc: ID, name, team, points, animation, sound, effect, cooldown; luu local.
- [x] Top supporter theo username/team/gift count/contribution, Top 3; sanitize de chong XSS, khong luu PII khong can.

Cong hoan thanh: mock events duoc tinh dung va khong nhan diem trung trong cac ca streak/duplicate.

### Bang chung va ket qua - 2026-10-22

- `shared/live.ts`, `server/live/LiveEventAdapter.ts`, `MockEventAdapter.ts`, `LiveEventProcessor.ts`, `ComboManager.ts`, `CelebrationQueue.ts`: normalized events/config duoc Zod validate; mock khong can tai khoan/network TikTok. `POST /api/mock` va Socket `live:mock` dung cung adapter.
- Trang `/mock` co Live desk va scene that, Rose/Cookie x1/x10, custom count, Follow, 4 lenh comment, Combo x3/x5/x10/x20, Golden Trophy, Replay last, New match va gift mapping editor. Day la trang nghiem thu Mock LIVE; `/control` va `/overlay` chinh thuc van thuoc Giai doan 6.
- Rose mac dinh 10 diem -> SIUUU/red glow; Cookie 10 diem -> Messi Celebrate/blue glow; Golden Trophy 100 diem -> Messi Victory/gold. Gift IDs la gia lap, khong khang dinh ID/catalog TikTok that. Khong thay model hoac vertex/animation goc.
- Diem cong ngay, effect queue rieng moi team giu animation dang chay. Toi da 4 pending; gop cung animation/effect/sound, sap theo priority, full thi thay pending uu tien thap neu event moi cao hon, con lai drop visual. Khong drop diem. Cooldown va duration duoc ap dung; test doi chieu duration voi clip GLB/procedural that.
- Streak key theo source/user/gift/streakId (fallback eventId on dinh). Chi cong phan repeatCount tang; event trung, count giam, final lap va replay bi bo qua. Event ID reuse voi identity khac bi tu choi. `repeatEnd` dong streak. Diem ngoai PLAYING/PAUSED/hiep cu khong duoc tinh lai sau resume; streak khong chuyen sang hiep sau. Match ID cu bi tu choi sau reset.
- Snapshot JSON version 2 luu score + event/streak ledger + followers/full supporter ledger cung file. Doc snapshot Giai doan 4 version 1 tu migrate, giu Match ID/config/diem. Sau restart van chong trung; cue cu duoc clear, tran duoc pause nhu Giai doan 4. Co backup snapshot truoc migration trong `data/before-phase-5-*.json`.
- Follow trung lap theo user/source, neutral neu chua comment; Welcome + star, Web Audio tone sau Enable sounds, throttle 1500ms mac dinh cho join/follow. Comment trim/case-insensitive, membership unique, allowTeamChange tuy chon. User ID va event fingerprint duoc hash; khong luu raw comment, email/avatar/PII extra bi strict schema tu choi; username sanitize va render bang React text.
- Combo theo team/window 5s, expire/reset moi hiep. Tier 3/5/10/20 co feedback; mac dinh khong nhan diem. Bat multiplier: qua 1-4 x1, 5-9 x2, 10-19 x3, 20+ x5; tinh tung gift moi nen batch va streamed streak cho cung diem (20 gift x10 =490 khi multiplier bat).
- Mapping editor chinh ID/name/team/points/animation/sound/effect/cooldown/priority, them/xoa mapping; validate skeleton dung team, ID khong trung. Chi luu khi WAITING, persist cung snapshot va giu qua New match. Top 3 moi team lay tu full ledger ca tran, gom username/team/giftCount/contribution; diem manual Engine Lab khong gia lam gift/supporter.
- `npm run typecheck`, `npm run test` (91 tests / 11 files), `npm run build`: PASS. 38 tests moi so voi Giai doan 4, bao gom Socket.IO/HTTP that, hai clients, reconnect/restart, snapshot v1 migration/v2 missing-ledger rejection, audio unlock/throttle, duration clip that, clear queue giu action hien tai. Sau thay fingerprint sang hash, 34 tests live lien quan duoc chay lai PASS.
- Browser: Rose +10/SIUUU, Cookie x10 +100/Messi Celebrate, Combo x20 +200, Replay last +0/5 duplicates, Follow neutral/stat=1, CR7 lap van mot member, doi M10 van mot member, Trophy +100/Messi Victory. Refresh giu 210/200, Engine Lab tab thu hai cung 210/200. Mapping Rose 17 diem luu qua refresh, x10 =170.
- WebGL/texture/animation va CSS blue/red feedback da quan sat desktop 1440x1000 va mobile 390x844 (scrollWidth 1425/375, khong tran ngang). Anh `reports/phase-5-follow.png`, `phase-5-gifts-desktop.png`, `phase-5-mobile.png`; chi tiet `reports/phase-5-summary.md`.
- Mot lan Vite Windows thoat code 3221226505 khi khoi dong browser; da chay lai `npm run dev`, server/client phuc hoi va toan bo browser checks sau do dat. Phien gameplay sau phuc hoi khong co console error, con warning THREE.Clock. Health cuoi `ok`. Build con warning bundle ~1,446.47 kB / 403.52 kB gzip; khong tuyen bo 60 FPS.
- Hash hai GLB goc/public copy khong doi. Ket luan: HOAN THANH Giai doan 5. Ban giao WAITING, diem/follower/gift/member=0, Rose/Cookie 10, default combo chi VFX. TikTok that van DISCONNECTED; full Overlay/Control va VFX/audio nang van o Giai doan 6-8.

---

## Giai doan 6 - Overlay 9:16, Control Dashboard va dong bo Socket.IO

Pham vi prompt: Phan 3, Phan 4.2 man hinh A/B, Phan 12 va Phase 4/5 cua Phan 20.

- [x] `/overlay` toi uu 1080x1920 va responsive 720x1280.
- [x] Overlay chi co scene, nhan vat, score, timer, gift feed va animation; khong co nut test/admin.
- [x] Fullscreen va lua chon stadium/transparent background neu phu hop voi Browser Source.
- [x] `/control` co live preview, start/pause/reset, animation controls va mock events.
- [x] Dashboard chinh round time, gift points, volume, camera, VFX; xem event log, FPS/debug va TikTok status.
- [x] Overlay va Dashboard dung mot state server qua Socket.IO, khong tao state game doc lap.
- [x] HUD tren: logo, round, timer, hai score/power bars va leader.
- [x] HUD giua: character, celebration text, combo va lead changed ma khong che mat.
- [x] HUD duoi: gift mapping hint, gift/follow/sender feed; text de doc tren dien thoai.
- [x] Cho an bot HUD theo cau hinh.
- [x] Mo hai tab, gui mock gift va nhan cap nhat dong thoi; refresh khong reset.

Cong hoan thanh: hai man hinh doc lap ve URL nhung dong bo mot state chinh xac.

### Bang chung va ket qua - 2026-10-22

- `/overlay` va `/control` dung `OverlayView`/scene GLB chung; moi trang nhan state tu server. Overlay khong co button/admin; frame 720x1280 va 1080x1920 khop viewport, khong cuon. HUD co logo/round/timer/score/power/leader, celebration/combo/lead-change o ngoai canvas, mapping va sender/gift/follow feed. Tat duoc 6 nhom HUD.
- `presentation` validate Zod, patch tung truong, luu cung snapshot v2 va default cho snapshot cu. Camera/background/quality/reduced motion/VFX/volume/mute/HUD giu qua reset/restart. `animate` dung queue bounded hien co, validate team/skeleton, ghi log va +0 points; tests xac minh khong tang gift/supporter/follower.
- Browser hai tab: Rose x1/Cookie x10 -> 10/100 dong thoi; PAUSED 01:13 giu sau refresh va khoi dong lai server sau phien bi ngat. Set timer ->01:30; Resume va gifts tiep theo cap nhat dung. Messi Victory thu cong van 10/100. Show feed off, Transparent, volume35 giu sau refresh. Giay/hiep60 va Rose17 cap nhat Overlay va giu qua refresh. Da tra ve mac dinh.
- Fullscreen da quan sat `fullscreenchange` true sau double-click, false sau double-click lan hai. Unit tests bao phu F/double-click/Escape/unmount va fallback khi API khong co. Nen transparent go bo stadium/background/fog, giu nhan vat/HUD; root/body/canvas alpha. Chua tuyen bo da nghiem thu OBS/TikTok Studio that.
- Control desktop 1440x1000 va mobile 390x844 khong tran ngang (scrollWidth 1425/375). Preview im lang, chi Control hien FPS/render metrics; mau cuoi 78 FPS / standard / 116 calls / 309680 triangles la so do local, khong cam ket 60 FPS tren moi may. Console phien cuoi khong error; con warning THREE.Clock cua dependency.
- `npm run typecheck`, **107 tests / 14 files**, `npm run build` dat. Them 16 tests so voi 91 tests Giai doan 5. Build con canh bao bundle 1,460.44 kB / 407.35 kB gzip. Health cuoi `ok`, persistenceError=null. Hai GLB goc/public copy giu nguyen SHA256.
- Anh `reports/phase-6-overlay-ready.jpg`, `phase-6-overlay-1080-full.jpg`, `phase-6-control-ready.jpg`, `phase-6-control-mobile.jpg`, `phase-6-control-settings-mobile.jpg`, `phase-6-transparent.jpg`; chi tiet `reports/phase-6-summary.md`. Ban giao WAITING, diem 0/0, gift/follower/member 0, 3 x 120s, Rose/Cookie 10, camera main/auto, stadium, HUD/VFX on, volume 60/mute. **HOAN THANH Giai doan 6**; Giai doan 7-9 chua danh dau hoan thanh.

---

## Giai doan 7 - VFX, audio, HUD, supporter va man hinh ket qua

Pham vi prompt: Phan 6/7 celebration, Phan 13, Phan 14 va Phan 15.

- [x] Ronaldo: red aura, golden particles, landing ring, `SIUUUU!`, confetti, stadium flash.
- [x] Messi: blue aura, white light, stars, particles, `MESSI MAGIC!`, confetti.
- [x] Tuy chon theo Phan 7.3: danh gia Messi Trophy Celebration (cup game don gian, tay nang, cup xuat hien/bay len, confetti xanh trang); chi them neu on dinh, neu bo phai ghi ly do.
- [x] Common: round start/end, lead changed, combo, victory, draw va countdown 10 giay.
- [x] Ronaldo/Messi win camera, text va confetti dung nhan vat/ket qua.
- [x] Top 3 supporter o cuoi hiep/tran va hieu ung nho khi doi leader.
- [x] VFX vua du, co heavy-effects toggle/auto reduction, khong lam tut FPS nghiem trong.
- [x] Audio Manager: UI, gift, combo, crowd, round, victory, SIUUU va Messi celebration.
- [x] Khong tai logo/nhac/giong co ban quyen; Web Audio fallback va cho phep file audio hop le cua streamer.
- [x] Master volume/mute, user gesture unlock, dong bo audio-animation va gioi han chong am thanh chong lap.

Cong hoan thanh: celebration va ket qua ro rang, dung team, chay on dinh voi cau hinh hieu nang thap.

### Bang chung va ket qua - 2026-10-22

- Da them aura/particles/landing ring/flash/confetti Ronaldo va aura/sao/particles/confetti Messi. Cup game 5 mesh bay len trong Messi Victory da kiem tra tren GLB that, khong sua bone/skin, co toggle rieng.
- Round start/end, countdown10s, lead/combo, winner/draw va Top3 moi team da noi voi server state. Browser Messi150/220, Ronaldo200/10, draw0/0: text/camera/Idle dung ket qua. Top3 dung thu tu gift ledger, thong bao doi supporter#1, React text chong HTML injection.
- Audio Manager co11 cue synth, master gain/mute/gesture, toi da4 voices/cooldown. Marker theo clip dang render (SIUUU2.62s); request cua clip dang chay tach voi queue cho. File local <=4MB/8s, preload/fallback, Control path/sound check. Browser WAV tu tao load1 file; missing file fallback1; khong tai music/voice ben ngoai.
- Low giam particles/confetti/stars, tat flash; heavy toggle va reduced motion. Mau preview local Low74FPS/97calls, Standard89-90FPS/116calls; tab hidden co throttle, khong cam ket FPS moi may. Overlay720x1280/1080x1920 va Control390x844 khong tran ngang.
- Typecheck, **128 tests /16files**, build dat (JS1,476.37kB/gzip412.38kB). Con warning bundle lon/THREE.Clock. SHA256 hai GLB goc/public khong doi. Bao cao va anh: `reports/phase-7-summary.md`, `reports/phase-7-*.jpg`.
- Da tra WAITING/0-0/3x120s, default mapping, qualityauto, VFX/heavy/trophy/HUD on, audioFiles rong, volume60/mute; backup truoc test tai `data/before-phase-7-2026-10-22.json`. **HOAN THANH Giai doan7**. Chua nghiem thu TikTok LIVE/OBS that; Giai doan8-9 chua hoan thanh.

---

## Giai doan 8 - TikTok LIVE adapter that va fallback

Pham vi prompt: TikTok Mode trong Phan 16 va cac canh bao mapping/streak cua Phan 9.

- [x] Nghien cuu connector Node.js con duoc duy tri va doc API/README phien ban thuc te.
- [x] `TikTokLiveEventAdapter` cung interface voi Mock adapter; frontend/backend khong phu thuoc data raw cua thu vien.
- [x] Chuan hoa eventId/source/timestamp/type/user/gift/repeat/team/metadata va Zod validate.
- [x] `.env` cho cau hinh; khong hardcode cookie/token, khong dua secret len frontend.
- [x] Khong tu ket noi khi chua cau hinh; Connected/Disconnected/Error, log va reconnect backoff.
- [x] Gift name/ID theo tai khoan/khu vuc co the thay doi va duoc mapping cau hinh.
- [x] Luon fallback Mock Mode neu connector khong san sang.
- [x] Chi bao "da kiem thu LIVE that" khi co phien LIVE va bang chung thuc te; neu khong phai ghi ro chua kiem thu.

Cong hoan thanh: adapter tich hop an toan; trang thai thuc nghiem duoc bao cao trung thuc.

### Bang chung va ket qua - Giai doan 8 (2026-10-23)

- Pin `tiktok-live-connector2.5.0`, doi chieu README/API/runtime/protobuf v3 thuc te: user.id/displayId, gift.type/name, common.msgId/roomId/createTime, groupId. Lazy import chi o server; cung LiveEventAdapter voi Mock. License AGPL-3.0-only va phu thuoc Euler Stream da ghi ro.
- .env validate, khong auto-connect ke ca co username; khong cookie/OAuth, optional signing key chi o backend. Control co Connect/Use Mock, status/attempt/retry, mapping ID thuc va thong bao chua kiem thu LIVE. Ket noi that khoa Mock; loi/ngat/unconfigured/timeout mo Mock, retry2/4/8/16/32s cap60s, toi da5retries. Stop/stream-end/shutdown chan callbacks cu.
- Normalizer Zod allowlist, stable IDs, cumulative dedupe/persistence; team scoring van theo mapping. Stale/partial streak consume baseline; timestamp boundary va khoang mat mang co the bo sot qua de tranh cong nham. Unknown gift log ID/ten,0diem. Khong persist/expose raw payload hay secret.
- Typecheck, **162 tests /19files**, build dat;34tests moi cho protobuf/fake transport/retry/cancel/HTTP/Socket.IO/restart/UI. Smoke-test package that khong ket noi mang. JS1,478.73kB/gzip413.16kB; bundle warning va THREE.Clock van con.
- Browser Control tai5174/backend3001, desktop va390x844 khong overflow; Mock Rose x10=100, Replay+0, Pause va New match dung. Da ve WAITING0/0,3x120s/default mapping. Port5173 cua du an khac duoc giu nguyen. GLB SHA256 khong doi.
- Bao cao `reports/phase-8-summary.md`, anh `reports/phase-8-control-ready.jpg` / `reports/phase-8-control-mobile.jpg`; backup `data/before-phase-8-2026-10-23.json`. **HOAN THANH Giai doan8 ve tich hop; CHUA KIEM THU LIVE THAT** vi khong co tai khoan/phien LIVE. Giai doan9 chua hoan thanh.

---

## Giai doan 9 - Kiem thu tong the, toi uu, tai lieu va ban giao

Pham vi prompt: Phan 18-24 va tat ca tieu chi hoan thanh bat buoc.

- [x] Xu ly WebGL init, GLB HTTP status/URL, scene attachment, camera, clipping, scale, light, material/shader, skeleton, frustum va render loop.
- [x] Asset/WebGL/React error hien thong bao cu the; tuyet doi khong dung khoi/anh/CSS placeholder de che loi.
- [x] Cache asset/animation; khong reload khi gift; dispose dynamic resources khi unmount.
- [x] Kiem tra desktop, 9:16, overflow, camera, text readability va console.
- [x] Kiem thu Phase 1-5 cua prompt va browser automation/screenshot neu WebGL ho tro.
- [x] Chay `npm run typecheck`, `npm run test`, `npm run build`, `npm run dev`; sua den khi dat.
- [x] Mot lenh `npm run dev` khoi dong frontend va backend, hien URL/port thuc te.
- [x] README tieng Viet: Node, install/run, Overlay/Dashboard, mock gift, mapping, OBS/TikTok Studio, blank screen, audio va TikTok status.
- [x] `ASSET_CREDITS.md`: Messi CC BY 4.0 dung metadata tac gia/nguon; Ronaldo khong tu khang dinh quyen thuong mai neu khong co license.
- [x] Khong yeu cau Docker/cloud/database/API AI tra phi/Blender/Meshy.
- [x] Doi chieu lan cuoi moi checkbox trong Phan 23 va toan bo `PROMPT.md`.
- [x] Bao cao file da tao, ket qua GLB, animation, gameplay, TikTok, tests, gioi han va lenh Windows.

Cong hoan thanh: tat ca tieu chi bat buoc trong `PROMPT.md` co bang chung hoac gioi han duoc ghi ro, khong bao cao qua muc da kiem thu.

### Bang chung va ket qua - 2026-10-24

- **HOAN THANH phien ban local/Mock**: `reports/final-acceptance.md` doi chieu 22 checkbox Phan 23 va toan bo 24 phan. `PROMPT.md` khong sua. Bao cao file/GLB/animation/gameplay/TikTok/tests/gioi han/lenh: `reports/phase-9-summary.md`.
- Bo sung Like con thieu trong Phan 9: mock va TikTok delta count, dedupe/persistence, crowd glow/cue 2s, +0 points/gifts/members/supporters. Restart giu likes nhung xoa pulse; New match reset. Follow co star tren Overlay.
- Root React Error Boundary, HEAD no-store/HTTP/HTML/empty checks, probe timeout 15s va model timeout 60s, context lost/restored va shader callback. Browser da tao HTTP410 va contextloss that, thay thong bao cu the; restore hien lai ca hai GLB co texture. Shader failure duoc unit-test, khong tuyen bo da gay loi compiler GPU that.
- Typecheck PASS; **171 tests / 20 files PASS**; production build cuoi PASS. Dev mot lenh in Vite5174/backend3001 va TikTokUNCONFIGURED. Production4173 /engine ket noi snapshot khong canvas, /overlay render WebGL dung720x1280.
- Lazy routes giam entry JS tu1,478.73kB xuong227.11kB/gzip71.47kB; sharedThree van1,025.76kB/gzip276.82kB va canh bao>500kB. Khong tai lai GLB theo gift, cache assets/clips, clone bones/mixer rieng, cleanup resources. Mau local90FPS/116calls/309,680triangles khong phai cam ket60FPS tren moi GPU/OBS; con dependency THREE.Clock/CJS warnings.
- GLB analyzer moi `reports/phase-9-glb-analysis.*`; original/public SHA256 Ronaldo `78f690b490c55a2ed900634b24934dd760a79e9b59242aeb4ec8fbb226546a74`, Messi `92edca0105a42751c4caa793b389d1785fbafb190b01636e1407ae9cd9cbf4e7` khong doi. Credits cua Ronaldo moi/Messi day du; Ronaldo cu duoc giu, khong tu assert license.
- `reports/phase-9-framing.json`:610mau/10clips trong action bounds. Bang chung truc quan animation Giai doan2/7 van hieu luc; procedural khong duoc goi la mocap/giong100%.
- Browser Rose/Cookie x1+x10 ->110/110; Rose combo20 ->310/110, replay khong tang; Follow/Comment/Like hoat dong. Pause01:45,310/110 giu qua refresh va backend restart. Ket qua Ronaldo310:110 va Messi0:100 dung. Overlay720x1280/1080x1920 khong overflow; Control390x844 va1440x1000 khong tran ngang.
- Anh moi `reports/phase-9-control-ready.jpg`, `phase-9-control-mobile.jpg`, `phase-9-overlay-ready.jpg`, `phase-9-production-overlay.jpg`, `phase-9-overlay-720.jpg`, `phase-9-ronaldo-result-720.jpg`, `phase-9-messi-result-1080.jpg`, `phase-9-asset-error.jpg`, `phase-9-webgl-lost.jpg`, `phase-9-webgl-restored.jpg`.
- README hoan chinh ve Node/install/dev/port/routes/mock/Like/mapping/OBS/audio/TikTok/blank screen/preview. Backup `data/before-phase-9-2026-10-23.json`; script/server QA tam thoi da don. Snapshot ban giao WAITING0/0,3x120s,countdown3s,break5s,default mapping,Main/Auto camera,Stadium,Auto quality,HUD/VFX on,volume60/mute. Health ok,persistenceError=null.
- **Chua kiem thu LIVE that, OBS/TikTok LIVE Studio that, soak test nhieu gio hay60FPS tren nhieu GPU**. TikTok adapter da kiem thu offline va giu fallbackMock; khong dong nhat ket quaMock voi LIVE. Cac gioi han mo ta day du trong bao cao cuoi.

---

## Giai doan 10 - Nghiem thu livestream thuc te tren TikTok LIVE Studio

Mo rong theo yeu cau nguoi dung ngay2026-10-24. Nguoi dung chua LIVE va chon TikTok LIVE Studio; pham vi nay khong sua yeu cau goc. **DANG CHUAN BI; chua the danh dau LIVE that da dat.**

- [x] Kiem tra app/server/asset va moi truong phat song; ghi ro blocker UI va cau hinh con thieu.
- [x] Huong dan tung buoc cho lanLIVE dau tien: preview9:16,nguonURL/window capture,Mock,audio,username,Connect,mapping.
- [x] Lenh preflight read-only, tach localPASS voi TikTok/qua that/audio.
- [x] Kiem tra tai backend10phut:dupe,2clients,reconnect,service restart,persistence,latency/bo nho va gioi han.
- [ ] Nguon Overlay hien dung trong LIVE Studio va tren dien thoai xem.
- [ ] Am thanh Overlay phat vao stream,khong lap/echo.
- [ ] Username that dangLIVE;ket noiCONNECTED,Like/Comment/Follow that da doi chieu.
- [ ] Mapping IDqua that va count/diem/streak dung,khong cong trung.
- [ ] Reconnect/stop/recovery cua phienLIVE that va kiem tra do on dinh toi thieu30phut hoac ghi ro thoi luong dat duoc.
- [ ] Bao cao nghiem thu LIVE that va dong giai doan khi cac muc bat buoc dat.

### Bang chung va ket qua - 2026-10-24

- `LIVE_STUDIO_SETUP.md`, `reports/phase-10-summary.md`, `reports/phase-10-preflight.json`, `reports/phase-10-soak-smoke.json`.
- Preflight7/7localPASS;TikTokUNCONFIGURED,0numeric mappings. Smoke15.25s/95requests dat. `reports/phase-10-soak.json`:600.2s/4238requests/587replays/4reconnect/2servicerestarts PASS; diem7310/21900 dung,ACKp95=74.33ms. Khong reset tran chinh nguoi dung dang thu.
- Browser3D thu cung backendtai,AutohaLow,mau35-79FPS,khongalert;anh `phase-10-load-preview.jpg`,samplesJSON. RSSserver+testclients85.41->307.15MiB,ledger tang;khong suy ra khongmemoryleak/60FPSencoder. Chi serviceclose/recreate trong cungprocess,khong kill/relaunch.
- LIVEStudio registry1.37.4,processdangchay1.38.0,GPUIntelIrisXe. Launch ban dau biWindows `Access is denied (0x80070005)`; sau khi usermodangnhap da doc duoc preview/sourceLienket. Clicktu dongkhong co tac dung; user dang mo cau hinh bangtay. Chua thayOverlaytrongStudio.
- Chua co username/.env/phienLIVE; chua xac minh preview/audio tren LIVE Studio hoac su kien that. Khong dong nhat bang chungMock voi LIVE.
