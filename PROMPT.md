# MASTER PROMPT CODEX — RONALDO VS MESSI 3D TIKTOK LIVE BATTLE

## VAI TRÒ CỦA BẠN

Bạn là Senior Game Developer, Senior Fullstack Developer và chuyên gia Three.js, React Three Fiber, skeletal animation, real-time event systems và thiết kế trò chơi tương tác livestream.

Nhiệm vụ của bạn là **trực tiếp xây dựng, chạy và kiểm thử một trò chơi 3D hoàn chỉnh mang tên RONALDO VS MESSI – TIKTOK LIVE BATTLE**.

Không chỉ đề xuất ý tưởng, không dừng ở pseudo-code, không tạo bản demo sơ sài. Hãy viết mã nguồn thực tế, kiểm thử và sửa lỗi.

### MỤC TIÊU CUỐI CÙNG

Một trò chơi có sân vận động 3D, hai nhân vật Ronaldo và Messi thực sự, animation ăn mừng, hệ thống điểm, combo, hiệu ứng hình ảnh và âm thanh, mô phỏng quà TikTok, hỗ trợ phát livestream 9:16 và có kiến trúc sẵn sàng tích hợp TikTok LIVE thực tế.

**Ưu tiên quan trọng nhất: Nhân vật 3D phải hiển thị được và có thể chạy animation. Sau đó mới thêm các tính năng nâng cao.**

---

# PHẦN 1 — THƯ MỤC DỰ ÁN VÀ TÀI NGUYÊN

## 1.1. Đường dẫn làm việc

Toàn bộ mã nguồn phải được tạo tại:

`C:\3d`

Hai file 3D gốc đã có:

- `C:\3d\ronaldo_rigged.glb`
- `C:\3d\messi_2023_3d_free.glb`

Yêu cầu:

- Không tạo dự án ở thư mục khác.
- Không xóa hoặc ghi đè hai file gốc.
- Có thể sao chép chúng vào `public/models/`.
- Không tự tải các nhân vật khác.
- Không thay thế nhân vật bằng hình cầu, hình hộp hoặc placeholder.
- Không tạo hình Ronaldo/Messi giả bằng CSS hay ảnh PNG.
- Không yêu cầu người dùng mở Meshy hoặc Blender.
- Không phụ thuộc vào API AI trả phí.
- Giữ nguyên texture, material và skeleton của hai mô hình.

Nếu môi trường Codex không truy cập được ổ `C:`, cần báo chính xác trở ngại thay vì tự tạo model khác hoặc giả vờ đã đọc file.

## 1.2. Phân tích GLB trước khi lập trình

Đã có thông tin kiểm tra sơ bộ như sau.

### Ronaldo

File: `ronaldo_rigged.glb`

- GLB 2.0
- Khoảng 3,26 MB
- 17.392 triangles
- 1 skin
- 17 joints
- 6 embedded textures
- 6 animation clips

Animation:

| Tên clip | Thời lượng |
|---|---:|
| Idle | 3.0 giây |
| SIUUU | 4.5 giây |
| Calma | 3.0 giây |
| Sleep | 3.0 giây |
| Power Pose | 3.0 giây |
| Point Up | 3.0 giây |

### Messi

File: `messi_2023_3d_free.glb`

- GLB 2.0
- Khoảng 10,88 MB
- 29.554 triangles
- 10 meshes
- 1 skin
- 34 joints
- 8 embedded textures
- 1 animation clip

Animation:

- `mixamo.com`
- Thời lượng khoảng 1,067 giây
- Skeleton sử dụng các bone có tiền tố `mixamorig:`

### Yêu cầu kiểm chứng

Hãy lập trình công cụ kiểm tra GLB hoặc sử dụng glTF parser để xác minh các thông tin trên trước khi triển khai.

In ra:

- Tên mesh
- Tên bone
- Skeleton hierarchy
- Animation clip name và duration
- Animation tracks
- Bounding box
- Trục hướng đứng
- Chiều cao mô hình
- Vị trí chân
- Những bone được animation điều khiển

Không giả định hai mô hình có cùng tỷ lệ hoặc cấu trúc xương.

**Ronaldo và Messi cần được chuẩn hóa tỷ lệ để đứng cạnh nhau một cách tự nhiên.**

Không phá vỡ skeleton khi điều chỉnh scale, rotation hoặc parent transform.

---

# PHẦN 2 — CÔNG NGHỆ

Sử dụng:

### Frontend

- React
- TypeScript
- Vite
- Three.js
- @react-three/fiber
- @react-three/drei
- GSAP nếu thực sự cần
- Tailwind CSS hoặc CSS Modules
- Lucide React

### Backend

- Node.js
- TypeScript
- Express
- Socket.IO
- Zod để kiểm tra event và configuration

### Testing

- Vitest
- React Testing Library nếu phù hợp
- Playwright nếu môi trường hỗ trợ WebGL và trình duyệt

### Quy tắc

