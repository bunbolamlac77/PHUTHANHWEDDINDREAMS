import React, { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import ExtraCostModal from './ExtraCostModal';

export default function ExtraCostListSection({ extraCostTemplates, setExtraCostTemplates }) {
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (item) => {
    setModalData(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setModalData(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa chi phí này không?")) {
      setExtraCostTemplates(extraCostTemplates.filter(e => e.id !== id));
    }
  };

  const handleSave = (updatedItem) => {
    if (modalData) {
      setExtraCostTemplates(extraCostTemplates.map(e => e.id === updatedItem.id ? updatedItem : e));
    } else {
      setExtraCostTemplates([...extraCostTemplates, updatedItem]);
    }
    setIsModalOpen(false);
  };

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-title font-heading text-pt-text">Chi Phí Phát Sinh</h2>
          <p className="text-pt-muted text-[12px] mt-0.5">Các mục sẽ hiện nhanh trong form Tạo Báo Giá</p>
        </div>
      </div>

      <div className="space-y-3">
        {extraCostTemplates.map(item => {
          const price = Number((item.priceStr || '0').replace(/\D/g, '') || 0);
          return (
            <div key={item.id} className="bg-[rgba(22,38,32,0.8)] border border-pt-text/10 rounded-2xl p-4 flex items-center justify-between relative">
              <div className="flex-1 pr-14">
                <h3 className="text-pt-text font-bold text-[14px] leading-snug">{item.name}</h3>
                {price > 0 && (
                  <span className="text-pt-gold font-medium text-[13px]">+{formatCurrency(price)}</span>
                )}
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-3">
                <button className="text-pt-muted hover:text-pt-gold transition-colors" onClick={() => handleEdit(item)}>
                  <Edit2 size={17} />
                </button>
                <button className="text-pt-muted hover:text-red-500 transition-colors" onClick={() => handleDelete(item.id)}>
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          );
        })}

        <button
          onClick={handleAdd}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-pt-text/20 rounded-2xl p-4 text-pt-muted hover:text-pt-gold hover:border-pt-gold/50 transition-colors"
        >
          <Plus size={20} />
          <span className="font-medium">Thêm chi phí phát sinh</span>
        </button>
      </div>

      <ExtraCostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={modalData}
        onSave={handleSave}
      />
    </section>
  );
}
