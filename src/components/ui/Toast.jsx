import React, { useEffect } from 'react';

export default function Toast({ message, visible, onClose, duration = 2500 }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!visible || !message) return null;

  return (
    <div 
      className="fixed left-1/2 -translate-x-1/2 z-toast animate-toast-in pointer-events-none"
      style={{ top: 'calc(var(--safe-top) + 16px)' }}
    >
      <div className="bg-pt-elevated border border-pt-gold/50 rounded-xl px-5 py-3 shadow-lg flex items-center gap-2">
        <span className="text-pt-text text-[14px] font-medium whitespace-nowrap">{message}</span>
      </div>
    </div>
  );
}
