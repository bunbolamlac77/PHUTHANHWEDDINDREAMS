import React from 'react';

const OPTIONS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'unpaid', label: 'Chờ cọc' },
  { id: 'deposited', label: 'Đã cọc' },
  { id: 'completed', label: 'Hoàn tất' }
];

export default function StatusFilterBar({ activeFilter, onChange }) {
  return (
    <div className="px-4 py-2">
      <div className="flex bg-[#121F1A] p-1 rounded-xl border border-pt-text/5 shadow-inner">
        {OPTIONS.map(opt => {
          const isActive = activeFilter === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`flex-1 py-2.5 rounded-lg text-[13px] font-bold transition-all duration-300 relative ${
                isActive 
                  ? 'text-pt-gold bg-[#1A2E26] shadow-[0_2px_8px_rgba(0,0,0,0.4)] border border-pt-gold/20' 
                  : 'text-[#5C6B64] hover:text-pt-muted active:scale-95'
              }`}
            >
              {opt.label}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-pt-gold rounded-full shadow-[0_0_8px_#D4AF37]"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
