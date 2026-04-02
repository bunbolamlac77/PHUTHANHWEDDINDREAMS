import React from 'react';
import StudioInfoSection from './StudioInfoSection';
import ServiceListSection from './ServiceListSection';
import DataManagement from './DataManagement';
import { useAppContext } from '../../context/AppContext';

export default function SettingsPage() {
  const { settings, setSettings, services, setServices, shows } = useAppContext();

  return (
    <div className="p-4 space-y-6 pb-[100px]">
      <div className="mb-6">
        <h1 className="text-display font-heading text-pt-gold">Cài Đặt Hệ Thống</h1>
        <p className="text-pt-muted mt-1 text-body">Quản lý Studio, Gói Dịch Vụ và Backup</p>
      </div>

      <StudioInfoSection settings={settings} setSettings={setSettings} />
      
      <ServiceListSection services={services} setServices={setServices} />
      
      <DataManagement settings={settings} services={services} shows={shows} />
    </div>
  );
}
