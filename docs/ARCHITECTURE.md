# 🏗️ KIẾN TRÚC KỸ THUẬT – PHUTHANH WEDDING DREAMS PWA
**Phiên bản:** v1.0 | **Ngày cập nhật:** 2026-04-02

---

## 1. TECH STACK TỔNG QUAN

```
┌─────────────────────────────────────────────────────────────┐
│                    iPhone 14 Pro Max                        │
│              Safari Browser – Standalone Mode               │
├─────────────────────────────────────────────────────────────┤
│  PRESENTATION LAYER                                         │
│  React 18 + Tailwind CSS v3 + Framer Motion (animation)     │
├─────────────────────────────────────────────────────────────┤
│  PWA LAYER                                                  │
│  Vite + vite-plugin-pwa + Service Worker (Workbox)          │
├─────────────────────────────────────────────────────────────┤
│  STATE & DATA LAYER                                         │
│  React Context + useLocalStorage Hook                       │
├─────────────────────────────────────────────────────────────┤
│  STORAGE LAYER                                              │
│  LocalStorage (3 keys: settings / services / shows)        │
├─────────────────────────────────────────────────────────────┤
│  UTILITY LAYER                                              │
│  html2canvas | Web Share API | Canvas API (img compress)    │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. CÔNG NGHỆ CHI TIẾT

### 2.1. Core Framework
| Công nghệ | Phiên bản | Vai trò |
|---|---|---|
| **React** | 18+ | UI framework, State management, Virtual DOM |
| **Vite** | 5+ | Build tool, Dev server, HMR |
| **Tailwind CSS** | 3+ | Utility-first styling, Dark mode |
| **html2canvas** | 1.4+ | Capture DOM → PNG cho xuất báo giá |

### 2.2. PWA Configuration (iOS Safari Optimized)
```json
// manifest.webmanifest
{
  "name": "PhuThanh Wedding Dreams",
  "short_name": "PT Dreams",
  "description": "Quản lý Show & Tạo Báo Giá Nhiếp Ảnh",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#0B1410",
  "background_color": "#0B1410",
  "start_url": "/",
  "scope": "/",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ]
}
```

```html
<!-- index.html – iOS-specific tags bắt buộc -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="PT Dreams">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

### 2.3. Service Worker Strategy (Offline-First)
```js
// vite.config.js – VitePWA plugin config
VitePWA({
  registerType: 'autoUpdate',
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: { cacheName: 'google-fonts', expiration: { maxEntries: 10 } }
      }
    ]
  },
  manifest: { /* như trên */ }
})
```
- **Strategy:** CacheFirst cho tất cả static assets.
- **Precache:** Toàn bộ JS bundle, CSS, HTML, fonts, icon PNG.
- **Kết quả:** App mở được khi không có internet sau lần install đầu tiên.

---

## 3. CẤU TRÚC THƯ MỤC DỰ ÁN

