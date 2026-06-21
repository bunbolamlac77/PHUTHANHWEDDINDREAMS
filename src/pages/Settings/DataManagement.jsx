import React, { useRef, useState } from 'react';
import { Download, Upload, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { exportBackup, importBackup } from '../../utils/backupRestore';
import { doc, setDoc, deleteDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function DataManagement({ 
  settings, setSettings,
  services, setServices,
  extraCostTemplates, setExtraCostTemplates,
  shows 
}) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error'|'info', message: string }

  const showStatus = (type, message) => {
    setStatus({ type, message });
    setTimeout(() => setStatus(null), 5000);
  };

  // ── XUẤT BACKUP ────────────────────────────────────────────────────────────
  const handleExport = () => {
    try {
      exportBackup(settings, services, extraCostTemplates, shows);
      showStatus('success', `Đã xuất backup thành công! (${shows.length} shows, ${services.length} dịch vụ)`);
    } catch (e) {
      showStatus('error', 'Lỗi xuất backup: ' + e.message);
    }
  };

  // ── NHẬP / RESTORE ─────────────────────────────────────────────────────────
  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const { version, exportedAt, data } = await importBackup(file);
      
      const exportDate = exportedAt ? new Date(exportedAt).toLocaleDateString('vi-VN') : 'Không rõ';
      const showsCount = (data.phuthanh_shows || []).length;
      const isV2 = version === '2.0';

      const confirmed = window.confirm(
        `📦 FILE BACKUP\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `📅 Ngày tạo: ${exportDate}\n` +
        `🎬 Số Shows: ${showsCount}\n` +
        `${isV2 ? '✅ Bao gồm: Cài đặt, Dịch vụ, Chi phí phát sinh\n' : '⚠️ Phiên bản cũ: Chỉ khôi phục Shows\n'}` +
        `━━━━━━━━━━━━━━━━━━━\n\n` +
        `Bạn có muốn khôi phục từ file này không?`
      );

      if (!confirmed) return;

      setLoading(true);
      showStatus('info', 'Đang khôi phục dữ liệu...');

      // 1. Khôi phục Settings (nếu v2)
      if (isV2 && data.phuthanh_settings) {
        setSettings(data.phuthanh_settings);
      }

      // 2. Khôi phục Services (nếu v2)
      if (isV2 && data.phuthanh_services) {
        setServices(data.phuthanh_services);
      }

      // 3. Khôi phục Extra Cost Templates (nếu v2)
      if (isV2 && data.phuthanh_extra_costs) {
        setExtraCostTemplates(data.phuthanh_extra_costs);
      }

      // 4. Khôi phục Shows lên Firebase
      const showsData = data.phuthanh_shows || [];
      if (showsData.length > 0) {
        // Xóa toàn bộ shows cũ trước
        const existingSnapshot = await getDocs(collection(db, 'shows'));
        const deletePromises = existingSnapshot.docs.map(d => deleteDoc(doc(db, 'shows', d.id)));
        await Promise.all(deletePromises);

        // Upload shows mới
        for (const show of showsData) {
          const showRef = doc(db, 'shows', show.id);
          const dataToRestore = {
            customerName: show.customerName || '',
            eventDate: show.eventDate || '',
            phone: show.phone || '',
            location: show.location || '',
            selectedServiceIds: show.selectedServiceIds || [],
            extraCosts: show.extraCosts || [],
            subtotal: show.subtotal || 0,
            discountAmount: show.discountAmount || 0,
            finalAmount: show.finalAmount || 0,
            depositAmount: show.depositAmount || 0,
            note: show.note || '',
            status: show.status || {
              isDeposited: false, isShot: false, isFullyPaid: false, isDelivered: false
            },
            createdAt: show.createdAt || new Date().toISOString(),
            updatedAt: show.updatedAt || new Date().toISOString(),
          };
          await setDoc(showRef, dataToRestore);
        }
      }

      showStatus('success', `Khôi phục thành công! ${showsData.length} shows đã được khôi phục.`);
      setTimeout(() => window.location.reload(), 1500);

    } catch (error) {
      console.error(error);
      showStatus('error', 'File Backup không hợp lệ hoặc có lỗi: ' + error.message);
    } finally {
      setLoading(false);
      e.target.value = null;
    }
  };

  const statusColors = {
    success: 'bg-green-500/10 border-green-500/30 text-green-400',
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  };

  const StatusIcon = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  };

  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-title font-heading text-pt-text">Sao Lưu Dữ Liệu</h2>
        <p className="text-pt-muted text-[12px] mt-0.5">Backup toàn bộ: Shows, Cài đặt, Dịch vụ, Chi phí phát sinh</p>
      </div>

      <div className="flex gap-4">
        {/* XUẤT BACKUP */}
        <button
          onClick={handleExport}
          disabled={loading}
          className="flex-1 bg-pt-elevated border border-pt-text/10 rounded-2xl py-5 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-50"
        >
          <div className="w-10 h-10 rounded-full bg-pt-gold/10 flex items-center justify-center">
            <Download className="text-pt-gold" size={20} />
          </div>
          <span className="text-pt-text font-bold text-[14px]">Xuất Backup</span>
          <span className="text-pt-muted text-[11px]">{shows.length} shows</span>
        </button>

        {/* NHẬP BACKUP */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="flex-1 bg-pt-elevated border border-pt-text/10 rounded-2xl py-5 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-50"
        >
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Upload className="text-blue-400" size={20} />
          </div>
          <span className="text-pt-text font-bold text-[14px]">{loading ? 'Đang tải...' : 'Khôi Phục'}</span>
          <span className="text-pt-muted text-[11px]">Từ file .json</span>
        </button>

        <input type="file" accept=".json" className="hidden" ref={fileInputRef} onChange={handleImport} />
      </div>

      {/* Status indicator */}
      {status && (() => {
        const Icon = StatusIcon[status.type];
        return (
          <div className={`mt-4 flex items-start gap-3 p-3 rounded-xl border ${statusColors[status.type]}`}>
            <Icon size={18} className="shrink-0 mt-0.5" />
            <p className="text-[13px] leading-snug">{status.message}</p>
          </div>
        );
      })()}

      {/* Ghi chú */}
      <div className="mt-4 bg-pt-elevated/50 border border-pt-text/5 rounded-xl p-4">
        <p className="text-pt-muted text-[12px] leading-relaxed">
          💡 <span className="text-pt-text font-medium">Backup v2.0</span> lưu toàn bộ dữ liệu ứng dụng. 
          Khuyến nghị xuất backup định kỳ để bảo vệ dữ liệu.
        </p>
      </div>
    </section>
  );
}
