# 🗺️ QUY TRÌNH A→Z THỰC HIỆN DỰ ÁN – PHUTHANH WEDDING DREAMS PWA
**Thiết bị:** MacBook M1 (Antigravity AI) + iPhone 14 Pro Max  
**Thời gian ước tính:** 3–5 ngày làm việc tập trung  
**Ngày tạo:** 2026-04-02  

---

## TỔNG QUAN CÁC GIAI ĐOẠN

```
GIAI ĐOẠN 1: Chuẩn bị môi trường & khởi tạo dự án     (Ngày 1 – Buổi sáng)
GIAI ĐOẠN 2: Xây dựng nền tảng & Design System          (Ngày 1 – Buổi chiều)
GIAI ĐOẠN 3: Xây dựng Core Components & Hooks           (Ngày 2 – Cả ngày)
GIAI ĐOẠN 4: Phát triển 3 Module chính                  (Ngày 3–4 – Cả ngày)
GIAI ĐOẠN 5: PWA Config & Offline Support                (Ngày 4 – Buổi chiều)
GIAI ĐOẠN 6: Test trên iPhone thật & Fix lỗi            (Ngày 5 – Buổi sáng)
GIAI ĐOẠN 7: Deploy & Cài lên Home Screen iPhone        (Ngày 5 – Buổi chiều)
```

---

## GIAI ĐOẠN 1: CHUẨN BỊ MÔI TRƯỜNG & KHỞI TẠO DỰ ÁN

### Bước 1.1 – Kiểm tra môi trường Mac M1

Mở Terminal trên MacBook M1, kiểm tra các công cụ cần thiết đã được cài chưa:

```bash
# Kiểm tra Node.js (cần >= 18.0)
node --version
# Nếu chưa có: brew install node

# Kiểm tra npm
npm --version

# Kiểm tra git
git --version
# Nếu chưa có: brew install git
```

**Lưu ý Mac M1:** Nếu dùng homebrew lần đầu, PATH có thể ở `/opt/homebrew/bin` thay vì `/usr/local/bin`. Thêm vào `~/.zshrc`:
```bash
export PATH="/opt/homebrew/bin:$PATH"
```

### Bước 1.2 – Khởi tạo dự án với Vite + React

Trong Antigravity, mở terminal và chạy:

```bash
# Di chuyển vào thư mục dự án
cd /Users/phuthanh/APP_CaNhan/MiniApp/PHUTHANHWEDDINDREAMS

# Khởi tạo Vite React app (non-interactive)
npx -y create-vite@latest ./ --template react

# Cài đặt dependencies cơ bản
npm install
```

**Kết quả mong đợi:** Thư mục sẽ có `src/`, `public/`, `index.html`, `vite.config.js`, `package.json`.

### Bước 1.3 – Cài đặt các thư viện cần thiết

```bash
# Tailwind CSS + PostCSS + Autoprefixer
npm install -D tailwindcss@3 postcss autoprefixer

# Plugin PWA cho Vite
npm install -D vite-plugin-pwa workbox-window

# html2canvas (xuất ảnh báo giá)
npm install html2canvas

# Lucide React (icon đẹp, nhẹ)
npm install lucide-react

# Khởi tạo cấu hình Tailwind
npx tailwindcss init -p
```

### Bước 1.4 – Tạo cấu trúc thư mục chuẩn

Antigravity tạo đầy đủ cấu trúc theo ARCHITECTURE.md:

```bash
# Tạo toàn bộ thư mục src/
mkdir -p src/components/layout
mkdir -p src/components/ui
mkdir -p src/components/shared
mkdir -p src/pages/Settings
mkdir -p src/pages/QuoteMaker
mkdir -p src/pages/ShowManager
mkdir -p src/hooks
mkdir -p src/context
mkdir -p src/utils
mkdir -p public/icons
```

### Bước 1.5 – Chuẩn bị icon PWA

Cần 3 file icon ở thư mục `public/icons/`:
- `icon-192.png` – 192×192px
- `icon-512.png` – 512×512px  
- `apple-touch-icon.png` – 180×180px (BẮT BUỘC cho iOS)

**Cách làm nhanh với Mac M1:** Dùng Antigravity `generate_image` tool tạo logo, sau đó resize bằng lệnh:
```bash
# Dùng sips (có sẵn trên macOS)
sips -z 192 192 logo-original.png --out public/icons/icon-192.png
sips -z 512 512 logo-original.png --out public/icons/icon-512.png
sips -z 180 180 logo-original.png --out public/icons/apple-touch-icon.png
```

### Bước 1.6 – Cấu hình Git (nếu chưa có)

```bash
git init
git add .
git commit -m "chore: khởi tạo dự án Vite React"
```

---

## GIAI ĐOẠN 2: XÂY DỰNG NỀN TẢNG & DESIGN SYSTEM

### Bước 2.1 – Cấu hình Tailwind CSS

