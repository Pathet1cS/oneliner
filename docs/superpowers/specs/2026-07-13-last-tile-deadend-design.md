# Last Tile Dead End Algorithm Design

## Purpose
Modify the puzzle generation logic so that the last tile in the path acts as a visual "dead end." It should only have exactly one adjacent active tile (its immediate predecessor in the generated path).

## Architecture & Components
- **File:** `src/lib/gameLogic.ts`
- **Function:** `generatePuzzle` -> `dfs`
- **Logic:**
  When `currentPath.length === targetLength`, instead of immediately accepting the path, we validate the final tile. We check all four of its immediate orthogonal neighbors (Up, Down, Left, Right). If the number of active neighbors (where `grid[ny][nx] === true`) is exactly 1, the path is valid and accepted. If the count is greater than 1, the path is rejected, and the algorithm backtracks.

## Data Flow
- The DFS continues generating paths recursively.
- Upon reaching `targetLength`, a local neighbor-counting logic checks the surrounding coordinates of the last cell in `currentPath`.
- The `grid` (a 2D boolean array) is used to verify the active state of neighboring cells.
- If valid, `finalPath` is populated and generation finishes. If invalid, the DFS pops the cell, unwinds, and continues exploring alternative routes.

## Error Handling & Edge Cases
- **Grid boundaries:** The neighbor check must strictly respect `0 <= nx < GRID_SIZE` and `0 <= ny < GRID_SIZE` to avoid out-of-bounds array access.
- **Performance:** Rejecting paths slightly increases the search space. However, on a 7x7 grid with standard lengths, DFS will still find a valid path practically instantly.

## Scope
- This is strictly a backend algorithmic change inside `gameLogic.ts`. No frontend or UI code will be altered.
