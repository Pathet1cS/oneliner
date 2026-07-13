# Last Tile Dead End Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modify the puzzle generation logic so the last tile in the path has exactly one adjacent active tile, serving as a visual dead end.

**Architecture:** Update the depth-first search (DFS) in `gameLogic.ts`. When `targetLength` is met, count the active neighbors of the last cell using the `grid`. If the count is >1, reject the path (backtrack). If 1, accept it.

**Tech Stack:** TypeScript, Node.js, Vitest

## Global Constraints

- No UI or frontend modifications.
- Modify only the `dfs` generation logic.

---

### Task 1: Add End-of-Path Validation in gameLogic.ts

**Files:**
- Create: `tests/gameLogic.test.ts`
- Modify: `src/lib/gameLogic.ts`

**Interfaces:**
- Consumes: The `grid` state and `currentPath` from the `dfs` function.
- Produces: A validated `finalPath`.

- [ ] **Step 1: Write the failing test**

```typescript
// tests/gameLogic.test.ts
import { describe, it, expect } from 'vitest';
import { generatePuzzle, GRID_SIZE } from '../src/lib/gameLogic';

describe('generatePuzzle', () => {
  it('should ensure the last tile of the path has exactly one active neighbor', () => {
    // Generate a puzzle using a fixed date string for determinism
    const result = generatePuzzle('2023-01-01');
    const { activeCells } = result;
    const lastCell = activeCells[activeCells.length - 1];
    
    // Create a set for quick lookup of active cells
    const activeSet = new Set(activeCells.map(c => `${c.x},${c.y}`));
    
    // Count active neighbors of the last cell
    const dirs = [{dx: 0, dy: -1}, {dx: 1, dy: 0}, {dx: 0, dy: 1}, {dx: -1, dy: 0}];
    let activeNeighbors = 0;
    
    for (const {dx, dy} of dirs) {
      const nx = lastCell.x + dx;
      const ny = lastCell.y + dy;
      if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE) {
        if (activeSet.has(`${nx},${ny}`)) {
          activeNeighbors++;
        }
      }
    }
    
    // The last cell should only touch its predecessor
    expect(activeNeighbors).toBe(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/gameLogic.test.ts`
Expected: The test might occasionally pass by pure luck, but should fail for dates where the generated puzzle previously wrapped around. Let's run it to ensure the test executes correctly.

- [ ] **Step 3: Write minimal implementation**

Modify `src/lib/gameLogic.ts` by updating the `dfs` function:

```typescript
  function dfs(currentPath: {x: number, y: number}[], grid: boolean[][]) {
    if (finalPath) return; 
    
    if (currentPath.length === targetLength) {
      const last = currentPath[currentPath.length - 1];
      
      // Count active neighbors of the last cell
      let activeNeighbors = 0;
      for (let {dx, dy} of dirs) {
        const nx = last.x + dx;
        const ny = last.y + dy;
        if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE) {
          if (grid[ny][nx]) {
            activeNeighbors++;
          }
        }
      }
      
      // Only accept if exactly 1 active neighbor (its predecessor)
      if (activeNeighbors === 1) {
        finalPath = [...currentPath];
      }
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/gameLogic.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/gameLogic.test.ts src/lib/gameLogic.ts
git commit -m "feat: ensure last tile has only one active neighbor"
```
