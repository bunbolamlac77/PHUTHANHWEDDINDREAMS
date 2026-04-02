import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from './context/AppContext'
import App from './App.jsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Ứng dụng có bản cập nhật mới. Tải lại ngay?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('✅ PhuThanh Wedding Dreams: Sẵn sàng hoạt động ngoại tuyến!');
  },
  onRegisterError(error) {
    console.error('❌ PWA Registration Error:', error);
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)
