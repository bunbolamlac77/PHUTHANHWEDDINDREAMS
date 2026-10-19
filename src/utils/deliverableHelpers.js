/**
 * Làm sạch văn bản từng dòng sản phẩm / quyền lợi nhận được
 * Giữ nguyên vẹn 100% nội dung chữ và dấu tiếng Việt
 */
export function cleanDeliverableText(text) {
  if (!text || typeof text !== 'string') return '';
  
  // Bỏ bullet đầu dòng thừa: "-", "•", "*", "+", "–", "—", "1.", "1)"
  let s = text.replace(/^[-*•+–—]\s*/, '').replace(/^\d+[.)]\s*/, '').trim();
  
  // Bỏ prefix lặp nếu có: "Sản phẩm nhận được:", "Sản phẩm:"
  s = s.replace(/^(sản phẩm nhận được|sản phẩm)\s*[:：]\s*/i, '').trim();
  
  // Bỏ emoji đơn lẻ ở đầu câu nếu có để đồng bộ bullet point vàng
  try {
    s = s.replace(/^\p{Extended_Pictographic}+\s*/u, '').trim();
  } catch {
    // Fallback nếu môi trường cũ không hỗ trợ \p
  }

  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Trích xuất các mục sản phẩm / quyền lợi nhận được từ dữ liệu dịch vụ.
 * Giữ nguyên 100% nội dung chữ, không bị lọc mất chữ hoặc cắt câu.
 */
export function extractDeliverables(svc) {
  if (!svc || !svc.deliverables) return [];
  let rawList = svc.deliverables;
  if (typeof rawList === 'string') {
    rawList = rawList.split('\n');
  }
  if (!Array.isArray(rawList)) return [];

  const items = [];

  for (const rawLine of rawList) {
    if (!rawLine || typeof rawLine !== 'string') continue;
    const line = rawLine.trim();
    if (!line) continue;

    // 1. Nếu là dạng dòng mẫu cũ gộp nhiều món: "🎁 Sản phẩm nhận được: A, B, C"
    if (/^(🎁\s*)?(sản phẩm nhận được|sản phẩm chính)\s*[:：]/i.test(line)) {
      const content = line.replace(/^(🎁\s*)?(sản phẩm nhận được|sản phẩm chính)\s*[:：]\s*/i, '');
      const parts = content.split(/[,;]\s*(?=[0-9A-ZÀ-Ỹa-zà-ỹ])/);
      for (const p of parts) {
        const cleanP = cleanDeliverableText(p);
        if (cleanP) items.push(cleanP);
      }
      continue;
    }

    // 2. Bỏ qua các dòng chỉ là tiêu đề kỹ thuật từ mẫu cũ nếu còn sót lại
    if (/^(👨‍💼|⏱|📸|✨|🎨)?\s*(nhân sự|thời gian|quy trình chụp|số lượng file|đặc quyền hậu kỳ)\s*[:：]/i.test(line)) {
      continue;
    }

    // 3. Với các dòng quyền lợi / sản phẩm thông thường người dùng nhập:
    const cleanItem = cleanDeliverableText(line);
    if (cleanItem) {
      items.push(cleanItem);
    }
  }

  // Fallback an toàn: nếu sau khi lọc mà rỗng nhưng svc.deliverables có dữ liệu
  // thì hiển thị trực tiếp tất cả các dòng để tuyệt đối KHÔNG MẤT CHỮ!
  if (items.length === 0 && rawList.length > 0) {
    for (const r of rawList) {
      if (typeof r === 'string' && r.trim()) {
        const c = cleanDeliverableText(r);
        if (c) items.push(c);
      }
    }
  }

  return items;
}
