# 🎨 DESIGN SYSTEM – PHUTHANH WEDDING DREAMS PWA
**Phiên bản:** v1.0 | **Ngày cập nhật:** 2026-04-02  
**Thiết bị đích:** iPhone 14 Pro Max (430 × 932 px) – OLED Screen

---

## 1. NGUYÊN TẮC THIẾT KẾ (DESIGN PRINCIPLES)

1. **Mobile-First, Thumb-First:** Tất cả hành động chính đặt trong vùng 60% dưới màn hình (khu vực ngón cái dễ với nhất với iPhone 6.7 inch).
2. **Dark-Only:** Giao diện tối 100%, tối ưu pin OLED, không có Light Mode.
3. **Sang Trọng – Chuyên Nghiệp:** Màu vàng đồng trên nền đen, cảm giác premium như brand xa xỉ.
4. **Tốc Độ Tối Thượng:** Animation không vượt quá 300ms. Không có loading spinner nếu không cần thiết.
5. **Chạm Dễ Dàng:** Touch target tối thiểu 44×44px (Apple HIG Standard).

---

## 2. SAFE AREA – VÙNG AN TOÀN iOS

```css
/* BẮTBUỘC áp dụng cho toàn bộ app */
:root {
  --safe-top: env(safe-area-inset-top, 59px);       /* Dynamic Island */
  --safe-bottom: env(safe-area-inset-bottom, 34px); /* Home Indicator */
  --safe-left: env(safe-area-inset-left, 0px);
  --safe-right: env(safe-area-inset-right, 0px);
}

/* App container */
#root {
  padding-top: var(--safe-top);
  padding-bottom: calc(var(--safe-bottom) + 60px); /* + Tab Bar height */
}

/* Bottom Tab Bar */
.tab-bar {
  padding-bottom: var(--safe-bottom);
  height: calc(60px + var(--safe-bottom));
}
```

---

## 3. BẢNG MÀU (COLOR PALETTE)

### 3.1. Màu Nền (Backgrounds)
| Tên | Hex | Tailwind Class | Mô tả |
|---|---|---|---|
| **bg-base** | `#121212` | `bg-[#121212]` | Nền chính, OLED pure |
| **bg-surface** | `#1E1E1E` | `bg-[#1E1E1E]` | Nền thẻ, form, card |
| **bg-elevated** | `#2A2A2A` | `bg-[#2A2A2A]` | Nền dropdown, input |
| **bg-overlay** | `rgba(0,0,0,0.7)` | `bg-black/70` | Overlay khi mở sheet |

### 3.2. Màu Nhấn (Accent Colors)
| Tên | Hex | Tailwind Class | Dùng cho |
|---|---|---|---|
| **gold-primary** | `#D4AF37` | `text-[#D4AF37]` | CTA chính, nút Lưu/Xuất |
| **gold-secondary** | `#F5C518` | `text-[#F5C518]` | Giá tiền nổi bật |
| **gold-muted** | `#8B7536` | `text-[#8B7536]` | Placeholder, icon phụ |

### 3.3. Màu Trạng Thái Show
| Trạng thái | Hex | Tailwind | Border Left |
|---|---|---|---|
| **Chưa cọc** | `#6B7280` | `border-gray-500` | `border-l-gray-500` |
| **Đã cọc** | `#EAB308` | `border-yellow-500` | `border-l-yellow-500` |
| **Đã chụp** | `#3B82F6` | `border-blue-500` | `border-l-blue-500` |
| **Hoàn tất** | `#22C55E` | `border-green-500` | `border-l-green-500` |

### 3.4. Màu Văn Bản (Text)
| Tên | Hex | Tailwind | Dùng cho |
|---|---|---|---|
| **text-primary** | `#FFFFFF` | `text-white` | Tiêu đề, nội dung chính |
| **text-secondary** | `#A0A0A0` | `text-[#A0A0A0]` | Phụ đề, metadata |
| **text-muted** | `#5C5C5C` | `text-[#5C5C5C]` | Placeholder, disabled |
| **text-danger** | `#EF4444` | `text-red-500` | Nút xóa, cảnh báo |
| **text-success** | `#22C55E` | `text-green-500` | Thành công, đã hoàn tất |
| **text-warning** | `#F59E0B` | `text-amber-500` | Sắp đến hạn |

### 3.5. Tailwind Config Custom Colors
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'pt-base': '#121212',
        'pt-surface': '#1E1E1E',
        'pt-elevated': '#2A2A2A',
        'pt-gold': '#D4AF37',
        'pt-gold-bright': '#F5C518',
        'pt-text': '#FFFFFF',
        'pt-muted': '#A0A0A0',
      }
    }
  }
}
```

---

## 4. TYPOGRAPHY

### 4.1. Font Family
```css
/* Sử dụng Be Vietnam Pro từ Google Fonts – phù hợp Tiếng Việt */
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&display=swap');

