import React, { useState, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import QuoteForm from './QuoteForm';
import QuotePreview from './QuotePreview';
import Toast from '../../components/ui/Toast';
import { exportQuoteAsImage } from '../../utils/exportQuote';
import { Copy, Download, CheckCircle2 } from 'lucide-react';

export default function QuoteMakerPage() {
  const { settings, services, addShow } = useAppContext();
  
  const [groomName, setGroomName] = useState('');
  const [brideName, setBrideName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  
  const [extraCosts, setExtraCosts] = useState([]); 
  const [depositAmountStr, setDepositAmountStr] = useState('');
  
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

  const handleSaveAndExport = async () => {
    if (!customerName || selectedServiceIds.length === 0) {
      setToastMessage('Vui lòng nhập Tên và chọn ít nhất 1 Gói chụp!');
      return;
    }
    
    // Auto Save Show
    addShow({
      customerName, eventDate, phone, location, selectedServiceIds, extraCosts,
      subtotal, discountAmount: 0, finalAmount, depositAmount
    });
    
    setToastMessage('Lưu thông tin thành công!');
    setShowExportOptions(true); // Mở khoá công cụ tải ảnh

    // scroll tới Preview
    setTimeout(() => {
       previewRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleCopyImage = async () => {
    setToastMessage('Đang xử lý xuất ảnh...');
    try {
      const file = await exportQuoteAsImage('quote-export-node');
      await navigator.clipboard.write([
        new window.ClipboardItem({ [file.type]: file })
      ]);
      setToastMessage('Đã Copy Báo giá. Sẵn sàng dán!');
    } catch (error) {
       console.error('Copy lỗi', error);
       setToastMessage('Trình duyệt không hỗ trợ Copy. Vui lòng nhấn TẢI VỀ');
    }
  };

  const handleDownloadImage = async () => {
    setToastMessage('Đang tải ảnh...');
    try {
      const file = await exportQuoteAsImage('quote-export-node');
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BaoGia-${customerName.replace(/ /g, '')}.png`;
      a.click();
      URL.revokeObjectURL(url);
      setToastMessage('Đã tải xong!');
    } catch (error) {
      console.error(error);
      setToastMessage('Lỗi tải ảnh');
    }
  };

  return (
    <div className="pb-[130px]">
      <div className="p-4 flex items-center gap-3">
        {settings.studioLogo ? (
           <img src={settings.studioLogo} alt="Logo" className="w-[40px] h-[40px] rounded-full object-cover border border-pt-gold" />
        ) : (
           <div className="w-[40px] h-[40px] rounded-full border flex items-center justify-center text-pt-gold font-serif">PT</div>
        )}
        <h1 className="text-display font-heading text-pt-gold tracking-wide">Tạo Báo Giá</h1>
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

      {/* Nút hành động Xuất File Hiển thị khi đã Lưu */}
      {showExportOptions && (
        <div className="px-4 mt-6">
          <div className="bg-[#101A15] border border-[#D4AF37]/20 rounded-2xl p-5 shadow-lg space-y-4">
             <div className="flex items-center gap-2 justify-center mb-2">
                <CheckCircle2 className="text-[#10B981]" size={20} />
                <h3 className="text-pt-gold font-bold text-[16px]">Bảng Giá Đã Sẵn Sàng</h3>
             </div>
             
             <button onClick={handleCopyImage} className="w-full bg-[#162620] hover:bg-[#1E332A] border border-pt-gold/50 active:scale-95 transition-transform text-pt-gold font-bold text-[15px] rounded-xl py-3.5 flex items-center justify-center gap-2">
                <Copy size={18} /> COPY ẢNH GỬI ZALO
             </button>

             <button onClick={handleDownloadImage} className="w-full bg-[#162620] hover:bg-[#1E332A] active:scale-[0.98] transition-transform text-pt-text font-bold text-[15px] rounded-xl py-3.5 flex items-center justify-center gap-2">
                <Download size={18} /> LƯU ẢNH VÀO MÁY
             </button>
          </div>
        </div>
      )}

      <Toast message={toastMessage} visible={!!toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
}
