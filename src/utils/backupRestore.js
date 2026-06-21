/**
 * Xuất TOÀN BỘ dữ liệu ra file JSON:
 * - shows (đầy đủ tất cả field)
 * - settings (thông tin studio)
 * - services (gói dịch vụ)
 * - extraCostTemplates (chi phí phát sinh mặc định)
 */
export function exportBackup(settings, services, extraCostTemplates, shows) {
  const data = {
    version: '2.0',
    app: 'PhuThanh Wedding Dreams',
    exportedAt: new Date().toISOString(),
    data: {
      phuthanh_settings: settings,
      phuthanh_services: services,
      phuthanh_extra_costs: extraCostTemplates,
      phuthanh_shows: shows, // Lưu đầy đủ tất cả field của mỗi show
    },
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const a = document.createElement('a');
  a.href = url;
  a.download = `PhuThanh_Backup_${dd}${mm}${yyyy}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Đọc file backup và trả về dữ liệu đã parse
 * Hỗ trợ cả version 1.0 và 2.0
 */
export async function importBackup(file) {
  const text = await file.text();
  const backup = JSON.parse(text);

  if (!backup.data || !backup.version) {
    throw new Error('File backup không hợp lệ');
  }

  return {
    version: backup.version,
    exportedAt: backup.exportedAt,
    data: backup.data,
  };
}
