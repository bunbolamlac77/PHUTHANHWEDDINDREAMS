export const formatDateVN = (dateStr) => {
  if (!dateStr) return '—';
  
  // Xử lý định dạng VN (24/03/2026) -> (2026-03-24) để Date() hiểu được
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const dd = parts[0].padStart(2, '0');
      const mm = parts[1].padStart(2, '0');
      const yyyy = parts[2];
      // Kiểm tra tính hợp lệ sơ bộ
      if (dd.length === 2 && mm.length === 2 && yyyy.length === 4) {
         dateStr = `${yyyy}-${mm}-${dd}`;
      }
    }
  }

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr; // Trả về chuỗi gốc nếu vẫn lỗi

  return date.toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
};

export const isUpcoming = (eventDate, days = 7) => {
  const diff = (new Date(eventDate) - new Date()) / 86400000;
  return diff >= 0 && diff <= days;
};

export const isPast = (eventDate) => new Date(eventDate) < new Date();
export const daysUntil = (eventDate) => Math.ceil((new Date(eventDate) - new Date()) / 86400000);
