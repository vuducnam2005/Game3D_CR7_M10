# Lan dau dua game vao TikTok LIVE Studio

Cap nhat 2026-10-24. URL trong phien hien tai: `http://localhost:5174/overlay` va `http://localhost:5174/control`. Neu khoi dong lai, lay port tu dong `Local:` trong terminal.

Co hai viec doc lap: LIVE Studio lay hinh/am thanh tu Overlay; backend doc gift/like/comment/follow tu tai khoan TikTok dang LIVE. Hien duoc game trong LIVE Studio chua co nghia la da ket noi duoc su kien TikTok.

## 1. Chuan bi hinh truoc khi LIVE

1. Mo TikTok LIVE Studio va tu dang nhap. Neu tai khoan chua co quyen phat LIVE tren may tinh, hoan tat dieu kien/hieu chinh ma TikTok hien; ung dung game khong cap quyen LIVE thay TikTok.
2. Chon bo cuc doc **9:16**. Bat dau voi **720x1280, 30 FPS** neu cac tuy chon nay kha dung, de giam tai cho Intel Iris Xe. Co the nang len 1080x1920 sau khi thu on dinh.
3. Trong khu vuc Sources/Nguon, chon Add source/Them nguon. Neu phien ban cua ban co **Link**, **Browser** hoac nguon URL, them `http://localhost:5174/overlay`. Neu co Width/Height, dat 720/1280 (hoac 1080/1920 theo canvas). Fit nguon vao canvas doc, giu dung ty le.
4. Neu khong co nguon URL: mo Overlay bang **Chrome hoac Edge trong cua so rieng**, sau do them **Window capture/Chup cua so** va chon dung cua so do. Dieu chinh cua so theo dang doc, crop thanh dia chi/vien va fit vao canvas 9:16. Chon Stadium background; window capture khong dam bao nen alpha.
5. Khong capture cua so Control, terminal hay toan man hinh neu chi can game. Overlay la trang chi co san/nhan vat/HUD, Control la trang de bam nut.
6. Preview phai hien Ronaldo trai, Messi phai, day du texture/chan, score0-0, timer02:00 va gift hints/feed. Neu nguon den, xem muc xu ly loi ben duoi.

Da quan sat LIVE Studio1.38.0 co **Them nguon** o cuoi cot trai va nguon **Lien ket**. Khi chon Lien ket, nut banh rang tren thanh cong cu phia tren preview (sat trai thung rac) la vi tri mo cau hinh nguon. Launch tu dong ban dau bi Access is denied; sau khi user mo thu cong da doc duoc cua so, nhung click tu dong khong co tac dung. Chua xac minh Overlay da hien trong Studio; cac buoc luuURL/audio van can nguoi dung thuc hien.

## 2. Thu game trong preview

1. Mo Control trong tab khac: `http://localhost:5174/control`.
2. Bam **Start**, doi countdown ket thuc; bam Rose x1: Ronaldo+10/SIUUU; Cookie x1: Messi+10/Celebrate. Preview LIVE Studio phai thay doi theo.
3. Bam **Like x10 / Crowd cheer**: hien cue/khan dai phat sang, diem giu nguyen. **Follow** va **Comment CR7/M10** thu feed/team.
4. Dung **Pause/Resume** de thu timer; sau khi xong bam **New match** de ve0-0/WAITING. New match xoa du lieu tran thu.
5. De giam tai, Control chon Render quality **low** hoac **auto**. Tat Heavy effects neu FPS cua LIVE Studio giam. FPS trong Control la cua tab preview, khong phai FPS bo ma hoa cua LIVE Studio.

Co the lam het phan nay khi chua phat LIVE; su kien la Mock, khong di qua TikTok.

## 3. Thu am thanh

1. Control: dat volume thap luc thu (vi du30), bo **Mute overlay audio**.
2. Tuong tac/click trong chinh Overlay de unlock Web Audio. Moi tab/Browser Source can unlock rieng. Neu LIVE Studio co Interact/Tuong tac cho nguon URL, dung no. Neu khong co va audio van bi chan, dung Chrome/Edge + Window capture va click Overlay trong trinh duyet do.
3. Chon nguon audio cua cua so/app Overlay trong LIVE Studio neu duoc ho tro; neu dung system audio, kiem tra mixer de tranh thu cung am hai lan. Control preview mac dinh im lang.
4. Bam Rose/Cookie va kiem tra meter audio LIVE Studio. Khi da LIVE, nghe bang dien thoai/tai nghe de xac minh dau ra va tranh vong lap microphone. Game kem am tong hop, khong kem giong cau thu that.
5. Neu can sound check rieng: Control > Audio files / sound check > Unlock sound check > Play cue; dung Stop sound check sau khi thu. Day la audio tu Control, khong chung minh nguon Overlay da duoc thu vao stream.

## 4. Ket noi su kien TikTok khi san sang

Can **@username cong khai** cua chinh tai khoan phat va mot phien dang LIVE. Chua LIVE thi ket noi co the bao offline; do khong phai diem/Overlay bi hong.

1. Trong thu muc C:\3d, sao chep `.env.example` thanh `.env` neu chua co; giu file `.env` da co.
2. Dat cac dong sau, thay `ten_tai_khoan_cua_ban` bang username that:

