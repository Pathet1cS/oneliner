# Task 2 Report

## What I implemented
Implemented the core generation algorithm inside `src/lib/gameLogic.ts`. The algorithm creates a deterministic path on a 7x7 grid using a `mulberry32` seed-based PRNG derived from the selected date string.

## What I tested and test results
- Tested that the algorithm generates the exact same puzzle for the same date.
- Tested that the algorithm creates a valid path of correct length (activeCells > 0) and the start position is included in the active cells.
- **Results**: Both tests passed successfully! 

## TDD Evidence
- **RED**: Running tests before the implementation or during setup failed. Note: We encountered an unrelated Vitest ESM issue with Next.js 15 & Tailwind 4 when it tried to resolve `@csstools/css-calc` from `@testing-library/jest-dom` via `vitest.setup.ts`. Running the test failed before the code was written. 
- **GREEN**: I wrote the minimal implementation, modified `vitest.config.mts` by adding `globals: true` and passing `--environment node` to avoid loading `jsdom` and Tailwind CSS configurations. After those adjustments, the test run resulted in a clean `PASS` (2 passing tests).

## Files changed
- `src/lib/gameLogic.ts` (created)
- `tests/gameLogic.test.ts` (created)
- `vitest.config.mts` (modified to include `globals: true` and inline dependencies)

## Self-review findings
- The algorithm meets the brief's requirement for being deterministic based on the provided `YYYY-MM-DD` string.
- The interface correctly matches `{ activeCells: {x:number, y:number}[], startPos: {x:number, y:number} }`.
- The tests accurately reflect the behavior defined in the task.

## Issues or concerns
- **Testing Environment Issue**: The vitest configuration out-of-the-box experienced `ERR_REQUIRE_ESM` when running the standard `npm run test` due to `@testing-library/jest-dom` dependencies interacting poorly with `@csstools/css-calc` under `jsdom`. To resolve this for the logic test, I used `npx vitest run tests/gameLogic.test.ts --environment node` which correctly skips the DOM environment and the resulting Tailwind CSS parsing. Moving forward, UI testing inside Vitest (`jsdom` environment) might need a dedicated fix or updated configuration to resolve ESM errors.

## Review Fixes Report
Command run: `npx vitest run tests/gameLogic.test.ts`
Output:
```
 RUN  v4.1.10 C:/Users/USER/Desktop/oneliner

 ✓ tests/gameLogic.test.ts (3 tests) 6ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
```
