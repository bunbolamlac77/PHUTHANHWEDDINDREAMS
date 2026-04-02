import React from 'react';
import { User, Calendar, MapPin, Phone, Camera, Check } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import CurrencyInput from '../../components/shared/CurrencyInput';
import { generateShowId } from '../../utils/generateId';

const QUICK_EXTRA_TAGS = [
  { id: 'TAG-1', name: 'Thêm buổi chụp (5h) [+1Tr]', priceStr: '1.000.000' },
  { id: 'TAG-2', name: 'Phát sinh thêm giờ [+200K]', priceStr: '200.000' },
  { id: 'TAG-3', name: 'Lễ xuất giá buổi tối [+600K]', priceStr: '600.000' },
  { id: 'TAG-4', name: 'In 10 ảnh 13x18 [+100K]', priceStr: '100.000' },
  { id: 'TAG-5', name: 'In ảnh treo tường 40x60 [+200K]', priceStr: '200.000' },
  { id: 'TAG-6', name: 'Upsize 40x60 lên 60x90 [+300K]', priceStr: '300.000' },
  { id: 'TAG-7', name: 'Thuê Flycam rước dâu [+1.5Tr]', priceStr: '1.500.000' },
  { id: 'TAG-8', name: 'Di chuyển ngoại tỉnh [+500K]', priceStr: '500.000' }
];