Sửa file `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'pt-base':       '#121212',
        'pt-surface':    '#1E1E1E',
        'pt-elevated':   '#2A2A2A',
        'pt-gold':       '#D4AF37',
        'pt-gold-bright':'#F5C518',
        'pt-text':       '#FFFFFF',
        'pt-muted':      '#A0A0A0',
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'toast-in': 'toastIn 0.3s ease-out',
        'sheet-up': 'sheetUp 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
      },
      keyframes: {
        toastIn: {
          from: { transform: 'translateY(-20px)', opacity: 0 },
          to:   { transform: 'translateY(0)', opacity: 1 },
        },
        sheetUp: {
          from: { transform: 'translateY(100%)' },
          to:   { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
```

### Bước 2.2 – Thiết lập index.css (Global Styles)

File `src/index.css` là nền tảng toàn bộ app:

```css
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ===== SAFE AREA VARIABLES ===== */
:root {
  --safe-top:    env(safe-area-inset-top, 59px);
  --safe-bottom: env(safe-area-inset-bottom, 34px);
  --safe-left:   env(safe-area-inset-left, 0px);
  --safe-right:  env(safe-area-inset-right, 0px);
}

/* ===== RESET & BASE ===== */
*, *::before, *::after { box-sizing: border-box; }

html, body, #root {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #121212;
  color: #FFFFFF;
  font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent; /* Bỏ highlight xanh khi chạm iOS */
  overscroll-behavior: none;               /* Tắt bounce scroll toàn app */
}

/* ===== APP CONTAINER ===== */
#root {
  display: flex;
  flex-direction: column;
  padding-top: var(--safe-top);
  max-width: 430px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

/* ===== SCROLLBAR ẨN (iOS style) ===== */
::-webkit-scrollbar { display: none; }
* { scrollbar-width: none; }

/* ===== INPUT – Chống zoom iOS ===== */
input, textarea, select {
  font-size: 16px !important; /* >= 16px để Safari không zoom */
  background: transparent;
  color: #FFFFFF;
}

/* ===== CUSTOM UTILITIES ===== */
@layer utilities {
  .pb-safe  { padding-bottom: var(--safe-bottom); }
  .pt-safe  { padding-top: var(--safe-top); }
  .h-screen-safe { height: calc(100dvh - var(--safe-top) - var(--safe-bottom)); }
  .tab-safe { padding-bottom: calc(var(--safe-bottom) + 60px); }
}

/* ===== KEYBOARD DETECT ===== */
@media (max-height: 600px) {
  .tab-bar { display: none !important; }
}
```

