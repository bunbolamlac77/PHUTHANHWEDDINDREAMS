# 📜 RULES – QUY TẮC BẮT BUỘC CHO AI KHI LÀM VIỆC VỚI DỰ ÁN NÀY
**Dự án:** PhuThanh Wedding Dreams PWA  
**Áp dụng cho:** Bất kỳ AI assistant nào (Gemini, Claude, Copilot, ChatGPT, v.v.) được yêu cầu đọc, sửa đổi, hoặc tạo code cho dự án này.  
**Ngày ban hành:** 2026-04-02

---

## ⚠️ QUAN TRỌNG: ĐỌC KỸ TRƯỚC KHI THỰC HIỆN BẤT KỲ TÁC VỤ NÀO

Trước khi viết bất kỳ dòng code nào, AI PHẢI đọc đủ 4 file tài liệu sau:
1. `docs/PRD.md` – Yêu cầu chức năng và phạm vi dự án
2. `docs/ARCHITECTURE.md` – Kiến trúc kỹ thuật và cấu trúc thư mục
3. `docs/DESIGN_SYSTEM.md` – Quy chuẩn giao diện và màu sắc
4. `docs/DATA_SCHEMA.md` – Cấu trúc dữ liệu và logic nghiệp vụ

---

## 🔴 ĐIỀU CẤM TUYỆT ĐỐI (HARD RULES – KHÔNG ĐƯỢC VI PHẠM)

### R001 – Không hiển thị thông tin ngân hàng trong ảnh báo giá
```
❌ KHÔNG BAO GIỜ render: STK ngân hàng, QR Code, tên ngân hàng,
   bất kỳ thông tin thanh toán nào vào trong thẻ div#quote-export-node.
   
✅ Thông tin ngân hàng (nếu có) chỉ hiển thị ở UI thông thường,
   KHÔNG xuất hiện trong ảnh PNG được tạo bởi html2canvas.
```

### R002 – Không thêm backend hoặc API bên ngoài
```
❌ KHÔNG đề xuất hoặc implement: REST API, GraphQL, fetch() đến server bên ngoài,
   Firebase, Supabase, Google Sheets, hoặc bất kỳ cloud service nào.
   
✅ Toàn bộ dữ liệu chỉ được lưu trong LocalStorage của trình duyệt.
   App hoạt động 100% offline.
```

### R003 – Không thay đổi Tech Stack không được phép
```
❌ KHÔNG tự ý thêm: Redux, Zustand, MobX, React Query, Axios, TypeScript (trừ khi type hints),
   styled-components, Emotion, CSS Modules, Bootstrap, Material UI, Ant Design, hay bất kỳ
   UI component library nào không được liệt kê trong ARCHITECTURE.md.
   
✅ Stack được phép: React 18, Vite, Tailwind CSS v3, html2canvas, vite-plugin-pwa.
```

### R004 – Không thêm Light Mode
```
❌ KHÔNG implement giao diện sáng (light theme). Không thêm toggle theme.
✅ App luôn dùng Dark Theme như đã định nghĩa trong DESIGN_SYSTEM.md.
```

### R005 – Không bỏ qua Safe Area iOS
```
❌ KHÔNG đặt nội dung hay nút bấm mà không tính đến:
   - env(safe-area-inset-top) cho Dynamic Island (min 59px)
   - env(safe-area-inset-bottom) cho Home Indicator (min 34px)
   
✅ Mọi layout PHẢI có padding/margin tương ứng với CSS env() variables.
```

### R006 – Không dùng font mặc định hệ thống
```
❌ KHÔNG để font-family là browser default (Times New Roman, serif mặc định).
✅ PHẢI dùng "Be Vietnam Pro" từ Google Fonts như đã định nghĩa trong DESIGN_SYSTEM.md.
```

### R007 – Không format tiền tệ sai
```
❌ KHÔNG hiển thị giá trị tiền tệ dạng: "2800000", "$2,800,000", "2800000 VND".
✅ BẮT BUỘC dùng: amount.toLocaleString('vi-VN') + ' đ' → "2.800.000 đ"
```

---

## 🟡 QUY TẮC QUAN TRỌNG (SHOULD RULES – CẦN TUÂN THỦ TRONG MỌI TRƯỜNG HỢP)

### R008 – Luôn giữ đúng cấu trúc thư mục
```
Mọi file mới PHẢI được đặt đúng vị trí theo cấu trúc trong ARCHITECTURE.md:
- Components UI tái sử dụng → src/components/ui/
- Layout components → src/components/layout/
- Các trang chính → src/pages/[TenTrang]/
- Hooks tùy chỉnh → src/hooks/
- Utilities/helpers → src/utils/
```

### R009 – Luôn dùng màu từ Design System
```
Không tự ý đặt màu hex mới. Chỉ dùng màu đã định nghĩa trong DESIGN_SYSTEM.md.
Ưu tiên dùng Tailwind class đã custom (pt-base, pt-surface, pt-gold, v.v.)
Nếu cần màu mới, phải thêm vào tailwind.config.js với tên có tiền tố "pt-".
```

### R010 – Mọi Input tiền tệ phải có input mask
```
Các input nhập số tiền (giá dịch vụ, tiền cọc, giảm giá) PHẢI:
1. Hiển thị dấu phẩy phân cách hàng nghìn real-time khi gõ
2. Lưu vào state dạng số nguyên thuần tuý (không có dấu phẩy)
3. Dùng pattern: value.replace(/\D/g, '') để parse
```

