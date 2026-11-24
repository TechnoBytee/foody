// Sitemap ve metadata için tek adres kaynağı. Üretimde NEXT_PUBLIC_SITE_URL ile override edilir.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
