# Harder Puzzle Generation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modify the puzzle generator to use a backtracking DFS to enforce a path length of exactly `MAX_PATH_LENGTH` (40), creating a dense and difficult puzzle.

**Architecture:** Replace the simple `while` loop with a recursive `dfs` function that backtracks if a dead end is reached before length 40. This forces the path to coil around itself.

**Tech Stack:** TypeScript, Vitest

## Global Constraints

- Must keep `mulberry32` PRNG tied to the date string for determinism.
- Both `GRID_SIZE` and `MAX_PATH_LENGTH` must remain 7 and 40 respectively.

---

### Task 1: DFS Backtracking Implementation

**Files:**
- Modify: `tests/gameLogic.test.ts`
- Modify: `src/lib/gameLogic.ts`

**Interfaces:**
- Consumes: `mulberry32` for random numbers
- Produces: `generatePuzzle(dateStr: string)` returning `{ activeCells: {x: number, y: number}[], startPos: {x: number, y: number} }`

- [ ] **Step 1: Write the failing test**

```typescript
// Replace lines 14-20 in tests/gameLogic.test.ts with the following:
  it('generates a valid path of correct length', () => {
    const puzzle = generatePuzzle(testDate)
    expect(puzzle.activeCells.length).toBe(40) // MAX_PATH_LENGTH
    // Start pos should be in activeCells
    const startInActive = puzzle.activeCells.some(c => c.x === puzzle.startPos.x && c.y === puzzle.startPos.y)
    expect(startInActive).toBe(true)
  })
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/gameLogic.test.ts -t "generates a valid path of correct length"`
Expected: FAIL (because the random walk usually stops around 15-20 steps instead of 40)

- [ ] **Step 3: Write minimal implementation**

```typescript
// Replace generatePuzzle in src/lib/gameLogic.ts with this backtracking DFS:

export function generatePuzzle(dateStr: string) {
  if (!dateStr || dateStr.trim() === '') {
    throw new Error('Invalid date string: cannot be empty');
  }

  const parsedSeed = parseInt(dateStr.replace(/-/g, ''), 10);
  if (isNaN(parsedSeed)) {
    throw new Error('Invalid date string: must contain valid numbers');
  }
  
  const seed = parsedSeed;
  const random = mulberry32(seed);
  
  let startX = Math.floor(random() * GRID_SIZE);
  let startY = Math.floor(random() * GRID_SIZE);
  const startPos = { x: startX, y: startY };
  
  const dirs = [{dx: 0, dy: -1}, {dx: 1, dy: 0}, {dx: 0, dy: 1}, {dx: -1, dy: 0}];
  let finalPath: {x: number, y: number}[] | null = null;
  
  function dfs(currentPath: {x: number, y: number}[], grid: boolean[][]) {
    if (finalPath) return; 
    
    if (currentPath.length === MAX_PATH_LENGTH) {
      finalPath = [...currentPath];
      return;
    }
    
    const last = currentPath[currentPath.length - 1];
    
    // shuffle dirs
    let shuffledDirs = [...dirs];
    for (let j = shuffledDirs.length - 1; j > 0; j--) {
      const k = Math.floor(random() * (j + 1));
      [shuffledDirs[j], shuffledDirs[k]] = [shuffledDirs[k], shuffledDirs[j]];
    }
    
    for (let {dx, dy} of shuffledDirs) {
      const nx = last.x + dx;
      const ny = last.y + dy;
      
      if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE && !grid[ny][nx]) {
        grid[ny][nx] = true;
        currentPath.push({x: nx, y: ny});
        
        dfs(currentPath, grid);
        if (finalPath) return;
        
        currentPath.pop();
        grid[ny][nx] = false;
      }
    }
  }
  
  let grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false));
  grid[startY][startX] = true;
  dfs([{x: startX, y: startY}], grid);
  
  if (!finalPath) {
    throw new Error('Could not generate puzzle of required length');
  }
  
  return { activeCells: finalPath, startPos };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/gameLogic.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/gameLogic.test.ts src/lib/gameLogic.ts
git commit -m "feat: use backtracking dfs to generate harder puzzles"
```
