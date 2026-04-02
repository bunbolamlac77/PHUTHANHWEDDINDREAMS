import React from 'react';

const OPTIONS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'unpaid', label: 'Chờ cọc' },
  { id: 'deposited', label: 'Đã cọc' },
  { id: 'completed', label: 'Hoàn tất' }
];

export default function StatusFilterBar({ activeFilter, onChange }) {
  return (
    <div className="flex px-4 py-3 gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
      {OPTIONS.map(opt => {
        const isActive = activeFilter === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`px-5 py-2 rounded-full text-[14px] font-medium transition-colors ${
              isActive 
                ? 'bg-pt-gold text-black shadow-[0_4px_15px_rgba(212,175,55,0.3)]' 
                : 'bg-pt-elevated text-pt-muted active:bg-[#3A3A3A] border border-pt-text/5'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
