import React, { forwardRef } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDateVN } from '../../utils/dateHelpers';

const QuotePreview = forwardRef(({ settings, customerName, eventDate, location, selectedServices, extraCosts, finalAmount, depositAmount }, ref) => {
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

          {/* MAIN TABLE: Services & Extra Costs - HORIZONTAL SCROLLABLE */}
          <div className="mb-6">
            <div className="opacity-80 border-b border-[#D4AF37]/10 pb-1.5 mb-2">
              <span className="text-[#D4AF37] font-bold text-[10px] uppercase tracking-widest">Dịch vụ chi tiết</span>
            </div>

            {/* Wrapper cuộn ngang */}
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <table style={{ borderCollapse: 'collapse', minWidth: '100%', tableLayout: 'auto' }}>
                {/* Header row */}
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
                    <th style={{ textAlign: 'left', padding: '6px 8px 6px 0', color: '#D4AF37', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                      #
                    </th>
                    <th style={{ textAlign: 'left', padding: '6px 16px 6px 8px', color: '#D4AF37', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                      Dịch Vụ
                    </th>
                    <th style={{ textAlign: 'right', padding: '6px 0 6px 16px', color: '#D4AF37', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                      Đơn Giá
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* Dịch vụ chính */}
                  {selectedServices.map((svc, idx) => (
                    <tr key={svc.id} style={{ borderBottom: '1px solid rgba(212,175,55,0.08)' }}>
                      <td style={{ padding: '7px 8px 7px 0', color: '#D4AF37', fontSize: '12px', fontWeight: 700, verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                        {idx + 1}.
                      </td>
                      <td style={{ padding: '7px 16px 7px 8px', color: '#F3E9D2', fontSize: '14px', fontWeight: 500, verticalAlign: 'top', minWidth: '160px' }}>
                        {svc.name}
                      </td>
                      <td style={{ padding: '7px 0 7px 16px', color: '#F3E9D2', fontSize: '14px', fontWeight: 700, textAlign: 'right', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                        {formatCurrency(svc.price)}
                      </td>
                    </tr>
                  ))}

                  {/* Phụ phí / Extra costs */}
                  {extraCosts.map((item, i) => {
                    const price = Number(item.priceStr.replace(/\D/g, '') || 0);
                    return (
                      <tr key={`extra-${i}`} style={{ borderBottom: '1px solid rgba(212,175,55,0.06)' }}>
                        <td style={{ padding: '5px 8px 5px 0', color: '#9CA3AF', fontSize: '11px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                          ↳
                        </td>
                        <td style={{ padding: '5px 16px 5px 8px', color: '#9CA3AF', fontSize: '13px', fontStyle: 'italic', verticalAlign: 'top', minWidth: '160px' }}>
                          {item.name || 'Phụ phí'}
                        </td>
                        <td style={{ padding: '5px 0 5px 16px', color: '#9CA3AF', fontSize: '13px', fontStyle: 'italic', textAlign: 'right', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                          {formatCurrency(price)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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

          {/* 5. DELIVERABLES (SẢN PHẨM NHẬN ĐƯỢC) - Rút gọn theo category */}
          <div className="flex-1">
            <h4 style={{ color: '#D4AF37', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid rgba(212,175,55,0.1)', paddingBottom: '6px', marginBottom: '10px' }}>
              Sản phẩm nhận được
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: selectedServices.length > 1 ? 'repeat(2, 1fr)' : '1fr', gap: '12px 20px' }}>
              {selectedServices.map(svc => {
                if (!svc.deliverables || svc.deliverables.length === 0) return null;

                // Lọc deliverables theo category
                const isVideo = svc.category === 'video';
                const filtered = svc.deliverables.filter(item => {
                  if (isVideo) {
                    // Gói quay: chỉ giữ dòng Phim và Tặng kèm
                    return /phim|tặng kèm/i.test(item);
                  } else {
                    // Gói chụp: chỉ giữ dòng Album và Ảnh lớn/treo tường
                    return /album|ảnh lớn|treo tường/i.test(item);
                  }
                });

                if (filtered.length === 0) return null;

                return (
                  <div key={svc.id}>
                    <p style={{ color: '#F3E9D2', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', marginBottom: '6px', lineHeight: 1.3 }}>
                      {svc.name}:
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {filtered.map((item, i) => (
                        <li key={i} style={{ color: '#9CA3AF', fontSize: '10.5px', lineHeight: 1.4, display: 'flex', alignItems: 'flex-start', gap: '5px' }}>
                          <span style={{ color: '#D4AF37', fontWeight: 700, flexShrink: 0 }}>•</span>
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