- Tối ưu cho chạy local trên Windows.
- Không yêu cầu Docker.
- Không cần cloud hosting.
- Không cần database server bên ngoài.
- Không cần tài khoản dịch vụ trả phí.
- Toàn bộ project khởi chạy bằng một lệnh `npm run dev`.

---

# PHẦN 3 — CẤU TRÚC DỰ ÁN

Tổ chức theo hướng sau:

```text
C:\3d\
├── ronaldo_rigged.glb
├── messi_2023_3d_free.glb
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── public/
│   ├── models/
│   │   ├── ronaldo_rigged.glb
│   │   └── messi_2023_3d_free.glb
│   └── audio/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── pages/
│   │   ├── LiveOverlay.tsx
│   │   ├── ControlDashboard.tsx
│   │   └── ModelDebug.tsx
│   ├── game/
│   │   ├── GameEngine.ts
│   │   ├── GameState.ts
│   │   ├── ScoreManager.ts
│   │   ├── ComboManager.ts
│   │   ├── RoundManager.ts
│   │   └── GiftMapping.ts
│   ├── characters/
│   │   ├── Ronaldo.tsx
│   │   ├── Messi.tsx
│   │   ├── CharacterController.ts
│   │   ├── AnimationManager.ts
│   │   └── CharacterNormalizer.ts
│   ├── scene/
│   │   ├── Stadium.tsx
│   │   ├── FootballField.tsx
│   │   ├── Lighting.tsx
│   │   ├── Crowd.tsx
│   │   └── CameraController.tsx
│   ├── effects/
│   │   ├── CelebrationEffects.tsx
│   │   ├── ScorePopup.tsx
│   │   ├── Confetti.tsx
│   │   └── AudioManager.ts
│   ├── ui/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── styles/
├── server/
│   ├── index.ts
│   ├── gameServer.ts
│   ├── socketHandlers.ts
│   ├── mockEvents.ts
│   └── tiktok/
│       ├── LiveAdapter.ts
│       ├── MockAdapter.ts
│       └── TikTokAdapter.ts
├── config/
│   └── game.config.json
├── tests/
├── scripts/
└── README.md
```

Có thể điều chỉnh cấu trúc để phù hợp kỹ thuật. Không tạo file rỗng chỉ để khớp sơ đồ.

---

# PHẦN 4 — THIẾT KẾ GIAO DIỆN GAME

## 4.1. Phong cách tổng thể

Thiết kế như một game mobile 3D hiện đại, vui nhộn, bắt mắt, có chất lượng đủ tốt để dùng trên livestream.

Phong cách:

- 3D stylized
- Football arcade
- Chibi-friendly
- Cinematic lighting
- Bright visual effects
- Clean gaming HUD
- Không gian sân vận động ban đêm
- Pháo giấy và ánh sáng ăn mừng

Không tạo giao diện trông như trang quản trị thông thường.

Không che nhân vật bằng quá nhiều thẻ hoặc bảng điều khiển.

## 4.2. Hai màn hình độc lập

### Màn hình A — TikTok LIVE Overlay

URL:

`http://localhost:5173/overlay`

Đặc điểm:

- Tỷ lệ 9:16.
- Thiết kế cho 1080 × 1920.
- Responsive với 720 × 1280.
- Không hiển thị các nút điều khiển thử nghiệm.
- Không hiển thị menu quản trị.
- Chỉ có sân vận động, nhân vật, điểm, timer, gift feed và animation.
- Có chế độ fullscreen.
- Cho phép chọn nền sân vận động hoặc nền trong suốt nếu phù hợp.
- Tương thích nguồn Browser Source của OBS hoặc phương án capture trong TikTok LIVE Studio.

### Màn hình B — Control Dashboard

URL:

`http://localhost:5173/control`

Dùng để quản lý game trên máy tính.

Có:

- Xem trước màn hình LIVE.
- Bắt đầu, tạm dừng và reset trận đấu.
- Điều khiển animation Ronaldo/Messi.
- Mô phỏng người xem tặng quà.
- Mô phỏng Follow và Comment.
- Chỉnh thời gian hiệp.
- Chỉnh điểm của từng gift.
- Chỉnh âm lượng.
- Chỉnh camera.
- Xem log sự kiện.
- Theo dõi kết nối TikTok.
- Bật/tắt hiệu ứng nặng.

Dashboard và Overlay phải đồng bộ trạng thái qua Socket.IO.

Không tạo hai game state độc lập.

### Màn hình C — Model Debug

URL:

`http://localhost:5173/debug`

Dùng để kiểm thử hai GLB.

Có:

- Chọn Ronaldo hoặc Messi.
- Hiện danh sách bone.
- Hiện danh sách animation.
- Nút Play/Pause.
- Chỉnh speed.
- Xoay camera.
- Xem bounding box.
- Kiểm tra animation trước khi đưa vào game.
- Hiện lỗi asset nếu có.

