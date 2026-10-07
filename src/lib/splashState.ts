// Tam sayfa yenilemesinde modül yeniden yüklenir → splash tekrar oynar.
// Next.js istemci içi navigasyonlarda (geri/ileri/link) modül korunur → tekrar oynamaz.
let splashShown = false;

export function markSplashShown() {
  splashShown = true;
}

export function hasSplashShown() {
  return splashShown;
}
