// Liste sayfaları için saf dilimleme; sayfa numarası 1 tabanlı ve sınırlıdır.
export function paginate<T>(items: T[], requestedPage: number, size = 24) {
  const totalPages = Math.max(1, Math.ceil(items.length / size));
  const parsed = Number.isFinite(requestedPage) ? Math.trunc(requestedPage) : 1;
  const page = Math.min(totalPages, Math.max(1, parsed));
  return {
    items: items.slice((page - 1) * size, page * size),
    page,
    totalPages,
    hasPrev: page > 1,
    hasNext: page < totalPages,
  };
}
