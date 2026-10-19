import React from 'react';
import { Camera, Settings } from 'lucide-react';

const TABS = [
  { id: 'quote', icon: Camera, label: 'Tạo Báo Giá' },
  { id: 'settings', icon: Settings, label: 'Cài Đặt' },
];

export default function BottomTabBar({ activeTab = 'quote', onChange }) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-tabbar bg-transparent pointer-events-none">
      {/* Background TabBar với viền vàng gold sang trọng */}
      <div className="absolute bottom-0 left-0 w-full h-[74px] bg-[#101A15]/95 backdrop-blur-xl border-t border-[#D4AF37]/25 shadow-[0_-12px_35px_rgba(0,0,0,0.7)] rounded-t-[28px] pb-safe pointer-events-auto"></div>
      
      {/* 2 Tabs điều hướng cân đối */}
      <div className="flex items-center justify-around h-[74px] relative px-8 pb-safe pointer-events-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-4 rounded-2xl transition-all duration-200 active:scale-95 ${
                isActive ? 'text-pt-gold' : 'text-[#8C8C8C] hover:text-[#B0B0B0]'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center ${
                isActive 
                  ? 'bg-[#D4AF37]/15 shadow-[0_0_20px_rgba(212,175,55,0.25)] border border-[#D4AF37]/30' 
                  : 'bg-transparent'
              }`}>
                <Icon 
                  size={24} 
                  strokeWidth={isActive ? 2.5 : 1.8} 
                  className={isActive ? 'text-pt-gold' : 'text-[#8C8C8C]'}
                />
              </div>
              <span className={`text-[12px] mt-1 tracking-wide transition-colors ${
                isActive ? 'font-bold text-pt-gold' : 'font-medium text-[#8C8C8C]'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
