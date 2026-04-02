# 🗃️ DATA SCHEMA – PHUTHANH WEDDING DREAMS PWA
**Phiên bản:** v1.0 | **Ngày cập nhật:** 2026-04-02  
**Storage Engine:** Browser LocalStorage (JSON serialized)

---

## 1. TỔNG QUAN HỆ THỐNG LƯU TRỮ

```
LocalStorage
├── "phuthanh_settings"   → Object (1 bản ghi duy nhất)
├── "phuthanh_services"   → Array<ServiceObject>
└── "phuthanh_shows"      → Array<ShowObject>
```

> **Giới hạn:** LocalStorage Safari iOS tối đa ~5MB. Logo Base64 thường ~100-200KB. Cần monitor tổng dung lượng.

---

## 2. SCHEMA: `phuthanh_settings`

**LocalStorage Key:** `"phuthanh_settings"`  
**Kiểu dữ liệu:** `Object`

```typescript
interface Settings {
  studioName: string;       // Tên studio
  studioAddress: string;    // Địa chỉ đầy đủ
  studioPhone: string;      // Số điện thoại (chuỗi, giữ format)
  studioEmail?: string;     // Email liên hệ (tuỳ chọn)
  studioLogo: string;       // Base64 string (data:image/jpeg;base64,...)
  slogan?: string;          // Slogan ngắn hiển thị trên báo giá
  updatedAt: string;        // ISO 8601 timestamp lần cập nhật cuối
}
```

**Giá trị mặc định (DEFAULT_SETTINGS):**
```json
{
  "studioName": "PhuThanh Wedding Dreams",
  "studioAddress": "Phường Tân Hạnh, Vĩnh Long",
  "studioPhone": "0901234567",
  "studioEmail": "",
  "studioLogo": "",
  "slogan": "Lưu giữ khoảnh khắc trọn vẹn",
  "updatedAt": "2026-04-02T00:00:00"
}
```

**Quy tắc:**
- `studioLogo` PHẢI là chuỗi Base64 hoặc chuỗi rỗng `""`. Không lưu URL.
- `studioPhone` lưu dưới dạng string, không parse số. Ví dụ: `"0901 234 567"`.
- Mọi thay đổi trong Settings Page → ghi đè toàn bộ object ngay lập tức (onChange).

---

## 3. SCHEMA: `phuthanh_services`

**LocalStorage Key:** `"phuthanh_services"`  
**Kiểu dữ liệu:** `Array<ServiceObject>`

```typescript
interface ServiceObject {
  id: string;               // Format: "SV-XXXXXX" (6 chữ số ngẫu nhiên)
  name: string;             // Tên gói dịch vụ
  price: number;            // Đơn giá (VND, số nguyên, không có dấu phẩy)
  category: ServiceCategory;// Danh mục
  deliverables: string[];   // Mảng quyền lợi (mỗi dòng = 1 phần tử)
  createdAt: string;        // ISO 8601 timestamp
  updatedAt: string;        // ISO 8601 timestamp
}

type ServiceCategory = "wedding" | "portrait" | "event" | "prenuptial" | "other";
```

**Ví dụ dữ liệu:**
```json
[
  {
    "id": "SV-646718",
    "name": "Truyền Thống Cưới",
    "price": 2800000,
    "category": "wedding",
    "deliverables": [
      "Album 100 ảnh 13x18 High Quality",
      "01 Ảnh lớn treo tường 40x60cm",
      "Tự tay chọn hình và lồng ảnh",
      "File gốc chỉnh sửa đầy đủ"
    ],
    "createdAt": "2026-01-01T00:00:00",
    "updatedAt": "2026-01-01T00:00:00"
  },
  {
    "id": "SV-486660",
    "name": "Gói Trọn Vẹn Cảm Xúc (Combo 02 Thợ)",
    "price": 4800000,
    "category": "wedding",
    "deliverables": [
      "Album Photobook Cao Cấp 25x35cm (150 ảnh)",
      "02 Ảnh lớn treo tường 40x60cm",
      "01 Tranh Canvas 60x90cm",
      "File gốc + USB lưu trữ"
    ],
    "createdAt": "2026-01-01T00:00:00",
    "updatedAt": "2026-01-01T00:00:00"
  },
  {
    "id": "SV-309191",
    "name": "Quay Phim Phóng Sự Hành Trình",
    "price": 3500000,
    "category": "wedding",
    "deliverables": [
      "Video dài 3-5 phút (Highlight)",
      "Video đầy đủ hành trình không cắt",
      "Nhạc nền theo yêu cầu",
      "Giao qua Google Drive trong 7-10 ngày"
    ],
    "createdAt": "2026-01-01T00:00:00",
    "updatedAt": "2026-01-01T00:00:00"
  }
]
```