Màn hình này chỉ phục vụ phát triển, không xuất hiện trên livestream.

---

# PHẦN 5 — THIẾT KẾ SÂN VẬN ĐỘNG 3D

Tạo một sân bóng nhỏ theo phong cách arcade.

## Thành phần chính

- Sân cỏ xanh.
- Vạch sân bóng trắng.
- Vòng tròn giữa sân.
- Khán đài phía sau.
- Đèn pha sân vận động.
- Bảng LED.
- Phông nền sân vận động ban đêm.
- Ánh sáng đỏ ở khu Ronaldo.
- Ánh sáng xanh ở khu Messi.
- Một quả bóng ở giữa sân nếu phù hợp.

Đứng từ góc nhìn chính:

- Ronaldo ở bên trái.
- Messi ở bên phải.
- Camera nhìn từ phía trước.
- Cả hai nhân vật phải nhìn rõ toàn thân.

Không thiết kế sân quá lớn khiến nhân vật nhỏ trên điện thoại.

Nhân vật phải chiếm phần đáng kể trong vùng nhìn trung tâm.

Không thêm đối tượng chắn mặt hoặc che nhân vật.

## Camera

Có:

- Main Battle Camera
- Ronaldo Focus Camera
- Messi Focus Camera
- Victory Camera
- Debug Orbit Camera

Khi ăn mừng:

- Zoom nhẹ vào nhân vật.
- Theo dõi chuyển động khi cần.
- Camera shake nhẹ khi tiếp đất.
- Trở về camera mặc định sau khi animation kết thúc.

Tránh camera xuyên qua mô hình hoặc mất nhân vật khỏi khung hình.

---

# PHẦN 6 — HỆ THỐNG NHÂN VẬT RONALDO

## 6.1. Tải mô hình

Sử dụng chính:

`/models/ronaldo_rigged.glb`

Tải bằng GLTFLoader hoặc useGLTF.

Dùng THREE.AnimationMixer hoặc useAnimations để điều khiển animation.

## 6.2. Animation

Ưu tiên sử dụng các clip gốc:

- Idle
- SIUUU
- Calma
- Sleep
- Power Pose
- Point Up

### Trạng thái mặc định

Ronaldo chạy `Idle` liên tục.

### Khi nhận Hoa

1. Kích hoạt SIUUU.
2. Animation chạy một lần.
3. Hiển thị chữ `SIUUUU!`.
4. Phát âm thanh tương ứng.
5. Kích hoạt ánh sáng và particle.
6. Khi animation hoàn thành, quay lại Idle.

### Khi Ronaldo thắng

- Kích hoạt SIUUU.
- Tăng cường confetti.
- Khán đài phát sáng.
- Camera zoom.
- Hiển thị `RONALDO WINS!`

### Animation Controller

- Chuyển animation mượt.
- Sử dụng crossfade hợp lý.
- Không phát hai clip xung đột cùng một lúc.
- Có cooldown chống spam.
- Có animation queue.
- Không làm hỏng skeleton.
- Không làm Ronaldo bị chìm xuống mặt sân.
- Không để Ronaldo đứng sai hướng sau khi kết thúc.

### Lưu ý về SIUUU

File GLB đã có animation tên `SIUUU` dài khoảng 4,5 giây.

Hãy dùng animation này trước tiên.

Nếu animation chưa giống điệu Ronaldo thực tế, phải báo rõ mức độ khác biệt. Có thể bổ sung chuyển động procedural hoặc chỉnh sửa bản sao clip, nhưng không phá hủy dữ liệu gốc.

Không thay SIUUU bằng dance ngẫu nhiên.

Không được báo rằng animation giống 100% khi chưa kiểm tra trực quan.

---

# PHẦN 7 — HỆ THỐNG NHÂN VẬT MESSI

## 7.1. Tải mô hình

Sử dụng:

`/models/messi_2023_3d_free.glb`

Mô hình có:

- 34 joints.
- Skeleton kiểu Mixamo.
- Một animation `mixamo.com`.

Không giả định clip `mixamo.com` là animation ăn mừng.

## 7.2. Kiểm tra animation

Trước tiên:

1. Tải Messi thành công.
2. Chuẩn hóa scale và hướng đứng.
3. Chạy clip gốc trong màn hình Debug.
4. Xác định hành động thực tế của clip.
5. Quyết định có thể tái sử dụng hay không.

## 7.3. Tạo animation ăn mừng Messi

Vì mô hình Messi chưa có animation ăn mừng đã được xác nhận, hãy xây dựng ít nhất các hành động:

### Messi Idle

- Đứng yên.
- Nhún người nhẹ.
- Cử động đầu và tay tự nhiên.
- Lặp liên tục.

### Messi Celebrate

- Messi nâng hai tay.
- Ngẩng mặt lên trời.
- Giữ tư thế ăn mừng.
- Trở về Idle.

### Messi Victory

- Messi bước lên phía trước.
- Dang hai tay.
- Giơ tay ăn mừng.
- Hiển thị `MESSI WINS!`

