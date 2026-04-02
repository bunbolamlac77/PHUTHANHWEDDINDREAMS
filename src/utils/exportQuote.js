import html2canvas from 'html2canvas';

export async function exportQuoteAsImage(elementId = 'quote-export-node') {
  const node = document.getElementById(elementId);
  if (!node) throw new Error('Export node not found');

  const canvas = await html2canvas(node, {
    scale: 3, // Tăng lên 3x để ảnh siêu sắc nét
    useCORS: true,
    backgroundColor: '#0B1410',
    logging: false,
    imageTimeout: 0, // Đảm bảo logo và ảnh tải xong mới chụp
  });

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const file = new File([blob], 'bao-gia-phuthanh.png', { type: 'image/png' });
      resolve(file);
    }, 'image/png');
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
