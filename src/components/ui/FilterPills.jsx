import React from 'react';

export default function FilterPills({ options, activeId, onChange }) {
  return (
    <div className="flex px-4 py-2 gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
      {options.map((opt) => {
        const isActive = activeId === opt.id;
        return (
          <button
            key={opt.id}
            className={`px-4 py-2 rounded-full text-[14px] font-medium transition-colors ${
              isActive 
                ? 'bg-pt-gold text-black' 
                : 'bg-pt-elevated text-pt-muted active:bg-[#3A3A3A]'
            }`}
            onClick={() => onChange(opt.id)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
