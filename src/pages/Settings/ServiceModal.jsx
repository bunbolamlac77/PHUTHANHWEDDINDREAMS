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
      setPrice(service?.price?.toString() || '');
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
    const deliverables = deliverablesStr.split('\n').map(l => l.trim()).filter(l => l);
    
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
                    ? 'bg-pt-gold/20 border-pt-gold text-pt-gold'
                    : 'bg-pt-elevated border-transparent text-pt-muted'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-pt-muted text-[13px] mb-1">Giá Tiền</label>
          <CurrencyInput value={price} onChange={setPrice} />
        </div>
        <div>
          <label className="block text-pt-muted text-[13px] mb-1">Quyền Lợi (Mỗi dòng một mục)</label>
          <textarea 
            rows={4}
            className="w-full bg-pt-elevated border-1.5 border-transparent focus:border-pt-gold rounded-xl px-4 py-3 text-pt-text text-[15px] outline-none resize-none"
            placeholder="Album Photobook Cao Cấp&#10;Ảnh ép gỗ 60x90..."
            value={deliverablesStr} onChange={e => setDeliverablesStr(e.target.value)}
          />
        </div>
        <button 
          onClick={handleSaveClick}
          className="w-full bg-pt-gold text-black font-bold text-[16px] py-4 rounded-xl active:scale-[0.98] transition-transform"
        >
          Lưu Lại
        </button>
      </div>
      <Toast message="Vui lòng điền Tên Dịch Vụ" visible={toastVisible} onClose={() => setToastVisible(false)} />
    </Modal>
  );
}