### Bước 2.3 – Cấu hình Vite (vite.config.js)

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png', 'icons/*.ico'],
      manifest: {
        name: 'PhuThanh Wedding Dreams',
        short_name: 'PT Dreams',
        description: 'Quản lý Show & Tạo Báo Giá Nhiếp Ảnh',
        theme_color: '#121212',
        background_color: '#121212',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts', expiration: { maxEntries: 10 } },
          },
        ],
      },
    }),
  ],
})
```

### Bước 2.4 – Chỉnh sửa index.html

```html
<!DOCTYPE html>
<html lang="vi" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
  
  <!-- PWA iOS Tags – BẮT BUỘC -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="PT Dreams" />
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
  
  <!-- Theme Color -->
  <meta name="theme-color" content="#121212" />
  
  <!-- SEO -->
  <title>PhuThanh Wedding Dreams – Quản Lý Show & Báo Giá</title>
  <meta name="description" content="Ứng dụng quản lý show chụp ảnh và tạo báo giá chuyên nghiệp cho studio PhuThanh Wedding Dreams" />
  
  <link rel="icon" type="image/png" href="/icons/icon-192.png" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

---

## GIAI ĐOẠN 3: XÂY DỰNG CORE COMPONENTS & HOOKS

### Bước 3.1 – Tạo Custom Hooks (nền tảng dữ liệu)

**File: `src/hooks/useLocalStorage.js`**
```js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const val = value instanceof Function ? value(storedValue) : value;
      setStoredValue(val);
      window.localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error('LocalStorage error:', e);
    }
  };

  return [storedValue, setValue];
}
```

**File: `src/context/AppContext.jsx`** – Global state provider kết nối 3 LocalStorage keys:
- `phuthanh_settings` → settings state
- `phuthanh_services` → services state  
- `phuthanh_shows` → shows state + CRUD functions (addShow, updateShow, deleteShow)

### Bước 3.2 – Tạo Utility Functions

Tạo đủ 6 file utils theo ARCHITECTURE.md:

**`src/utils/formatCurrency.js`**
```js
export const formatCurrency = (amount) =>
  Number(amount || 0).toLocaleString('vi-VN') + ' đ';

export const maskCurrency = (value) => {
  const raw = String(value).replace(/\D/g, '');
  return raw ? Number(raw).toLocaleString('vi-VN') : '';
};

export const parseCurrency = (maskedValue) =>
  parseInt(String(maskedValue).replace(/\D/g, '') || '0', 10);
```

**`src/utils/generateId.js`**
```js
export const generateShowId = () => `SH-${Date.now()}`;
export const generateServiceId = () =>
  `SV-${Math.floor(Math.random() * 900000 + 100000)}`;
```

**`src/utils/dateHelpers.js`**
```js
export const formatDateVN = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
};

export const isUpcoming = (eventDate, days = 7) => {
  const diff = (new Date(eventDate) - new Date()) / 86400000;
  return diff >= 0 && diff <= days;
};

export const isPast = (eventDate) => new Date(eventDate) < new Date();
export const daysUntil = (eventDate) =>
  Math.ceil((new Date(eventDate) - new Date()) / 86400000);
```

**`src/utils/compressImage.js`**
```js
export async function compressImage(file, maxSizeKB = 200) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX = 400;
        let { width, height } = img;
        if (width > height) {
          if (width > MAX) { height = (height * MAX) / width; width = MAX; }
        } else {
          if (height > MAX) { width = (width * MAX) / height; height = MAX; }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        let quality = 0.8;
        let result = canvas.toDataURL('image/jpeg', quality);
        while (result.length > maxSizeKB * 1024 && quality > 0.3) {
          quality -= 0.1;
          result = canvas.toDataURL('image/jpeg', quality);
        }
        resolve(result);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
```

**`src/utils/exportQuote.js`**
```js
import html2canvas from 'html2canvas';

export async function exportQuoteAsImage(elementId = 'quote-export-node') {
  const node = document.getElementById(elementId);
  if (!node) throw new Error('Export node not found');

  const canvas = await html2canvas(node, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#1E1E1E',
    logging: false,
  });

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const file = new File([blob], 'bao-gia-phuthanh.png', { type: 'image/png' });
      resolve(file);
    }, 'image/png');
  });
}

export async function shareQuoteImage(file) {
  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      title: 'Báo giá – PhuThanh Wedding Dreams',
      files: [file],
    });
  } else {
    // Fallback: download
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  }
}
```

**`src/utils/backupRestore.js`**
```js
export function exportBackup(settings, services, shows) {
  const data = {
    version: '1.0',
    app: 'PhuThanh Wedding Dreams',
    exportedAt: new Date().toISOString(),
    data: { phuthanh_settings: settings, phuthanh_services: services, phuthanh_shows: shows },
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const a = document.createElement('a');
  a.href = url;
  a.download = `PhuThanh_Backup_${dd}${mm}${yyyy}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importBackup(file) {
  const text = await file.text();
  const backup = JSON.parse(text);
  if (!backup.data || !backup.version) throw new Error('File backup không hợp lệ');
  return backup.data;
}
```

### Bước 3.3 – Tạo UI Components tái sử dụng

Tạo theo thứ tự phụ thuộc (từ nhỏ đến lớn):

**Thứ tự tạo:**
1. `src/components/ui/Toast.jsx` – Thông báo toast tự ẩn sau 2.5s
2. `src/components/ui/CustomCheckbox.jsx` – Checkbox 24×24px touch-friendly
3. `src/components/ui/StatusBadge.jsx` – Badge màu theo trạng thái show
4. `src/components/ui/FilterPills.jsx` – Pill filter cuộn ngang
5. `src/components/ui/Modal.jsx` – Modal toàn màn hình (dùng cho thêm dịch vụ)
6. `src/components/ui/BottomSheet.jsx` – Sheet trượt từ dưới lên (70% height)
7. `src/components/shared/CurrencyInput.jsx` – Input tiền VND có mask
8. `src/components/shared/ImageUploader.jsx` – Upload + nén ảnh logo
9. `src/components/layout/SafeAreaWrapper.jsx` – Wrapper safe area
10. `src/components/layout/BottomTabBar.jsx` – Tab bar cố định dưới cùng

**Chi tiết BottomTabBar.jsx:**
- 3 tab: Cài Đặt (trái) | Báo Giá (giữa, mặc định active) | Show List (phải)
- Icon từ lucide-react: `Settings`, `FileText`, `CalendarDays`
- Active: màu `#D4AF37`, Inactive: `#5C5C5C`
- `active:scale-95 transition-transform` trên mỗi tab button
- Fixed bottom, z-index 30, height `calc(60px + env(safe-area-inset-bottom))`

**Chi tiết BottomSheet.jsx:**
- Props: `isOpen`, `onClose`, `children`, `title`
- Overlay đen mờ fade-in khi open
- Sheet slide-up animation: `cubic-bezier(0.32, 0.72, 0, 1)`
- Handle bar kéo ở top để đóng (swipe-down > 100px)
- Tap overlay để đóng

### Bước 3.4 – Seed Data mặc định

Trong `src/context/AppContext.jsx`, định nghĩa DEFAULT values:

```js
const DEFAULT_SETTINGS = {
  studioName: 'PhuThanh Wedding Dreams',
  studioAddress: 'Phường Tân Hạnh, Vĩnh Long',
  studioPhone: '0901234567',
  studioEmail: '',
  studioLogo: '',
  slogan: 'Lưu giữ khoảnh khắc trọn vẹn',
  updatedAt: new Date().toISOString(),
};

const DEFAULT_SERVICES = [
  {
    id: 'SV-646718', name: 'Truyền Thống Cưới', price: 2800000,
    category: 'wedding',
    deliverables: ['Album 100 ảnh 13x18 High Quality','01 Ảnh lớn treo tường 40x60cm','Tự tay chọn hình và lồng ảnh'],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: 'SV-486660', name: 'Gói Trọn Vẹn Cảm Xúc (Combo 02 Thợ)', price: 4800000,
    category: 'wedding',
    deliverables: ['Album Photobook Cao Cấp 25x35cm (150 ảnh)','02 Ảnh lớn treo tường 40x60cm','01 Tranh Canvas 60x90cm'],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: 'SV-309191', name: 'Quay Phim Phóng Sự Hành Trình', price: 3500000,
    category: 'wedding',
    deliverables: ['Video Highlight 3-5 phút','Video đầy đủ hành trình','Nhạc nền theo yêu cầu'],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
];
```

---

## GIAI ĐOẠN 4: PHÁT TRIỂN 3 MODULE CHÍNH

### Bước 4.1 – Module Settings (Tab Cài Đặt)

**Thứ tự build các file:**

**`src/pages/Settings/StudioInfoSection.jsx`**
- Logo upload: khung vuông tỉ lệ 1:1, bấm mở input file, gọi `compressImage()`
- 4 input fields: Tên Studio, Địa chỉ, Số điện thoại, Slogan
- Mỗi onChange → gọi `setSettings({...settings, [field]: value, updatedAt: now})`
- Không có nút Save riêng – lưu realtime
- Hiển thị preview logo ngay sau khi upload

**`src/pages/Settings/ServiceModal.jsx`**
- Prop: `service` (null = thêm mới, object = sửa)
- Fields: Tên dịch vụ, Giá (dùng CurrencyInput), Danh mục (select), Quyền lợi (textarea)
- Textarea quyền lợi: placeholder "Mỗi dòng là một quyền lợi\nVD: Album 100 ảnh..."
- Khi save: split textarea theo `\n` → `deliverables[]`
- Validate: tên và giá không được rỗng

**`src/pages/Settings/ServiceListSection.jsx`**
- Render danh sách dịch vụ từ `services` context
- Mỗi item: tên (bold) + giá (vàng) + icon ✏️ + icon 🗑️(đỏ)
- Bấm ✏️: mở ServiceModal với data dịch vụ
- Bấm 🗑️: check nếu dịch vụ đang dùng trong show → cảnh báo, nếu không → xóa
- FAB nút "+" góc phải dưới: mở ServiceModal rỗng

**`src/pages/Settings/DataManagement.jsx`**
- Nút "☁️ Xuất Backup": gọi `exportBackup(settings, services, shows)`
- Nút "📥 Khôi Phục": `input[type="file"]` ẩn, trigger click, đọc file JSON
  - Sau khi đọc: hiện `window.confirm()` xác nhận
  - Nếu đồng ý: ghi đè 3 LocalStorage keys → `window.location.reload()`

### Bước 4.2 – Module QuoteMaker (Tab Báo Giá)

**`src/pages/QuoteMaker/ServiceSelector.jsx`**
- Nhận props: `services`, `selectedIds`, `onChange`
- Dạng Bottom Sheet: danh sách checkbox các dịch vụ
- Multi-select: tap vào item toggle checked/unchecked
- Hiển thị tên + giá mỗi dịch vụ
- Nút "Xong" đóng sheet, gọi `onChange(selectedIds)`

**`src/pages/QuoteMaker/QuotePreview.jsx`** ⭐ COMPONENT QUAN TRỌNG NHẤT
- ID bắt buộc: `id="quote-export-node"`
- Aspect ratio 4:5 được duy trì bằng CSS `aspect-ratio: 4/5`
- Background: `linear-gradient(145deg, #1A1A1A 0%, #0D0D0D 100%)`
- Layout từ trên xuống:
  1. Logo studio (80×80px, nếu có)
  2. Tên studio (màu vàng, centered)
  3. Divider vàng mờ
  4. Label "BẢNG BÁO GIÁ DỊCH VỤ" (chữ nhỏ, letter-spacing)
  5. Tên khách + Ngày chụp
  6. Danh sách từng dịch vụ đã chọn + deliverables bullet
  7. Divider
  8. Tổng tiền nổi bật (vàng sáng, lớn)
  9. Nếu có giảm giá: hiển thị giá gốc gạch + giá sau giảm
- **TUYỆT ĐỐI KHÔNG** render ngân hàng/QR ở đây

**`src/pages/QuoteMaker/QuoteForm.jsx`**
- Input tên khách
- `<input type="date">` native iOS picker cho ngày chụp
- Input địa điểm
- Nút "Chọn Gói Dịch Vụ" → mở ServiceSelector Bottom Sheet
- Input giảm giá + toggle [Số tiền / Phần %]
- Input ghi chú
- Tất cả state → QuoteMakerPage (lifted state)

**`src/pages/QuoteMaker/QuoteActionBar.jsx`**
- Fixed above tab bar: `position: fixed; bottom: calc(60px + env(safe-area-inset-bottom)); left: 0; right: 0`
- Layout: 2 nút side by side
- Nút "📸 Xuất Ảnh" (border vàng): gọi `exportQuoteAsImage()` → `shareQuoteImage()`
- Nút "💾 Lưu Show" (nền vàng): validate form → tạo ShowObject → `addShow()` → reset → toast

### Bước 4.3 – Module ShowManager (Tab Show List)

**`src/pages/ShowManager/StatusFilterBar.jsx`**
- Horizontal scroll container (hide scrollbar)
- Pills: Tất cả | Chờ cọc | Đã cọc | Chờ giao file | Hoàn tất
- Active pill: nền vàng, chữ đen; Inactive: nền elevated, chữ muted

**`src/pages/ShowManager/ShowCard.jsx`**
- Props: `show`, `services`, `onPress`
- border-left 4px màu theo `getBorderColor(show.status)`
- Dòng 1: `customerName` – bold white + StatusBadge phải
- Dòng 2: icon 📅 + `formatDateVN(eventDate)` – màu amber nếu upcoming, đỏ nếu đã qua mà chưa done
- Dòng 3: icon 💰 + `formatCurrency(finalAmount)` – vàng
- Dòng 4: icon 📍 + location – muted
- `active:scale-[0.98] transition-transform` khi chạm

**`src/pages/ShowManager/ShowDetailSheet.jsx`** ⭐ COMPONENT PHỨC TẠP NHẤT
- Bottom Sheet chiếm 70% màn hình
- **Section trên:** Tóm tắt chi tiết show (tên, ngày, địa điểm, dịch vụ đã chọn, địa chỉ, ghi chú)
- **Section tài chính:** Tổng | Giảm giá | Sau giảm | Đã cọc | **Còn lại** (nổi bật)
- **Section checklist 4 bước:**
  
  Bước 1 – "Xác nhận khách đã cọc":
  - Khi tick → expand input nhập số tiền cọc (CurrencyInput)
  - `remainingAmount = finalAmount - depositAmount` tự tính realtime
  - Lưu vào `show.status.isDeposited = true` + `show.depositAmount`
  
  Bước 2 – "Hoàn tất bấm máy (Đã chụp)":
  - Tick đơn giản → `show.status.isShot = true`
  
  Bước 3 – "Đã nhận đủ tiền (100%)":
  - Tick → `show.status.isFullyPaid = true`, `remainingAmount = 0`
  
  Bước 4 – "Đã giao toàn bộ file/ảnh":
  - Tick → `show.status.isDelivered = true`
  - Show tự trôi xuống đáy danh sách + opacity giảm còn 60%
  
- **Nút SỬA SHOW** (edit basic info): mở form nhỏ
- **Nút HỦY/XÓA SHOW** (chữ đỏ, tách biệt dưới cùng):
  - Lần 1: `confirm("Bạn có muốn xóa show này?")`
  - Lần 2: `confirm("⚠️ Xác nhận lần 2: Toàn bộ dữ liệu show sẽ mất vĩnh viễn!")`
  - Chỉ xóa sau khi confirm cả 2 lần

---

## GIAI ĐOẠN 5: PWA CONFIG & OFFLINE SUPPORT

### Bước 5.1 – Kiểm tra manifest hoạt động

Sau khi `npm run dev`, mở DevTools (F12 trên Safari Mac) → Application → Manifest:
- Kiểm tra name, icons, display: standalone hiển thị đúng
- Kiểm tra không có lỗi màu đỏ

### Bước 5.2 – Đăng ký Service Worker

Service Worker được `vite-plugin-pwa` tự generate. Trong `src/main.jsx`:

```jsx
import { registerSW } from 'virtual:pwa-register';

// Tự update Service Worker khi có phiên bản mới
const updateSW = registerSW({
  onNeedRefresh() {
    // Có thể show toast: "App có bản mới, đang cập nhật..."
  },
  onOfflineReady() {
    console.log('App sẵn sàng hoạt động offline!');
  },
});
```

### Bước 5.3 – Build production để test PWA

```bash
npm run build
# Kiểm tra thư mục dist/ đã có sw.js và manifest.webmanifest
ls dist/
npm run preview
# App chạy ở http://localhost:4173
```

### Bước 5.4 – Expose localhost ra internet để test iPhone

Với Mac M1, dùng một trong hai cách:

**Cách 1: ngrok (đơn giản nhất)**
```bash
# Cài ngrok nếu chưa có
brew install ngrok

# Tạo tunnel đến port dev
ngrok http 5173
# Nhận URL dạng: https://abc123.ngrok.io
```

**Cách 2: Vite --host (cùng WiFi)**
```bash
npm run dev -- --host
# App chạy ở: http://192.168.x.x:5173
# iPhone cùng WiFi có thể truy cập URL này
```

---

## GIAI ĐOẠN 6: TEST TRÊN IPHONE 14 PRO MAX

### Bước 6.1 – Checklist test chức năng cơ bản

Mở Safari trên iPhone 14 Pro Max, truy cập URL ngrok/local:

**Test Tab Settings:**
- [ ] Upload logo: chọn ảnh từ Camera Roll → logo hiển thị ngay
- [ ] Sửa tên studio → realtime update
- [ ] Thêm dịch vụ mới → hiện trong danh sách
- [ ] Sửa dịch vụ → cập nhật đúng
- [ ] Xóa dịch vụ → biến mất
- [ ] Xuất backup → file .json tải về ứng dụng Files iOS
- [ ] Khôi phục backup → confirm dialog → reload → data khớp

**Test Tab Báo Giá:**
- [ ] Nhập tên khách → preview cập nhật realtime
- [ ] Chọn ngày → native date picker iOS mở
- [ ] Chọn nhiều gói → tổng tiền cập nhật đúng
- [ ] Nhập giảm giá → tính đúng finalAmount
- [ ] Preview đẹp, không bị vỡ layout
- [ ] Bấm "Xuất Ảnh" → iOS Share Sheet mở → share qua Zalo được
- [ ] Bấm "Lưu Show" → toast "Đã lưu!" → form reset → Show xuất hiện ở Tab 3

**Test Tab Show Manager:**
- [ ] Danh sách shows hiển thị đúng
- [ ] Filter pills hoạt động đúng
- [ ] Chạm vào card → Bottom Sheet slide-up mượt
- [ ] Tick "Đã cọc" → ô nhập tiền cọc xuất hiện → nhập → "Còn lại" tính đúng
- [ ] Tick các bước còn lại → badge và border-left đổi màu
- [ ] Xóa show → confirm 2 lần → show biến mất
- [ ] Show "Hoàn tất" trôi xuống đáy và mờ hơn

### Bước 6.2 – Checklist test iOS Safari đặc thù

- [ ] Dynamic Island không che nội dung (safe-area-top đúng)
- [ ] Home Indicator không bị overlap Tab Bar (safe-area-bottom đúng)
- [ ] Bàn phím ảo không che input đang focus
- [ ] Tab Bar ẩn khi bàn phím mở (max-height: 600px media query)
- [ ] Không bị zoom khi tap vào input (font-size >= 16px)
- [ ] Không bị double-tap zoom ở bất kỳ đâu
- [ ] Bounce scroll bị tắt (overscroll-behavior: none)
- [ ] Highlight màu xanh khi chạm bị tắt (-webkit-tap-highlight-color)
- [ ] App không crash khi xoay ngang (orientation: portrait trong manifest)

### Bước 6.3 – Checklist test hiệu năng

- [ ] App mở từ Home Screen < 2 giây
- [ ] Preview báo giá cập nhật < 100ms khi gõ
- [ ] Bottom Sheet animation mượt không giật (60fps)
- [ ] Scroll danh sách show mượt khi có 20+ shows
- [ ] Export ảnh (html2canvas) hoàn thành < 3 giây
- [ ] Không có console.error khi thao tác bình thường

### Bước 6.4 – Fix lỗi phổ biến trên iOS Safari

**Lỗi 1: Input bị zoom khi focus**
```css
/* Giải pháp: đảm bảo font-size >= 16px */
input, textarea, select { font-size: 16px !important; }
```

**Lỗi 2: Bottom Sheet không dismiss khi swipe**
```js
// Thêm touch event handler
let startY = 0;
const handleTouchStart = (e) => { startY = e.touches[0].clientY; };
const handleTouchEnd = (e) => {
  if (e.changedTouches[0].clientY - startY > 100) onClose();
};
```

**Lỗi 3: html2canvas render sai khi có CSS variable**
```js
// Giải pháp: đặt màu hex trực tiếp trong #quote-export-node
// Không dùng var(--color) trong node này
```

**Lỗi 4: Web Share API không hoạt động**
```js
// Nguyên nhân: chạy trên HTTP (không phải HTTPS)
// Giải pháp: deploy lên Netlify hoặc dùng ngrok (HTTPS)
```

**Lỗi 5: LocalStorage bị xóa sau vài ngày**
```
// Nguyên nhân: iOS Safari xóa storage của site không được Add to Home Screen
// Giải pháp: Hướng dẫn user Add to Home Screen - đây là PWA requirement
```

---

## GIAI ĐOẠN 7: DEPLOY & CÀI LÊN HOME SCREEN IPHONE

### Bước 7.1 – Deploy lên Netlify (Free Tier, HTTPS tự động)

**Cách 1: Deploy qua Netlify CLI**
```bash
# Cài Netlify CLI
npm install -g netlify-cli