body {
  font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

### 4.2. Type Scale
| Token | Size | Weight | Line Height | Dùng cho |
|---|---|---|---|---|
| `text-display` | 24px | 800 | 1.2 | Header trang chính |
| `text-heading` | 18px | 700 | 1.3 | Tiêu đề section |
| `text-title` | 16px | 600 | 1.4 | Tên dịch vụ, tên show |
| `text-body` | 14px | 400 | 1.5 | Nội dung thông thường |
| `text-caption` | 12px | 400 | 1.4 | Metadata phụ |
| `text-micro` | 11px | 500 | 1.3 | Badge, nhãn trạng thái |

---

## 5. SPACING & LAYOUT

```css
/* Grid system cho 430px viewport */
--spacing-screen: 16px;  /* Left/Right padding của trang */
--spacing-gap: 12px;     /* Khoảng cách giữa các card */
--spacing-section: 24px; /* Khoảng cách giữa các section */

/* Z-index layers */
--z-base: 0;
--z-card: 10;
--z-sticky: 20;
--z-tabbar: 30;
--z-overlay: 40;
--z-bottomsheet: 50;
--z-modal: 60;
--z-toast: 70;
```

---

## 6. COMPONENT DESIGN SPECS

### 6.1. Bottom Tab Bar
```
Height: 60px + safe-area-bottom
Background: #1E1E1E với border-top: 1px solid rgba(255,255,255,0.08)
Backdrop blur: blur(20px) – iOS frosted glass effect
Icons: 24x24px stroke icons (Lucide React)
Label: 10px, font-weight 500
Active state: màu #D4AF37, icon filled
Inactive state: màu #5C5C5C
```

```jsx
// 3 tabs theo thứ tự
const tabs = [
  { id: 'settings', icon: <Settings />, label: 'Cài Đặt' },
  { id: 'quote',    icon: <FileText />, label: 'Báo Giá' },  // Default active
  { id: 'shows',   icon: <Calendar />, label: 'Show List' },
];
```

### 6.2. Show Card
```
Width: 100% - 32px (padding 16px mỗi bên)
Background: #1E1E1E
Border radius: 12px
Border left: 4px solid [status-color]
Padding: 16px
Gap giữa các card: 12px

Layout nội dung:
├── Row 1: Tên cặp đôi (16px, 600, white)         [Right: Status badge 24px]
├── Row 2: 📅 Ngày chụp (14px, màu theo urgency)
├── Row 3: 💰 Tổng tiền (14px, #D4AF37)
└── Row 4: 📍 Địa điểm (12px, #A0A0A0)
```

### 6.3. Bottom Sheet
```
Trigger: touch card → overlay fade-in (300ms) + sheet slide-up (300ms)
Height: 70% màn hình (= 652px)
Background: #1E1E1E
Border radius top: 20px
Handle: 4x40px, #3A3A3A, centered top
Animation: transform: translateY(100%) → translateY(0)
  - transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)
Dismiss: Swipe-down (>100px threshold) hoặc tap overlay
```

### 6.4. Custom Checkbox (Checklist Tiến Độ)
```
Size: 24x24px (touch area 44x44px với padding)
Unchecked: border: 2px solid #3A3A3A, background transparent
Checked: background #D4AF37, checkmark SVG trắng
Animation: scale 0.9 → 1.0 khi check (80ms)
Label: 15px, 500 weight, white
```

### 6.5. Nút Bấm (Button Variants)
```jsx
// Primary (Lưu Show) – Vàng đồng
className="bg-[#D4AF37] text-black font-bold px-6 py-4 rounded-2xl active:scale-95 transition-transform"

// Secondary (Xuất Ảnh) – Viền vàng
className="border-2 border-[#D4AF37] text-[#D4AF37] px-6 py-4 rounded-2xl active:scale-95 transition-transform"

// Danger (Xóa Show) – Chỉ text, không nền
className="text-red-500 font-medium py-3 active:opacity-70 transition-opacity"

// Ghost (Huỷ, Đóng)
className="text-[#A0A0A0] py-3 active:opacity-70 transition-opacity"
```

### 6.6. Input Field
```css
.input-field {
  background: #2A2A2A;
  border: 1.5px solid transparent;
  border-radius: 12px;
  padding: 14px 16px;
  color: white;
  font-size: 16px;   /* >= 16px để iOS không tự zoom khi focus */
  transition: border-color 0.2s;
}

.input-field:focus {
  border-color: #D4AF37;
  outline: none;
}
```

### 6.7. Filter Pills (Horizontal Scroll)
```
Container: overflow-x: auto, scrollbar-width: none (không hiện scrollbar)
Pill: padding 8px 16px, border-radius 20px
Active: bg #D4AF37, text black, font-weight 600
Inactive: bg #2A2A2A, text #A0A0A0
Khoảng cách giữa pills: 8px
```

### 6.8. Toast Notification
```
Position: top-center, bên dưới Dynamic Island (top: calc(env(safe-area-inset-top) + 16px))
Background: #2A2A2A với border 1px gold mờ
Border-radius: 12px
Padding: 12px 20px
Auto dismiss: 2.5 giây
Animation: slide-down + fade-in khi vào, fade-out khi ra
```

### 6.9. Khung Preview Báo Giá (#quote-export-node)
```
Aspect ratio: 4:5 (432 x 540px tương đương)
Background: linear-gradient(145deg, #1A1A1A 0%, #0D0D0D 100%)
Border: 1px solid rgba(212, 175, 55, 0.2)
Border-radius: 16px
Padding: 24px

Layout bên trong:
1. Logo: 80x80px, object-fit: contain, centered
2. Tên Studio: 14px, #D4AF37, centered
3. Divider: 1px solid rgba(212,175,55,0.3), 80% width
4. "BẢNG BÁO GIÁ DỊCH VỤ": 13px, letter-spacing 0.15em, #A0A0A0
5. Tên khách + Ngày: 16px bold white + 13px muted
6. Mỗi dịch vụ: Tên bold + giá phải lề + list deliverables với "·"
7. Divider mỏng
8. TỔNG CỘNG: 18px, #F5C518, bold, phải lề
9. (Nếu giảm giá): Strikethrough giá gốc + Giá sau giảm
```

---

## 7. ANIMATION & MICRO-INTERACTIONS

```css
/* Global animation tokens */
--duration-fast: 100ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
--easing-bounce: cubic-bezier(0.32, 0.72, 0, 1);
--easing-smooth: cubic-bezier(0.4, 0, 0.2, 1);

/* Button press effect */
.btn { transition: transform var(--duration-fast); }
.btn:active { transform: scale(0.95); }

/* Card tap effect */
.card:active { transform: scale(0.98); opacity: 0.85; }

/* Bottom sheet slide */
.sheet {
  transform: translateY(100%);
  transition: transform var(--duration-slow) var(--easing-bounce);
}
.sheet.open { transform: translateY(0); }

/* Overlay fade */
.overlay {
  opacity: 0;
  transition: opacity var(--duration-normal);
}
.overlay.visible { opacity: 1; }

/* Toast animation */
@keyframes toast-in {
  from { transform: translateY(-20px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
```

---

## 8. VÙNG CHẠM NGÓN CÁI (THUMB ZONE MAPPING)

```
┌──────────────────────────┐
│  ← DYNAMIC ISLAND (59px) │  ← TRÁNH đặt nút tương tác
│                          │
│   [Thông tin hiển thị]   │  ← Vùng DỌC: Chỉ đọc / xem
│   [Preview báo giá]      │
│   [Danh sách cards]      │
│                          │
│   [Filter Pills]         │  ← Vùng CHẠM TỐT: Tay phải
│   [Form inputs]          │
│   [Checklist items]      │  ← Vùng CHẠM TỐT NHẤT
│                          │
│   [Action Buttons]       │  ← ✅ ĐÂY LÀ VỊ TRÍ VÀNG
│ ──────────────────────── │
│  [     Tab Bar     ]     │  ← Nav cố định
│  ← HOME INDICATOR (34px) │
└──────────────────────────┘
```

---

## 9. XỬ LÝ BÀN PHÍM ẢO iOS

```css
/* Tránh layout shift khi bàn phím mở */
.page-container {
  height: 100dvh;       /* dvh = dynamic viewport height – tự co khi keyboard lên */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* Ẩn Tab Bar khi keyboard active */
@media (max-height: 600px) {
  .tab-bar { display: none; }
}
```

```js
// Detect keyboard visible (iOS Safari workaround)
window.visualViewport?.addEventListener('resize', () => {
  const keyboardVisible = window.visualViewport.height < window.innerHeight * 0.75;
  document.body.classList.toggle('keyboard-open', keyboardVisible);
});
```

---

## 10. RESPONSIVE BREAKPOINTS

> **Lưu ý:** App này chỉ target iPhone 14 Pro Max. Desktop layout không phải mục tiêu. Tuy nhiên, cần đảm bảo không bị vỡ layout trên các iPhone nhỏ hơn.

| Thiết bị | Width | Điều chỉnh |
|---|---|---|
| iPhone SE (nhỏ nhất) | 375px | Font giảm 1px, padding giảm 4px |
| iPhone 14/15 (target) | 390px | Layout chuẩn |
| iPhone 14 Pro Max | 430px | Layout chuẩn |
| iPad (không ưu tiên) | 768px+ | Hiển thị như mobile, centered 430px max |
