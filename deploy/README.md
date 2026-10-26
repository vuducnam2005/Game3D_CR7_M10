# Chay game tren may chu Docker

Ban Docker gom hai container: `web` phuc vu ban build production va proxy WebSocket/API; `game` xu ly diem, qua va TikTok. Snapshot nam trong volume `game-data` nen `docker compose up --build` khong xoa tran. Chi chay **mot** container `game` cho mot tran.

## 1. Tren may chu

```sh
git clone https://github.com/vuducnam2005/Game3D_CR7_M10.git
cd Game3D_CR7_M10
cp .env.example .env
# Sua .env: TIKTOK_ENABLED=true, TIKTOK_USERNAME=ten_tai_khoan neu dung LIVE that.
docker compose up -d --build
docker compose ps
curl -f http://127.0.0.1:8080/api/health
```

Can Docker Engine co `docker compose` va may chu cho phep ket noi HTTPS ra npm/TikTok luc build/chay. Xem log bang `docker compose logs --tail=100 game web`. Muc `web` chi mo cong `127.0.0.1:8080` tren may chu de trang admin/API khong lo ra Internet. Co the doi `DEPLOY_PORT` trong `.env` neu cong 8080 ban.

## 2. Tren may phat LIVE

Mo SSH tunnel va giu cua so terminal nay dang chay:

```sh
ssh -N -L 8080:127.0.0.1:8080 user@SERVER_IP
```

Thay `user@SERVER_IP` bang tai khoan va dia chi may chu. Neu local port 8080 ban, dung `-L 18080:127.0.0.1:8080` va thay URL bang `localhost:18080`. Mo `http://localhost:8080/admin` de dieu khien, `http://localhost:8080/overlay` trong OBS/TikTok LIVE Studio. Nguon phat va trang dieu khien phai dung cung tunnel. Khong mo port 3001, khong publish cong 8080 ra `0.0.0.0` khi chua co xac thuc/TLS.

Chinh `.env` tren may chu de bat TikTok, sau do chay `docker compose up -d` va bam **Connect** tai trang Control. `rose`/`cookie` trong admin la qua gia lap; hay xac nhan ten qua/ID that truoc khi LIVE. Khong dua khoa ky TikTok vao Git.

## Cap nhat va sao luu

```sh
git pull --ff-only
docker compose up -d --build
docker compose cp game:/app/data/game-state.json ./game-state-backup.json
```

Lenh sao luu chay sau khi game da tao snapshot; giu file backup ngoai Git. Khong chay `docker compose down -v` neu muon giu diem/tran cu. Kiem tra `docker compose ps` va `/api/health` sau moi lan cap nhat.

May chu xu ly game logic va ket noi TikTok; WebGL/3D van render tren may dang mo OBS/TikTok LIVE Studio. Neu lag hinh, giam Render quality va Heavy effects trong Control, kiem tra FPS cua Browser Source/GPU va duong truyen giua may phat voi may chu. Khong co tai khoan/phien LIVE that trong repo, nen can thu gift that, audio va preview trong LIVE Studio truoc khi phat.
