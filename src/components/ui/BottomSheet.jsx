import React, { useState, useRef, useEffect } from 'react';

export default function BottomSheet({ isOpen, onClose, title, children }) {
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const sheetRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (isOpen) setCurrentY(0);
  }, [isOpen]);

  const handleTouchStart = (e) => setStartY(e.touches[0].clientY);
  const handleTouchMove = (e) => {
    const deltaY = e.touches[0].clientY - startY;
    if (deltaY > 0) setCurrentY(deltaY);
  };
  const handleTouchEnd = () => {
    if (currentY > 100) onClose();
    else setCurrentY(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-bottomsheet flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/70 overlay visible" onClick={onClose} />
      <div 
        ref={sheetRef}
        className="relative bg-pt-surface/95 backdrop-blur-xl border border-pt-text/10 w-full max-w-sm mx-auto h-[70dvh] rounded-t-[20px] flex flex-col animate-sheet-up shadow-[0_-20px_50px_rgba(0,0,0,0.6)]"
        style={{ transform: `translateY(${currentY}px)`, transition: currentY > 0 ? 'none' : 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)' }}
      >
        <div 
          className="w-full flex justify-center pt-3 pb-1"
          onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
        >
          <div className="w-10 h-1 bg-[#3A3A3A] rounded-full" />
        </div>
        {title && (
          <div className="px-5 pb-3 pt-1 border-b border-pt-text/10">
            <h2 className="text-pt-text font-heading text-[18px] font-bold text-center">{title}</h2>
          </div>
        )}
        <div className="p-5 overflow-y-auto flex-1 pb-safe">
          {children}
        </div>
      </div>
    </div>
  );
}
