import React, { useState } from 'react';
import { exportQuoteAsImage, shareQuoteImage } from '../../utils/exportQuote';
import { Camera, Save } from 'lucide-react';

export default function QuoteActionBar({ onSave }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const file = await exportQuoteAsImage('quote-export-node');
      await shareQuoteImage(file);
    } catch (e) {
      console.error(e);
      alert('Lỗi xuất báo giá!');
    }
    setIsExporting(false);
  };

  return (
    <div className="fixed bottom-[calc(60px+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pb-4 ptr-2 z-sticky pointer-events-none">
      <div className="flex gap-3 pointer-events-auto">
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="flex-1 bg-[rgba(22,38,32,0.9)] backdrop-blur-md border-2 border-pt-gold text-pt-gold font-bold py-3.5 rounded-[16px] flex justify-center items-center gap-2 active:scale-95 transition-transform shadow-[0_4px_20px_rgba(212,175,55,0.2)] disabled:opacity-50"
        >
          <Camera size={20} />
          <span>{isExporting ? 'Đang xuất...' : 'Ảnh Báo Giá'}</span>
        </button>
        
        <button 
          onClick={onSave}
          className="flex-1 bg-pt-gold text-black font-bold py-3.5 rounded-[16px] flex justify-center items-center gap-2 active:scale-95 transition-transform shadow-[0_4px_20px_rgba(212,175,55,0.4)]"
        >
          <Save size={20} />
          <span>Lưu Show</span>
        </button>
      </div>
    </div>
  );
}
