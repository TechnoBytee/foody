# Contributing to foody

Thanks for taking the time to contribute. This project is young, so small, well-scoped pull requests are the fastest way to get merged.

> Türkçe PR açıklamaları memnuniyetle karşılanır — açıklamayı Türkçe yazabilirsiniz, teknik detaylar her iki dilde de aynı formatta olmalıdır.

## Getting set up

```bash
git clone https://github.com/<owner>/foody.git
cd foody
npm install
npm run dev
```

The app runs on `http://localhost:3000` and redirects to `/tr` by default.

Requirements:

- Node.js 20+
- npm 10+

## Before you open a pull request

Run these locally:

```bash
npm run lint
npm run build
```

Both must pass. TypeScript is checked during the build, so type errors fail the build.

## How to work on the codebase

- Branch from `main` with a descriptive name: `feat/fridge-photo-search`, `fix/splash-fade`, `docs/architecture`.
- Keep commits focused; one logical change per commit.
- Follow the existing conventions: App Router under `src/app`, shared components in `src/components`, data in `src/data`, external calls in `src/services`.
- Prefer small, reviewable diffs over large rewrites.

## Adding data (recipes or historical archive)

Recipe data lives in `src/data`:

- `src/data/types.ts` — the `Recipe` and `Cuisine` contracts.
- `src/data/recipes.ts` — contemporary recipes and the merged `recipes` / `allCuisines` exports.
- `src/data/tarihi/` — the historical kitchen archive, one file per era category (`mezopotamya.ts`, `antik-akdeniz.ts`, `cin-hint.ts`, `bizans-islam.ts`, `ortacag-avrupa.ts`, `turk-anadolu.ts`, `erzurum.ts`, `diyarbakir.ts`).
- `src/data/tarihi-yemekler.ts` and `yemek-arsivi.md` — raw research notes and source list.

Every recipe requires: a URL-safe `id`, `name.tr` / `name.en`, ingredients, `steps.tr` / `steps.en`, `time`, `difficulty`, `calories`, `alternatives`, and a `cuisine` slug that exists in a cuisine list. Historical recipes should also carry `era`, `region`, `history.tr` / `history.en`, and `forgotten` when applicable.

Please add the sources you used to `yemek-arsivi.md` when extending the archive.

## Translations

UI strings are in `src/i18n/tr.json` and `src/i18n/en.json`. Both files must stay in sync — add the key to both, and keep Turkish as the source of truth for copy.

## Reporting bugs

Open an issue with the route you visited, the locale (`/tr` or `/en`), your device/browser, and the steps to reproduce. A screenshot or short screen recording helps a lot.

## Code of conduct

Be respectful and constructive. Reviews are about the code, not the person.

## License

By contributing you agree that your contributions are licensed under the Apache License 2.0.