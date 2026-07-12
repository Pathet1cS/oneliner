# Randomize Daily Path Length Design

## Overview
The goal is to modify the puzzle generator so that the length of the daily puzzle varies from day to day, providing more variety. Instead of a fixed length of 40, the path length will be a random number between 20 and 45.

## Technical Design

### Algorithm Update
1. Modify `src/lib/gameLogic.ts` to replace `export const MAX_PATH_LENGTH = 40;` with two new constants:
   - `export const MIN_PATH_LENGTH = 20;`
   - `export const MAX_PATH_LENGTH = 45;`
2. Inside `generatePuzzle`, right after initializing the `mulberry32` PRNG `random`, compute the target path length:
   `const targetLength = Math.floor(random() * (MAX_PATH_LENGTH - MIN_PATH_LENGTH + 1)) + MIN_PATH_LENGTH;`
3. Update the backtracking `dfs` algorithm to check `if (currentPath.length === targetLength)` instead of using `MAX_PATH_LENGTH` directly.

### Constraints & Requirements
- **Determinism**: The `targetLength` must be computed using the `mulberry32` random generator initialized with the daily seed. This guarantees that the path length remains consistent for all players on the same day.
- **Bounds Check**: Ensure that `generatePuzzle` reliably finds paths up to 45 squares on a 7x7 grid without stalling. Since 45 out of 49 is still computationally feasible for a DFS backtracking, performance should remain acceptable.

### Affected Files
- `src/lib/gameLogic.ts`: Logic changes.
- `tests/gameLogic.test.ts`: Update tests to check that the path length is `>= MIN_PATH_LENGTH` and `<= MAX_PATH_LENGTH`.
