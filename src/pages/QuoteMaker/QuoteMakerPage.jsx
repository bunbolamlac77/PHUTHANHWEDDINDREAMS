import React, { useState, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import QuoteForm from './QuoteForm';
import QuotePreview from './QuotePreview';
import Toast from '../../components/ui/Toast';
import { exportQuoteAsImage } from '../../utils/exportQuote';
import { Share2, Download, CheckCircle2 } from 'lucide-react';

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
  
  const prevServiceCount = useRef(0);

  // Auto-deposit logic
  React.useEffect(() => {
    const count = selectedServiceIds.length;
    if (count !== prevServiceCount.current) {
      if (count > 0) {
        const autoDeposit = count * 500000;
        // Định dạng thành chuỗi tiền tệ (có dấu .)
        setDepositAmountStr(new Intl.NumberFormat('vi-VN').format(autoDeposit));
      } else {
        setDepositAmountStr('');
      }
      prevServiceCount.current = count;
    }
  }, [selectedServiceIds.length]);

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

  const handleShareImage = async () => {
    setToastMessage('Đang chuẩn bị chia sẻ...');
    try {
      const file = await exportQuoteAsImage('quote-export-node');
      
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Báo Giá Wedding Dreams',
          text: `Gửi dâu rể báo giá từ Phu Thanh Wedding Dreams`
        });
        setToastMessage('Đã mở menu chia sẻ!');
      } else {
        // Fallback: Copy to clipboard if possible, or tell user to download
        try {
          await navigator.clipboard.write([
            new window.ClipboardItem({ [file.type]: file })
          ]);
          setToastMessage('Đã Copy Báo giá vào Clipboard!');
        } catch {
          setToastMessage('Thiết bị không hỗ trợ chia sẻ trực tiếp. Vui lòng nhấn TẢI VỀ');
        }
      }
    } catch (error) {
       console.error('Lỗi chia sẻ', error);
       setToastMessage('Lỗi khi chuẩn bị ảnh. Vui lòng thử lại');
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
      <div className="p-4 flex items-center gap-3.5">
        <div className="w-[52px] h-[52px] rounded-full border border-pt-gold/30 flex items-center justify-center bg-[#162620] shadow-[0_0_15px_rgba(212,175,55,0.1)] overflow-hidden shrink-0">
          {settings.studioLogo ? (
            <img src={settings.studioLogo} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            <img src="/icons/moi-trongtrang.png" alt="Logo" className="w-[38px] h-[38px] object-contain" />
          )}
        </div>
        <h1 className="text-[21px] font-heading text-pt-gold tracking-wider uppercase font-extrabold">Tạo Báo Giá</h1>
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
             
             <button onClick={handleShareImage} className="w-full bg-pt-gold hover:opacity-90 active:scale-95 transition-transform text-black font-bold text-[15px] rounded-xl py-3.5 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(212,175,55,0.2)]">
                <Share2 size={18} /> CHIA SẺ ẢNH (ZALO/FB)
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