# Build production
npm run build

# Deploy
netlify deploy --prod --dir=dist
# → Nhận URL: https://[tên-ngẫu-nhiên].netlify.app
```

**Cách 2: Deploy qua GitHub + Netlify Web**
```bash
# Push code lên GitHub
git add .
git commit -m "feat: hoàn thiện v1.0"
git push origin main
```
Sau đó vào https://netlify.com:
1. "New site from Git" → chọn repo GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

### Bước 7.2 – Cấu hình domain tuỳ chọn (không bắt buộc)

Trong Netlify Dashboard → Domain settings:
- Có thể đặt tên site: `phuthanh-dreams.netlify.app`
- Hoặc mua domain riêng và connect (không cần thiết cho app cá nhân)

### Bước 7.3 – Cài PWA lên iPhone 14 Pro Max

**Thực hiện trên iPhone:**
1. Mở **Safari** (không dùng Chrome/Firefox – chỉ Safari mới hỗ trợ PWA iOS)
2. Nhập URL Netlify: `https://phuthanh-dreams.netlify.app`
3. Chờ app load hoàn toàn lần đầu (Service Worker đang cache)
4. Tap biểu tượng **Chia Sẻ** (hình vuông có mũi tên lên – dưới cùng Safari)
5. Cuộn xuống → Tap **"Thêm vào Màn hình chính"**
6. Đặt tên: "PT Dreams" → Tap **"Thêm"**
7. App icon xuất hiện trên Home Screen

