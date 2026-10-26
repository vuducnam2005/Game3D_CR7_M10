# Giai doan 2 - Model Debug va animation

Ngay nghiem thu: 2026-10-21. Nguon doi chieu: `PROMPT.md`, Phan 2, 4.2 man hinh C, 6, 7, 18 va Phase 1-2 cua Phan 20. Checklist tong: `PROJECT_PHASES.md`.

## Ket qua

- Hoan thanh Giai doan 2; chua bat dau san van dong, gameplay hay cac giai doan sau.
- Ronaldo dung `cristiano_ronaldo.glb` theo thay doi nguoi dung xac nhan. Messi dung `messi_2023_3d_free.glb` nhu prompt. Khong sua `PROMPT.md` hoac GLB goc.
- `/debug` co texture, bone/clip list, Play/Pause, speed, pose preview, orbit camera, bounds, skeleton, loi asset/WebGL, hang doi va che do Compare both.
- Hai model dung canh nhau: Ronaldo trai, Messi phai; parent uniform normalization, chieu cao tham chieu 3.15; skeleton clone doc lap. Clip, geometry va texture duoc cache; khong tai lai khi PLAY.
- Giao dien dung CSS Modules; global CSS chi giu reset/base.

## Animation doi chieu prompt

| Nhan vat | Clip | Nguon va ket qua |
|---|---|---|
| Ronaldo | Armature.001Action.001 | Giu nguyen clip goc 3.983333s, 1,249 tracks. |
| Ronaldo | Idle | DERIVED, 3s, tu the cuoi clip co nhip tho nhe, loop. |
| Ronaldo | SIUUU | DERIVED, ban sao clip goc; cui nguoi, nhay, xoay nua vong, tiep dat dang tay; ve Idle huong mat ra camera. |
| Ronaldo | Calma | PROC, 3s, hai tay dua ra truoc va ha/nang nhe. |
| Ronaldo | Sleep | PROC, 3s, hai tay gan ma va nghieng dau. |
| Ronaldo | Power Pose | PROC, 3s, dang canh tay va gap khuyu len. |
| Ronaldo | Point Up | PROC, 3s, mot tay gio len, giu ngon tro, gap cac ngon con lai. |
| Messi | mixamo.com | Giu clip goc 1.066667s; chuyen dong nhay/co goi ngan, khong coi la celebration. |
| Messi | Messi Idle | PROC, 3s, loop chuyen dong nhe. |
| Messi | Messi Celebrate | PROC, 3.2s, nang hai tay, ngua mat va ve Idle. |
| Messi | Messi Victory | PROC, 5.3s, hai buoc chan ngan len truoc, dang tay, gio tay, giu pose va tro lai; MESSI WINS! co nhan Animation preview. |

Clip Ronaldo cu khong duoc dung lai tren Rigify 435 joints. Track Ronaldo khong duoc ap sang Messi. PoseAuthor tao pose tren clone, giu rest/bind transforms cua source; Victory Messi su dung IK hai bone de giu chan tru. Moi one-shot hoan tat chuyen ve Idle qua crossfade 0.28s; queue toi da 4, cooldown 250ms, gop ten clip trung.

Trophy Celebration la muc tuy chon trong prompt, chua trien khai. Cup/confetti/anh sang se duoc danh gia tai Giai doan 7; checklist rieng da duoc them, khong ngam bo qua.

## Kiem thu

- `npm run typecheck`: PASS.
- `npm run test`: PASS, 14 tests trong 5 files; load GLB that de kiem tra rig/clip, bao toan rest transforms, bounds, Point Up, Victory chan tru/nhac chan/nang tay/ve vi tri, cache va skeleton clone doc lap. Test AnimationManager kiem tra pause/seek/speed, queue/cooldown/dedup/max length/ve Idle.
- `npm run build`: PASS; JS 1,262.48 kB, gzip 350.14 kB. Warning chunk lon van con.
- `node scripts/verify-authored-animations.mjs`: PASS; mau pose/bounds/bone moi trong `reports/authored-animation-samples.json`.
- Trinh duyet WebGL2: hai asset HTTP 200, texture hien thi, khong co console error. Co warning THREE.Clock deprecated tu dependency.
- Da quan sat rieng le va Compare both, skeleton helper, Ronaldo Calma/Sleep/Power Pose/Point Up, SIUUU nhay/ve Idle; Messi Victory dang tay/nang tay/ve Idle. Queue hien thi va ket thuc ve Idle.
- Khung 720x1280: document scrollWidth 705 <= 720; canvas 687x636. Hai nhan vat va Ronaldo khi nhay khong bi cat. Day la trang debug responsive, KHONG phai Overlay da hoan thanh.
- Khung 1080x1920: document scrollWidth 1065 <= 1080; ca hai model va Ronaldo giua cu nhay nam trong canvas. Da tra viewport ve kich thuoc mac dinh sau khi kiem tra.
- SHA-256 goc va public copy Ronaldo: `78f690b490c55a2ed900634b24934dd760a79e9b59242aeb4ec8fbb226546a74`.
- SHA-256 goc va public copy Messi: `92edca0105a42751c4caa793b389d1785fbafb190b01636e1407ae9cd9cbf4e7`.
- Ban luu Ronaldo cu khong doi: `f1c0daf2165a7c993eeb77ea31c69318cf5777a7b13fd8de8ae7f2975d0f1327`.

## Bang chung hinh anh

- `reports/phase-2-comparison-mobile.jpg`: hai nhan vat, texture, ty le va mat san.
- `reports/phase-2-siuuu-comparison-mobile.jpg`: Ronaldo giua cu nhay, Messi Idle.
- `reports/phase-2-messi-victory.jpg`: Messi nang tay cao hon dau, caption preview.
- `reports/phase-2-point-up.jpg`: Ronaldo chi tay len.
- Bao cao va anh nghiem thu thay model truoc do giu nguyen tai `reports/ronaldo-replacement.md` va cac file no tham chieu.

## File chinh bo sung/cap nhat

- `src/characters/PoseAuthor.ts`, `RonaldoProceduralAnimations.ts`, `MessiVictory.ts`, `characterAnimations.ts`: author pose, clip moi va cache.
- `src/characters/DebugCharacter.tsx`, `MessiProceduralAnimations.ts`, `modelInspection.ts`: rig rieng, helpers, lifecycle va phan loai nguon clip.
- `src/pages/ModelDebug.tsx`, `DebugCamera.tsx`: Compare both, dieu khien, preview va framing responsive.
- `src/styles/ModelDebug.module.css`, `classes.ts`, `global.css`: CSS Modules va bo cuc debug.
- `tests/characterAnimations.test.ts`, cac test AnimationManager/Ronaldo/Messi va `tests/modelFixtures.ts`: hoi quy tren asset that.
- `scripts/verify-authored-animations.mjs`: bao cao mau pose co the chay lai.

## Gioi han va buoc sau

Dong tac procedural don gian, khong khang dinh do tu nhien nhu mocap, tiep xuc ban tay tuyet doi, nam tay hoan hao hay SIUUU giong 100%. Khong thay texture/geometry goc de che khuyet diem asset. Muc tieu 60 FPS toan game chua duoc do/nghiem thu; hien da cache clip/assets, han DPR toi da 1.75 va shadow 1024.

Giai doan 3 se them san van dong/anh sang/camera theo checklist. VFX/audio, server, score/timer, Mock LIVE, Overlay/Dashboard va TikTok that chua hoat dong. Khong goi animation preview la ket qua tran dau.

Chay tren Windows: `cd C:\3d`, `npm install`, `npm run dev`, mo `http://localhost:5173/debug`.
