import React from 'react';

const STATUS_MAP = {
  unpaid: { text: 'Chờ cọc', color: 'bg-gray-500/20 text-gray-300 border-gray-500/30' },
  deposited: { text: 'Đã cọc', color: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' },
  shot: { text: 'Đã chụp', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  completed: { text: 'Hoàn tất', color: 'bg-green-500/20 text-green-500 border-green-500/30' }
};

export default function StatusBadge({ status }) {
  let mapped = STATUS_MAP.unpaid;
  if (status?.isDelivered) mapped = STATUS_MAP.completed;
  else if (status?.isShot) mapped = STATUS_MAP.shot;
  else if (status?.isDeposited) mapped = STATUS_MAP.deposited;

  return (
    <span className={`px-2.5 py-1 rounded text-[11px] font-medium border uppercase tracking-wide whitespace-nowrap ${mapped.color}`}>
      {mapped.text}
    </span>
  );
}