### Messi Trophy Celebration (nếu khả thi)

- Triệu hồi mô hình cúp đơn giản dưới dạng hiệu ứng game.
- Messi nâng tay.
- Cúp bay lên hoặc xuất hiện phía trên tay.
- Confetti và ánh sáng xanh trắng.

Không cần thực hiện tương tác bàn tay với cúp ở mức độ phức tạp nếu hệ xương không hỗ trợ chính xác.

## 7.4. Yêu cầu điều khiển xương

Ưu tiên sử dụng bộ xương Mixamo có sẵn.

Tạo animation procedural hoặc keyframe cho các bone như:

- Hips
- Spine
- Head
- LeftArm
- RightArm
- LeftForeArm
- RightForeArm

Phải xác minh tên bone thực tế.

Không được sử dụng trực tiếp animation track của Ronaldo cho Messi vì hai skeleton khác nhau.

Nếu tạo chuyển động procedural, cần giữ nguyên rest pose và bind pose.

Không thay đổi bone transforms tùy tiện khiến mesh bị méo.

Nếu chưa đạt được animation chất lượng tốt, cần ưu tiên một động tác giơ tay ăn mừng đơn giản nhưng hoạt động chính xác.

Không đánh đổi độ ổn định để lấy chuyển động phức tạp.

---

# PHẦN 8 — GAMEPLAY CHÍNH

## Tên trò chơi

**RONALDO VS MESSI — LIVE GIFT BATTLE**

Hai đội:

- Team Ronaldo / CR7
- Team Messi / M10

Người xem tương tác qua quà tặng, bình luận và Follow.

## 8.1. Luật cơ bản

- Mỗi trận có 3 hiệp.
- Mỗi hiệp 120 giây, có thể chỉnh trong Dashboard.
- Đội có nhiều điểm hơn khi kết thúc hiệp sẽ thắng hiệp đó.
- Đội thắng nhiều hiệp hơn sẽ thắng trận.
- Nếu bằng điểm, hiển thị kết quả hòa hoặc cho phép cấu hình hiệp phụ.
- Bắt đầu trận mới sẽ reset các điểm của trận trước.

Game phải có các trạng thái:

- WAITING
- COUNTDOWN
- PLAYING
- PAUSED
- ROUND_END
- MATCH_END

Server là nguồn dữ liệu chính cho điểm số, timer và kết quả.

Không để mỗi client tự tính kết quả khác nhau.

---

# PHẦN 9 — TƯƠNG TÁC TIKTOK GIFT

Trước mắt xây dựng chế độ giả lập hoạt động hoàn chỉnh.

## 9.1. Mapping mặc định

| Sự kiện | Đội | Tác động |
|---|---|---|
| Rose / Hoa | Ronaldo | +10 điểm mỗi quà |
| Cookie / Bánh quy | Messi | +10 điểm mỗi quà |
| Follow | Theo đội đã chọn | Hiệu ứng chào mừng |
| Comment CR7 | Ronaldo | Chọn Team CR7 |
| Comment M10 | Messi | Chọn Team M10 |
| Like | Cả sân | Hiệu ứng khán giả |

Tên và ID quà thực tế có thể khác theo tài khoản hoặc khu vực. Bảng mapping phải chỉnh được trong Dashboard.

Không giả định rằng quà Bánh quy chắc chắn tồn tại trên tất cả TikTok LIVE.

## 9.2. Khi nhận Hoa

Ví dụ:

`@viewer123 gửi Rose x5`

Hệ thống thực hiện:

1. Xác định gift hợp lệ.
2. Cộng 50 điểm cho Ronaldo.
3. Hiển thị popup người gửi.
4. Chạy SIUUU nếu nhân vật đang sẵn sàng.
5. Nếu đang chạy animation, xử lý bằng hàng đợi hoặc gộp sự kiện.
6. Cập nhật thanh điểm theo thời gian thực.
7. Phát hiệu ứng âm thanh và ánh sáng.

## 9.3. Khi nhận Bánh quy

Ví dụ:

`@messi_fan gửi Cookie x3`

Hệ thống:

1. Cộng 30 điểm cho Messi.
2. Kích hoạt Messi Celebrate.
3. Hiển thị popup người gửi.
4. Phát hiệu ứng màu xanh.
5. Đồng bộ điểm lên Overlay.

## 9.4. Hệ thống chống tính điểm trùng

Đặc biệt quan trọng khi tích hợp TikTok LIVE thật.

TikTok có thể phát nhiều event khi người dùng tặng quà liên tiếp trong một streak.

Phải xử lý đúng:

- Event ID.
- Gift ID.
- User ID.
- Repeat count.
- Repeat end.
- Streak ID nếu có.
- Duplicate events.
- Reconnect.

Không cộng lại tổng repeat count của cả streak ở mỗi sự kiện trung gian.