**Kiểm tra Standalone Mode:**
- Mở app từ Home Screen
- Thanh URL của Safari PHẢI biến mất hoàn toàn
- Status bar phía trên hiển thị đúng màu đen (không bị trắng)
- Dynamic Island không che nội dung

### Bước 7.4 – Test offline trên iPhone

1. Mở app từ Home Screen (khi đang có mạng)
2. Bật **Chế độ Máy Bay** (tắt cả WiFi + Cellular)
3. Tắt app hoàn toàn (swipe lên và vuốt app đi)
4. Mở lại app từ Home Screen
5. **Kết quả mong đợi:** App mở bình thường, dữ liệu vẫn đầy đủ, mọi chức năng hoạt động

---

## GIAI ĐOẠN 8: BẢO TRÌ & CẬP NHẬT

### Bước 8.1 – Quy trình cập nhật tính năng mới

```
1. Đọc lại RULES.md trước khi code
2. Tạo branch mới: git checkout -b feature/ten-tinh-nang
3. Code & test trên localhost với ngrok trên iPhone
4. Build: npm run build && npm run preview
5. Test lại trên iPhone (standalone mode)
6. Commit: git commit -m "feat: mô tả tính năng"
7. Push: git push origin feature/...
8. Merge vào main
9. Netlify tự động deploy (nếu kết nối GitHub)
10. Test trên iPhone thật với URL Netlify
```

