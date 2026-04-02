import React, { useState } from 'react';
import BottomTabBar from './components/layout/BottomTabBar';
import SafeAreaWrapper from './components/layout/SafeAreaWrapper';
import Toast from './components/ui/Toast';
import CustomCheckbox from './components/ui/CustomCheckbox';
import StatusBadge from './components/ui/StatusBadge';
import FilterPills from './components/ui/FilterPills';
import Modal from './components/ui/Modal';
import BottomSheet from './components/ui/BottomSheet';
import CurrencyInput from './components/shared/CurrencyInput';
import ImageUploader from './components/shared/ImageUploader';
import { useAppContext } from './context/AppContext';

function App() {
  const [activeTab, setActiveTab] = useState('quote');
  const [toastVisible, setToastVisible] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [currency, setCurrency] = useState('');
  const [img, setImg] = useState('');
  const [filter, setFilter] = useState('all');

  const { settings } = useAppContext();

  return (
    <>
      <SafeAreaWrapper>
        <div className="p-4 space-y-8 pb-[100px]">
          <div className="text-center">
            <h1 className="text-display font-heading text-pt-gold">Phase 3: Core UI</h1>
            <p className="text-pt-muted mt-1">{settings.studioName}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-title font-heading text-pt-text">1. Buttons & Toast</h2>
            <button className="bg-pt-gold text-black font-bold px-6 py-4 rounded-2xl active:scale-95 transition-transform w-full" onClick={() => setToastVisible(true)}>
              Hiển thị Toast Báo Lỗi/Thành Công
            </button>
            <Toast message="Hành động đã được lưu thành công!" visible={toastVisible} onClose={() => setToastVisible(false)} />
          </div>

          <div className="space-y-4">
            <h2 className="text-title font-heading text-pt-text">2. Forms & Inputs</h2>
            <CurrencyInput value={currency} onChange={setCurrency} placeholder="Nhập số tiền..." />
            <CustomCheckbox checked={checkboxChecked} onChange={setCheckboxChecked} label="Đã bàn giao toàn bộ File" />
            <div className="flex items-center gap-4">
              <ImageUploader imageUrl={img} onImageSelect={setImg} />
              <p className="text-caption text-pt-muted">Upload ảnh sẽ được tự động nén dung lượng ở Client-Side.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-title font-heading text-pt-text">3. Badges, Pills & Typography</h2>
            <div className="flex gap-2 mb-2">
              <StatusBadge status={{}} />
              <StatusBadge status={{ isDeposited: true }} />
              <StatusBadge status={{ isShot: true }} />
              <StatusBadge status={{ isDelivered: true }} />
            </div>
            <FilterPills 
              options={[
                {id: 'all', label: 'Tất cả'}, 
                {id: 'deposited', label: 'Đã cọc'},
                {id: 'shot', label: 'Đã chụp'}
              ]}
              activeId={filter}
              onChange={setFilter}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-title font-heading text-pt-text">4. Modals & Overlays</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="border-2 border-pt-gold text-pt-gold font-bold py-4 rounded-2xl active:scale-95 transition-transform" onClick={() => setModalOpen(true)}>
                Mở Modal
              </button>
              <button className="bg-pt-surface border border-pt-text/10 text-pt-text font-bold py-4 rounded-2xl active:scale-95 transition-transform" onClick={() => setSheetOpen(true)}>
                Mở Sheet
              </button>
            </div>
          </div>
        </div>
      </SafeAreaWrapper>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Test Center Modal">
        <p className="text-pt-muted text-body leading-relaxed">Đây là nội dung popup Modal ở GĐ3. Được dùng cho các form nhỏ gọn như Thêm mới Dịch Vụ, hoặc Validate logic ngắn.</p>
        <button onClick={() => setModalOpen(false)} className="mt-6 w-full py-4 rounded-xl bg-pt-gold text-black font-bold active:scale-95 transition-transform">Đóng Modal</button>
      </Modal>

      <BottomSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)} title="Bottom Sheet">
        <p className="text-pt-muted text-body leading-relaxed">Đây là Bottom Sheet 70% height dành cho Mobile. Vuốt nhẹ thanh ngang bên trên xuống để đóng, hoặc click ra ngoài Overlay để tắt.</p>
        <div className="h-[500px] mt-4 flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl text-white/20">
          Scrollable Content...
        </div>
      </BottomSheet>

      <BottomTabBar activeTab={activeTab} onChange={setActiveTab} />
    </>
  );
}

export default App;
