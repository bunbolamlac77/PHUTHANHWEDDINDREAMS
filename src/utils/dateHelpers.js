export const formatDateVN = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
};

export const isUpcoming = (eventDate, days = 7) => {
  const diff = (new Date(eventDate) - new Date()) / 86400000;
  return diff >= 0 && diff <= days;
};

export const isPast = (eventDate) => new Date(eventDate) < new Date();
export const daysUntil = (eventDate) => Math.ceil((new Date(eventDate) - new Date()) / 86400000);
