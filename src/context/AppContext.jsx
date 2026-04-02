import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateShowId } from '../utils/generateId';

const DEFAULT_SETTINGS = {
  studioName: 'PhuThanh Wedding Dreams',
  studioAddress: 'Phường Tân Hạnh, Vĩnh Long',
  studioPhone: '0901234567',
  studioEmail: '',
  studioLogo: '',
  slogan: 'Lưu giữ khoảnh khắc trọn vẹn',
  updatedAt: new Date().toISOString(),
};

const DEFAULT_SERVICES = [
  {
    id: 'SV-646718', name: 'Truyền Thống Cưới', price: 2800000,
    category: 'wedding',
    deliverables: ['Album 100 ảnh 13x18 High Quality','01 Ảnh lớn treo tường 40x60cm','Tự tay chọn hình và lồng ảnh'],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: 'SV-486660', name: 'Gói Trọn Vẹn Cảm Xúc (Combo 02 Thợ)', price: 4800000,
    category: 'wedding',
    deliverables: ['Album Photobook Cao Cấp 25x35cm (150 ảnh)','02 Ảnh lớn treo tường 40x60cm','01 Tranh Canvas 60x90cm'],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: 'SV-309191', name: 'Quay Phim Phóng Sự Hành Trình', price: 3500000,
    category: 'wedding',
    deliverables: ['Video Highlight 3-5 phút','Video đầy đủ hành trình','Nhạc nền theo yêu cầu'],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
];

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [settings, setSettings] = useLocalStorage('phuthanh_settings', DEFAULT_SETTINGS);
  const [services, setServices] = useLocalStorage('phuthanh_services', DEFAULT_SERVICES);
  const [shows, setShows] = useLocalStorage('phuthanh_shows', []);

  const addShow = (showData) => {
    const newShow = {
      ...showData,
      id: generateShowId(),
      createdAt: new Date().toISOString(),
      status: {
        isDeposited: showData.depositAmount > 0,
        isShot: false,
        isFullyPaid: false,
        isDelivered: false
      }
    };
    setShows([newShow, ...shows]);
    return newShow;
  };

  const updateShow = (id, updatedData) => {
    setShows(shows.map(show => show.id === id ? { ...show, ...updatedData, updatedAt: new Date().toISOString() } : show));
  };

  const deleteShow = (id) => {
    setShows(shows.filter(show => show.id !== id));
  };

  return (
    <AppContext.Provider value={{
      settings, setSettings,
      services, setServices,
      shows, setShows,
      addShow, updateShow, deleteShow
    }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
