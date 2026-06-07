import React, { useRef, useState } from 'react';
import { Download, Upload } from 'lucide-react';
import { exportBackup, importBackup } from '../../utils/backupRestore';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
export default function DataManagement({ settings, services, shows }) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleExport = () => exportBackup(settings, services, shows);

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const data = await importBackup(file);
      if (window.confirm("Bạn có chắc chắn muốn khôi phục danh sách Show từ file này? (Bảng giá và Cài đặt sẽ được giữ nguyên)")) {
        setLoading(true);
        const showsData = data.phuthanh_shows || [];
        
        for (const show of showsData) {
          const showRef = doc(db, 'shows', show.id);
          const dataToRestore = {
            customerName: show.customerName,
            finalAmount: show.finalAmount,
            depositAmount: show.depositAmount,
            status: show.status
          };
          await setDoc(showRef, dataToRestore, { merge: true });
        }
        
        alert("Khôi phục danh sách Show thành công!");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("File Backup không hợp lệ hoặc có lỗi xảy ra!");
    } finally {
      setLoading(false);
      e.target.value = null; // Reset input
    }
  };

  return (
    <section className="mt-8">
      <h2 className="text-title font-heading text-pt-text mb-4">Quản trị Dữ liệu</h2>
      <div className="flex gap-4">
        <button onClick={handleExport} className="flex-1 bg-pt-elevated border border-pt-text/10 rounded-2xl py-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform">
          <Download className="text-pt-gold" size={24} />
          <span className="text-pt-text font-medium text-[14px]">Xuất Backup</span>
        </button>
        <button onClick={() => fileInputRef.current?.click()} disabled={loading} className="flex-1 bg-pt-elevated border border-pt-text/10 rounded-2xl py-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-50">
          <Upload className="text-pt-muted" size={24} />
          <span className="text-pt-text font-medium text-[14px]">{loading ? 'Đang tải...' : 'Khôi phục'}</span>
        </button>
        <input type="file" accept=".json" className="hidden" ref={fileInputRef} onChange={handleImport} />
      </div>
    </section>
  );
}