**Quy tắc:**
- `price` lưu dạng số nguyên thuần tuý: `2800000`, không phải `"2.800.000"`.
- `deliverables` là `string[]`. Khi nhập trong textarea, split theo `\n`.
- `id` tạo bằng hàm: `"SV-" + Math.floor(Math.random() * 900000 + 100000)`.
- Xóa dịch vụ: Filter ra array mới, lưu lại. Không hard-delete.
- **Không cho phép** xóa dịch vụ đang được liên kết trong bất kỳ show nào (hiển thị cảnh báo).

---

## 4. SCHEMA: `phuthanh_shows`

**LocalStorage Key:** `"phuthanh_shows"`  
**Kiểu dữ liệu:** `Array<ShowObject>`

```typescript
interface ShowObject {
  id: string;                    // Format: "SH-{Unix timestamp}"
  customerName: string;          // Tên cặp đôi / khách hàng
  phone: string;                 // SĐT liên hệ (string, giữ format)
  eventDate: string;             // Format: "YYYY-MM-DD" (ISO date)
  location: string;              // Địa điểm chụp
  selectedServices: string[];    // Mảng các Service ID đã chọn
  totalAmount: number;           // Tổng cộng trước giảm giá (số nguyên VND)
  discount: number;              // Số tiền giảm giá (nếu là %, convert sang số)
  finalAmount: number;           // Tổng sau giảm giá = totalAmount - discount
  depositAmount: number;         // Số tiền đã cọc
  remainingAmount: number;       // Còn lại = finalAmount - depositAmount
  note?: string;                 // Ghi chú thêm (tuỳ chọn)
  status: ShowStatus;            // Object 4 cờ trạng thái
  createdAt: string;             // ISO 8601 timestamp tạo
  updatedAt: string;             // ISO 8601 timestamp cập nhật cuối
}

interface ShowStatus {
  isDeposited: boolean;    // Đã cọc tiền
  isShot: boolean;         // Đã hoàn tất chụp
  isFullyPaid: boolean;    // Đã thu đủ 100%
  isDelivered: boolean;    // Đã giao toàn bộ file/ảnh
}
```

**Ví dụ dữ liệu:**
```json
[
  {
    "id": "SH-1704153000",
    "customerName": "Nguyễn Văn A & Trần Thị B",
    "phone": "0901234567",
    "eventDate": "2026-05-15",
    "location": "Vĩnh Long – Hội trường ABC",
    "selectedServices": ["SV-646718", "SV-309191"],
    "totalAmount": 6300000,
    "discount": 300000,
    "finalAmount": 6000000,
    "depositAmount": 2000000,
    "remainingAmount": 4000000,
    "note": "Khách yêu cầu chụp từ 6h sáng, có chụp thêm lễ gia tiên",
    "status": {
      "isDeposited": true,
      "isShot": false,
      "isFullyPaid": false,
      "isDelivered": false
    },
    "createdAt": "2026-04-02T11:05:00",
    "updatedAt": "2026-04-02T11:05:00"
  },
  {
    "id": "SH-1704950000",
    "customerName": "Lê Minh C & Phạm Thị D",
    "phone": "0977665544",
    "eventDate": "2026-06-20",
    "location": "Long Xuyên, An Giang",
    "selectedServices": ["SV-486660"],
    "totalAmount": 4800000,
    "discount": 0,
    "finalAmount": 4800000,
    "depositAmount": 0,
    "remainingAmount": 4800000,
    "note": "",
    "status": {
      "isDeposited": false,
      "isShot": false,
      "isFullyPaid": false,
      "isDelivered": false
    },
    "createdAt": "2026-04-01T09:30:00",
    "updatedAt": "2026-04-01T09:30:00"
  }
]
```

---

## 5. LOGIC TÍNH TOÁN TÀI CHÍNH

```javascript
// Tất cả công thức tính toán PHẢI tuân thủ pattern này

// Khi chọn dịch vụ:
const totalAmount = selectedServices.reduce((sum, serviceId) => {
  const service = services.find(s => s.id === serviceId);
  return sum + (service?.price ?? 0);
}, 0);

// Khi áp dụng discount:
// discount có thể là số tiền (>= 1000) hoặc phần trăm (< 100)
const finalAmount = discountType === 'amount'
  ? Math.max(0, totalAmount - discount)
  : Math.max(0, totalAmount - Math.round(totalAmount * discount / 100));

// Khi cập nhật cọc:
const remainingAmount = finalAmount - depositAmount;

// Khi isFullyPaid = true:
// depositAmount = finalAmount, remainingAmount = 0
```

