export const DATA_VERSION = '2026.10.19_v2';

export const DEFAULT_SETTINGS = {
  studioName: 'PhuThanh Wedding Dreams',
  studioAddress: 'Phường Tân Hạnh, Vĩnh Long',
  studioPhone: '076 481 6715',
  studioEmail: '',
  studioLogo: '/icons/moi-trongtrang.png',
  slogan: 'Lưu giữ khoảnh khắc trọn vẹn',
  updatedAt: new Date().toISOString(),
};

export const DEFAULT_SERVICES = [
  {
    id: 'SV-001',
    name: 'Truyền Thống Cưới',
    price: 2500000,
    category: 'wedding',
    deliverables: [
      'Album 100 ảnh 13x18 High Quality in lụa (chống ẩm mốc)',
      '01 Ảnh lớn treo tường 40x60cm chất lượng cao sang trọng',
      'Dâu Rể tự tay chọn hình và tự tay lồng ảnh vào album',
      'Chụp KHÔNG GIỚI HẠN trong suốt buổi lễ (dưới 6 giờ)',
      'Xử lý màu trong sáng, mịn da, bóp gọn nhẹ nhàng bằng AI'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'SV-002',
    name: 'Truyền Thống Lai Phóng Sự Cưới',
    price: 3200000,
    category: 'wedding',
    isBestSeller: true,
    deliverables: [
      'Album 100 ảnh 13x18 High Quality in lụa (chống ẩm mốc)',
      '02 Ảnh lớn treo tường 40x60cm chất lượng cao sang trọng',
      'Dâu Rể tự tay chọn hình và tự tay lồng ảnh vào album',
      'Chụp Flatlay, khoảnh khắc makeup & chuẩn bị cảm xúc',
      'Chụp KHÔNG GIỚI HẠN trong suốt buổi lễ (dưới 6 giờ)',
      'Xử lý màu trong sáng, mịn da, bóp gọn nhẹ nhàng bằng AI'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'SV-003',
    name: 'Gói Chụp Dạm Ngõ',
    price: 1500000,
    category: 'wedding',
    deliverables: [
      '01 Ảnh lớn treo tường 40x60cm chất lượng cao sang trọng',
      'Chụp KHÔNG GIỚI HẠN trong suốt buổi lễ (dưới 3 giờ)',
      'Chụp chân dung Dâu, gia đình, mâm quả & diễn biến Lễ',
      'Xử lý màu trong sáng, mịn da, bóp gọn nhẹ nhàng bằng AI'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'SV-004',
    name: 'Gói Quay Phim Truyền Thống Cưới',
    price: 4000000,
    category: 'video',
    deliverables: [
      'Video Phim dài 45 - 80 phút ghi lại trọn vẹn diễn biến',
      'TẶNG KÈM BAY FLYCAM toàn cảnh nhà rạp',
      'DỰNG RIÊNG 01 Intro clip ngắn (2-3 phút) cực kỳ ấn tượng',
      'Video chất lượng cao upload Youtube & tặng kèm 01 USB',
      'Hỗ trợ lưu trữ file trên Drive chất lượng cao trong vòng 01 năm'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const DEFAULT_EXTRA_COSTS = [
  { id: 'EC-001', name: 'Thêm buổi chụp chiều', priceStr: '1.200.000' },
  { id: 'EC-002', name: 'Thêm 1 thợ chụp chiều', priceStr: '1.700.000' },
  { id: 'EC-003', name: 'Phát sinh thêm giờ (+300k/h)', priceStr: '300.000' },
  { id: 'EC-004', name: 'Lễ xuất giá buổi tối (Chụp)', priceStr: '700.000' },
  { id: 'EC-005', name: 'Lễ xuất giá buổi tối (Quay)', priceStr: '1.200.000' },
  { id: 'EC-006', name: 'Thuê Flycam quay rước dâu', priceStr: '1.500.000' },
  { id: 'EC-007', name: 'Chi phí di chuyển ngoài tỉnh VL cũ', priceStr: '300.000' },
  { id: 'EC-008', name: 'In thêm ảnh 13x18 (+10k/ảnh)', priceStr: '10.000' },
  { id: 'EC-009', name: 'In thêm ảnh cổng 40x60', priceStr: '300.000' },
  { id: 'EC-010', name: 'Upsize 40x60 lên 60x90', priceStr: '400.000' },
  { id: 'EC-011', name: 'Phụ phí vận chuyển ship Album', priceStr: '50.000' },
  { id: 'EC-012', name: 'Không in album (-300k)', priceStr: '-300.000' }
];