### Bước 8.2 – Quy trình backup dữ liệu định kỳ

**Khuyến nghị:** Thực hiện mỗi tuần 1 lần hoặc sau mỗi show mới được thêm vào:

1. Mở app từ Home Screen
2. Tab Cài Đặt → Section "Quản trị Dữ liệu"
3. Tap "☁️ Xuất Backup"
4. File `PhuThanh_Backup_DDMMYYYY.json` tải vào ứng dụng **Files** trên iPhone
5. Vào Files → iCloud Drive → lưu file vào iCloud để backup thêm một lần nữa

### Bước 8.3 – Quy trình khôi phục khi có sự cố

**Tình huống:** Điện thoại reset, đổi điện thoại, hoặc Safari xóa storage:

1. Cài app lại từ Safari (Add to Home Screen từ URL Netlify)
2. Mở app → Tab Cài Đặt → "Khôi Phục Dữ Liệu"
3. Chọn file backup `.json` từ Files/iCloud
4. Xác nhận 2 lần
5. App reload → toàn bộ data được phục hồi

### Bước 8.4 – Monitor dung lượng LocalStorage

```js
// Chạy trong Safari Console để kiểm tra
let total = 0;
for (let key in localStorage) {
  if (localStorage.hasOwnProperty(key)) {
    total += localStorage[key].length * 2; // UTF-16
  }
}
console.log(`LocalStorage đang dùng: ${(total / 1024).toFixed(1)} KB`);
// Giới hạn an toàn: < 4000 KB (4MB)
```

