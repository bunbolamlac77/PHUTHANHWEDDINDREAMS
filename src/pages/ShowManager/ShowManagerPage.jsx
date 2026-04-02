import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import StatusFilterBar from './StatusFilterBar';
import ShowCard from './ShowCard';
import ShowDetailSheet from './ShowDetailSheet';

export default function ShowManagerPage() {
  const { shows } = useAppContext();
  const [filter, setFilter] = useState('all'); // all, unpaid, deposited, undelivered, completed
  const [selectedShow, setSelectedShow] = useState(null);

  const getFilteredShows = () => {
    return shows.filter(s => {
      if (filter === 'all') return true;
      const { isDeposited, isDelivered } = s.status || {};
      if (filter === 'completed') return isDelivered;
      if (filter === 'deposited') return isDeposited && !isDelivered;
      if (filter === 'unpaid') return !isDeposited && !isDelivered;
      return true;
    }).sort((a, b) => {
      // Hoàn tất xuống dưới cùng
      if (a.status?.isDelivered !== b.status?.isDelivered) {
        return a.status?.isDelivered ? 1 : -1;
      }
      return new Date(a.eventDate) - new Date(b.eventDate); // sắp lịch gần nhất lên đầu
    });
  };

  const filteredShows = getFilteredShows();

  return (
    <div className="flex flex-col h-full bg-pt-base">
      <div className="pt-4 px-4 pb-2 sticky top-0 bg-pt-base/90 backdrop-blur-xl z-sticky flex items-center gap-3.5">
        <div className="w-[52px] h-[52px] rounded-full border border-pt-gold/30 flex items-center justify-center bg-[#162620] shadow-[0_0_15px_rgba(212,175,55,0.1)] overflow-hidden shrink-0">
          <img src="/icons/moi-trongtrang.png" alt="Logo" className="w-[38px] h-[38px] object-contain" />
        </div>
        <div className="flex-1">
          <h1 className="text-[21px] font-heading text-pt-gold uppercase font-extrabold tracking-wider">Lịch Trình Show</h1>
          <p className="text-pt-muted mt-0.5 text-[11px] opacity-75">Theo dõi lịch trình và dòng tiền</p>
        </div>
      </div>

      <div className="sticky top-[80px] z-sticky bg-pt-base/90 backdrop-blur-xl pb-2">
        <StatusFilterBar activeFilter={filter} onChange={setFilter} />
      </div>

      <div className="px-4 py-4 space-y-3 pb-[130px]">
        {filteredShows.length > 0 ? (
          filteredShows.map(show => (
            <ShowCard key={show.id} show={show} onClick={() => setSelectedShow(show)} />
          ))
        ) : (
          <div className="text-center py-20">
            <span className="text-[40px] block mb-2 opacity-50">📅</span>
            <p className="text-pt-muted font-medium">Chưa có Show nào trong mục này</p>
          </div>
        )}
      </div>

      <ShowDetailSheet 
        show={selectedShow} 
        isOpen={!!selectedShow} 
        onClose={() => setSelectedShow(null)} 
      />
    </div>
  );
}
