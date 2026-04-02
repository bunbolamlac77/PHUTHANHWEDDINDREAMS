import React, { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import ServiceModal from './ServiceModal';

export default function ServiceListSection({ services, setServices }) {
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (svc) => {
    setModalData(svc);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setModalData(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này không?")) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleSave = (updatedSvc) => {
    if (modalData) {
      setServices(services.map(s => s.id === updatedSvc.id ? updatedSvc : s));
    } else {
      setServices([updatedSvc, ...services]);
    }
    setIsModalOpen(false);
  };

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-title font-heading text-pt-text">Gói Dịch Vụ</h2>
      </div>

      <div className="space-y-3">
        {services.map(svc => (
          <div key={svc.id} className="bg-[rgba(22,38,32,0.8)] border border-pt-text/10 rounded-2xl p-4 flex flex-col gap-2 relative">
            <div className="flex justify-between items-start pr-12">
              <h3 className="text-pt-text font-bold text-[15px] leading-snug">{svc.name}</h3>
            </div>
            <div className="text-pt-gold font-medium">{formatCurrency(svc.price)}</div>
            
            <div className="absolute right-4 top-4 flex gap-3">
              <button className="text-pt-muted hover:text-pt-gold" onClick={() => handleEdit(svc)}>
                <Edit2 size={18} />
              </button>
              <button className="text-pt-muted hover:text-red-500" onClick={() => handleDelete(svc.id)}>
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        <button 
          onClick={handleAdd}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-pt-text/20 rounded-2xl p-4 text-pt-muted hover:text-pt-gold hover:border-pt-gold/50 transition-colors"
        >
          <Plus size={20} />
          <span className="font-medium">Thêm dịch vụ mới</span>
        </button>
      </div>

      <ServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        service={modalData}
        onSave={handleSave} 
      />
    </section>
  );
}
