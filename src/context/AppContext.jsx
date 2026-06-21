import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getShows, addShow as addShowService, updateShow as updateShowService, deleteShow as deleteShowService } from '../services/showService';

const DEFAULT_SETTINGS = {
  studioName: 'PhuThanh Wedding Dreams',
  studioAddress: 'Phường Tân Hạnh, Vĩnh Long',
  studioPhone: '0901234567',
  studioEmail: '',
  studioLogo: '/icons/moi-trongtrang.png',
  slogan: 'Lưu giữ khoảnh khắc trọn vẹn',
  updatedAt: new Date().toISOString(),
};

const DEFAULT_SERVICES = [
  { id: 'SV-001', name: 'Truyền Thống Cưới', price: 2300000, category: 'wedding', deliverables: [
    '👨‍💼 Nhân sự: 01 Thợ chụp chuyên nghiệp.',
    '⏱ Thời gian: 01 Buổi (Dưới 6 giờ chụp, tối đa tới 13h).',
    '📸 Số lượng file: Chụp KHÔNG GIỚI HẠN trong suốt buổi lễ.',
    '✨ Quy trình chụp: Chụp chân dung Dâu và gia đình, diễn biến buổi Lễ, mâm quả, Check-in khách mời.',
    '🎨 Đặc quyền Hậu kỳ: Tất cả hình ảnh xử lý chuyên sâu cơ bản (Làm màu trong sáng, mịn da, bóp dáng nhẹ nhàng bằng AI).',
    '🎁 Sản phẩm nhận được: 📸 Album 100 ảnh 13x18 High Quality in lụa, 🖼️ 01 Ảnh lớn treo tường 40x60cm, 🎁 Tự Tay Chọn Hình & Lồng Ảnh.'
  ], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

  { id: 'SV-002', name: 'Truyền Thống Lai Phóng Sự Cưới', price: 3000000, category: 'wedding', deliverables: [
    '👨‍💼 Nhân sự: 01 Thợ chụp chuyên nghiệp.',
    '⏱ Thời gian: 01 Buổi (Dưới 6 giờ chụp, tối đa tới 13h).',
    '📸 Số lượng file: Chụp KHÔNG GIỚI HẠN trong suốt buổi lễ.',
    '✨ Quy trình chụp: Chụp Flatlay chi tiết, khoảnh khắc Makeup, bắt trọn cảm xúc chuẩn bị. Còn lại giống Truyền thống.',
    '🎨 Đặc quyền Hậu kỳ: Tất cả hình ảnh xử lý chuyên sâu cơ bản (Làm màu trong sáng, mịn da, bóp dáng nhẹ nhàng bằng AI).',
    '🎁 Sản phẩm nhận được: 📸 Album 100 ảnh 13x18 High Quality in lụa, 🖼️ 02 Ảnh lớn treo tường 40x60cm, 🎁 Tự Tay Chọn Hình & Lồng Ảnh.'
  ], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

  { id: 'SV-003', name: 'Gói Chụp Dạm Ngõ', price: 1500000, category: 'wedding', deliverables: [
    '👨‍💼 Nhân sự: 01 Thợ chụp chuyên nghiệp.',
    '⏱ Thời gian: 01 Buổi (Dưới 3 giờ chụp, tối đa tới 13h).',
    '📸 Số lượng file: Chụp KHÔNG GIỚI HẠN trong suốt buổi lễ.',
    '✨ Quy trình chụp: Chụp chân dung, gia đình, diễn biến Lễ, mâm quả, Check-in.',
    '🎨 Đặc quyền Hậu kỳ: Tất cả hình ảnh xử lý chuyên sâu cơ bản (Làm màu trong sáng, mịn da, bóp dáng nhẹ nhàng bằng AI).',
    '🎁 Sản phẩm nhận được: 🖼️ 01 Ảnh lớn treo tường 40x60cm chất lượng cao sang trọng.'
  ], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

  { id: 'SV-004', name: 'Gói Quay Phim Truyền Thống Cưới', price: 4000000, category: 'video', deliverables: [
    '🎥 Thời lượng: Phim dài từ 45 - 80 phút ghi lại trọn vẹn diễn biến.',
    '🎁 Tặng kèm: Bay Flycam lấy toàn cảnh nhà rạp & Dựng riêng 1 Intro clip ngắn (2-3 phút) cực kỳ ấn tượng.',
    '🎨 Chất lượng: Video xử lý màu sắc nghệ thuật, chỉnh sửa da.',
    '💾 Bàn giao: Upload Youtube & 01 USB (Sau 10 - 15 ngày).'
  ], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
];

export const DEFAULT_EXTRA_COSTS = [
  { id: 'EC-001', name: 'Thêm buổi chụp chiều', priceStr: '1.200.000' },
  { id: 'EC-002', name: 'Phát sinh thêm giờ (+300K/h)', priceStr: '300.000' },
  { id: 'EC-003', name: 'Lễ xuất giá buổi tối (Chụp)', priceStr: '700.000' },
  { id: 'EC-004', name: 'Lễ xuất giá buổi tối (Quay)', priceStr: '1.200.000' },
  { id: 'EC-005', name: 'In thêm ảnh 13x18', priceStr: '10.000' },
  { id: 'EC-006', name: 'In ảnh treo tường 40x60', priceStr: '300.000' },
  { id: 'EC-007', name: 'Upsize 40x60 lên 60x90', priceStr: '400.000' },
  { id: 'EC-008', name: 'Thuê Flycam quay rước dâu', priceStr: '1.500.000' },
  { id: 'EC-009', name: 'Ngoại tỉnh Vĩnh Long cũ', priceStr: '300.000' },
];

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [settings, setSettings] = useLocalStorage('phuthanh_settings', DEFAULT_SETTINGS);
  const [services, setServices] = useLocalStorage('phuthanh_services', DEFAULT_SERVICES);
  const [extraCostTemplates, setExtraCostTemplates] = useLocalStorage('phuthanh_extra_costs', DEFAULT_EXTRA_COSTS);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await getShows();
        setShows(data);
      } catch (error) {
        console.error("Failed to fetch shows from Firebase:", error);
      }
    };
    fetchShows();
  }, []);

  const addShow = async (showData) => {
    const newShow = {
      ...showData,
      createdAt: new Date().toISOString(),
      status: {
        isDeposited: false, // Luôn mặc định là chưa cọc để user xác nhận thủ công
        isShot: false,
        isFullyPaid: false,
        isDelivered: false
      }
    };
    try {
      const id = await addShowService(newShow);
      newShow.id = id;
      setShows([newShow, ...shows]);
      return newShow;
    } catch (error) {
      console.error("Failed to add show to Firebase:", error);
    }
  };

  const updateShow = async (id, updatedData) => {
    try {
      const dataWithTimestamp = { ...updatedData, updatedAt: new Date().toISOString() };
      await updateShowService(id, dataWithTimestamp);
      setShows(shows.map(show => show.id === id ? { ...show, ...dataWithTimestamp } : show));
    } catch (error) {
      console.error("Failed to update show in Firebase:", error);
    }
  };

  const deleteShow = async (id) => {
    try {
      await deleteShowService(id);
      setShows(shows.filter(show => show.id !== id));
    } catch (error) {
      console.error("Failed to delete show from Firebase:", error);
    }
  };

  return (
    <AppContext.Provider value={{
      settings, setSettings,
      services, setServices,
      extraCostTemplates, setExtraCostTemplates,
      shows, setShows,
      addShow, updateShow, deleteShow
    }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
