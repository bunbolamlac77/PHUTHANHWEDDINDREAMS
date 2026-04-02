# 📱 PRD – Ứng Dụng PWA Quản Lý Show & Tạo Báo Giá Nhiếp Ảnh
**Tên dự án:** PhuThanh Wedding Dreams  
**Phiên bản tài liệu:** v1.0  
**Ngày tạo:** 2026-04-02  
**Môi trường đích:** Apple iPhone 14 Pro Max – Safari Standalone (PWA)  
**Viewport:** 430 × 932 px  

---

## 1. TỔNG QUAN DỰ ÁN

### 1.1. Bối cảnh & Vấn đề cần giải quyết
PhuThanh Wedding Dreams là studio nhiếp ảnh cá nhân chuyên chụp ảnh cưới, sự kiện. Người sử dụng (chủ studio) cần một công cụ **nhanh – gọn – không cần internet** để:
- Tạo báo giá chuyên nghiệp ngay trước mặt khách hoặc khi chat qua Zalo/Messenger.
- Theo dõi tất cả các buổi chụp (show) theo dạng CRM thu gọn.
- Kiểm soát dòng tiền (cọc, tổng, còn lại).
- Export ảnh báo giá đẹp để gửi khách lập tức.

### 1.2. Người dùng mục tiêu (Persona)
| Thuộc tính | Giá trị |
|---|---|
| Tên | Chủ studio PhuThanh |
| Thiết bị | iPhone 14 Pro Max |
| Trình duyệt | Safari (Add to Home Screen) |
| Cách dùng | Di động, 1 tay, thường đứng hoặc di chuyển |
| Kỹ năng kỹ thuật | Trung bình – không muốn đọc tài liệu |

### 1.3. Mục tiêu kinh doanh
1. **Tốc độ:** Tạo báo giá trong < 30 giây.
2. **Chuyên nghiệp:** Ảnh báo giá có logo, thông tin studio đầy đủ.
3. **Kiểm soát:** Không bỏ sót show, không quên thu tiền cọc.
4. **Độ tin cậy:** Chạy offline 100%, dữ liệu không bao giờ mất khi tắt app.

---

## 2. PHẠM VI CHỨC NĂNG (SCOPE)

### ✅ IN SCOPE – Bắt buộc phải có
| STT | Chức năng | Mô tả |
|---|---|---|
| F01 | Tạo báo giá | Nhập thông tin → Xem trước realtime → Xuất ảnh |
| F02 | Lưu show mới | Push dữ liệu vào LocalStorage với trạng thái mặc định |
| F03 | Quản lý danh sách show | Filter theo trạng thái, xem card chi tiết |
| F04 | Cập nhật tiến độ show | Checklist 4 bước: Cọc → Chụp → Thu tiền → Giao file |
| F05 | Cài đặt studio | Quản lý tên, địa chỉ, logo, SDT studio |
| F06 | Quản lý bảng giá | Thêm/sửa/xóa dịch vụ và quyền lợi đi kèm |
| F07 | Backup & Restore | Xuất file JSON, khôi phục dữ liệu từ file |
| F08 | PWA Offline | Chạy hoàn toàn không cần mạng sau khi cài |
| F09 | Ảnh báo giá đẹp | Dùng html2canvas export khung preview thành PNG |
| F10 | Chia sẻ native iOS | Dùng Web Share API để share qua Zalo/iMessage |

### ❌ OUT OF SCOPE – Không phát triển trong phiên bản này
- Hệ thống đăng nhập / xác thực người dùng (không cần thiết, 1 người dùng).
- Đồng bộ dữ liệu lên Cloud (không có backend).
- Báo cáo thống kê doanh thu phức tạp (chart, graph).
- Thông tin QR Code / tài khoản ngân hàng trong ảnh báo giá.
- Chức năng gửi email/SMS tự động.
- Đa ngôn ngữ (chỉ Tiếng Việt).

---

## 3. LUỒNG NGƯỜI DÙNG CHI TIẾT (USER FLOWS)

### 3.1. Flow: Tạo Báo Giá & Gửi Khách
```
Mở app
  └─► Tab "Báo Giá" (Tab giữa, mặc định)
        ├─► Nhập Tên khách hàng
        ├─► Chọn Ngày chụp (native date picker)
        ├─► Bấm "Chọn gói" → Bottom Sheet mở ra
        │     └─► Tick ✓ các gói dịch vụ → Bấm "Xong"
        ├─► (Tuỳ chọn) Nhập số tiền giảm giá
        ├─► Preview realtime xuất hiện tức thì
        ├─► Bấm "📸 Xuất Ảnh" → Capture canvas → Web Share API
        └─► Bấm "💾 Lưu Show" → Lưu vào phuthanh_shows → Toast thành công
```

### 3.2. Flow: Cập Nhật Trạng Thái Show
```
Tab "Show Manager"
  └─► Xem danh sách show (filter nếu cần)
        └─► Chạm vào 1 card show
              └─► Bottom Sheet trượt lên (70% height)
                    ├─► Xem thông tin tổng quan
                    ├─► Tick: "Đã cọc" → Nhập số tiền cọc → Hệ thống tính "còn lại"
                    ├─► Tick: "Hoàn tất chụp"
                    ├─► Tick: "Đã thu đủ tiền" → Còn lại = 0đ
                    ├─► Tick: "Đã giao file" → Show chuyển sang trạng thái Done
                    └─► (Nguy hiểm) Bấm "Xóa Show" → Confirm lần 2 → Xóa
```

