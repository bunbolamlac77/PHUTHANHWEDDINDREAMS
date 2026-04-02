import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateShowId } from '../utils/generateId';

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
  { id: 'SV-001', name: 'Truyền Thống Cưới', price: 2800000, category: 'wedding', deliverables: [
    '👨‍💼 Nhân sự: 01 Thợ chụp chuyên nghiệp.',
    '⏱ Thời gian: 01 Buổi (Dưới 6 giờ chụp).',
    '📸 Số lượng file: Chụp KHÔNG GIỚI HẠN trong suốt buổi lễ.',
    '✨ Quy trình chụp: Chụp chân dung Dâu và gia đình, Chụp toàn bộ diễn biến buổi Lễ, Chụp Check-in với khách mời.',
    '🎨 Đặc quyền Hậu kỳ: Tất cả các hình ảnh được xử lý chuyên sâu (Làm màu, Làm mịn da, bóp dáng).',
    '🎁 Sản phẩm nhận được: 📸 Album 100 ảnh 13x18 High Quality in lụa, 🖼️ 01 Ảnh lớn treo tường 40x60cm, 🎁 Trải nghiệm Tự Tay Chọn Hình.'
  ], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

  { id: 'SV-002', name: 'Truyền Thống Lai Phóng Sự Cưới', price: 3500000, category: 'wedding', deliverables: [
    '👨‍💼 Nhân sự: 01 Thợ chụp chuyên nghiệp (Chuyên bắt khoảnh khắc).',
    '⏱ Thời gian: 01 Buổi (Dưới 6 giờ).',
    '📸 Số lượng file: Chụp KHÔNG GIỚI HẠN - Chú trọng cảm xúc thực.',
    '✨ Quy trình chụp: Chụp Flatlay chi tiết, Khoảnh khắc Makeup, Check-in diễn biến Lễ Gia Tiên.',
    '🎨 Đặc quyền Hậu kỳ: Tất cả hình ảnh xử lý chuyên sâu (Nước ảnh Phóng sự, làm da tỉ mỉ).',
    '🎁 Sản phẩm nhận được: 📸 Album 100 ảnh 13x18 High Quality, 🖼️ 02 Ảnh lớn treo tường 40x60cm, 🎁 Tự tay chọn ảnh bóp dáng.'
  ], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

  { id: 'SV-003', name: 'Gói Trọn Vẹn Cảm Xúc (Combo 02 Thợ)', price: 4800000, category: 'wedding', deliverables: [
    '👨‍💼 Nhân sự cao cấp: 01 Thợ Truyền Thống + 01 Thợ Phóng Sự.',
    '⏱ Thời gian: 01 Buổi (Dưới 6 giờ).',
    '📸 Số lượng file: Chụp KHÔNG GIỚI HẠN - Bao trọn mọi góc nhìn đa dạng.',
    '✨ Quy trình chụp: Khỏa lấp mọi góc chết, theo sát mọi hoạt động của khách mời và 2 họ.',
    '🎨 Hậu kỳ: Xử lý chuyên sâu màu sắc Hàn Quốc trong trẻo.',
    '🎁 Sản phẩm nhận được: 📖 Album Photobook 25x35cm (15 tờ - 150 ảnh), 🖼️ 02 Ảnh lớn 40x60cm.'
  ], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

  { id: 'SV-004', name: 'Quay Phim Đám Vu Quy (Truyền Thống)', price: 3500000, category: 'video', deliverables: [
    '👨‍💼 Nhân sự: 01 Thợ Quay Truyền Thống.',
    '🎥 Phim dài: 45-60 phút chân thực.',
    '🎁 Tặng kèm: Bay Flycam view nhà rạp toàn cảnh.',
    '🎬 Tặng kèm: Intro clip Highlight 2-3 phút.'
  ], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

  { id: 'SV-005', name: 'Quay Phim Đám Vu Quy (Phóng Sự Ekip)', price: 10500000, category: 'video', deliverables: [
    '👨‍💼 Nhân sự: Ekip Phóng Sự Cưới Chuyên Nghiệp.',
    '🎥 Video: Phim ngắn Phóng Sự 15 phút cảm xúc.',
    '📝 Kịch bản: Có kịch bản timeline chi tiết.',
    '🎁 Tặng kèm: Bay Flycam siêu nét.'
  ], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

  { id: 'SV-006', name: 'Quay Phim Đám Hỏi (Truyền thống)', price: 4000000, category: 'video', deliverables: [
    '👨‍💼 Nhân sự: 01 Thợ Quay.',
    '🎥 Phim dài: 45-60 phút.',
    '🎁 Đặc quyền: Tặng Flycam view nhà & Intro clip 2-3 phút.'
  ], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

  { id: 'SV-007', name: 'Quay Phim Tân Hôn / Vu Quy Chế Đính Hôn', price: 4500000, category: 'video', deliverables: [
    '👨‍💼 Nhân sự: 01 Thợ Quay.',
    '🎥 Thành phẩm: Phim dài 45-60 phút chuyên nghiệp.',
    '🎁 Sản phẩm: Upload Youtube & 1 USB video, miễn phí Flycam.'
  ], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

  { id: 'SV-008', name: 'Gói Chụp Lễ Xuất Giá (KM)', price: 0, category: 'wedding', deliverables: [
    '🎊 Khuyến mãi 100% Gói Chụp Xuất Giá khi Dâu Rể book Ekip 2 ngày liên tục.'
  ], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

  { id: 'SV-009', name: 'Quay Phim Phóng Sự Gói Lớn', price: 15500000, category: 'video', deliverables: [
    '👨‍💼 Nhân sự: Ekip Phóng Sự chuẩn Điên Ảnh.',
    '🎥 Sản phẩm: Phim 15 phút kịch bản cảm xúc tuyệt đối.',
    '⚡ Thiết bị: Dùng Gimbal xịn, Flycam toàn cảnh, Color Grading xịn xò.'
  ], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },

  { id: 'SV-010', name: 'Tiệc Sinh Nhật/Thôi Nôi', price: 2000000, category: 'other', deliverables: [
    '👨‍💼 Nhân sự: 1 Thợ chụp chuyên nghiệp.',
    '⏱ Gói chụp: 1 ngày (tối đa 10 tiếng).',
    '🎁 Sản phẩm: Album 50 ảnh 13x18 bìa gỗ.',
    '💾 File: Giao lại gốc 100% không giới hạn.'
  ], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
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
        isDeposited: false, // Luôn mặc định là chưa cọc để user xác nhận thủ công
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
