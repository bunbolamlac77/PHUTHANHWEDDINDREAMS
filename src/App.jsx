import React, { useState } from 'react';
import BottomTabBar from './components/layout/BottomTabBar';
import SafeAreaWrapper from './components/layout/SafeAreaWrapper';
import QuoteMakerPage from './pages/QuoteMaker/QuoteMakerPage';
import SettingsPage from './pages/Settings/SettingsPage';
import ShowManagerPage from './pages/ShowManager/ShowManagerPage';

function App() {
  // Simple App Router using state
  const [activeTab, setActiveTab] = useState('quote');
  const [editingShow, setEditingShow] = useState(null);

  const handleEditQuote = (show) => {
    setEditingShow(show);
    setActiveTab('quote');
  };

  const handleTabChange = (tab) => {
    // Khi chuyển tab thủ công, reset editingShow
    if (tab !== 'quote') setEditingShow(null);
    setActiveTab(tab);
  };

  const renderModule = () => {
    switch (activeTab) {
      case 'settings':
        return <SettingsPage />;
      case 'quote':
        return <QuoteMakerPage editingShow={editingShow} onClearEdit={() => setEditingShow(null)} />;
      case 'shows':
      default:
        return <ShowManagerPage onEditQuote={handleEditQuote} />;
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
