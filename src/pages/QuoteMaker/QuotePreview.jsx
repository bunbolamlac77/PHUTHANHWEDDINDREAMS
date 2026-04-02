import React, { forwardRef } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDateVN } from '../../utils/dateHelpers';

const QuotePreview = forwardRef(({ settings, customerName, eventDate, location, selectedServices, extraCosts, discountAmount, finalAmount, depositAmount }, ref) => {
  const remainingAmount = Math.max(0, finalAmount - depositAmount);

  return (
    <div className="px-4 pb-24">
      {/* Container chuẩn tỉ lệ dọc với Border rêu */}
      <div 
        id="quote-export-node"
        ref={ref}
        className="w-full relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden rounded-xl" 
        style={{ 
          // Không dùng gradient phức tạp để html2canvas không lỗi render
          backgroundColor: '#0B1410', 
          border: '1px solid rgba(212, 175, 55, 0.4)',
          minHeight: '800px',
        }}
      >
        <div className="px-7 py-8 flex flex-col h-full font-sans">
          
          {/* 1. HEADER (Logo + Cty + Báo giá) */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <img src="/icons/moi-trongtrang.png" alt="Logo" className="w-[70px] h-auto object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.2)]" />
              {/* Info Studio */}
              <div>
                 <h2 className="text-[#D4AF37] font-serif text-[18px] leading-tight font-medium uppercase tracking-wide">
                   PHU THANH WEDDING<br/>DREAMS
                 </h2>
                 <div className="text-[#9CA3AF] text-[11px] mt-2 space-y-0.5">
                   <p>Hotline/Zalo: {settings.studioPhone}</p>
                   <p>Địa chỉ: {settings.studioAddress}</p>
                 </div>
              </div>
            </div>
            {/* Chữ BÁO GIÁ cực to */}
            <div className="text-right flex items-center h-full pt-1">
              <span className="text-[#F3E9D2] font-serif text-[26px] uppercase leading-tight italic tracking-widest text-right">BÁO<br/>GIÁ</span>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: 'rgba(212, 175, 55, 0.3)', marginBottom: '24px' }}></div>

          {/* 2. CUSTOMER BLOCK - Compact side by side info */}
          <div className="flex justify-between items-end mb-6">
            <div className="flex-1">
              <h3 className="text-[#F3E9D2] font-serif text-[20px] mb-1">{customerName || 'Tên Khách Hàng'}</h3>
              <div className="text-[#9CA3AF] text-[12px] font-medium flex gap-4 uppercase tracking-wider">
                <span>Lễ cưới: {formatDateVN(eventDate)}</span>
                {location && <span>• {location}</span>}
              </div>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: 'rgba(212, 175, 55, 0.3)', marginBottom: '20px' }}></div>

          {/* MAIN LIST: Services & Extra Costs - Full Width Compact */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2 px-0 opacity-80 border-b border-[#D4AF37]/10 pb-1.5">
              <span className="text-[#D4AF37] font-bold text-[10px] uppercase tracking-widest">Dịch vụ chi tiết</span>
              <span className="text-[#D4AF37] font-bold text-[10px] uppercase tracking-widest">Đơn giá</span>
            </div>
            
            <div className="space-y-2.5">
               {selectedServices.map(svc => (
                 <div key={svc.id} className="flex justify-between items-start text-[#F3E9D2]">
                   <div className="flex items-start gap-2 max-w-[75%]">
                     <span className="text-[#D4AF37] mt-1 text-[9px]">✚</span>
                     <span className="text-[14px] font-medium leading-tight">{svc.name}</span>
                   </div>
                   <span className="text-[14px] font-bold tracking-tight">{formatCurrency(svc.price)}</span>
                 </div>
               ))}

               {extraCosts.map((item, i) => {
                 const price = Number(item.priceStr.replace(/\D/g, '') || 0);
                 return (
                   <div key={i} className="flex justify-between items-start text-[#9CA3AF] italic">
                     <div className="max-w-[75%] text-[13px] leading-tight flex items-center gap-2 pl-3">
                       <span>↳</span>
                       <span>{item.name || 'Phụ phí'}</span>
                     </div>
                     <div className="text-[13px] tracking-tight">{formatCurrency(price)}</div>
                   </div>
                 );
               })}
            </div>
          </div>

          {/* TOTAL BAR - ULTRA HORIZONTAL (Khắc phục lỗi Tràn màn hình) */}
          <div className="bg-[#162620] border border-[#D4AF37]/20 rounded-xl px-5 py-3.5 mb-8 flex justify-between items-center shadow-inner">
             <div className="flex items-baseline gap-2">
                <span className="text-[#9CA3AF] text-[11px] uppercase font-bold">Tổng:</span>
                <span className="text-white text-[16px] font-bold">{formatCurrency(finalAmount)}</span>
             </div>
             
             {depositAmount > 0 && (
               <>
                <div className="w-[1px] h-[20px] bg-[#D4AF37]/20 mx-2"></div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[#D4AF37] text-[11px] uppercase font-bold">Cọc:</span>
                  <span className="text-[#D4AF37] text-[14px] font-bold">{formatCurrency(depositAmount)}</span>
                </div>
                <div className="w-[1px] h-[20px] bg-[#D4AF37]/20 mx-2"></div>
                <div className="flex items-baseline gap-2 text-right">
                  <span className="text-[#9CA3AF] text-[11px] uppercase font-bold">Còn:</span>
                  <span className="text-white text-[14px] font-bold">{formatCurrency(remainingAmount)}</span>
                </div>
               </>
             )}
          </div>

          {/* 5. DELIVERABLES (SẢN PHẨM NHẬN ĐƯỢC) */}
          <div className="flex-1">
            <h4 className="text-[#D4AF37] font-bold text-[13px] uppercase tracking-wider mb-3 pl-1 border-b border-[#D4AF37]/10 pb-1 w-fit pr-4">Sản phẩm nhận được</h4>
            <div className={`grid ${selectedServices.length > 1 ? 'grid-cols-2 gap-x-6 gap-y-6' : 'grid-cols-1 gap-y-4'}`}>
              {selectedServices.map(svc => {
                if (!svc.deliverables || svc.deliverables.length === 0) return null;
                return (
                  <div key={svc.id} className="pl-1">
                    <p className="text-[#F3E9D2] font-bold text-[13px] mb-1.5 uppercase leading-tight">{svc.name}:</p>
                    <ul className="space-y-1 pl-0">
                      {svc.deliverables.map((item, i) => (
                        <li key={i} className="text-[#9CA3AF] text-[10.5px] flex items-start leading-[1.4]">
                          <span className="text-[#D4AF37] mr-1.5 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FOOTER MESSAGES */}
          <div className="mt-8 text-center text-[#9CA3AF] text-[11px] italic opacity-80">
            Cảm ơn bạn đã lựa chọn Phu Thanh Wedding Dreams!
          </div>

        </div>
      </div>
    </div>
  );
});

export default QuotePreview;
