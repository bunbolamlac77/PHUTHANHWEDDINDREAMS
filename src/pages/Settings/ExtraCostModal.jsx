import React, { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import CurrencyInput from '../../components/shared/CurrencyInput';
import Toast from '../../components/ui/Toast';

export default function ExtraCostModal({ isOpen, onClose, item, onSave }) {
  const [name, setName] = useState('');
  const [priceStr, setPriceStr] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(item?.name || '');
      setPriceStr(item?.priceStr || '');
    }
  }, [isOpen, item]);

  const handleSave = () => {
    if (!name.trim()) {
      setToastVisible(true);
      return;
    }
    onSave({
      id: item?.id || `EC-${Date.now()}`,
      name: name.trim(),
      priceStr: priceStr || '0',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item ? 'Sửa Chi Phí Phát Sinh' : 'Thêm Chi Phí Phát Sinh'}>
      <div className="space-y-4">
        <div>
          <label className="block text-pt-muted text-[13px] mb-1">Tên Chi Phí <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full bg-pt-elevated border-1.5 border-transparent focus:border-pt-gold rounded-xl px-4 py-3 text-pt-text text-[15px] outline-none"
            placeholder="VD: Thêm buổi chụp chiều"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-pt-muted text-[13px] mb-1">Số Tiền</label>
          <CurrencyInput
            value={priceStr}
            onChange={setPriceStr}
            placeholder="VD: 500.000"
          />
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-pt-gold text-black font-bold text-[16px] py-4 rounded-xl active:scale-[0.98] transition-transform"
        >
          Lưu Lại
        </button>
      </div>
      <Toast message="Vui lòng điền Tên Chi Phí" visible={toastVisible} onClose={() => setToastVisible(false)} />
    </Modal>
  );
}
