import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase'; // Đường dẫn tới file firebase.js của bạn
import backupFile from '../../assets/PhuThanh_Backup_07062026.json';

export default function RestoreData() {
  const [loading, setLoading] = useState(false);

  const handleRestore = async () => {
    setLoading(true);
    try {
      // CHỈ LẤY DỮ LIỆU SHOW, BỎ QUA SERVICES
      const shows = backupFile.data.phuthanh_shows;

      // Vòng lặp đẩy dữ liệu Show & Trạng thái lên Firebase
      for (const show of shows) {
        // Sử dụng lại đúng ID cũ của show (ví dụ: SH-1780214705686)
        const showRef = doc(db, 'shows', show.id);
        
        const dataToRestore = {
          customerName: show.customerName,
          finalAmount: show.finalAmount,
          depositAmount: show.depositAmount,
          status: show.status
        };
        
        // setDoc sẽ chỉ lưu lại tên dâu rể, tiền cọc, tổng tiền và trạng thái (isDeposited, isShot...)
        await setDoc(showRef, dataToRestore, { merge: true });
      }
      
      console.log('✅ Đã đẩy xong danh sách Show!');
      alert('Đã khôi phục trạng thái và số tiền của các show thành công! Bảng giá dịch vụ hiện tại được giữ nguyên.');
      
    } catch (error) {
      console.error('Lỗi khi khôi phục:', error);
      alert('Có lỗi xảy ra, vui lòng xem Console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mt-5">
      <h3 className="text-blue-700 font-bold mb-2">Khôi phục lịch sử Show (Giữ nguyên giá mới)</h3>
      <p className="text-sm text-gray-600 mb-4">
        Công cụ này chỉ lấy lại thông tin khách hàng, số tiền đã chốt và trạng thái thanh toán từ file backup. Bảng giá dịch vụ mới sẽ không bị ảnh hưởng.
      </p>
      <button 
        onClick={handleRestore}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded font-medium disabled:opacity-50"
      >
        {loading ? 'Đang đẩy dữ liệu...' : 'Bắt đầu khôi phục Show'}
      </button>
    </div>
  );
}
