import React from 'react';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDateVN, isPast } from '../../utils/dateHelpers';

export default function ShowCard({ show, onClick }) {
  const { isDeposited, isShot, isDelivered } = show.status || {};
  let borderColor = 'border-gray-500/30';
  if (isDelivered) borderColor = 'border-green-500/50';
  else if (isShot) borderColor = 'border-blue-500/50';
  else if (isDeposited) borderColor = 'border-yellow-500/50';

  const dateColor = (isPast(show.eventDate) && !isDelivered) ? 'text-red-400 font-medium' : 'text-pt-text';

  return (
    <button 
      onClick={onClick}
      className={`w-full text-left bg-[rgba(22,38,32,0.8)] backdrop-blur-xl rounded-2xl p-4 border border-pt-text/10 border-l-[6px] ${borderColor} active:scale-[0.98] transition-transform flex flex-col gap-3 relative overflow-hidden ${isDelivered ? 'opacity-60' : ''}`}
    >
      <div className="flex justify-between items-start pr-2">
        <h3 className="text-pt-text font-bold text-[16px]">{show.customerName}</h3>
        <StatusBadge status={show.status} />
      </div>
      
      <div className="space-y-1.5 mt-1">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-pt-muted" />
          <span className={`text-[13px] ${dateColor}`}>{formatDateVN(show.eventDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={14} className="text-pt-gold" />
          <span className="text-[13px] text-pt-gold font-medium">{formatCurrency(show.finalAmount)}</span>
        </div>
        {show.location && (
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-pt-muted shrink-0" />
            <span className="text-[13px] text-pt-muted truncate">{show.location}</span>
          </div>
        )}
      </div>
    </button>
  );
}
