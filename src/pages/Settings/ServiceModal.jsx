import React, { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import CurrencyInput from '../../components/shared/CurrencyInput';
import { generateServiceId } from '../../utils/generateId';
import Toast from '../../components/ui/Toast';

const CATEGORY_OPTIONS = [
  { value: 'wedding', label: '📸 Gói Chụp' },
  { value: 'video',   label: '🎥 Gói Quay' },
  { value: 'other',   label: '🎊 Khác' },
];

export default function ServiceModal({ isOpen, onClose, service, onSave }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('wedding');
  const [deliverablesStr, setDeliverablesStr] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(service?.name || '');
      setPrice(service?.price ? service.price.toLocaleString('vi-VN') : '');
      setCategory(service?.category || 'wedding');
      setDeliverablesStr(service?.deliverables?.join('\n') || '');
    }
  }, [isOpen, service]);

  const handleSaveClick = () => {
    if (!name.trim()) {
      setToastVisible(true);
      return;
    }
    const cleanPrice = parseInt(String(price).replace(/\D/g, '') || '0', 10);
    // Tách theo dòng, giữ nguyên từng sản phẩm / quyền lợi người dùng nhập
    const deliverables = deliverablesStr
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);
    
    const finalData = {
      id: service?.id || generateServiceId(),
      name: name.trim(),
      price: cleanPrice,
      category,
      deliverables,
      updatedAt: new Date().toISOString(),
      createdAt: service?.createdAt || new Date().toISOString()
    };
    onSave(finalData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={service ? 'Sửa Gói Dịch Vụ' : 'Thêm Gói Mới'}>
      <div className="space-y-4">
        <div>
          <label className="block text-pt-muted text-[13px] mb-1">Tên Dịch Vụ <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            placeholder="VD: Truyền Thống Cưới"
            className="w-full bg-pt-elevated border-1.5 border-transparent focus:border-pt-gold rounded-xl px-4 py-3 text-pt-text text-[15px] outline-none"
            value={name} onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-pt-muted text-[13px] mb-1">Loại Dịch Vụ</label>
          <div className="flex gap-2">
            {CATEGORY_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setCategory(opt.value)}
                className={`flex-1 py-2.5 rounded-xl text-[13px] font-medium border transition-all ${
                  category === opt.value
                    ? 'bg-pt-gold/20 border-pt-gold text-pt-gold font-bold'
                    : 'bg-pt-elevated border-transparent text-pt-muted'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-pt-muted text-[13px] mb-1">Giá Tiền (VNĐ)</label>
          <CurrencyInput value={price} onChange={setPrice} placeholder="VD: 2.500.000" />
        </div>
        <div>
          <label className="block text-pt-muted text-[13px] mb-1">
            Sản Phẩm & Quyền Lợi Nhận Được <span className="text-[11px] text-pt-gold">(Mỗi dòng một mục)</span>
          </label>
          <textarea 
            rows={5}
            className="w-full bg-pt-elevated border-1.5 border-transparent focus:border-pt-gold rounded-xl px-4 py-3 text-pt-text text-[14px] leading-relaxed outline-none resize-none"
            placeholder={`Album 100 ảnh 13x18 High Quality in lụa\n01 Ảnh lớn treo tường 40x60cm chất lượng cao\nDâu Rể tự tay chọn hình và lồng ảnh\nChụp KHÔNG GIỚI HẠN trong suốt buổi lễ\nXử lý màu trong sáng, mịn da tự nhiên`}
            value={deliverablesStr} onChange={e => setDeliverablesStr(e.target.value)}
          />
          <p className="text-[11px] text-pt-muted mt-1 opacity-75">
            * Mỗi dòng bạn nhập ở đây sẽ hiển thị nguyên vẹn trên bảng báo giá gửi khách hàng.
          </p>
        </div>
        <button 
          onClick={handleSaveClick}
          className="w-full bg-pt-gold text-black font-bold text-[16px] py-4 rounded-xl active:scale-[0.98] transition-transform shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
        >
          Lưu Lại
        </button>
      </div>
      <Toast message="Vui lòng điền Tên Dịch Vụ" visible={toastVisible} onClose={() => setToastVisible(false)} />
    </Modal>
  );
}
