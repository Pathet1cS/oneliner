# Randomize Daily Path Length Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modify the puzzle generator so the path length is randomized between 20 and 45 based on the daily seed.

**Architecture:** Replace the static `MAX_PATH_LENGTH` constant with a dynamic `targetLength` computed inside `generatePuzzle`.

**Tech Stack:** TypeScript, Vitest

## Global Constraints

- Must keep `mulberry32` PRNG tied to the date string for determinism.
- The target length must be computed using `random()`.

---

### Task 1: Dynamic Path Length Implementation

**Files:**
- Modify: `tests/gameLogic.test.ts`
- Modify: `src/lib/gameLogic.ts`

**Interfaces:**
- Consumes: `mulberry32` for random numbers
- Produces: `generatePuzzle(dateStr: string)` returning `{ activeCells: {x: number, y: number}[], startPos: {x: number, y: number} }` with a length between 20 and 45.

- [ ] **Step 1: Write the failing test**

```typescript
// In tests/gameLogic.test.ts, update the import and the path length test:
// Remove MAX_PATH_LENGTH from the import if it exists.
// Update the 'generates a valid path of correct length' test:

  it('generates a valid path of correct length', () => {
    const puzzle = generatePuzzle(testDate)
    expect(puzzle.activeCells.length).toBeGreaterThanOrEqual(20)
    expect(puzzle.activeCells.length).toBeLessThanOrEqual(45)
    // Start pos should be in activeCells
    const startInActive = puzzle.activeCells.some(c => c.x === puzzle.startPos.x && c.y === puzzle.startPos.y)
    expect(startInActive).toBe(true)
  })
```

- [ ] **Step 2: Run test to verify it fails**
*(Note: It might actually pass if the previous hardcoded 40 satisfies the 20-45 condition, but we still need to update the implementation to randomize it).*
Run: `npx vitest run tests/gameLogic.test.ts -t "generates a valid path of correct length"`

- [ ] **Step 3: Write minimal implementation**

```typescript
// In src/lib/gameLogic.ts:
// Replace `export const MAX_PATH_LENGTH = 40;` with:
export const MIN_PATH_LENGTH = 20;
export const MAX_PATH_LENGTH = 45;

// Inside `generatePuzzle`, right after initializing `const random = mulberry32(seed);`, add:
  const targetLength = Math.floor(random() * (MAX_PATH_LENGTH - MIN_PATH_LENGTH + 1)) + MIN_PATH_LENGTH;

// Also, update the DFS algorithm to check against `targetLength` instead of `MAX_PATH_LENGTH`:
// Replace:
// if (currentPath.length === MAX_PATH_LENGTH) {
// with:
// if (currentPath.length === targetLength) {
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/gameLogic.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/gameLogic.test.ts src/lib/gameLogic.ts
git commit -m "feat: randomize daily puzzle path length between 20 and 45"
```
