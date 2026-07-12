### Task 2: Core Generation Algorithm

**Files:**
- Create: `src/lib/gameLogic.ts`
- Create: `tests/gameLogic.test.ts`

**Interfaces:**
- Consumes: `dateStr` as a string (YYYY-MM-DD)
- Produces: `generatePuzzle(dateStr: string)` returning `{ activeCells: {x:number, y:number}[], startPos: {x:number, y:number} }`

- [ ] **Step 1: Write the failing test**
Create file `tests/gameLogic.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { generatePuzzle } from '@/lib/gameLogic'

describe('generatePuzzle', () => {
  it('generates the same puzzle for the same date', () => {
    const puzzle1 = generatePuzzle('2026-07-11')
    const puzzle2 = generatePuzzle('2026-07-11')
    expect(puzzle1).toEqual(puzzle2)
  })
  
  it('generates a valid path of correct length', () => {
    const puzzle = generatePuzzle('2026-07-11')
    expect(puzzle.activeCells.length).toBeGreaterThan(0)
    // Start pos should be in activeCells
    const startInActive = puzzle.activeCells.some(c => c.x === puzzle.startPos.x && c.y === puzzle.startPos.y)
    expect(startInActive).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test tests/gameLogic.test.ts`
Expected: FAIL with "generatePuzzle is not defined"

- [ ] **Step 3: Write minimal implementation**
Create file `src/lib/gameLogic.ts`:
```typescript
// Simple deterministic RNG
function mulberry32(a: number) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

export function generatePuzzle(dateStr: string) {
  const seed = parseInt(dateStr.replace(/-/g, ''));
  const random = mulberry32(seed);
  
  let grid = Array(7).fill(0).map(() => Array(7).fill(false));
  let x = Math.floor(random() * 7);
  let y = Math.floor(random() * 7);
  
  const startPos = { x, y };
  const activeCells = [{ x, y }];
  grid[y][x] = true;
  
  const dirs = [{dx: 0, dy: -1}, {dx: 1, dy: 0}, {dx: 0, dy: 1}, {dx: -1, dy: 0}];
  
  for (let i = 1; i < 20; i++) {
    // shuffle dirs
    let shuffledDirs = [...dirs].sort(() => random() - 0.5);
    let moved = false;
    for (let {dx, dy} of shuffledDirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < 7 && ny >= 0 && ny < 7 && !grid[ny][nx]) {
        x = nx;
        y = ny;
        grid[y][x] = true;
        activeCells.push({ x, y });
        moved = true;
        break;
      }
    }
    if (!moved) break;
  }
  
  return { activeCells, startPos };
}
```

- [ ] **Step 4: Run test to verify it passes**
Run: `npm test tests/gameLogic.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**
Run: `git add tests/gameLogic.test.ts src/lib/gameLogic.ts`
Run: `git commit -m "feat: core generation algorithm"`
