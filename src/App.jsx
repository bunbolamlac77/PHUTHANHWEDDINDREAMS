import React, { useState } from 'react';
import BottomTabBar from './components/layout/BottomTabBar';
import SafeAreaWrapper from './components/layout/SafeAreaWrapper';
import QuoteMakerPage from './pages/QuoteMaker/QuoteMakerPage';
import SettingsPage from './pages/Settings/SettingsPage';
import ShowManagerPage from './pages/ShowManager/ShowManagerPage';

function App() {
  // Simple App Router using state
  const [activeTab, setActiveTab] = useState('quote'); 

  const renderModule = () => {
    switch (activeTab) {
      case 'settings':
        return <SettingsPage />;
      case 'quote':
        return <QuoteMakerPage />;
      case 'shows':
      default:
        return <ShowManagerPage />;
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-pt-base overflow-hidden">
      <SafeAreaWrapper>
        {renderModule()}
      </SafeAreaWrapper>
      <BottomTabBar activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}

export default App;
