import React, { forwardRef } from 'react';
import { formatCurrency, parseCurrency } from '../../utils/formatCurrency';
import { formatDateVN } from '../../utils/dateHelpers';
import { extractDeliverables } from '../../utils/deliverableHelpers';

const QuotePreview = forwardRef(({ settings, customerName, eventDate, location, selectedServices, extraCosts, finalAmount, depositAmount }, ref) => {
  const remainingAmount = Math.max(0, finalAmount - depositAmount);
  const hasNoAlbumCost = extraCosts.some(e => /không in album/i.test(e.name || ''));

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
          minHeight: '600px',
        }}
      >
        <div className="px-7 py-8 flex flex-col h-full font-sans">
          
          {/* 1. HEADER (Logo + Cty + Báo giá) */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3 flex-1">
               <div className="w-[48px] h-[48px] rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-[#162620] shrink-0 overflow-hidden">
                  {settings.studioLogo ? (
                    <img src={settings.studioLogo} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <img src="/icons/logo-original.png" alt="Logo" className="w-full h-full object-contain p-1.5" />
                  )}
               </div>
               
               <div className="flex flex-col ml-0.5">
                  <h2 className="text-[#D4AF37] font-serif text-[15px] leading-tight font-medium uppercase tracking-[0.12em]">
                    PHU THANH WEDDING<br/>DREAMS
                  </h2>
                  <div className="text-[#9CA3AF] text-[10px] mt-0.5 space-y-0.2 font-medium">
                    <p>Hotline/Zalo: {settings.studioPhone || '076 481 6715'}</p>
                    <p>Địa chỉ: {settings.studioAddress || 'Phường Tân Hạnh, Vĩnh Long'}</p>
                  </div>
               </div>
            </div>

            <div className="text-right">
              <span className="text-[#F3E9D2] font-serif text-[24px] uppercase leading-[0.9] italic tracking-widest block">BÁO<br/>GIÁ</span>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: 'rgba(212, 175, 55, 0.3)', marginBottom: '14px' }}></div>

          {/* 2. CUSTOMER BLOCK */}
          <div className="mb-4">
            <h3 className="text-[#F3E9D2] font-serif text-[18px] mb-1">{customerName || 'Tên Khách Hàng'}</h3>
            <div className="text-[#9CA3AF] text-[12px] font-medium">
              <p>Ngày chụp: {formatDateVN(eventDate)} {location && <span className="opacity-60 ml-2">• {location}</span>}</p>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: 'rgba(212, 175, 55, 0.3)', marginBottom: '12px' }}></div>

          {/* 3. MAIN TABLE: Services & Extra Costs */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#D4AF37] font-bold text-[11px] uppercase tracking-[0.2em]">DỊCH VỤ</span>
            <span className="text-[#D4AF37] font-bold text-[11px] uppercase tracking-[0.2em]">THÀNH TIỀN</span>
          </div>

          {/* Wrapper bảng giá */}
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ borderCollapse: 'collapse', minWidth: '100%', tableLayout: 'auto' }}>
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
                    <td style={{ padding: '7px 16px 7px 8px', color: '#F3E9D2', fontSize: '13px', fontWeight: 500, verticalAlign: 'top', minWidth: '160px' }}>
                      {svc.name}
                    </td>
                    <td style={{ padding: '7px 0 7px 16px', color: '#F3E9D2', fontSize: '13px', fontWeight: 700, textAlign: 'right', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                      {formatCurrency(svc.price)}
                    </td>
                  </tr>
                ))}

                {/* Phụ phí / Extra costs */}
                {extraCosts.map((item, i) => {
                  const price = parseCurrency(item.priceStr);
                  const isDiscount = price < 0;
                  return (
                    <tr key={`extra-${i}`} style={{ borderBottom: '1px solid rgba(212,175,55,0.06)' }}>
                      <td style={{ padding: '5px 8px 5px 0', color: isDiscount ? '#EF4444' : '#9CA3AF', fontSize: '11px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                        {isDiscount ? '−' : '↳'}
                      </td>
                      <td style={{ padding: '5px 16px 5px 8px', color: isDiscount ? '#FCA5A5' : '#9CA3AF', fontSize: '12px', fontStyle: 'italic', verticalAlign: 'top', minWidth: '160px' }}>
                        {item.name || 'Phụ phí'}
                      </td>
                      <td style={{ padding: '5px 0 5px 16px', color: isDiscount ? '#EF4444' : '#9CA3AF', fontSize: '12px', fontStyle: 'italic', textAlign: 'right', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                        {formatCurrency(price)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 4. TOTAL BAR */}
          <div className="mb-6 space-y-1.5 mt-2">
            <div className="flex justify-between items-center py-1.5 border-t border-[#D4AF37]/10 mt-2">
               <span className="text-[#F3E9D2] text-[14px] font-bold uppercase tracking-tight">Tổng cộng</span>
               <span className="text-[#F3E9D2] text-[16px] font-bold">{formatCurrency(finalAmount)}</span>
            </div>
            
            <div className="flex justify-between items-center">
               <span className="text-[#D4AF37] text-[12px] font-bold opacity-85">Cọc trước</span>
               <span className="text-[#D4AF37] text-[13px] font-bold">{formatCurrency(depositAmount)}</span>
            </div>

            <div className="flex justify-between items-center pb-1">
               <span className="text-[#9CA3AF] text-[12px] font-medium opacity-70">Còn lại</span>
               <span className="text-[#9CA3AF] text-[13px] font-medium">{formatCurrency(remainingAmount)}</span>
            </div>
          </div>

          {/* 5. DELIVERABLES (SẢN PHẨM & QUYỀN LỢI NHẬN ĐƯỢC) */}
          {selectedServices.some(s => extractDeliverables(s).length > 0) && (
            <div className="flex-1 mt-1">
              <h4 style={{ color: '#D4AF37', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                SẢN PHẨM & QUYỀN LỢI NHẬN ĐƯỢC
              </h4>
              
              <div className={`grid ${selectedServices.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-x-6 gap-y-4`}>
                {selectedServices.map(svc => {
                  const items = extractDeliverables(svc);
                  if (items.length === 0) return null;

                  return (
                    <div key={svc.id} className="flex-1">
                      <p style={{ color: '#F3E9D2', fontWeight: 700, fontSize: '13px', marginBottom: '6px', borderLeft: '2px solid #D4AF37', paddingLeft: '8px' }}>
                        {svc.name}:
                      </p>
                      <ul className="space-y-1.5">
                        {items.map((item, i) => {
                          const isAlbumItem = /album|lồng ảnh/i.test(item);
                          const isStriked = hasNoAlbumCost && isAlbumItem;

                          return (
                            <li key={i} className="flex items-start gap-2 text-[#9CA3AF] text-[11px] leading-snug">
                              <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${isStriked ? 'bg-red-400' : 'bg-[#D4AF37]'}`}></span>
                              <span className="break-words">
                                {isStriked ? (
                                  <>
                                    <span className="line-through opacity-50">{item}</span>
                                    <span className="text-red-400 font-semibold ml-1.5 text-[10px] block sm:inline">
                                      (Đã trừ 300k - Không in album)
                                    </span>
                                  </>
                                ) : (
                                  item
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* FOOTER MESSAGES */}
          <div className="mt-6 text-center text-[#9CA3AF] text-[10px] italic opacity-80">
            Cảm ơn bạn đã lựa chọn Phu Thanh Wedding Dreams!
          </div>

        </div>
      </div>
    </div>
  );
});

export default QuotePreview;