**Nếu sắp đầy:**
- Xuất backup
- Xóa các show đã "Hoàn Tất" cũ (> 6 tháng)
- Logo quá lớn: upload lại logo nhỏ hơn

---

## BẢNG TỔNG HỢP TIẾN ĐỘ

| Ngày | Buổi | Công việc | Kết quả kiểm tra |
|---|---|---|---|
| Ngày 1 | Sáng | Giai đoạn 1: Setup môi trường + Vite init | `npm run dev` chạy được |
| Ngày 1 | Chiều | Giai đoạn 2: Tailwind config + index.css + vite.config | App nền đen, font đúng |
| Ngày 2 | Sáng | Giai đoạn 3a: 6 utils + useLocalStorage hook | Test các hàm trong console |
| Ngày 2 | Chiều | Giai đoạn 3b: 10 UI components + AppContext | Components render không lỗi |
| Ngày 3 | Cả ngày | Giai đoạn 4a: Module Settings hoàn chỉnh | Upload logo, CRUD dịch vụ, backup |
| Ngày 4 | Sáng | Giai đoạn 4b: Module QuoteMaker hoàn chỉnh | Preview realtime, xuất ảnh |
| Ngày 4 | Chiều | Giai đoạn 4c: Module ShowManager hoàn chỉnh | Filter, checklist, xóa show |
| Ngày 5 | Sáng | Giai đoạn 5+6: PWA config + Test iPhone đầy đủ | Offline OK, tất cả checklist pass |
| Ngày 5 | Chiều | Giai đoạn 7: Deploy Netlify + Add to Home Screen | App standalone trên iPhone |