```
PHUTHANHWEDDINDREAMS/
├── public/
│   ├── manifest.webmanifest
│   ├── sw.js                          # Auto-generated bởi Workbox
│   └── icons/
│       ├── icon-192.png
│       ├── icon-512.png
│       └── apple-touch-icon.png       # 180x180px – BẮT BUỘC cho iOS
├── src/
│   ├── main.jsx                       # Entry point, React root
│   ├── App.jsx                        # Root component, Tab navigation
│   ├── index.css                      # Tailwind directives + custom CSS vars
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BottomTabBar.jsx       # Tab navigation bar (fixed bottom)
│   │   │   └── SafeAreaWrapper.jsx    # env(safe-area-inset) wrapper
│   │   ├── ui/
│   │   │   ├── BottomSheet.jsx        # Reusable slide-up bottom sheet
│   │   │   ├── Toast.jsx              # Toast notification component
│   │   │   ├── Modal.jsx              # Full-screen modal component
│   │   │   ├── CustomCheckbox.jsx     # 24x24px touch-friendly checkbox
│   │   │   ├── StatusBadge.jsx        # Trạng thái show badge
│   │   │   └── FilterPills.jsx        # Horizontal scroll filter bar
│   │   └── shared/
│   │       ├── CurrencyInput.jsx      # Input mask tự động phẩy tiền VND
│   │       └── ImageUploader.jsx      # Logo upload + Canvas compress
│   ├── pages/
│   │   ├── Settings/
│   │   │   ├── SettingsPage.jsx
│   │   │   ├── StudioInfoSection.jsx
│   │   │   ├── ServiceListSection.jsx
│   │   │   ├── ServiceModal.jsx       # Thêm/sửa dịch vụ
│   │   │   └── DataManagement.jsx     # Backup/Restore
│   │   ├── QuoteMaker/
│   │   │   ├── QuoteMakerPage.jsx
│   │   │   ├── QuoteForm.jsx          # Form nhập liệu
│   │   │   ├── QuotePreview.jsx       # #quote-export-node
│   │   │   ├── ServiceSelector.jsx    # Bottom sheet multi-select
│   │   │   └── QuoteActionBar.jsx     # Xuất ảnh + Lưu show
│   │   └── ShowManager/
│   │       ├── ShowManagerPage.jsx
│   │       ├── ShowCard.jsx           # Card hiển thị 1 show
│   │       ├── ShowDetailSheet.jsx    # Bottom sheet chi tiết + checklist
│   │       └── StatusFilterBar.jsx    # Filter pills horizontal scroll
│   ├── hooks/
│   │   ├── useLocalStorage.js         # Generic LocalStorage sync hook
│   │   ├── useSettings.js             # Wrapper cho phuthanh_settings
│   │   ├── useServices.js             # Wrapper cho phuthanh_services
│   │   └── useShows.js                # Wrapper cho phuthanh_shows + CRUD
│   ├── context/
│   │   └── AppContext.jsx             # Global state provider
│   └── utils/
│       ├── formatCurrency.js          # toLocaleString('vi-VN') wrapper
│       ├── compressImage.js           # Canvas API compress → Base64
│       ├── exportQuote.js             # html2canvas → Web Share API
│       ├── backupRestore.js           # Blob API backup + JSON restore
│       ├── generateId.js              # ID ngẫu nhiên SH-XXXXXXXXXX
│       └── dateHelpers.js             # Format ngày VN, tính ngày sắp đến
├── docs/                              # 📁 TÀI LIỆU DỰ ÁN
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN_SYSTEM.md
│   ├── DATA_SCHEMA.md
│   └── RULES.md
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 4. STATE MANAGEMENT PATTERN

### 4.1. Custom Hook Pattern (Không dùng Redux/Zustand)
```js
// hooks/useLocalStorage.js
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('LocalStorage write error:', error);
    }
  };

  return [storedValue, setValue];
}
```

### 4.2. Global Context
```js
// context/AppContext.jsx
const AppContext = createContext();

export function AppProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('phuthanh_settings', DEFAULT_SETTINGS);
  const [services, setServices] = useLocalStorage('phuthanh_services', DEFAULT_SERVICES);
  const [shows, setShows] = useLocalStorage('phuthanh_shows', []);

  return (
    <AppContext.Provider value={{ settings, setSettings, services, setServices, shows, setShows }}>
      {children}
    </AppContext.Provider>
  );
}
```

---

## 5. LUỒNG XUẤT ẢNH BÁO GIÁ

```
User ấn "📸 Xuất Ảnh"
       │
       ▼
html2canvas(document.getElementById('quote-export-node'), {
  scale: 2,              // Retina quality
  useCORS: true,
  backgroundColor: '#162620'
})
       │
       ▼
canvas.toBlob(blob, 'image/png')
       │
       ▼
navigator.canShare({ files: [File] }) ? share : download
       │
       ▼
navigator.share({
  title: 'Báo giá - PhuThanh Wedding Dreams',
  files: [new File([blob], 'bao-gia.png', { type: 'image/png' })]
})
       │
       ▼
iOS Native Share Sheet mở ra (Zalo, iMessage, AirDrop...)
```

---

## 6. XỬ LÝ ẢNH LOGO

```
User chọn ảnh từ Camera Roll
       │
       ▼
FileReader.readAsDataURL(file) → Image object
       │
       ▼
Canvas.drawImage(img) với maxWidth=400, maxHeight=400
       │
       ▼
canvas.toDataURL('image/jpeg', 0.8) → Base64 string
       │
       ▼
Kiểm tra độ lớn < 200KB (200 * 1024 chars)
Nếu > 200KB: giảm quality xuống 0.6, 0.4 cho đến khi đạt
       │
       ▼
Lưu Base64 vào LocalStorage[phuthanh_settings.studioLogo]
```

---

## 7. CÁCH BUILD & DEPLOY

### Development
```bash
npm install
npm run dev
# Mở http://localhost:5173 trên Safari (macOS) hoặc dùng Vercel Preview để test iPhone thật
```

### Build Production
```bash
npm run build
# Output: /dist - có thể serve bằng Vite Preview hoặc deploy lên Vercel
npm run preview
```

### Test PWA trên iPhone thật
1. Host thư mục `dist/` lên HTTPS (Vercel free tier).
2. Mở Safari trên iPhone, nhập URL.
3. Tap biểu tượng Chia Sẻ → "Thêm vào Màn hình chính".
4. App biến thành native-like với icon và standalone mode.

---

## 8. DEPENDENCIES CHÍNH

```json
// package.json dependencies
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "html2canvas": "^1.4.1"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "vite-plugin-pwa": "^0.19.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "workbox-window": "^7.0.0"
  }
}
```
