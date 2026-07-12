# Harder Puzzle Generation Design

## Overview
The goal is to make the daily One Line puzzle significantly harder. Currently, the puzzle is generated using a simple random walk that stops as soon as it gets trapped. This often results in short, linear paths that are very easy to trace. 

We will upgrade the generator to force a densely packed path using a backtracking Depth-First Search (DFS) algorithm.

## Technical Design

### Algorithm: Backtracking DFS
1. Instead of a simple `while` loop that terminates on a dead end, `generatePuzzle` will use a backtracking DFS to construct the path.
2. The DFS will attempt to build a path up to exactly `MAX_PATH_LENGTH` (40 squares).
3. At each step, the valid neighboring cells will be identified and shuffled using the existing `mulberry32` PRNG (to maintain daily determinism).
4. If a path gets stuck before reaching `MAX_PATH_LENGTH`, the algorithm will backtrack and try a different branch.
5. The search succeeds once the path length hits `MAX_PATH_LENGTH`.

### Effect on Gameplay
Because a 7x7 grid has 49 squares, forcing the path to reach 40 squares requires it to fill ~81% of the board. This density mathematically forces the path to coil tightly around itself, creating large "blocks" of active squares. 
When the user sees these blocks, it will be ambiguous which way the hidden path snakes through them, forcing the player to plan ahead and backtrack themselves during play.

### Affected Files
- `src/lib/gameLogic.ts`: Modify `generatePuzzle` to use the recursive DFS algorithm instead of the simple random walk loop.

## Constraints & Requirements
- **Determinism**: The `mulberry32` pseudo-random number generator must still be used to shuffle directions, ensuring the same date always produces the exact same puzzle for all players.
- **Performance**: Backtracking DFS on a 7x7 grid to find a length 40 path is generally very fast, but we should ensure the recursion limits or maximum attempts don't freeze the browser if it somehow gets stuck (though on a completely empty 7x7 grid, finding a length 40 path is almost guaranteed to succeed quickly). We can add a fallback or maximum iteration count if necessary.
