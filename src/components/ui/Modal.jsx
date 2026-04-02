import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center pt-safe pb-safe px-4">
      <div className="absolute inset-0 bg-black/70 overlay visible" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-pt-surface/95 backdrop-blur-2xl border border-pt-text/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] rounded-2xl overflow-hidden flex flex-col max-h-[90dvh]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-pt-text/10 shrink-0">
          <h2 className="text-pt-text font-heading text-[18px] font-bold">{title}</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-pt-muted hover:text-pt-text active:scale-95 transition-transform">
            <X size={20} />
          </button>
        </div>
        <div className="p-5 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
