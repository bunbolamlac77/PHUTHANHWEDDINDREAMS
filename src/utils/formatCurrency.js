export const formatCurrency = (amount) =>
  Number(amount || 0).toLocaleString('vi-VN') + ' đ';

export const maskCurrency = (value) => {
  const raw = String(value).replace(/\D/g, '');
  return raw ? Number(raw).toLocaleString('vi-VN') : '';
};

export const parseCurrency = (maskedValue) =>
  parseInt(String(maskedValue).replace(/\D/g, '') || '0', 10);