### 3.3. Flow: Thêm Dịch Vụ Mới
```
Tab "Cài Đặt"
  └─► Section "Bảng giá"
        └─► Bấm FAB "(+)"
              └─► Modal mở ra toàn màn hình
                    ├─► Nhập Tên dịch vụ
                    ├─► Nhập Giá (có input mask tự động phẩy)
                    ├─► Chọn Danh mục (wedding / portrait / event / other)
                    ├─► Nhập Quyền lợi (mỗi dòng = 1 bullet point)
                    └─► Bấm "Lưu" → Push vào phuthanh_services → Đóng modal
```

---

## 4. YÊU CẦU CHI TIẾT TỪNG MODULE

### 4.1. Module Cài Đặt (Settings Tab)
**Header:** "Cấu Hình Hệ Thống"

**Section A – Thông tin Studio:**
- Upload Logo: Khung tỉ lệ 1:1, chạm mở Camera Roll. Ảnh nén xuống < 200KB qua Canvas API, lưu Base64 vào LocalStorage.
- Input: Tên Studio, Địa chỉ, Số điện thoại, Slogan.
- Lưu tự động khi `onChange` (không cần nút Save riêng).

**Section B – Bảng giá:**
- List view các dịch vụ: Icon ✏️ (sửa) và 🗑️ (xóa đỏ).
- FAB "+" mở Modal thêm/sửa dịch vụ toàn màn hình.
- Mỗi dịch vụ có: `id`, `name`, `price`, `category`, `deliverables[]`.

**Section C – Quản trị Dữ liệu:**
- Nút "Xuất Backup": Tạo file `PhuThanh_Backup_DDMMYYYY.json` via Blob API.
- Nút "Khôi phục": `input[type="file"]` → đọc JSON → Alert xác nhận → ghi đè LocalStorage.

### 4.2. Module Tạo Báo Giá (Quote Maker Tab)
**Khối Form (40% trên):**
- Input: Tên khách hàng, Ngày chụp (`type="date"`).
- Multi-select gói: Bottom Sheet với checkbox list từ `phuthanh_services`.
- Input giảm giá: Nhập số tiền hoặc %. Auto tính `finalAmount`.

**Khối Preview Realtime (50% giữa):**
- `div#quote-export-node` – tỉ lệ 4:5 hoặc 1:1.
- Hiển thị: Logo → Tên Studio → "BẢNG BÁO GIÁ" → Tên/Ngày khách → Bảng dịch vụ/quyền lợi → Tổng nổi bật.
- ⚠️ **TUYỆT ĐỐI KHÔNG** render thông tin ngân hàng, STK, QR Code vào khung này.

**Action Bar (fixed bottom, trên Tab Bar):**
- **"📸 Xuất Ảnh"**: html2canvas → PNG → `navigator.share()` (Web Share API).
- **"💾 Lưu Show Mới"**: Tạo object show, push vào `phuthanh_shows`, reset form, toast "Đã lưu!".

### 4.3. Module Quản Lý Show (Show Manager Tab)
**Filter Pills (cuộn ngang):**
`Tất cả` | `Chờ cọc` | `Đã cọc` | `Chờ giao file` | `Hoàn tất`

**Show Cards:**
- Dòng 1: Tên cặp đôi (bold).
- Dòng 2: Ngày chụp (đỏ/cam nếu trong vòng 7 ngày).
- Dòng 3: Tổng tiền – định dạng VND.
- Dòng 4: Badge trạng thái màu tương ứng.
- `border-left: 4px` đổi màu theo tiến độ xa nhất đã đạt.

**Bottom Sheet Chi Tiết (70% height, slide-up):**
- Tóm tắt: Tên, ngày, địa điểm, dịch vụ đã chọn, tổng tiền.
- Checklist 4 bước (Custom Checkbox 24×24px):
  1. Xác nhận đã cọc → Nhập số tiền cọc → Hiển thị "Còn lại".
  2. Hoàn tất bấm máy.
  3. Đã nhận đủ tiền → Còn lại = 0đ.
  4. Đã giao toàn bộ file → Show → Done (làm mờ/xuống đáy).
- **Nút Xóa** (chữ đỏ, tách biệt): Double-confirm trước khi xóa.

---

## 5. YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL REQUIREMENTS)

| Loại | Yêu cầu |
|---|---|
| **Hiệu năng** | Khởi động app < 2 giây (từ Home Screen). Preview cập nhật < 100ms sau khi gõ. |
| **Offline** | 100% chức năng hoạt động không cần internet sau khi install. |
| **Dung lượng** | Logo sau nén < 200KB. Tổng dữ liệu LocalStorage < 5MB. |
| **Accessibility** | Touch target tối thiểu 44×44px (Apple HIG). |
| **Bảo mật** | Không gửi dữ liệu ra ngoài. Không có API call đến server bên ngoài. |
| **Tương thích** | Safari iOS 16+. Không yêu cầu hỗ trợ Android/Desktop. |

---

## 6. TIÊU CHÍ HOÀN THÀNH (DEFINITION OF DONE)

- [ ] Tất cả F01–F10 đã implement và test thủ công trên iPhone.
- [ ] PWA đã có thể "Add to Home Screen" và mở standalone.
- [ ] Dữ liệu tồn tại sau khi tắt/mở lại app.
- [ ] Ảnh báo giá export ra có chất lượng >= 1x resolution.
- [ ] Web Share API gọi được bảng chia sẻ native iOS.
- [ ] Backup JSON có thể restore đầy đủ không lỗi.
- [ ] Không có console.error khi dùng app bình thường.
