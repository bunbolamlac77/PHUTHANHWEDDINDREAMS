import React, { useState, useEffect } from 'react';
import BottomSheet from '../../components/ui/BottomSheet';
import CustomCheckbox from '../../components/ui/CustomCheckbox';
import CurrencyInput from '../../components/shared/CurrencyInput';
import { formatCurrency, parseCurrency } from '../../utils/formatCurrency';
import { useAppContext } from '../../context/AppContext';
import { formatDateVN } from '../../utils/dateHelpers';

export default function ShowDetailSheet({ show, isOpen, onClose }) {
  const { updateShow, deleteShow } = useAppContext();
  
  // Local state form for easy binding
  const [depositAmount, setDepositAmount] = useState('');
  const [isDeposited, setIsDeposited] = useState(false);
  const [isShot, setIsShot] = useState(false);
  const [isFullyPaid, setIsFullyPaid] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);

  useEffect(() => {
    if (show && isOpen) {
      setDepositAmount(show.depositAmount ? String(show.depositAmount) : '');
      setIsDeposited(show.status?.isDeposited || false);
      setIsShot(show.status?.isShot || false);
      setIsFullyPaid(show.status?.isFullyPaid || false);
      setIsDelivered(show.status?.isDelivered || false);
    }
  }, [show, isOpen]);

  if (!show) return null;

  const currentDeposit = parseCurrency(depositAmount);
  const remaining = Math.max(0, show.finalAmount - (isFullyPaid ? show.finalAmount : currentDeposit));

  const saveChanges = (updates) => {
    updateShow(show.id, {
      ...show,
      ...updates
    });
  };

  const syncStatus = (field, val) => {
    const newStatus = { isDeposited, isShot, isFullyPaid, isDelivered, [field]: val };
    
    // Auto sync logic: if fully paid, deposit must be true.
    if (field === 'isFullyPaid' && val) newStatus.isDeposited = true;
    
    saveChanges({ 
       status: newStatus, 
       depositAmount: (field === 'isFullyPaid' && val) ? show.finalAmount : ((field === 'isDeposited' && !val) ? 0 : currentDeposit)
    });
  };

  const handleDepositChange = (maskedVal) => {
    setDepositAmount(maskedVal);
    saveChanges({ depositAmount: parseCurrency(maskedVal) });
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có muốn xóa show này không?")) {
      if (window.confirm("⚠️ XÁC NHẬN LẦN 2: Dữ liệu bị xoá sẽ mất vĩnh viễn!")) {
        deleteShow(show.id);
        onClose();
      }
    }
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Chi tiết Show">
      <div className="space-y-6">
        
        {/* Info Box */}
        <div className="bg-pt-elevated rounded-xl p-4 border border-pt-text/5">
          <h3 className="text-[18px] font-bold text-pt-text mb-3">{show.customerName}</h3>
          <div className="space-y-2 text-[14px]">
            <div className="flex justify-between"><span className="text-pt-muted">Ngày:</span><span className="text-pt-text font-medium">{formatDateVN(show.eventDate)}</span></div>
            <div className="flex justify-between"><span className="text-pt-muted">Địa điểm:</span><span className="text-pt-text text-right max-w-[60%]">{show.location || '—'}</span></div>
            {show.note && <div className="flex justify-between mt-2 pt-2 border-t border-pt-text/5"><span className="text-pt-muted">Ghi chú:</span><span className="text-pt-gold text-right">{show.note}</span></div>}
          </div>
        </div>

        {/* Financials */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-[15px]">
            <span className="text-pt-muted">Tổng báo giá:</span>
            <span className="text-pt-text">{formatCurrency(show.finalAmount)}</span>
          </div>
          <div className="flex justify-between items-center text-[15px]">
            <span className="text-pt-muted">Đã cọc/thu:</span>
            <span className="text-pt-text">{formatCurrency(isFullyPaid ? show.finalAmount : currentDeposit)}</span>
          </div>
          <div className="flex justify-between items-center text-[18px] mt-2 pt-2 border-t border-pt-text/10">
            <span className="text-pt-text font-bold">CÒN LẠI:</span>
            <span className="text-pt-gold font-bold">{formatCurrency(remaining)}</span>
          </div>
        </div>

        {/* Workflow Checklist */}
        <div className="space-y-4 pt-4 border-t border-pt-text/10">
          <h4 className="text-pt-text font-bold text-[15px] mb-2 uppercase tracking-wide">Trạng thái công việc</h4>
          
          <div className="space-y-2 bg-[rgba(22,38,32,0.5)] p-3 rounded-xl border border-pt-text/5">
            <CustomCheckbox 
              checked={isDeposited} 
              onChange={val => { setIsDeposited(val); syncStatus('isDeposited', val); }} 
              label="1. Xác nhận khách Đã Cọc" 
            />
            {isDeposited && !isFullyPaid && (
              <div className="pl-11 pr-2 pb-2">
                <CurrencyInput value={depositAmount} onChange={handleDepositChange} placeholder="Nhập số tiền cọc (VNĐ)" className="py-2.5 text-[14px]" />
              </div>
            )}
          </div>

          <div className="space-y-2 bg-[rgba(22,38,32,0.5)] p-3 rounded-xl border border-pt-text/5">
            <CustomCheckbox checked={isShot} onChange={val => { setIsShot(val); syncStatus('isShot', val); }} label="2. Hoàn tất Bấm Máy (Đã chụp)" />
            <CustomCheckbox checked={isFullyPaid} onChange={val => { setIsFullyPaid(val); syncStatus('isFullyPaid', val); }} label="3. Đã nhận đủ tiền (100%)" />
            <CustomCheckbox checked={isDelivered} onChange={val => { setIsDelivered(val); syncStatus('isDelivered', val); }} label="4. Đã giao toàn bộ File/Ảnh" />
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 pb-2">
          <button onClick={handleDelete} className="w-full py-4 text-red-400 font-bold active:scale-95 transition-transform bg-red-400/10 rounded-xl border border-red-400/20">
            HỦY DỮ LIỆU SHOW NÀY
          </button>
        </div>
        
      </div>
    </BottomSheet>
  );
}
