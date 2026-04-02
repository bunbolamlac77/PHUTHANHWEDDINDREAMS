import React, { useRef } from 'react';
import { Camera } from 'lucide-react';
import { compressImage } from '../../utils/compressImage';

export default function ImageUploader({ imageUrl, onImageSelect, className = '' }) {
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await compressImage(file, 200);
      onImageSelect(base64);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button 
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-20 h-20 bg-pt-elevated border-2 border-dashed border-[#3A3A3A] rounded-2xl flex items-center justify-center overflow-hidden active:scale-95 transition-transform"
      >
        {imageUrl ? (
          <img src={imageUrl} alt="Logo" className="w-full h-full object-contain p-1" />
        ) : (
          <Camera className="text-pt-muted" size={24} />
        )}
      </button>
      <input 
        ref={fileInputRef} 
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={handleFileChange} 
      />
    </div>
  );
}
