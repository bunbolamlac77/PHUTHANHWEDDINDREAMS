import React from 'react';
import ImageUploader from '../../components/shared/ImageUploader';

export default function StudioInfoSection({ settings, setSettings }) {
  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value, updatedAt: new Date().toISOString() });
  };

  return (
    <section className="bg-[rgba(22,38,32,0.8)] backdrop-blur-xl border border-pt-text/10 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <h2 className="text-title font-heading text-pt-text mb-4">Thông tin Studio</h2>
      
      <div className="flex gap-4 items-start mb-5">
        <div className="flex-shrink-0">
          <ImageUploader 
            imageUrl={settings.studioLogo} 
            onImageSelect={(val) => handleChange('studioLogo', val)} 
          />
        </div>
        <div className="flex-1 space-y-3">
          <input 
            type="text" 
            placeholder="Tên Studio"
            className="w-full bg-pt-elevated border-1.5 border-transparent focus:border-pt-gold rounded-xl px-4 py-3 text-pt-text text-[15px] outline-none"
            value={settings.studioName}
            onChange={e => handleChange('studioName', e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Slogan"
            className="w-full bg-pt-elevated border-1.5 border-transparent focus:border-pt-gold rounded-xl px-4 py-3 text-pt-text text-[15px] outline-none"
            value={settings.slogan}
            onChange={e => handleChange('slogan', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        <input 
          type="tel" 
          placeholder="Số điện thoại"
          className="w-full bg-pt-elevated border-1.5 border-transparent focus:border-pt-gold rounded-xl px-4 py-3 text-pt-text text-[15px] outline-none"
          value={settings.studioPhone}
          onChange={e => handleChange('studioPhone', e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Địa chỉ"
          className="w-full bg-pt-elevated border-1.5 border-transparent focus:border-pt-gold rounded-xl px-4 py-3 text-pt-text text-[15px] outline-none"
          value={settings.studioAddress}
          onChange={e => handleChange('studioAddress', e.target.value)}
        />
      </div>
    </section>
  );
}
