import React from 'react';
import { Settings, FileText, CalendarDays } from 'lucide-react';

const TABS = [
  { id: 'settings', icon: Settings, label: 'Cài Đặt' },
  { id: 'quote', icon: FileText, label: 'Báo Giá' },
  { id: 'shows', icon: CalendarDays, label: 'Show List' },
];

export default function BottomTabBar({ activeTab = 'quote', onChange }) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[#162620]/80 backdrop-blur-2xl border-t border-pt-text/10 z-tabbar pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-around h-[60px]">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="flex flex-col items-center justify-center w-[80px] h-full active:scale-95 transition-transform"
            >
              <Icon 
                size={24} 
                className={`mb-1 transition-colors ${isActive ? 'text-pt-gold' : 'text-[#5C5C5C]'}`} 
              />
              <span className={`text-[10px] font-medium ${isActive ? 'text-pt-gold' : 'text-[#5C5C5C]'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
