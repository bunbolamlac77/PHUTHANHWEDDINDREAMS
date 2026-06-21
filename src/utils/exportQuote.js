import html2canvas from 'html2canvas';

/**
 * Xuất bảng báo giá thành ảnh PNG chất lượng cao (scale 4x)
 */
export async function exportQuoteAsImage(elementId = 'quote-export-node') {
  const node = document.getElementById(elementId);
  if (!node) throw new Error('Export node not found');

  // Tạm thời mở rộng node để render đầy đủ nội dung
  const originalOverflow = node.style.overflow;
  node.style.overflow = 'visible';

  const canvas = await html2canvas(node, {
    scale: 4,              // 4x = ảnh cực sắc nét (~2880px chiều rộng trên iPhone)
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#0B1410',
    logging: false,
    imageTimeout: 15000,   // Đảm bảo logo tải xong
    removeContainer: true,
    scrollX: 0,
    scrollY: 0,
  });

  node.style.overflow = originalOverflow;

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        const file = new File([blob], 'bao-gia-phuthanh.png', { type: 'image/png' });
        resolve(file);
      },
      'image/png',
      1.0 // Chất lượng tối đa
    );
  });
}

export async function shareQuoteImage(file) {
  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      title: 'Báo giá – PhuThanh Wedding Dreams',
      files: [file],
    });
  } else {
    // Fallback: download
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  }
}
