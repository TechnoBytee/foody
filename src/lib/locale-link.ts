// Dil değiştirirken mevcut yolu korur; bilinmeyen/root yollarda hedef dilin ana sayfasına döner.
export function switchLocalePath(pathname: string, target: "tr" | "en"): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0 || (parts[0] !== "tr" && parts[0] !== "en")) {
    return `/${target}`;
  }
  return `/${target}/${parts.slice(1).join("/")}`.replace(/\/$/, "");
}
