import React from 'react';

export default function CustomCheckbox({ checked, onChange, label }) {
  return (
    <button 
      type="button"
      className="flex items-center gap-3 p-2 -ml-2 rounded-lg active:opacity-70 transition-opacity w-full text-left"
      onClick={() => onChange(!checked)}
    >
      <div className={`w-6 h-6 flex-shrink-0 rounded flex items-center justify-center transition-colors duration-200 ${checked ? 'bg-pt-gold border-pt-gold' : 'border-2 border-[#3A3A3A] bg-transparent'}`}>
        {checked && (
          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      {label && <span className="text-pt-text text-[15px] font-medium leading-tight">{label}</span>}
    </button>
  );
}
