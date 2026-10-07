Documentation screenshots for the README.

These are captured from the **production** build (a dev build adds the Next.js indicator badge to every frame):

```bash
npm run build
npm run start -- -p 3100
```

Then capture each route headlessly:

```bash
msedge --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1440,1100 --virtual-time-budget=7000 \
  --screenshot=public/screenshots/home.png http://localhost:3100/tr
```

| File | Size | Route |
| --- | --- | --- |
| `splash.png` | 1440x900 | `/tr` captured with `--virtual-time-budget=800` (before the exit transition) |
| `home.png` | 1440x1100 | `/tr` |
| `mobile.png` | 520x1000 | `/tr` — narrow viewport. Do not go below ~520px: headless Chrome/Edge enforce a minimum window width and crop the frame instead of shrinking the layout. |
| `category.png` | 1440x1000 | `/tr/kategori/tarih-mezopotamya` |
| `recipe.png` | 1440x1100 | `/tr/tarif/tuhu-pancarli-kuzu-yahnisi` |

Keep PNG and under ~400 KB per file so the README stays fast to load.