```dotenv
WEB_PORT=5174
TIKTOK_ENABLED=true
TIKTOK_USERNAME=ten_tai_khoan_cua_ban
```

3. Khoi dong lai `npm run dev`. Control se hien tai khoan va nut Connect. Khong tu connect; khong can mat khau/cookie TikTok trong game. Khong dat key trong bien VITE_.
4. Sau khi hinh va am thanh da san sang, **ban tu bam Go LIVE/Bat dau LIVE trong LIVE Studio**. Dung dien thoai thu hai hoac nguoi xem kiem tra dung tai khoan/phien.
5. Trong Control bam **Connect TikTok**. Chi khi hien **CONNECTED / TIKTOK MODE** moi coi la ket noi thanh cong. Mock buttons se khoa; Start/Pause/rules van dieu khien game.
6. Thu Like va comment CR7/M10 that tu mot tai khoan xem. Doi chieu likes/team/feed voi Control va Overlay. Co the thu truoc khi Start vi Like/Follow/Comment khong tinh diem.
7. Khi can thoat nguon that, bam **Use Mock / Stop retry**. Ngat ket noi khong reset diem.

Connector khong chinh thuc, phu thuoc TikTok va Euler Stream. Neu Error/Retrying, doc thong bao va giu Mock de kiem tra game. Signing key chi them neu dich vu thuc te yeu cau; khong can tao tai khoan/key tra phi de thu Mock. Ket noi duoc chua du de ket luan gift/streak that da dat.

## 5. Mapping qua that

`rose`, `cookie`, `trophy` la ID Mock. Ten qua that co the khac theo room/khu vuc; khong tu gan ID theo ten.

1. Khi su kien qua that den nhung chua mapping, Event log hien ID/ten da lam sach va bo qua diem. Ghi nhan ID tu dung phien.
2. Trong WAITING, them dong o Gift mapping & rules voi **ID so that**, ten, team, diem va animation phu hop; Save live rules.
3. Rose-like -> Ronaldo/SIUUU, Cookie-like -> Messi/Celebrate la lua chon cua streamer, khong phai quy tac TikTok. Co the doi theo qua co trong room.
4. Bam Start, doi PLAYING. Khi qua phat sinh, doi chieu count/points va streak; khong cong lai cumulative count hay event final.
5. Ban dau chi can Like/Comment de thu ket noi. Nghiem thu gift that khi co qua phat sinh; khong bat buoc mua qua de chuan bi hinh/am thanh.

## 6. Kiem tra truoc moi buoi phat

```powershell
cd C:\3d
npm run check:live -- --url=http://localhost:5174
```

Lenh chi doc health/snapshot/routes/GLB; luu `reports/live-preflight.json`, khong start game/ket noi TikTok/phat LIVE. PASS local khong thay the preview va thu dien thoai. Ghi rieng TikTok status, numeric mappings va mute de khong nham Mock-ready voi LIVE-ready.

Kiem tra backend chay lien tuc, replays, reconnect, snapshot recovery tren du lieu rieng:

```powershell
npm run test:soak -- --seconds=600 --output=reports/phase-10-soak.json
```

Lenh nay dung backend tam tren port trong, khong doc `.env` hay sua tran dang phat. Hai Socket.IO clients, gui gift/streak/like/follow/comment va replay;4lan reconnect,2lan dong/mo lai server cung snapshot; xac minh diem/ledger/ket qua. Khong render3D hay do am thanh/LIVE Studio. Memory report gom ca server va test clients, khong phai GPU memory;10phut khong thay the soak nhieu gio.

## Xu ly loi nhanh

- **Connection refused**: terminal dev da dung hoac URL sai port. Dung URL Local, khong mo truc tiep file index.html.
- **Nen den/model loi**: xem thong bao Overlay; kiem tra URL models, hardware acceleration, low quality va reload source. Tranh reload nhieu lan cung luc.
- **Co hinh, khong co su kien that**: kiem tra tai khoan dang LIVE, TIKTOK_ENABLED, username, da restart va bam Connect. Capture Overlay va adapter TikTok la hai duong rieng.
- **CONNECTED nhung gift+0**: kiem tra ID mapping, PLAYING, timestamp/round va log. Qua trong PAUSED/countdown/nghi khong bu diem ve sau.
- **Co hinh, khong co am**: kiem tra mute/volume, gesture tren dung source va audio mixer cua LIVE Studio; khong chi nghe sound check Control.

## Dieu kien dong Giai doan 10

- [ ] Hinh Overlay day du trong preview LIVE Studio va tren dien thoai xem LIVE.
- [ ] Am thanh Overlay ra dung stream, khong lap/echo.
- [ ] Tai khoan that CONNECTED; Like/Comment/Follow that duoc doi chieu.
- [ ] Gift ID/count/diem/streak that da doi chieu, khong cong trung.
- [ ] Reconnect/stop/restart an toan trong buoi test, khong mat diem da luu.
- [ ] Chay toi thieu30phut tren LIVE Studio va ghi FPS/CPU/GPU/bo nho/loi theo kha nang host; neu phien ngan hon ghi dung thoi luong.

Hien tai cac muc tren cho thao tac/phien LIVE that; khong danh dau hoan thanh dua tren Mock/preflight.
