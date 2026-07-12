### Task 4: Main Application Page

**Files:**
- Modify: `src/app/page.tsx`
- Create: `tests/page.test.tsx`

**Interfaces:**
- Consumes: `generatePuzzle` (Task 2) and `GameBoard` (Task 3)
- Produces: Server Component rendering the daily game

- [ ] **Step 1: Write the failing test**
Create `tests/page.test.tsx`:
```tsx
import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Page from '@/app/page'

vi.mock('@/lib/gameLogic', () => ({
  generatePuzzle: vi.fn(() => ({ activeCells: [], startPos: {x:0, y:0} }))
}))
vi.mock('@/components/GameBoard', () => ({
  default: () => <div data-testid="game-board" />
}))

describe('Page', () => {
  it('renders GameBoard', async () => {
    const { getByTestId } = render(await Page())
    expect(getByTestId('game-board')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npm run test tests/page.test.tsx`
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**
Modify `src/app/page.tsx` (completely replace existing contents):
```tsx
import { generatePuzzle } from '@/lib/gameLogic';
import GameBoard from '@/components/GameBoard';

export default async function Home() {
  const dateStr = new Date().toLocaleDateString('en-CA');
  const { activeCells, startPos } = generatePuzzle(dateStr);
  
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-8 tracking-tighter">One Line Daily</h1>
      <GameBoard activeCells={activeCells} startPos={startPos} />
    </main>
  );
}
```
*Note: Make sure to clear `src/app/globals.css` of any Next.js boilerplate except the standard Tailwind imports if you haven't already.

- [ ] **Step 4: Run test to verify it passes**
Run: `npm run test tests/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
Run: `git add tests/page.test.tsx src/app/page.tsx src/app/globals.css`
Run: `git commit -m "feat: Main application page"`
