import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import QuoteForm from './QuoteForm';
import QuotePreview from './QuotePreview';
import Toast from '../../components/ui/Toast';
import { exportQuoteAsImage } from '../../utils/exportQuote';
import { Share2, CheckCircle2 } from 'lucide-react';

export default function QuoteMakerPage({ editingShow, onClearEdit }) {
  const { settings, services, extraCostTemplates, addShow, updateShow } = useAppContext();
  
  const [groomName, setGroomName] = useState('');
  const [brideName, setBrideName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  
  const [extraCosts, setExtraCosts] = useState([]); 
  const [depositAmountStr, setDepositAmountStr] = useState('');
  
  const prevServiceCount = useRef(0);

  // ── Điền sẵn form khi đang edit show ──────────────────────────────────────
  useEffect(() => {
    if (editingShow) {
      // Tách tên: "Rể & Dâu" hoặc chỉ 1 tên
      const parts = (editingShow.customerName || '').split(' & ');
      setGroomName(parts[0] || '');
      setBrideName(parts[1] || '');
      setEventDate(editingShow.eventDate || '');
      setPhone(editingShow.phone || '');
      setLocation(editingShow.location || '');
      setSelectedServiceIds(editingShow.selectedServiceIds || []);
      setExtraCosts(editingShow.extraCosts || []);
      const dep = editingShow.depositAmount;
      setDepositAmountStr(dep ? new Intl.NumberFormat('vi-VN').format(dep) : '');
      // Reset auto-deposit counter
      prevServiceCount.current = (editingShow.selectedServiceIds || []).length;
      // Hiển thị preview ngay
      setShowExportOptions(true);
      setTimeout(() => previewRef.current?.scrollIntoView({ behavior: 'smooth' }), 400);
    } else {
      // Reset form khi không edit
      setGroomName('');
      setBrideName('');
      setEventDate('');
      setPhone('');
      setLocation('');
      setSelectedServiceIds([]);
      setExtraCosts([]);
      setDepositAmountStr('');
      setShowExportOptions(false);
      prevServiceCount.current = 0;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingShow]);

  // Auto-deposit logic (chỉ áp dụng khi KHÔNG đang edit)
  useEffect(() => {
    if (editingShow) return; // Không override khi edit
    const count = selectedServiceIds.length;
    if (count !== prevServiceCount.current) {
      if (count > 0) {
        const autoDeposit = count * 500000;
        setDepositAmountStr(new Intl.NumberFormat('vi-VN').format(autoDeposit));
      } else {
        setDepositAmountStr('');
      }
      prevServiceCount.current = count;
    }
  }, [selectedServiceIds.length, editingShow]);

  const [toastMessage, setToastMessage] = useState('');
  const previewRef = useRef(null);

  // Tính toán
  const selectedServices = services.filter(s => selectedServiceIds.includes(s.id));
  const servicesTotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const extrasTotal = extraCosts.reduce((sum, item) => sum + Number(item.priceStr.replace(/\D/g, '') || 0), 0);
  const subtotal = servicesTotal + extrasTotal;
  const finalAmount = subtotal;
  const depositAmount = Number(depositAmountStr.replace(/\D/g, '') || 0);

  // Nối tên
  const customerName = [groomName, brideName].filter(Boolean).join(' & ');

  const [showExportOptions, setShowExportOptions] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleSaveAndExport = async () => {
    if (!customerName || selectedServiceIds.length === 0) {
      setToastMessage('Vui lòng nhập Tên và chọn ít nhất 1 Gói chụp!');
      return;
    }
    
    const showData = {
      customerName, eventDate, phone, location, selectedServiceIds, extraCosts,
      subtotal, discountAmount: 0, finalAmount, depositAmount
    };

    if (editingShow) {
      // Cập nhật show hiện tại, giữ lại trạng thái
      await updateShow(editingShow.id, {
        ...editingShow,
        ...showData,
      });
      setToastMessage('Đã cập nhật báo giá thành công!');
    } else {
      // Tạo show mới
      await addShow(showData);
      setToastMessage('Lưu thông tin thành công!');
    }
    
    setShowExportOptions(true);

    // scroll tới Preview
    setTimeout(() => {
       previewRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);

    // Tự động xuất và chia sẻ ảnh
    setTimeout(() => autoShareImage(customerName), 800);
  };

  // ── Auto-share: tự động mở Share Sheet ngay sau khi tạo báo giá ──────────
  const autoShareImage = async (name) => {
    setIsExporting(true);
    try {
      const file = await exportQuoteAsImage('quote-export-node');
      
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Báo Giá Wedding Dreams',
          text: `Báo giá từ PhuThanh Wedding Dreams – ${name}`,
        });
        setToastMessage('Đã mở Share Sheet! Chọn "Lưu Ảnh" để lưu vào album.');
      } else {
        // Fallback: download thẳng
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `BaoGia-${(name || 'phuthanh').replace(/ /g, '')}.png`;
        a.click();
        URL.revokeObjectURL(url);
        setToastMessage('Đã tải ảnh xuống máy!');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Lỗi chia sẻ', error);
        setToastMessage('Không thể tự động chia sẻ. Dùng nút bên dưới.');
      }
    } finally {
      setIsExporting(false);
    }
  };

  const handleManualShare = async () => {
    setIsExporting(true);
    try {
      const file = await exportQuoteAsImage('quote-export-node');
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Báo Giá Wedding Dreams',
          text: `Báo giá từ PhuThanh Wedding Dreams – ${customerName}`,
        });
      } else {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = `BaoGia-${(customerName || 'phuthanh').replace(/ /g, '')}.png`;
        a.click();
        URL.revokeObjectURL(url);
        setToastMessage('Đã tải ảnh!');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        setToastMessage('Lỗi khi xuất ảnh. Vui lòng thử lại.');
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="pb-[130px]">
      <div className="p-4 flex items-center gap-3.5">
        <div className="w-[52px] h-[52px] rounded-full border border-pt-gold/30 flex items-center justify-center bg-[#162620] shadow-[0_0_15px_rgba(212,175,55,0.1)] overflow-hidden shrink-0">
          {settings.studioLogo ? (
            <img src={settings.studioLogo} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            <img src="/icons/moi-trongtrang.png" alt="Logo" className="w-[38px] h-[38px] object-contain" />
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-[21px] font-heading text-pt-gold tracking-wider uppercase font-extrabold">
            {editingShow ? 'Chỉnh Sửa Báo Giá' : 'Tạo Báo Giá'}
          </h1>
          {editingShow && (
            <p className="text-pt-muted text-[12px] mt-0.5">
              Đang sửa: <span className="text-pt-gold font-medium">{editingShow.customerName}</span>
            </p>
          )}
        </div>
        {editingShow && (
          <button
            onClick={() => { onClearEdit(); }}
            className="text-pt-muted text-[12px] px-3 py-1.5 rounded-lg bg-pt-elevated border border-pt-text/10 active:scale-95 transition-transform"
          >
            + Tạo mới
          </button>
        )}
      </div>

      <QuoteForm 
        groomName={groomName} setGroomName={setGroomName}
        brideName={brideName} setBrideName={setBrideName}
        eventDate={eventDate} setEventDate={setEventDate}
        phone={phone} setPhone={setPhone}
        location={location} setLocation={setLocation}
        
        services={services}
        selectedServiceIds={selectedServiceIds} setSelectedServiceIds={setSelectedServiceIds}
        extraCosts={extraCosts} setExtraCosts={setExtraCosts}
        depositAmountStr={depositAmountStr} setDepositAmountStr={setDepositAmountStr}
        extraCostTemplates={extraCostTemplates}
        
        isEditing={!!editingShow}
        onSave={handleSaveAndExport}
      />

      <QuotePreview 
        ref={previewRef}
        settings={settings}
        customerName={customerName}
        eventDate={eventDate}
        location={location}
        selectedServices={selectedServices}
        extraCosts={extraCosts}
        discountAmount={0}
        finalAmount={finalAmount}
        depositAmount={depositAmount}
      />

      {/* Nút hành động – chỉ hiện khi đã tạo */}
      {showExportOptions && (
        <div className="px-4 mt-6">
          <div className="bg-[#101A15] border border-[#D4AF37]/20 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center gap-2 justify-center mb-2">
              <CheckCircle2 className="text-[#10B981]" size={20} />
              <h3 className="text-pt-gold font-bold text-[16px]">Bảng Giá Đã Sẵn Sàng</h3>
            </div>

            <button
              onClick={handleManualShare}
              disabled={isExporting}
              className="w-full bg-pt-gold hover:opacity-90 active:scale-95 transition-transform text-black font-bold text-[15px] rounded-xl py-3.5 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(212,175,55,0.2)] disabled:opacity-60"
            >
              <Share2 size={18} />
              {isExporting ? 'Đang xử lý...' : 'CHIA SẺ / LƯU VÀO ALBUM'}
            </button>

            <p className="text-center text-pt-muted text-[11px] opacity-70">
              📱 Trên iOS: nhấn "Lưu Ảnh" trong Share Sheet để lưu vào Album
            </p>
          </div>
        </div>
      )}

      <Toast message={toastMessage} visible={!!toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
}