---

## PHỤ LỤC A: CÁC LỆNH THƯỜNG DÙNG TRÊN MAC M1

```bash
# Chạy dev server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Expose localhost qua ngrok (test iPhone)
ngrok http 5173

# Kiểm tra size bundle
npm run build && du -sh dist/

# Xem log git
git log --oneline -10

# Tạo branch mới
git checkout -b feature/ten-tinh-nang

# Commit nhanh
git add . && git commit -m "mô tả"
```

---

## PHỤ LỤC B: DEBUGGING TIPS VỚI SAFARI iOS

**Bật Web Inspector trên iPhone:**
1. iPhone → Cài đặt → Safari → Nâng cao → Web Inspector → BẬT
2. Kết nối iPhone với Mac qua cáp USB
3. Trên Mac: Safari → Develop → [Tên iPhone] → [URL đang mở]
4. DevTools của Safari Mac sẽ debug trực tiếp trên iPhone

**Kiểm tra LocalStorage qua console:**
```js
// Xem raw data
console.log(JSON.parse(localStorage.getItem('phuthanh_shows')));
console.log(JSON.parse(localStorage.getItem('phuthanh_services')));
console.log(JSON.parse(localStorage.getItem('phuthanh_settings')));

// Xóa toàn bộ data (dùng khi test)
localStorage.clear();
location.reload();

// Xem dung lượng
Object.keys(localStorage).forEach(k =>
  console.log(k, (localStorage[k].length / 1024).toFixed(1) + 'KB')
);
```

---

## PHỤ LỤC C: CHECKLIST CUỐI DỰ ÁN

### Checklist Chức Năng (F01–F10)
- [ ] F01 – Tạo báo giá realtime
- [ ] F02 – Lưu show mới vào LocalStorage
- [ ] F03 – Danh sách show + filter pills
- [ ] F04 – Checklist 4 bước tiến độ show
- [ ] F05 – Cài đặt thông tin studio + logo
- [ ] F06 – CRUD bảng giá dịch vụ
- [ ] F07 – Backup JSON + Restore
- [ ] F08 – PWA offline (Service Worker)
- [ ] F09 – Export ảnh báo giá PNG chất lượng cao
- [ ] F10 – Web Share API (iOS native share)

### Checklist iOS Safari
- [ ] Safe Area top (Dynamic Island 59px)
- [ ] Safe Area bottom (Home Indicator 34px)
- [ ] Standalone mode (thanh URL ẩn)
- [ ] Icon đẹp trên Home Screen
- [ ] Không zoom khi tap input
- [ ] Bàn phím ảo không che nội dung
- [ ] Offline hoạt động sau Add to Home Screen
- [ ] No console.error khi dùng bình thường

### Checklist Design
- [ ] Font Be Vietnam Pro load đúng
- [ ] Màu nền #121212 (không bị trắng viền)
- [ ] Màu vàng #D4AF37 cho CTA
- [ ] active:scale-95 trên mọi button
- [ ] Bottom Sheet slide-up animation mượt
- [ ] Toast notification hiển thị đúng vị trí
- [ ] Ảnh báo giá không có thông tin ngân hàng
- [ ] Border-left màu đúng theo trạng thái show