### R011 – Touch target tối thiểu 44x44px
```
Mọi element tương tác (button, checkbox, link) PHẢI có touch area tối thiểu 44x44px.
Custom Checkbox trong checklist tiến độ: 24x24px visual, nhưng wrap trong div 44x44px.
```

### R012 – Mọi nút bấm phải có micro-animation
```
Tất cả <button> PHẢI có:
- className="... active:scale-95 transition-transform duration-100"
- Không được bỏ qua effect này kể cả với nút nhỏ
```

### R013 – Không zoom khi focus input
```
Mọi <input> và <textarea> PHẢI có font-size >= 16px để Safari iOS không tự zoom.
Đây là yêu cầu bắt buộc của Apple.
```

### R014 – Confirm trước khi thực hiện hành động nguy hiểm
```
Các hành động nguy hiểm PHẢI có xác nhận:
- Xóa show: Double-confirm (hỏi 2 lần) hoặc Dialog rõ ràng
- Restore backup: window.confirm với cảnh báo rõ ràng
- Xóa dịch vụ đang được dùng: Từ chối và thông báo lý do
```

### R015 – Timestamp đồng bộ chuẩn
```
Tất cả trường timestamp (createdAt, updatedAt, exportedAt) PHẢI dùng:
new Date().toISOString() → "2026-04-02T11:05:00.000Z"
KHÔNG dùng Date.now() hay getTime() cho trường ngày giờ hiển thị.
```

---

## 🟢 HƯỚNG DẪN SỬ DỤNG CHO AI (HOW TO WORK)

### Khi được yêu cầu thêm tính năng mới:
1. **Kiểm tra PRD.md:** Tính năng có trong In-Scope không? Nếu không, hỏi người dùng trước.
2. **Kiểm tra DATA_SCHEMA.md:** Có cần thêm field nào vào schema không? Cẩn thận với backward compatibility.
3. **Kiểm tra DESIGN_SYSTEM.md:** Dùng màu và component nào phù hợp?
4. **Kiểm tra ARCHITECTURE.md:** Đặt file ở đâu? Hook mới hay context mới?

### Khi được yêu cầu sửa lỗi:
1. Đọc error message hoặc mô tả lỗi kỹ.
2. Xác định lỗi thuộc layer nào (Data / State / UI / PWA).
3. Fix tối thiểu cần thiết, không refactor toàn bộ file nếu không được yêu cầu.

### Khi được yêu cầu thêm dịch vụ mặc định:
```
Thêm vào DEFAULT_SERVICES trong hooks/useServices.js theo đúng ServiceObject schema.
ID format: "SV-XXXXXX" (6 chữ số).
```

### Khi được yêu cầu thay đổi UI/layout:
```
1. Không được xóa padding safe-area.
2. Không được thay đổi z-index của Tab Bar (z-30) và Bottom Sheet (z-50).
3. Mọi thay đổi vùng hiển thị phải test với bàn phím ảo iOS (viewport < 600px height).
```

---

## 📋 CHECKLIST TRƯỚC KHI SUBMIT CODE

Trước khi hoàn thành một task, AI PHẢI tự kiểm tra:

- [ ] Có vi phạm R001 (ngân hàng trong báo giá) không?
- [ ] Có vi phạm R002 (backend/API ngoài) không?
- [ ] Tiền tệ có format `.toLocaleString('vi-VN') + ' đ'` đúng chưa?
- [ ] Có `active:scale-95 transition-transform` trên mọi button chưa?
- [ ] Input tiền tệ có font-size >= 16px chưa?
- [ ] Safe area inset có được áp dụng đúng chưa?
- [ ] File mới có đặt đúng thư mục theo ARCHITECTURE.md chưa?
- [ ] Màu sắc mới có được thêm vào tailwind.config.js chưa?
- [ ] ID mới (service/show) có đúng format chưa?
- [ ] Hành động nguy hiểm có confirm chưa?

---

## 📌 GHI CHÚ VỀ DỮ LIỆU MẶC ĐỊNH

Khi khởi tạo lần đầu (LocalStorage trống), app PHẢI tự động seed:

**Default Settings:**
```json
{
  "studioName": "PhuThanh Wedding Dreams",
  "studioAddress": "Phường Tân Hạnh, Vĩnh Long",
  "studioPhone": "0901234567",
  "slogan": "Lưu giữ khoảnh khắc trọn vẹn"
}
```

**Default Services (3 gói mẫu để app không rỗng ngay khi mở):**
- SV-646718: Truyền Thống Cưới – 2.800.000đ
- SV-486660: Gói Trọn Vẹn Cảm Xúc (Combo 02 Thợ) – 4.800.000đ
- SV-309191: Quay Phim Phóng Sự Hành Trình – 3.500.000đ

**Default Shows:** `[]` (mảng rỗng, không seed show mẫu)

---

## 🗂️ THAM CHIẾU TÀI LIỆU

| Tài liệu | Mô tả | Đọc khi nào |
|---|---|---|
| `docs/PRD.md` | Yêu cầu sản phẩm, user flows, scope | Trước khi thêm/sửa tính năng |
| `docs/ARCHITECTURE.md` | Stack, cấu trúc thư mục, patterns | Khi tạo file mới hoặc refactor |
| `docs/DESIGN_SYSTEM.md` | Màu, font, component specs | Khi làm việc với UI/CSS |
| `docs/DATA_SCHEMA.md` | Schema JSON, logic tính toán | Khi làm việc với data/state |
| `docs/RULES.md` | File này – Quy tắc AI | Đọc ĐẦU TIÊN, luôn luôn |
