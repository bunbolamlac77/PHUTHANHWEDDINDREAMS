import React from 'react';
import { Settings, Camera, CalendarDays } from 'lucide-react';

const TABS = [
  { id: 'shows', icon: CalendarDays, label: 'Danh Sách' },
  { id: 'quote', icon: Camera, label: 'Tạo Báo Giá' },
  { id: 'settings', icon: Settings, label: 'Cài Đặt' },
];

export default function BottomTabBar({ activeTab = 'quote', onChange }) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[9999] bg-transparent">
      {/* Background TabBar */}
      <div className="absolute bottom-0 left-0 w-full h-[65px] bg-[#101A15] border-t border-[#D4AF37]/10 shadow-[0_-15px_40px_rgba(0,0,0,0.6)] rounded-t-[28px] pb-safe"></div>
      
      <div className="flex items-center justify-between h-[65px] relative px-8 pb-safe">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          // Nút Giữa Floating Cắt Khoét (Cut-out Notch fake)
          if (tab.id === 'quote') {
             return (
               <button
                 key={tab.id}
                 onClick={() => onChange(tab.id)}
                 className="relative flex flex-col items-center justify-center -mt-[38px] active:scale-95 transition-transform"
               >
                 <div className={`w-[74px] h-[74px] rounded-full flex items-center justify-center border-[8px] border-[#0B1410] transition-all duration-300 ${isActive ? 'bg-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.7)]' : 'bg-[#162620]'}`}>
                   <Icon size={28} className={isActive ? 'text-[#0B1410]' : 'text-[#D4AF37]'} strokeWidth={isActive ? 2.5 : 2} />
                 </div>
               </button>
             );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="flex flex-col items-center justify-center w-[80px] h-full active:scale-95 transition-all duration-300 mt-2"
            >
              <Icon 
                size={22} 
                className={`mb-1.5 transition-colors ${isActive ? 'text-pt-gold' : 'text-[#5C5C5C]'}`} 
              />
              <span className={`text-[11px] font-bold tracking-wide transition-colors ${isActive ? 'text-pt-gold' : 'text-[#5C5C5C]'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
