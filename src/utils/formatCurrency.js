export const formatCurrency = (amount) => {
  const num = Number(amount || 0);
  if (num < 0) {
    return '-' + Math.abs(num).toLocaleString('vi-VN') + ' đ';
  }
  return num.toLocaleString('vi-VN') + ' đ';
};

export const maskCurrency = (value, allowNegative = true) => {
  const str = String(value || '').trim();
  const isNegative = allowNegative && (str.startsWith('-') || str.includes('(-'));
  const raw = str.replace(/\D/g, '');
  if (!raw) return isNegative ? '-' : '';
  const formatted = Number(raw).toLocaleString('vi-VN');
  return isNegative ? `-${formatted}` : formatted;
};

export const parseCurrency = (maskedValue) => {
  const str = String(maskedValue || '').trim();
  const isNegative = str.startsWith('-') || /-\s*\d/.test(str);
  const raw = str.replace(/\D/g, '');
  const num = parseInt(raw || '0', 10);
  return isNegative ? -num : num;
};