Có thể hiển thị số quà đang tăng trong thời gian thực, nhưng điểm cuối phải được tính chính xác một lần.

Hỗ trợ idempotency và kiểm thử trường hợp quà gửi liên tiếp.

## 9.5. Gift Mapping Configuration

Tạo giao diện cho phép streamer cấu hình:

- Gift ID.
- Gift Name.
- Đội nhận.
- Điểm thưởng.
- Animation.
- Âm thanh.
- Hiệu ứng.
- Cooldown.

Lưu cấu hình cục bộ.

Không cần sửa code mỗi khi thay đổi quà TikTok.

---

# PHẦN 10 — HỆ THỐNG FOLLOW VÀ COMMENT

## 10.1. Follow

Khi có Follow:

- Hiển thị `Welcome @username`.
- Tạo hiệu ứng ngôi sao.
- Phát âm thanh chào mừng.
- Tăng số Follow thống kê.

Nếu người đó đã chọn đội, hiển thị màu tương ứng.

Nếu chưa chọn đội, hiển thị thông báo trung lập.

Không tự ý gán người Follow vào Ronaldo hoặc Messi khi chưa có thông tin.

## 10.2. Comment

Hỗ trợ:

- `CR7`
- `M10`
- `!cr7`
- `!m10`

Nếu người xem comment CR7, lưu họ thuộc Team Ronaldo.

Nếu comment M10, lưu họ thuộc Team Messi.

Nếu comment nhiều lần, không tính thành nhiều thành viên.

Có thể cho phép thay đổi đội khi cấu hình bật.

Hiển thị thông báo gia nhập đội nhưng giới hạn số thông báo để không gây spam màn hình.

---

# PHẦN 11 — COMBO SYSTEM

## 11.1. Cơ chế combo

Khi cùng một đội nhận nhiều gift trong khoảng thời gian ngắn:

- Combo x3: ánh sáng nhẹ.
- Combo x5: hiệu ứng đặc biệt.
- Combo x10: Celebration Boost.
- Combo x20: Ultimate Celebration.

Mặc định combo mang tính hình ảnh, không tự động nhân điểm thưởng để bảo đảm dễ hiểu.

Cho phép chỉnh luật trong cấu hình.

## 11.2. Animation Queue

Không được kích hoạt 30 animation cùng lúc khi 30 gift đến liên tiếp.

Thiết kế:

- Event Queue.
- Animation Priority.
- Cooldown.
- Combo Aggregation.
- Maximum Queue Length.
- Drop hoặc Merge policy.

Ví dụ:

Nếu Ronaldo đang thực hiện SIUUU, các Hoa mới vẫn cộng điểm ngay nhưng không làm animation bị ngắt giữa chừng.

Nếu có 20 sự kiện mới, gộp thành combo thay vì chạy liên tiếp 20 lần SIUUU.

---

# PHẦN 12 — SCOREBOARD VÀ GAME HUD

Thiết kế HUD rõ ràng trên điện thoại.

## Phía trên

- Logo RONALDO VS MESSI.
- ROUND 1/3.
- Đồng hồ.
- Team Ronaldo score.
- Team Messi score.
- Thanh sức mạnh hai đội.
- Trạng thái người đang dẫn điểm.

## Chính giữa

- Hai nhân vật 3D.
- Sân bóng.
- Chữ SIUUU.
- Hiệu ứng animation.
- Combo popup.
- Lead Changed popup.

## Phía dưới

- Rose = Ronaldo.
- Cookie = Messi.
- Gift feed.
- Thông báo Follow.
- Thông báo người gửi gift.

Không đặt chữ lên mặt nhân vật.

Text phải dễ đọc trên màn hình điện thoại.

Cho phép cấu hình ẩn bớt HUD.

---

# PHẦN 13 — TOP SUPPORTER

Tạo bảng xếp hạng người ủng hộ theo trận.

Có:

- Username.
- Team.
- Gift count.
- Tổng điểm đóng góp.
- Vị trí xếp hạng.

Hiển thị Top 3 ở cuối hiệp hoặc cuối trận.

Khi có người ủng hộ dẫn đầu mới, có thể hiển thị hiệu ứng nhỏ.

Không để dữ liệu người xem được nhập trực tiếp thành HTML gây lỗi XSS.

Không lưu trữ thông tin cá nhân không cần thiết.

---

# PHẦN 14 — HỆ THỐNG HIỆU ỨNG

## Ronaldo Effects

- Red aura.
- Golden particles.
- Light ring khi tiếp đất.
- Text SIUUUU!
- Confetti.
- Stadium flash.

## Messi Effects

- Blue aura.
- White light.
- Stars.
- Celebration particles.
- Text MESSI MAGIC!
- Confetti.

## Common Effects

- Round Start.
- Round End.
- Lead Changed.
- Combo.
- Victory.
- Draw.
- Countdown 10 giây.

Sử dụng hiệu ứng vừa đủ đẹp, không làm giảm FPS quá mạnh.