export default function QuoteForm(props) {
  const {
    groomName, setGroomName, brideName, setBrideName,
    eventDate, setEventDate, phone, setPhone, location, setLocation,
    services, selectedServiceIds, setSelectedServiceIds,
    extraCosts, setExtraCosts, depositAmountStr, setDepositAmountStr, onSave
  } = props;

  const toggleService = (id) => {
    setSelectedServiceIds(prev => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  const addQuickTag = (tag) => {
    if (!extraCosts.find(e => e.name === tag.name)) {
      setExtraCosts([...extraCosts, { id: generateShowId(), name: tag.name, priceStr: tag.priceStr }]);
    }
  };

  const addManualCost = () => {
    setExtraCosts([...extraCosts, { id: generateShowId(), name: '', priceStr: '' }]);
  };

  const updateCost = (id, field, value) => {
    setExtraCosts(extraCosts.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeCost = (id) => {
    setExtraCosts(extraCosts.filter(item => item.id !== id));
  };

  return (
    <div className="px-0 sm:px-4 space-y-6 mb-8 mt-2">
      
      {/* 1. KHỐI THÔNG TIN DÂU RỂ */}
      <div className="bg-[#101A15] border-y sm:border border-[#D4AF37]/20 sm:rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <User className="text-pt-gold" size={20} />
          <h2 className="text-pt-gold font-serif text-[18px]">Thông tin Dâu Rể</h2>
        </div>
        <div className="space-y-3">
          <div className="space-y-3">
            <input type="text" placeholder="Tên Chú Rể" value={groomName} onChange={e => setGroomName(e.target.value)} className="w-full bg-[#162620] border border-transparent focus:border-pt-gold rounded-xl px-4 py-3 text-pt-text text-[15px] outline-none placeholder-[#9CA3AF]/60" />
            <input type="text" placeholder="Tên Cô Dâu" value={brideName} onChange={e => setBrideName(e.target.value)} className="w-full bg-[#162620] border border-transparent focus:border-pt-gold rounded-xl px-4 py-3 text-pt-text text-[15px] outline-none placeholder-[#9CA3AF]/60" />
          </div>
          <div className="relative">
            <Calendar className="absolute left-4 top-3.5 text-[#9CA3AF]/70" size={18} />
            <input type="text" placeholder="Ngày chụp (VD: 24/03/2026)" value={eventDate} onChange={e => setEventDate(e.target.value)} className="w-full bg-[#162620] border border-transparent focus:border-pt-gold rounded-xl pl-11 pr-4 py-3 text-pt-text text-[15px] outline-none placeholder-[#9CA3AF]/60" />
          </div>
          <div className="relative">
            <Phone className="absolute left-4 top-3.5 text-[#9CA3AF]/70" size={18} />
            <input type="tel" placeholder="Số điện thoại" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-[#162620] border border-transparent focus:border-pt-gold rounded-xl pl-11 pr-4 py-3 text-pt-text text-[15px] outline-none placeholder-[#9CA3AF]/60" />
          </div>
          <div className="relative">
            <MapPin className="absolute left-4 top-3.5 text-[#9CA3AF]/70" size={18} />
            <input type="text" placeholder="Địa điểm (VD: Cần Thơ, Vĩnh Long)" value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-[#162620] border border-transparent focus:border-pt-gold rounded-xl pl-11 pr-4 py-3 text-pt-text text-[15px] outline-none placeholder-[#9CA3AF]/60" />
          </div>
        </div>
      </div>

      {/* 2. CHỌN GÓI CHỤP */}
      <div className="bg-[#101A15] border-y sm:border border-[#D4AF37]/20 sm:rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-1">
          <Camera className="text-pt-gold" size={20} />
          <h2 className="text-pt-gold font-serif text-[18px]">Chọn Gói Chụp (Sáng)</h2>
        </div>
        <p className="text-[#9CA3AF] text-[11px] font-bold tracking-wider mb-4 uppercase">Gói cưới & Video (Từ CSDL)</p>
        
        <div className="space-y-2">
          {services.map(svc => {
            const isSelected = selectedServiceIds.includes(svc.id);
            return (
              <div 
                key={svc.id} 
                onClick={() => toggleService(svc.id)}
                className={`w-full flex justify-between items-center rounded-xl px-4 py-4 transition-all duration-300 active:scale-95 ${isSelected ? 'bg-pt-gold/20 border-pt-gold border shadow-[0_0_15px_rgba(212,175,55,0.15)] text-pt-gold' : 'bg-[#162620] border border-transparent text-[#F3E9D2]'}`}
              >
                <div className="flex items-center gap-3 flex-1 pr-2">
                  {isSelected && <Check size={18} className="text-pt-gold shrink-0" />}
                  <span className="text-[15px] leading-snug">{svc.name}</span>
                </div>
                <span className={`text-[15px] font-bold whitespace-nowrap shrink-0 ${isSelected ? 'text-pt-gold' : 'text-[#F3E9D2]'}`}>
                  {svc.price === 0 ? '0đ' : formatCurrency(svc.price)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. CHI PHÍ PHÁT SINH */}
      <div className="bg-[#101A15] border-y sm:border border-[#D4AF37]/20 sm:rounded-2xl p-5 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-pt-gold font-serif text-[18px]">Chi phí phát sinh</h2>
          <button onClick={addManualCost} className="bg-[#21352A] text-[#9CA3AF] text-[12px] px-3 py-1.5 rounded-lg active:scale-95 transition-transform">+ Thêm khác</button>
        </div>
        
        {/* Rapid Tag Selection */}
        <div className="flex flex-wrap gap-2 mb-4">
          {QUICK_EXTRA_TAGS.map(tag => (
            <button 
              key={tag.id}
              onClick={() => addQuickTag(tag)}
              className="bg-[#162620] border border-[#21352A] text-[#9CA3AF] text-[13px] px-3 py-2 rounded-lg active:scale-95 transition-all focus:bg-pt-gold focus:text-black"
            >
              {tag.name}
            </button>
          ))}
        </div>

        {/* Selected Extra Costs List */}
        <div className="space-y-3 mt-4">
          {extraCosts.map(item => (
            <div key={item.id} className="flex flex-col gap-3 bg-[#162620] p-4 rounded-xl border border-[#21352A]">
               <div className="flex justify-between items-center bg-[#101A15] p-1.5 pl-3 rounded-lg border border-transparent focus-within:border-pt-gold transition-colors">
                  <input type="text" placeholder="Tên phụ phí" value={item.name} onChange={e => updateCost(item.id, 'name', e.target.value)} className="w-full bg-transparent text-[#F3E9D2] text-[15px] outline-none placeholder-[#9CA3AF]/60 font-medium" />
                  <button onClick={() => removeCost(item.id)} className="shrink-0 ml-2 px-3 py-1.5 bg-red-500/10 text-red-500 rounded-md active:scale-95 text-[12px] font-bold">Xoá</button>
               </div>
               
               <div className="relative">
                  <CurrencyInput 
                    value={item.priceStr} 
                    onChange={val => updateCost(item.id, 'priceStr', val)} 
                    placeholder="Số tiền phụ phí" 
                    className="w-full py-3.5 pl-4 pr-16 text-[15px] bg-[#101A15]"
                    wrapperClass="w-full"
                  />
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#101A15] border-y sm:border border-[#D4AF37]/20 sm:rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-pt-gold font-serif text-[18px]">Tiền khách cọc trước</h2>
          </div>
          <div className="mt-3">
             <CurrencyInput value={depositAmountStr} onChange={setDepositAmountStr} placeholder="VD: 1.000.000" className="w-full py-4 text-[16px] bg-[#162620] border-transparent focus:border-pt-gold transition-all" />
          </div>
      </div>

      {/* TẠO BÁO GIÁ BUTTON */}
      <div className="px-4">
        <button 
          onClick={onSave}
          className="w-full bg-[#D4AF37] hover:bg-[#C2A032] active:scale-[0.98] transition-all text-black font-bold text-[16px] rounded-xl py-4 flex items-center justify-center gap-2 shadow-[0_5px_20px_rgba(212,175,55,0.3)] mt-8"
        >
          <Camera size={20} /> TẠO BẢNG BÁO GIÁ
        </button>
      </div>

    </div>
  );
}
