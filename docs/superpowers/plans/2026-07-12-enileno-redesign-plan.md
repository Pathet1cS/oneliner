# Enileno Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the One Line Daily game into "Enileno" featuring 8-bit blocky aesthetics, CRT screen effects, and pixel animations.

**Architecture:** We will replace modern Tailwind utility classes (rounded corners, soft shadows) with sharp, pixelated borders and hard shadows. We will integrate Google Fonts for the typography and `framer-motion` for physics-based spring interactions and win state particles.

**Tech Stack:** Next.js, React, Tailwind CSS, Framer Motion

## Global Constraints

- Name change: "Enileno"
- Typography: `Pixelify Sans`
- Colors: Background `#334173`, Primary accents `#F7AF4C`
- No rounded corners or soft drop-shadows anywhere. All borders must be sharp.

---

### Task 1: Setup Dependencies and Typography

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `tailwind.config.ts` (if exists, or layout classes)

**Interfaces:**
- Consumes: Google Fonts (`next/font/google`)
- Produces: Global application of `Pixelify Sans`.

- [ ] **Step 1: Install `framer-motion`**

```bash
npm install framer-motion
```

- [ ] **Step 2: Update `layout.tsx` for Pixelify Sans**

```tsx
import { Pixelify_Sans } from 'next/font/google'

const pixelify = Pixelify_Sans({ subsets: ['latin'] })

// Replace Inter/existing font with Pixelify Sans in className
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={pixelify.className}>{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json src/app/layout.tsx
git commit -m "chore: install framer-motion and setup Pixelify Sans font"
```

---

### Task 2: Update Layout and Title (page.tsx)

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css` (for CRT effect)

**Interfaces:**
- Consumes: `layout.tsx` typography.
- Produces: The main page wrapper with the `#334173` background, new title, and CRT scanlines.

- [ ] **Step 1: Add CRT CSS to `globals.css`**

Append to `globals.css`:
```css
.crt-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  background-size: 100% 4px, 3px 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.8;
  animation: flicker 0.15s infinite;
}

@keyframes flicker {
  0% { opacity: 0.8; }
  50% { opacity: 0.9; }
  100% { opacity: 0.8; }
}
```

- [ ] **Step 2: Update `page.tsx` for title and colors**

```tsx
// Inside src/app/page.tsx
// Update the <main> element and <h1>
<main className="min-h-screen bg-[#334173] flex flex-col items-center justify-center p-4 relative">
  <div className="crt-overlay"></div>
  <h1 className="text-6xl text-[#F7AF4C] mb-8 tracking-wider shadow-[4px_4px_0px_#000000]">
    ENILENO
  </h1>
  <GameBoard activeCells={activeCells} startPos={startPos} />
</main>
```
*Note: Make sure to apply this to both the try block and catch block in `page.tsx`.*

- [ ] **Step 3: Run dev server to verify**
Run: `npm run dev`
Expected: Background is dark blue, font is pixelated, title is Enileno in orange with hard shadow, CRT lines overlay everything.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/globals.css
git commit -m "feat: apply Enileno styling and CRT effect to main page"
```

---

### Task 3: Blocky Game Board Styling

**Files:**
- Modify: `src/components/GameBoard.tsx`

**Interfaces:**
- Consumes: The `GameBoard` props and state.
- Produces: A sharp, pixelated grid with blocky paths instead of rounded nodes.

- [ ] **Step 1: Remove rounded corners and soft shadows from the grid container**

In `src/components/GameBoard.tsx`, find the grid container:
```tsx
<div 
  className="grid grid-cols-7 gap-3 bg-white p-6 shadow-[8px_8px_0px_#000000] relative overflow-hidden border-4 border-black"
  onPointerUp={() => setIsDrawing(false)}
  onPointerLeave={() => setIsDrawing(false)}
>
```

- [ ] **Step 2: Update Cell Styling**

Change the cell classes to remove `rounded-2xl`, use sharp corners, and update colors.
```tsx
// Replace the cell className with:
className={`relative cell w-10 h-10 md:w-16 md:h-16 select-none touch-none transition-none border-2 border-transparent ${active && !visited ? 'active bg-[#1A2548] border-[#F7AF4C] border-opacity-30' : ''} ${visited ? 'bg-[#F7AF4C] border-black shadow-[4px_4px_0px_#000000] z-10' : 'z-0'}`}
```

- [ ] **Step 3: Update Path/Connection Indicators**

Change the start/visited circles to blocky squares, and remove rounded/glowing classes. Use white or black for strong contrast against the orange cells.
```tsx
{isStart && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-white border-2 border-black z-20 pointer-events-none" />}
{visited && !isStart && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 bg-white z-10 pointer-events-none" />}
{connectTop && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 md:w-6 h-1/2 bg-white z-10 pointer-events-none" />}
{connectBottom && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 md:w-6 h-1/2 bg-white z-10 pointer-events-none" />}
{connectLeft && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 md:h-6 w-1/2 bg-white z-10 pointer-events-none" />}
{connectRight && <div className="absolute right-0 top-1/2 -translate-y-1/2 h-4 md:h-6 w-1/2 bg-white z-10 pointer-events-none" />}
```

- [ ] **Step 4: Update the Reset Button**

```tsx
<button onClick={() => setPath([startPos])} className="px-8 py-3 bg-[#F7AF4C] text-black font-bold tracking-widest uppercase border-4 border-black shadow-[4px_4px_0px_#000000] hover:translate-y-1 hover:shadow-[2px_2px_0px_#000000] transition-all">Reset</button>
```

- [ ] **Step 5: Commit**

```bash
git add src/components/GameBoard.tsx
git commit -m "feat: redesign game board and elements with 8-bit blocky styles"
```

---

### Task 4: Framer Motion Interactions and Win Particles

**Files:**
- Modify: `src/components/GameBoard.tsx`

**Interfaces:**
- Consumes: The `won` state from `GameBoard.tsx`.
- Produces: Bouncy cell interactions and win explosion particles.

- [ ] **Step 1: Import framer-motion**

```tsx
import { motion, AnimatePresence } from 'framer-motion';
```

- [ ] **Step 2: Add Cell Interactions**

Change the cell `div` to `motion.div`:
```tsx
<motion.div 
  key={i} 
  data-testid={`cell-${x}-${y}`}
  className={`...`}
  whileHover={active && !visited ? { scale: 1.1 } : {}}
  whileTap={active ? { scale: 0.9 } : {}}
  onPointerDown={(e) => { e.currentTarget.releasePointerCapture(e.pointerId); handlePointerDown(x, y); }}
  onPointerEnter={() => handlePointerEnter(x, y)}
>
```

- [ ] **Step 3: Update Win Overlay and Particles**

Replace the existing `won` overlay with a particle explosion using `framer-motion`.

```tsx
{won && (
  <div className="absolute inset-0 bg-[#334173]/90 z-50 flex flex-col items-center justify-center">
    {/* Win Particles */}
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={`particle-${i}`}
        className="absolute w-4 h-4 bg-[#F7AF4C] border-2 border-black"
        initial={{ opacity: 1, x: 0, y: 0 }}
        animate={{ 
          opacity: 0, 
          x: (Math.random() - 0.5) * 400, 
          y: (Math.random() - 0.5) * 400,
          rotate: Math.random() * 360
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    ))}
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", bounce: 0.6 }}
      className="text-4xl md:text-5xl text-white font-extrabold shadow-[4px_4px_0px_#000000] text-center uppercase"
    >
      Level<br/>Cleared!
    </motion.div>
  </div>
)}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/GameBoard.tsx
git commit -m "feat: add framer-motion interactions and win particles"
```
