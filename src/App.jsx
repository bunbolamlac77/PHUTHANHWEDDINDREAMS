import React, { useState } from 'react';
import BottomTabBar from './components/layout/BottomTabBar';
import SafeAreaWrapper from './components/layout/SafeAreaWrapper';
import QuoteMakerPage from './pages/QuoteMaker/QuoteMakerPage';
import SettingsPage from './pages/Settings/SettingsPage';

function App() {
  // Chỉ sử dụng 2 tab: 'quote' (Tạo Báo Giá) và 'settings' (Cài Đặt)
  // Đóng băng và loại bỏ hoàn toàn tab 'shows' (Danh Sách)
  const [activeTab, setActiveTab] = useState('quote');

  const handleTabChange = (tab) => {
    if (tab === 'quote' || tab === 'settings') {
      setActiveTab(tab);
    }
  };

  const renderModule = () => {
    switch (activeTab) {
      case 'settings':
        return <SettingsPage />;
      case 'quote':
      default:
        return <QuoteMakerPage />;
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-pt-base overflow-hidden">
      <SafeAreaWrapper>
        {renderModule()}
      </SafeAreaWrapper>
      <BottomTabBar activeTab={activeTab} onChange={handleTabChange} />
    </div>
  );
}

export default App;
