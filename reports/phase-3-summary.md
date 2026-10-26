# Giai doan 3 - San van dong, anh sang va camera

Nghiem thu: 2026-10-22. Ket qua: HOAN THANH trong pham vi Giai doan 3 cua `PROJECT_PHASES.md`. Khong phai hoan thanh toan game.

## Pham vi va doi chieu prompt

Nguon: `PROMPT.md` Phan 4.1, Phan 5, scene/camera/performance trong Phan 18, UI/build trong Phan 20. Cac hieu ung qua tang, confetti, audio va HUD ket qua van o Giai doan 7; khong bi loai khoi ke hoach.

| Yeu cau | Thuc hien va bang chung |
|---|---|
| San co xanh, vach trang, vong tron, bong | `FootballField.tsx`: pitch 15x12, soc co, vach san/penalty, vong tron va bong geometry. Anh desktop va portrait. |
| Khan dai, den pha, LED, nen dem | `Stadium.tsx`, `Crowd.tsx`: terrace, crowd instancing, 4 cot den, LED CanvasTexture, sao va fog. Khong tai asset ngoai. |
| Ronaldo trai/do, Messi phai/xanh | X=-1.25 / +1.25; `Lighting.tsx` dung key/fill/rim, point light do/xanh. Tai dung hai GLB duoc nguoi dung cung cap. |
| Toan than, khong che nguoi, khong qua nho | Hai model cao tham chieu 3.15; camera fit action bounds. UI/nut nam ngoai vung nhan vat, team labels o chan trang/ngoai hai ben. Kiem tra desktop va 2 kich thuoc doc. |
| 5 camera | `CameraController.tsx`, `cameraRig.ts`: Main Battle, Ronaldo Focus, Messi Focus, Victory (chon team), Debug Orbit. Cac nut da thu tren browser. |
| Zoom/theo doi/shake/return | Focus push-in nhe; follow theo tien do clip; SIUUU landing shake 2.58-2.96s, bien do toi da 0.025. Hanh vi SIUUU -> Ronaldo Focus -> Main Battle va Messi Victory -> Victory -> Main Battle da quan sat. |
| Khong xuyen/cat model | FOV 36, near 0.1, far 100; fit 8 goc action bounds va margin. Orbit gioi han khoang cach/goc va tat pan. Test frustum, camera blend va mau geometry thuc. |
| Arcade/cinematic | Nen dem, co xanh, terrace do/xanh, LED sang, typography gaming; scene la trong tam, khong co score/gift/timer gia. |
| DPR/shadow/may yeu | Low/Standard/High/Auto; instanced crowd, bounded shadow, cache GLB/clips, dispose tai nguyen tao dong. Reduced motion co rieng. |

## Ma nguon chinh

- `src/scene/FootballField.tsx`, `Stadium.tsx`, `Crowd.tsx`, `Lighting.tsx`.
- `src/scene/CameraController.tsx`, `cameraRig.ts`, `ScenePerformance.tsx`, `quality.ts`.
- `src/pages/StadiumPreview.tsx`, `src/styles/StadiumPreview.module.css`.
- `src/App.tsx`: `/` va `/stadium` la scene preview; `/debug` giu chuc nang Model Lab. `/overlay` va `/control` van bao chua trien khai.
- `AnimationManager.ts`, `DebugCharacter.tsx`: cung cap thoi gian/duration/paused qua ref cho camera, khong set React state moi frame.
- `modelInspection.ts`, `ModelDebug.tsx`: phan biet clip goc theo identity; ban sao cung ten cua Messi hien DERIVED, khong goi nham la GLB.
- `tests/cameraRig.test.ts`, `tests/characterAnimations.test.ts`, `scripts/verify-stadium-framing.mjs`.

## Kiem thu tu dong

- `npm run typecheck`: PASS.
- `npm run test`: PASS, 26 tests / 6 files.
- `npm run build`: PASS; CSS 22.85 kB / 5.70 kB gzip; JS 1,284.42 kB / 356.49 kB gzip. Vite van canh bao chunk >500 kB.
- `node scripts/verify-stadium-framing.mjs`: PASS, 10 clip x 61 mau = 610 mau. Tat ca `allContained=true`; JSON day du: `reports/stadium-framing-analysis.json`.
- Bounds chung min `[-2.95,-0.08,-1.6]`, max `[2.95,4.95,1.25]`. Dinh nhay Ronaldo Y=4.824747; min Y=0.001550. Messi Celebrate max Y=3.692941; Victory max Y=3.661808.
- Kiem tra projection tai aspect 16:9, 9:16, 1:1, 0.4; ca hai Victory targets; chuyen giua hai focus cameras; shake/reduced motion va dieu kien tu ha quality.
- Test GLB that xac minh clip cache, bone clone rieng, transform/source track khong doi. Test Messi `mixamo.com` can ground tai t=0 va 0.5s.
- `mixamo.com` khong la action tren san, nen khong tinh vao 610 mau stadium. Ban playback da can chan duoc nghiem thu rieng o `/debug`; khong tu coi no la celebration.

