# One Line Daily Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Wordle-like daily puzzle game where the user connects a randomly generated path of tiles without lifting their cursor.

**Architecture:** A Next.js App Router fullstack app. A server-side algorithm generates a solvable grid daily based on a seeded RNG. The client React component handles drawing mechanics and checks win conditions.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS v4, Vitest for testing.

## Global Constraints

- Framework must be Next.js (App Router).
- Styling must use Tailwind CSS focusing on premium, dark mode, glassmorphic aesthetics.
- Game logic must be 100% solvable via a "Path-First Generation Algorithm" run on the server.
- Daily Loop: Only one puzzle per day.

---

### Task 1: Scaffolding and Test Setup

**Files:**
- Create: `package.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`

**Interfaces:**
- Consumes: None
- Produces: A working Next.js App with Tailwind and Vitest.

- [ ] **Step 1: Scaffold Next.js with Tailwind**
Run: `npx -y create-next-app@latest . --typescript --eslint --tailwind --app --src-dir --import-alias "@/*"`
Expected: Next.js project is created. 

- [ ] **Step 2: Install Vitest**
Run: `npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom`
Expected: Dependencies installed.

- [ ] **Step 3: Configure Vitest**
Create file `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

- [ ] **Step 4: Create Vitest Setup File**
Create file `vitest.setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Add test script and commit**
Run: `npm pkg set scripts.test="vitest run"`
Run: `git add . && git commit -m "chore: initial next.js scaffold with vitest"`
Expected: PASS

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

### Task 3: Game Board Component

**Files:**
- Create: `src/components/GameBoard.tsx`
- Create: `tests/GameBoard.test.tsx`

**Interfaces:**
- Consumes: `{ activeCells, startPos }` from Task 2
- Produces: `GameBoard` component

- [ ] **Step 1: Write the failing test**
Create file `tests/GameBoard.test.tsx`:
```tsx
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import GameBoard from '@/components/GameBoard'

describe('GameBoard', () => {
  it('renders active cells', () => {
    const activeCells = [{x: 0, y: 0}, {x: 1, y: 0}]
    const startPos = {x: 0, y: 0}
    const { container } = render(<GameBoard activeCells={activeCells} startPos={startPos} />)
    expect(container.querySelectorAll('.cell').length).toBe(49)
    expect(container.querySelectorAll('.cell.active').length).toBe(2)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test tests/GameBoard.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**
Create file `src/components/GameBoard.tsx`:
```tsx
'use client';
import { useState, useEffect } from 'react';

export default function GameBoard({ activeCells, startPos }: { activeCells: {x:number, y:number}[], startPos: {x:number, y:number} }) {
  const [path, setPath] = useState<{x:number, y:number}[]>([startPos]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (path.length === activeCells.length) {
      setWon(true);
      localStorage.setItem(`solved-${new Date().toISOString().split('T')[0]}`, 'true');
    }
  }, [path, activeCells]);

  const isActive = (x: number, y: number) => activeCells.some(c => c.x === x && c.y === y);
  const isVisited = (x: number, y: number) => path.some(c => c.x === x && c.y === y);

  const handlePointerDown = (x: number, y: number) => {
    if (won) return;
    if (x === path[path.length - 1].x && y === path[path.length - 1].y) {
      setIsDrawing(true);
    }
  };

  const handlePointerEnter = (x: number, y: number) => {
    if (!isDrawing || won || !isActive(x, y)) return;
    const last = path[path.length - 1];
    if (Math.abs(last.x - x) + Math.abs(last.y - y) === 1) {
      if (path.length > 1 && path[path.length - 2].x === x && path[path.length - 2].y === y) {
        setPath(p => p.slice(0, -1));
      } else if (!isVisited(x, y)) {
        setPath(p => [...p, {x, y}]);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className="grid grid-cols-7 gap-2 bg-zinc-900 p-4 rounded-xl"
        onPointerUp={() => setIsDrawing(false)}
        onPointerLeave={() => setIsDrawing(false)}
      >
        {Array.from({length: 49}).map((_, i) => {
          const x = i % 7;
          const y = Math.floor(i / 7);
          const active = isActive(x, y);
          const visited = isVisited(x, y);
          const isStart = startPos.x === x && startPos.y === y;
          return (
            <div 
              key={i} 
              className={`cell w-10 h-10 md:w-16 md:h-16 rounded-lg select-none touch-none ${active ? 'active bg-zinc-800/80 backdrop-blur border border-zinc-700' : ''} ${visited ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]' : ''} ${isStart && !visited ? 'animate-pulse bg-blue-400' : ''}`}
              onPointerDown={(e) => { e.currentTarget.releasePointerCapture(e.pointerId); handlePointerDown(x, y); }}
              onPointerEnter={() => handlePointerEnter(x, y)}
            />
          );
        })}
      </div>
      <div className="mt-8 flex gap-4">
        <button onClick={() => setPath([startPos])} className="px-6 py-2 bg-zinc-800 rounded text-white border border-zinc-700">Reset</button>
      </div>
      {won && <div className="mt-8 text-2xl text-green-400 font-bold animate-bounce">Puzzle Solved!</div>}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**
Run: `npm test tests/GameBoard.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
Run: `git add tests/GameBoard.test.tsx src/components/GameBoard.tsx`
Run: `git commit -m "feat: GameBoard component and drawing logic"`

### Task 4: Main Page Integration

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `GameBoard` and `generatePuzzle`
- Produces: Final playable page.

- [ ] **Step 1: Write the failing test**
Create file `tests/page.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Page from '@/app/page'

describe('Page', () => {
  it('renders the game title', () => {
    render(<Page />)
    expect(screen.getByText('One Line Daily')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test tests/page.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**
Modify `src/app/page.tsx`:
```tsx
import GameBoard from '@/components/GameBoard';
import { generatePuzzle } from '@/lib/gameLogic';

export default function Home() {
  const dateStr = new Date().toISOString().split('T')[0];
  const puzzle = generatePuzzle(dateStr);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-2 tracking-tight">One Line Daily</h1>
      <p className="text-zinc-500 mb-8 font-mono">{dateStr}</p>
      <GameBoard activeCells={puzzle.activeCells} startPos={puzzle.startPos} />
    </main>
  );
}
```
Modify `src/app/globals.css`:
```css
@import "tailwindcss";

body {
  background-color: #000;
  color: #fff;
}
```

- [ ] **Step 4: Run test to verify it passes**
Run: `npm test tests/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
Run: `git add tests/page.test.tsx src/app/page.tsx src/app/globals.css`
Run: `git commit -m "feat: assemble main page"`
