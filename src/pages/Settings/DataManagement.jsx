import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { exportBackup, importBackup } from '../../utils/backupRestore';

export default function DataManagement({ settings, services, shows }) {
  const fileInputRef = useRef(null);

  const handleExport = () => exportBackup(settings, services, shows);

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const data = await importBackup(file);
      if (window.confirm("CẢNH BÁO: Dữ liệu hiện tại sẽ bị ghi đè hoàn toàn bởi bản Backup này. Bạn có chắc chắn?")) {
        if (data.phuthanh_settings) localStorage.setItem('phuthanh_settings', JSON.stringify(data.phuthanh_settings));
        if (data.phuthanh_services) localStorage.setItem('phuthanh_services', JSON.stringify(data.phuthanh_services));
        if (data.phuthanh_shows) localStorage.setItem('phuthanh_shows', JSON.stringify(data.phuthanh_shows));
        window.location.reload();
      }
    } catch {
      alert("File Backup không hợp lệ!");
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
        <button onClick={() => fileInputRef.current?.click()} className="flex-1 bg-pt-elevated border border-pt-text/10 rounded-2xl py-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform">
          <Upload className="text-pt-muted" size={24} />
          <span className="text-pt-text font-medium text-[14px]">Khôi phục</span>
        </button>
        <input type="file" accept=".json" className="hidden" ref={fileInputRef} onChange={handleImport} />
      </div>
    </section>
  );
}
