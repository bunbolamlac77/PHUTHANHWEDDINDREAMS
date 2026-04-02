import React from 'react';
import { maskCurrency } from '../../utils/formatCurrency';

export default function CurrencyInput({ value, onChange, placeholder = 'Nhập số tiền...', className = '' }) {
  const handleChange = (e) => {
    const masked = maskCurrency(e.target.value);
    onChange(masked);
  };

  return (
    <div className="relative">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full bg-pt-elevated border-1.5 border-transparent focus:border-pt-gold rounded-xl px-4 py-3.5 text-pt-text text-[16px] outline-none transition-colors ${className}`}
      />
      {value && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-pt-muted font-medium pointer-events-none">VNĐ</span>}
    </div>
  );
}
