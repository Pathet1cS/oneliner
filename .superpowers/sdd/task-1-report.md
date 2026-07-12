# Task 1 Report

## What was implemented
- Installed `framer-motion` package.
- Set up `Pixelify Sans` globally in `src/app/layout.tsx`.
- Changed the application title to `Enileno` in `src/app/layout.tsx`.
- Set background color `#334173` and base text color to `white` in the layout `body` tag to enforce global constraints.
- Fixed a type error in `test-dates.ts` where `e` was typed as `unknown` in a try-catch block, preventing the Next.js build from succeeding.

## Files changed
- `package.json`
- `package-lock.json`
- `src/app/layout.tsx`
- `test-dates.ts` (Build fix)

## Self-review findings
- Checked if the font subset was correct (Latin).
- Confirmed that colors align with the brief's `#334173` background color.
- Verified that the production build completes successfully (`npm run build`).

## Any issues or concerns
- None. The build works perfectly, and typography constraints have been fully met.

## Fix Report
- Added primary accent color (`#f7af4c`) to `@theme` in `src/app/globals.css`.
- Enforced strict sharp borders (`border-radius: 0 !important;`) in `@layer base` for `*`, `::before`, and `::after` in `src/app/globals.css`.

## Test Results
- Re-ran `npm run build` and it compiled successfully.