Có cấu hình giảm chất lượng VFX trên máy yếu.

---

# PHẦN 15 — ÂM THANH

Tạo Audio Manager.

Các loại âm thanh:

- UI Click
- Gift Received
- Combo
- Crowd Cheer
- Round Start
- Round End
- Victory
- SIUUU Sound
- Messi Celebration Sound

### Lưu ý

Không tự ý lấy âm thanh có bản quyền hoặc bản ghi giọng Ronaldo/Messi từ Internet.

Nếu chưa có audio phù hợp:

- Dùng Web Audio API tạo âm thanh hiệu ứng cơ bản.
- Cho phép streamer tải file âm thanh hợp lệ của mình vào thư mục audio.
- Hỗ trợ cấu hình đường dẫn file.
- Có Master Volume.
- Có Mute.
- Không phát chồng hàng chục âm thanh gây méo tiếng.

Âm thanh ăn mừng phải đồng bộ với animation.

Xử lý yêu cầu tương tác người dùng trước khi bật Web Audio trong trình duyệt.

---

# PHẦN 16 — KẾT NỐI TIKTOK LIVE

Thiết kế Event Adapter để thay thế nguồn sự kiện.

Có hai chế độ:

## Mock Mode

Hoạt động ngay khi chạy project.

Không cần tài khoản TikTok.

Không cần LIVE.

Dashboard có các nút mô phỏng:

- Rose x1.
- Rose x10.
- Cookie x1.
- Cookie x10.
- Follow.
- Comment CR7.
- Comment M10.
- Gift combo.
- Gift đặc biệt.
- Reset.

## TikTok Mode

Thiết kế khả năng kết nối TikTok LIVE thật.

Có thể nghiên cứu một thư viện Node.js TikTok LIVE connector đang được duy trì và tương thích với môi trường hiện tại.

Nếu sử dụng thư viện không chính thức:

- Kiểm tra README và API thực tế trước khi lập trình.
- Không giả định thư viện luôn hoạt động.
- Không hardcode cookie phiên đăng nhập.
- Không yêu cầu tài khoản hoặc token trong mã nguồn.
- Sử dụng file `.env` để lưu cấu hình.
- Không đưa secrets lên frontend.
- Không tự kết nối tài khoản TikTok nếu chưa được cấu hình.
- Có trạng thái Connected/Disconnected/Error.
- Có reconnect với backoff.
- Có logging lỗi.
- Có fallback Mock Mode.

Thiết kế interface dùng chung:

`LiveEventAdapter`

Các nguồn có thể bao gồm:

- MockEventAdapter
- TikTokLiveEventAdapter

Chuẩn hóa dữ liệu thành một cấu trúc nội bộ thống nhất.

Ví dụ các trường:

- eventId
- source
- timestamp
- eventType
- userId
- username
- giftId
- giftName
- giftCount
- repeatEnd
- team
- metadata

Kiểm tra dữ liệu đầu vào bằng schema.

Không để backend và frontend phụ thuộc trực tiếp vào cấu trúc nội bộ của thư viện TikTok.

**Quan trọng:** Hoàn thành Mock Mode hoạt động trước. Chỉ sau đó mới triển khai tích hợp TikTok thật.

Nếu không thể kiểm chứng kết nối LIVE thực tế, phải ghi rõ là chưa kiểm thử, không được báo đã hoàn thành kết nối thật.

---

# PHẦN 17 — QUẢN LÝ GAME STATE

Backend giữ state chính thức.

Gồm:

- Match ID
- Round
- Remaining time
- Ronaldo score
- Messi score
- Ronaldo combo
- Messi combo
- Team members
- Gift history
- Top supporters
- Match status
- Connection status

Sử dụng Socket.IO đồng bộ dữ liệu.

Khi mở lại Overlay, phải nhận state hiện tại.

Không reset trận đấu khi refresh trình duyệt.

Có thể lưu snapshot cục bộ để phục hồi khi backend khởi động lại.

Không cần triển khai database lớn.

Sử dụng JSON storage hoặc SQLite nếu thực sự phù hợp.

Phải có unit test cho tính điểm, timer, xử lý hiệp, combo và chống trùng gift.

---

# PHẦN 18 — TỐI ƯU MODEL VÀ HIỆU NĂNG

Hai file GLB có tỷ lệ khác nhau.

Ronaldo có bounding box hình học cao khoảng 3,37 đơn vị.

Messi có bounding box hình học trong hệ tọa độ scene khác biệt rõ rệt.

Phải xử lý:

- World transform.
- Root node rotation.
- Uniform scale.
- Character height normalization.
- Ground alignment.
- Animation root motion.
- Skeleton update.
- Bounding box sau khi nhân vật được dựng lên scene.

Không được chỉ đặt cùng scale=1 rồi giả định sẽ hiển thị đúng.

Không trực tiếp thay đổi tọa độ của từng vertex trong file gốc.

### Hiệu năng