## Kiem thu browser/WebGL

Da quan sat that tren trinh duyet cua ung dung, khong suy ra hinh anh tu unit test.

| Viewport | Rong noi dung | Khung san | Ket qua |
|---|---:|---:|---|
| 1440x900 | 1425 px | 1425x800 | Toan than, team labels khong che chan, khong tran ngang |
| 720x1280 | 705 px | 705x1253.33 | San 9:16, hai model ro, khong tran ngang |
| 1080x1920 | 1065 px | 1065x1893.33 | San 9:16, SIUUU/Victory khong cat nhan vat, khong tran ngang |

Thanh cuon doc chiem 15px. Header va controls nam ngoai khung san, trang co cuon doc; chua phai fullscreen LIVE Overlay.

- Ca hai model hien texture va skeleton dung; san, line, crowd, LED, floodlight, bong va anh sang do/xanh hien thi.
- 5 nut camera hoat dong; Orbit da keo kiem tra trong phien trien khai. Victory focus doi duoc team.
- SIUUU va Victory kich hoat camera tu dong, het animation ve Idle/Main Battle. Reduced motion + Messi Celebrate giu Main Battle.
- Da chon Low/Standard/High/Auto, UI hien dung DPR/shadow cap. Auto da tu ha Low trong phien trien khai khi render cham keo dai; logic co unit test, khong ep cham hay sua state tu browser.
- Hoi quy `/debug`: WebGL2 READY, Messi 10 mesh/34 bone/8 texture, `mixamo.com` DERIVED chay duoc va khong con lech ground lon. Nhan clip va ghi chu chinh sua hien dung.
- Console khong ghi nhan error trong phien nghiem thu; van co warning dependency `THREE.Clock` deprecated.
- Loi `ERR_CONNECTION_REFUSED` luc tiep tuc la do Vite khong chay. Da khoi dong lai `npm run dev` tren 5173; nguoi dung xac nhan thay san va hai nhan vat. README co huong dan giu terminal mo/khac phuc.

Anh luu tu browser:

- `reports/phase-3-desktop.jpg`
- `reports/phase-3-portrait-720.jpg`
- `reports/phase-3-portrait-1080.jpg`
- `reports/phase-3-siuuu-1080.jpg` (mot thoi diem SIUUU, khong tuyen bo la dinh nhay)
- `reports/phase-3-debug-messi-grounded.jpg`

## Bao toan asset

SHA-256 file goc va public copy trung nhau sau kiem thu:

- Ronaldo: `78f690b490c55a2ed900634b24934dd760a79e9b59242aeb4ec8fbb226546a74`.
- Messi: `92edca0105a42751c4caa793b389d1785fbafb190b01636e1407ae9cd9cbf4e7`.
- Ronaldo cu trong public van giu hash `f1c0daf2165a7c993eeb77ea31c69318cf5777a7b13fd8de8ae7f2975d0f1327`, khong tai vao runtime.

Giu thay doi can chan Messi hien co: runtime clone `mixamo.com` va dich hips Y; khong sua GLB hay original tracks. Da bo sung test va credit ghi ro thay doi. Khong thay nhan vat, khong tao placeholder.

## Gioi han va ban giao

- Khong khang dinh 60 FPS toan game; Ronaldo 118,395 triangles/435 joints va tong GLB khoang 27 MB van nang. Chua test tren dien thoai vat ly; cac kich thuoc mobile la viewport browser tren may nay.
- Camera/motion duoc kiem tra trong cac che do va viewport neu tren; mau CPU khong la chung minh lien tuc cho moi pose hay moi thiet bi.
- Chua co gameplay, score, timer, rounds, Socket.IO, gift, confetti/audio, fullscreen Overlay/Control Dashboard hoac TikTok LIVE. Cac muc do van duoc giu trong Giai doan 4-9.
- Mo `http://localhost:5173/stadium`; lenh chay Windows: `cd C:\3d` roi `npm run dev`. Khong can Docker/cloud/API tra phi.
