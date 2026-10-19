import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getShows, addShow as addShowService, updateShow as updateShowService, deleteShow as deleteShowService } from '../services/showService';
import { DEFAULT_SETTINGS, DEFAULT_SERVICES, DEFAULT_EXTRA_COSTS, DATA_VERSION } from '../config/constants';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [settings, setSettings] = useLocalStorage('phuthanh_settings', DEFAULT_SETTINGS);
  const [services, setServices] = useLocalStorage('phuthanh_services', DEFAULT_SERVICES);
  const [extraCostTemplates, setExtraCostTemplates] = useLocalStorage('phuthanh_extra_costs', DEFAULT_EXTRA_COSTS);
  const [shows, setShows] = useState([]);

  // Tự động kiểm tra và nâng cấp lên bộ dữ liệu mới nhất nếu phiên bản cũ
  useEffect(() => {
    try {
      const savedVersion = localStorage.getItem('phuthanh_data_version');
      if (savedVersion !== DATA_VERSION) {
        // Cập nhật các gói dịch vụ chuẩn và bảng chi phí phát sinh mới
        setServices(DEFAULT_SERVICES);
        setExtraCostTemplates(DEFAULT_EXTRA_COSTS);
        localStorage.setItem('phuthanh_data_version', DATA_VERSION);
      }
    } catch (e) {
      console.warn("Không thể kiểm tra phiên bản dữ liệu:", e);
    }
  }, [setServices, setExtraCostTemplates]);

  // Hàm cho phép người dùng chủ động nạp lại dữ liệu chuẩn từ Cài Đặt
  const resetToDefaultData = useCallback(() => {
    setServices(DEFAULT_SERVICES);
    setExtraCostTemplates(DEFAULT_EXTRA_COSTS);
    try {
      localStorage.setItem('phuthanh_data_version', DATA_VERSION);
    } catch (e) {
      console.warn("Lỗi lưu version:", e);
    }
  }, [setServices, setExtraCostTemplates]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await getShows();
        setShows(data || []);
      } catch (error) {
        console.warn("Firebase shows unavailable (offline or permissions):", error);
      }
    };
    fetchShows();
  }, []);

  const addShow = async (showData) => {
    const newShow = {
      ...showData,
      createdAt: new Date().toISOString(),
      status: {
        isDeposited: false,
        isShot: false,
        isFullyPaid: false,
        isDelivered: false
      }
    };
    try {
      const id = await addShowService(newShow);
      newShow.id = id;
      setShows(prev => [newShow, ...prev]);
      return newShow;
    } catch (error) {
      console.warn("Failed to add show to Firebase:", error);
      // Fallback ID nếu Firebase offline
      newShow.id = 'LOCAL-' + Date.now();
      setShows(prev => [newShow, ...prev]);
      return newShow;
    }
  };

  const updateShow = async (id, updatedData) => {
    try {
      const dataWithTimestamp = { ...updatedData, updatedAt: new Date().toISOString() };
      await updateShowService(id, dataWithTimestamp);
      setShows(prev => prev.map(show => show.id === id ? { ...show, ...dataWithTimestamp } : show));
    } catch (error) {
      console.warn("Failed to update show in Firebase:", error);
      setShows(prev => prev.map(show => show.id === id ? { ...show, ...updatedData } : show));
    }
  };

  const deleteShow = async (id) => {
    try {
      await deleteShowService(id);
      setShows(prev => prev.filter(show => show.id !== id));
    } catch (error) {
      console.warn("Failed to delete show from Firebase:", error);
      setShows(prev => prev.filter(show => show.id !== id));
    }
  };

  return (
    <AppContext.Provider value={{
      settings, setSettings,
      services, setServices,
      extraCostTemplates, setExtraCostTemplates,
      shows, setShows,
      addShow, updateShow, deleteShow,
      resetToDefaultData
    }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