- Mục tiêu 60 FPS trên desktop tương đối tốt.
- Giảm pixel ratio trên máy yếu.
- Hạn chế shadow resolution.
- Không tạo lại GLTFLoader mỗi frame.
- Không tải lại GLB mỗi lần nhận gift.
- Cache asset và animation.
- Sử dụng SkeletonUtils.clone khi cần clone skinned model.
- Không tạo animation mixer trùng lặp.
- Dispose những tài nguyên tạo động khi unmount.
- Tự giảm VFX nếu cần.

Có FPS/debug overlay chỉ trong Control Dashboard.

---

# PHẦN 19 — TRÁNH LỖI MÀN HÌNH TRỐNG

Đây là yêu cầu cực kỳ quan trọng.

Tôi từng gặp lỗi ứng dụng mở được nhưng chỉ hiển thị nền tối, không có nhân vật 3D.

Phải xử lý tận gốc:

1. Kiểm tra WebGL khởi tạo thành công.
2. Kiểm tra GLB URL.
3. Kiểm tra HTTP status.
4. Kiểm tra model thực sự được thêm vào scene.
5. Kiểm tra camera position.
6. Kiểm tra camera clipping.
7. Kiểm tra character scale.
8. Kiểm tra ánh sáng.
9. Kiểm tra shader/material lỗi.
10. Kiểm tra console errors.
11. Kiểm tra skeleton.
12. Kiểm tra model không nằm ngoài frustum.
13. Kiểm tra render loop.
14. Kiểm tra React Error Boundary.

Nếu asset không tải được, phải hiện thông báo lỗi cụ thể.

Không được âm thầm hiển thị một khung nền đen.

Không được dùng hình khối giả làm nhân vật để che lỗi GLB.

Nếu WebGL không chạy được trong môi trường kiểm thử, cần thông báo giới hạn và kiểm tra những phần có thể kiểm tra bằng cách khác.

---

# PHẦN 20 — KIỂM THỬ

Yêu cầu kiểm thử theo các giai đoạn.

## Phase 1 — Model Verification

- Xác minh hai GLB.
- Load Ronaldo.
- Load Messi.
- Hiển thị hai nhân vật.
- Kiểm tra texture.
- Kiểm tra vị trí đứng.
- Kiểm tra skeleton.

Không tiếp tục thêm hiệu ứng phức tạp nếu bước này chưa đạt.

## Phase 2 — Animation

- Ronaldo Idle chạy.
- Ronaldo SIUUU chạy.
- Ronaldo quay lại Idle.
- Messi chạy animation sẵn có.
- Messi có animation Idle.
- Messi có animation Celebrate.
- Không xuất hiện lỗi biến dạng nghiêm trọng.

## Phase 3 — Gameplay

- Mô phỏng Rose x1.
- Mô phỏng Rose x10.
- Mô phỏng Cookie x1.
- Mô phỏng Cookie x10.
- Cập nhật đúng điểm.
- Kiểm tra timer.
- Kiểm tra kết thúc hiệp.
- Kiểm tra thắng thua.
- Kiểm tra combo.
- Kiểm tra gift streak không bị tính trùng.

## Phase 4 — Real-time

- Mở Control Dashboard.
- Mở Overlay ở tab khác.
- Gửi gift giả lập.
- Hai màn hình cập nhật đồng thời.
- Refresh Overlay không reset trận đấu.
- Backend restart được xử lý hợp lý.

## Phase 5 — Giao diện

- Kiểm tra desktop.
- Kiểm tra 9:16.
- Kiểm tra nội dung không bị tràn.
- Kiểm tra camera không cắt nhân vật.
- Kiểm tra chữ có thể đọc trên điện thoại.
- Kiểm tra browser console.

## Phase 6 — Build

Chạy:

`npm run typecheck`

`npm run test`

`npm run build`

`npm run dev`

Nếu có lỗi, tự sửa và kiểm thử lại.

Nếu có browser automation thì chụp screenshot màn hình game sau khi render hoàn tất.

Không được khẳng định đã kiểm thử hình ảnh thực tế nếu không có browser/WebGL để quan sát.

---

# PHẦN 21 — LỆNH CHẠY VÀ HƯỚNG DẪN

Tạo các npm scripts phù hợp.

Người dùng chỉ cần mở terminal và chạy:

```powershell
cd C:\3d
npm install
npm run dev
```

Lệnh `npm run dev` phải khởi chạy các dịch vụ local cần thiết.

Ví dụ:

- Frontend: localhost:5173
- Backend: localhost:3001

Các URL:

- `/overlay`
- `/control`
- `/debug`

Có thể thay đổi port nếu bị chiếm, nhưng phải hiển thị URL thực tế.

Viết README tiếng Việt.

README cần có:

- Yêu cầu Node.js.
- Hướng dẫn cài.
- Hướng dẫn chạy.
- Hướng dẫn mở màn hình Overlay.
- Hướng dẫn mở Dashboard.
- Hướng dẫn mô phỏng quà.
- Hướng dẫn cấu hình gift.
- Hướng dẫn đưa Overlay vào OBS/TikTok LIVE Studio.
- Hướng dẫn xử lý màn hình trống.
- Hướng dẫn đặt file âm thanh hợp lệ.
- Trạng thái tích hợp TikTok thật.

---

# PHẦN 22 — GIẤY PHÉP VÀ TÀI NGUYÊN

File Messi có metadata giấy phép CC BY 4.0, nguồn Sketchfab.

Hãy tạo `ASSET_CREDITS.md` ghi rõ thông tin giấy phép, tác giả và nguồn được tìm thấy trong metadata.

Với Ronaldo, nếu file không chứa thông tin giấy phép, không tự khẳng định có quyền sử dụng thương mại.

Không tự ý tải logo, giọng nói hay bản nhạc có bản quyền.

Sử dụng tài nguyên có giấy phép phù hợp và ghi công khi cần.

---

# PHẦN 23 — TIÊU CHÍ HOÀN THÀNH BẮT BUỘC

Dự án chỉ được xem là hoàn thành phiên bản chính khi:

- [ ] Đã sử dụng đúng hai file GLB.
- [ ] Ronaldo và Messi hiển thị trên sân.
- [ ] Hai nhân vật đứng đúng tỷ lệ.
- [ ] Không mất texture.
- [ ] Ronaldo có thể SIUUU.
- [ ] Messi có thể ăn mừng bằng chuyển động phù hợp.
- [ ] Animation có thể quay lại trạng thái Idle.
- [ ] Có sân vận động 3D.
- [ ] Có giao diện 9:16.
- [ ] Có bảng điểm hai đội.
- [ ] Có timer và hệ thống round.
- [ ] Có mô phỏng Rose và Cookie.
- [ ] Có Follow và Comment mô phỏng.
- [ ] Có combo.
- [ ] Có màn hình kết quả.
- [ ] Có hiệu ứng hình ảnh.
- [ ] Có hệ thống âm thanh.
- [ ] Có Control Dashboard.
- [ ] Có Overlay riêng.
- [ ] Hai màn hình đồng bộ dữ liệu.
- [ ] Không còn lỗi TypeScript hoặc lỗi build.
- [ ] Có README hướng dẫn.

TikTok LIVE thật được xem là phần tích hợp riêng. Không được đánh đồng Mock Mode với kết nối LIVE thành công.

---

# PHẦN 24 — CÁCH BẠN PHẢI THỰC HIỆN

Làm việc theo thứ tự:

**Ưu tiên 1:** Phân tích asset và dựng thành công cả hai nhân vật.

**Ưu tiên 2:** Điều khiển animation SIUUU của Ronaldo và tạo animation Celebrate cho Messi.

**Ưu tiên 3:** Tạo sân bóng 3D và camera.

**Ưu tiên 4:** Tạo giao diện 9:16 đẹp và dễ đọc.

**Ưu tiên 5:** Tạo hệ thống game state, điểm, timer, round.

**Ưu tiên 6:** Mô phỏng Gift/Follow/Comment và đồng bộ Socket.IO.

**Ưu tiên 7:** Combo, hiệu ứng, âm thanh và màn hình chiến thắng.

**Ưu tiên 8:** Chuẩn bị và thử tích hợp TikTok LIVE thật khi có cấu hình phù hợp.

**Ưu tiên 9:** Kiểm thử, tối ưu và hoàn thiện README.

Không dừng sau khi lập kế hoạch.

Không chỉ đưa ví dụ code.

Không tạo giao diện có nút nhưng nút không hoạt động.

Không bỏ qua animation Messi.

Không tự thay nhân vật bằng placeholder khi gặp lỗi.

Không yêu cầu người dùng dựng 3D thủ công.

Chủ động cài dependency, tạo project, viết code, chạy test và sửa lỗi trong phạm vi môi trường cho phép.

Nếu gặp lỗi ở một giai đoạn, ưu tiên sửa hoàn chỉnh giai đoạn đó trước khi chuyển sang giai đoạn tiếp theo.

## KẾT QUẢ CẦN BÁO CÁO

Khi hoàn thành, báo cáo:

1. Các file mã nguồn đã tạo.
2. Kết quả phân tích chính xác hai GLB.
3. Animation đã hoạt động.
4. Tính năng gameplay đã hoạt động.
5. Tình trạng kết nối TikTok.
6. Kết quả kiểm thử.
7. Các giới hạn kỹ thuật còn lại.
8. Lệnh chạy trên Windows.

**BẮT ĐẦU NGAY. HÃY KIỂM TRA HAI FILE GLB TẠI `C:\3d` VÀ TRIỂN KHAI TRÒ CHƠI RONALDO VS MESSI TIKTOK LIVE BATTLE THÀNH MỘT ỨNG DỤNG WEB 3D CHẠY ĐƯỢC THỰC SỰ.**