---

## 6. LOGIC TRẠNG THÁI & MÀU (STATUS MAPPING)

```javascript
// Xác định trạng thái hiển thị từ object status
function getShowDisplayStatus(status) {
  if (status.isDelivered) return { label: 'Hoàn Tất',   color: '#22C55E', filter: 'done'     };
  if (status.isFullyPaid) return { label: 'Chờ Giao',   color: '#3B82F6', filter: 'waiting'  };
  if (status.isShot)      return { label: 'Chờ Xử Lý', color: '#8B5CF6', filter: 'waiting'  };
  if (status.isDeposited) return { label: 'Đã Cọc',     color: '#EAB308', filter: 'deposited'};
  return                         { label: 'Chưa Cọc',   color: '#6B7280', filter: 'pending'  };
}

// Priority màu border-left
function getBorderColor(status) {
  if (status.isDelivered) return '#22C55E';
  if (status.isFullyPaid) return '#3B82F6';
  if (status.isDeposited) return '#EAB308';
  return '#6B7280';
}
```

---

## 7. LOGIC LỌC DANH SÁCH (FILTER LOGIC)

```javascript
function filterShows(shows, filterKey) {
  switch(filterKey) {
    case 'all':       return shows;
    case 'pending':   return shows.filter(s => !s.status.isDeposited);
    case 'deposited': return shows.filter(s => s.status.isDeposited && !s.status.isShot);
    case 'waiting':   return shows.filter(s => s.status.isShot && !s.status.isDelivered);
    case 'done':      return shows.filter(s => s.status.isDelivered);
    default:          return shows;
  }
}

// Sắp xếp: Show chưa hoàn tất lên trước, sort theo eventDate tăng dần
function sortShows(shows) {
  return [...shows].sort((a, b) => {
    if (a.status.isDelivered !== b.status.isDelivered) {
      return a.status.isDelivered ? 1 : -1; // Done xuống đáy
    }
    return new Date(a.eventDate) - new Date(b.eventDate); // Gần nhất lên đầu
  });
}
```

---

## 8. ID GENERATION

```javascript
// Show ID: timestamp-based (microsecond unique)
function generateShowId() {
  return `SH-${Date.now()}`;
}

// Service ID: random 6 digits
function generateServiceId() {
  return `SV-${Math.floor(Math.random() * 900000 + 100000)}`;
}
```

---

## 9. BACKUP FORMAT (EXPORT/IMPORT)

```json
// File: PhuThanh_Backup_02042026.json
{
  "version": "1.0",
  "exportedAt": "2026-04-02T11:10:00",
  "app": "PhuThanh Wedding Dreams",
  "data": {
    "phuthanh_settings": { /* settings object */ },
    "phuthanh_services": [ /* services array */ ],
    "phuthanh_shows":    [ /* shows array */ ]
  }
}
```

**Logic Restore:**
```javascript
async function restoreBackup(jsonFile) {
  const text = await jsonFile.text();
  const backup = JSON.parse(text);

  // Validate
  if (!backup.data || !backup.version) throw new Error('File không hợp lệ');

  // Confirm
  const confirmed = window.confirm(
    '⚠️ Bạn có chắc chắn muốn khôi phục?\nToàn bộ dữ liệu hiện tại sẽ bị ghi đè và không thể khôi phục lại.'
  );
  if (!confirmed) return;

  // Write
  localStorage.setItem('phuthanh_settings', JSON.stringify(backup.data.phuthanh_settings));
  localStorage.setItem('phuthanh_services', JSON.stringify(backup.data.phuthanh_services));
  localStorage.setItem('phuthanh_shows',    JSON.stringify(backup.data.phuthanh_shows));

  // Reload
  window.location.reload();
}
```

---

## 10. ĐỊNH DẠNG DỮ LIỆU HIỂN THỊ

```javascript
// Tiền tệ VND - BẮT BUỘC dùng toLocaleString
function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' đ';
  // 2800000 → "2.800.000 đ"
}

// Ngày VN
function formatDateVN(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
  // "2026-05-15" → "15/05/2026"
}

// Kiểm tra show sắp đến (trong vòng 7 ngày)
function isUpcoming(eventDate) {
  const days = (new Date(eventDate) - new Date()) / (1000 * 60 * 60 * 24);
  return days >= 0 && days <= 7;
}

// Input mask tiền VND (khi đang gõ)
function maskCurrency(value) {
  const raw = value.replace(/\D/g, '');
  return Number(raw).toLocaleString('vi-VN');
  // Người gõ "2800000" → hiển thị "2.800.000"
}
```
