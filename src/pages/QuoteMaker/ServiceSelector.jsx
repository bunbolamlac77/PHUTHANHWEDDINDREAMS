import React from 'react';
import BottomSheet from '../../components/ui/BottomSheet';
import { formatCurrency } from '../../utils/formatCurrency';

export default function ServiceSelector({ isOpen, onClose, services, selectedIds, onChange }) {
  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) onChange(selectedIds.filter(i => i !== id));
    else onChange([...selectedIds, id]);
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Chọn Gói Dịch Vụ">
      <div className="space-y-3 mt-2 pr-2">
        {services.map(svc => {
          const isSelected = selectedIds.includes(svc.id);
          return (
            <button 
              key={svc.id}
              onClick={() => toggleSelect(svc.id)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex flex-col gap-1 ${isSelected ? 'border-pt-gold bg-pt-gold/10' : 'border-pt-text/10 bg-pt-elevated active:bg-[#3A3A3A]'}`}
            >
              <div className="flex justify-between items-center">
                <span className={`font-bold text-[15px] ${isSelected ? 'text-pt-gold' : 'text-pt-text'}`}>{svc.name}</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-pt-gold bg-pt-gold' : 'border-[#4A4A4A]'}`}>
                  {isSelected && <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </div>
              </div>
              <span className="text-[14px] text-pt-muted font-medium">{formatCurrency(svc.price)}</span>
            </button>
          );
        })}
        {services.length === 0 && <p className="text-pt-muted text-center py-10">Chưa có dịch vụ nào, vui lòng thêm ở mục Cài Đặt.</p>}
      </div>
      <div className="absolute bottom-safe left-0 w-full p-4 bg-pt-surface/90 backdrop-blur-xl border-t border-pt-text/10">
        <button onClick={onClose} className="w-full bg-pt-gold text-black font-bold py-4 rounded-xl active:scale-95 transition-transform">Xong</button>
      </div>
    </BottomSheet>
  );
}
