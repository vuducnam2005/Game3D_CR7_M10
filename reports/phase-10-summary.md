# Giai doan 10 - Chuan bi va nghiem thu TikTok LIVE Studio

Ngay 2026-10-24. **DANG THUC HIEN, chua nghiem thu LIVE that.** Nguoi dung chon TikTok LIVE Studio va chua phat LIVE lan nao. Khong co username duoc cung cap va chua co `.env`; server chinh van Mock/UNCONFIGURED.

## Phan da chuan bi

- `LIVE_STUDIO_SETUP.md`: tung buoc preview9:16, nguon URL/window capture, Mock, am thanh, username/.env/Connect, ID qua that va checklist phien LIVE.
- `scripts/live-preflight.mjs` / `npm run check:live`: kiem tra read-only health, snapshot,3routes,2GLB; tach PASS local khoi trang thai TikTok/mapping/audio. Khong start match, ket noi TikTok hay phat song.
- `scripts/soak-live.mjs` / `npm run test:soak`: backend rieng tren port loopback tu chon, snapshot UUID rieng, hai Socket.IO clients, mix gift/streak/like/follow/comment/replay, assert diem/counter/capacity/ket qua.4lan reconnect,2lan close/recreate HTTP/Socket server cung snapshot va doi client tu reconnect. Day la service restart trong cung Node process, khong phai kill/relaunch process.
- `PROJECT_PHASES.md`: mo them Giai doan10 theo yeu cau, giu chua hoan thanh. Khong sua `PROMPT.md`, GLB hay logic gameplay trong giai doan nay.

## Moi truong va tro ngai thuc te

- Registry ghi TikTok LIVE Studio1.37.4; sau khi nguoi dung mo thu cong, cua so dang chay thuoc `C:\Program Files\TikTok LIVE Studio\1.38.0\TikTok LIVE Studio.exe`. Launcher ton tai o thu muc ung dung.
- GPU: Intel(R) Iris(R) Xe Graphics, driver31.0.101.4644. Khuyen nghi thu720x1280/30FPS truoc; khong tuyen bo60FPS trong LIVE Studio.
- Registry con entry OBS32.0.2 nhung exe o duong dan registry khong ton tai; khong coi OBS la da chay/kiem thu. Nguoi dung chon LIVE Studio nen khong cai them OBS.
- Da doc skill computer-use va thu launch: Windows tra `GetCursorPos failed: Access is denied. (0x80070005)`. Nguoi dung sau do mo/dang nhap bang tay; da doc duoc anh cua so that sau khi activate. Co bo cuc doc, nut Them nguon va nguon Lien ket. Bam double-click/gear/context menu tu dong khong tao thay doi UI, nen da huong dan nguoi dung mo cau hinh bang tay. Chua xac minh URL da duoc luu hay Overlay hien trong LIVE Studio.
- Khong tao `.env` voi username gia, khong connect tai khoan ngau nhien, khong bam Go LIVE, khong gui comment/gift len TikTok. User se phat LIVE khi preview/audio san sang.

## Ket qua kiem tra

- Syntax `node --check` cua hai script: PASS.
- `phase-10-preflight.json`:7/7checks local PASS, TikTokUNCONFIGURED,0numeric gift mappings, audioMuted=true tai thoi diem kiem tra. Cac route HTTP PASS khong phai kiem tra WebGL.
- `phase-10-soak-smoke.json`:15.25s,95requests,15duplicate replays,4reconnect,2service restarts; diem160/480,64gifts,160likes dung; ACKp95=9.27ms. So lieu chi thuoc smoke test15s.
- `phase-10-soak.json`: **PASS600.2s**,4,238requests,587duplicate replays,4reconnect,2service restarts; diem7310/21900,2921gifts,7300likes, ket quaMessi dung. Hai testclients nhan18436/18428snapshots. ACKp50=34.96ms,p95=74.33ms,max190.26ms; event-loop p95=57.11ms/max190.71ms.
- RSS cua tien trinh gom server+2testclients tang85.41->307.15MiB; heap23.59->77.85MiB, co dao dongGC, snapshot3,715->1,888,905bytes do ledger giu event/streak. Khong ket luan khong leak hay memory bounded tu bai10phut. Can soak dai tren may phat thuc te de do them.
- Co them mot browserControl noi vao backend rieng trong phan sau cua bai tai. `phase-10-load-preview.jpg` va `phase-10-browser-samples.json`: haiGLB/animation/VFX hien thi, khong alert; Auto haStandard->Low, mau35-79FPS (khong phai p95 hayFPSencoder). File samples luu35/35/45FPS oLow;79FPS la quan sat ban dau truoc khi tao samplesarray. Chua doGPUmemory/am thanh/LIVEStudio. Browser duoc dong va ViteQA5175 duoc dung sau kiem thu; backendsoak tu dongclose.
- `phase-10-preflight-offline.json`: tat ca7checkFAIL khi hostoffline va exitcode1 dung; da assert failure-path, khong nham diagnosticfail voi gamefail.

## Phan can phien LIVE that

- Nguoi dung da mo va dang nhap LIVE Studio; can hoan tat nguonLienket, thay Overlay trong preview va thu hinh/am thanh.
- Cung cap @username dang phat; cau hinh.env/restart/Connect. Xac minh CONNECTED va Like/Comment/Follow that.
- Gift ID tu event that, mapping va doi chieu count/diem/streak; MockIDkhong duoc coi la IDTikTok.
- Preview va am thanh tren dien thoai xem, reconnect/retry/stop, do tai khi LIVE Studio ma hoa stream, thoi luong phien thuc te.

Khong dong Giai doan10 cho den khi co bang chung tren. Bounded Mock soak khong chung minh ket noiTikTok, audiooutput, GPUmemory hay on dinh nhieu gio.
