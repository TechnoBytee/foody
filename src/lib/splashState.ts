// Tam sayfa yenilemesinde modül yeniden yüklenir → splash tekrar oynar.
// Next.js istemci içi navigasyonlarda modül korunur → tekrar oynamaz.
let splashShown = false;
const listeners = new Set<() => void>();

export function markSplashShown() {
  splashShown = true;
  for (const listener of listeners) listener();
}

export function hasSplashShown() {
  return splashShown;
}

export function subscribeSplash(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
