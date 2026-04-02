export function exportBackup(settings, services, shows) {
  const data = {
    version: '1.0',
    app: 'PhuThanh Wedding Dreams',
    exportedAt: new Date().toISOString(),
    data: { phuthanh_settings: settings, phuthanh_services: services, phuthanh_shows: shows },
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

export async function importBackup(file) {
  const text = await file.text();
  const backup = JSON.parse(text);
  if (!backup.data || !backup.version) throw new Error('File backup không hợp lệ');
  return backup.data;
}
