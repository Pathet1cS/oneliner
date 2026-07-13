# Component Scaling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aggressively scale down the surrounding UI components (Title, Timer, Reset Button) on mobile devices to maximize the vertical space available for the game grid.

**Architecture:** Tailwind CSS responsive breakpoints are used to adjust typography, margins, padding, and border weights.

**Tech Stack:** Next.js, React, Tailwind CSS

## Global Constraints

- No structural React logic changes; only styling (Tailwind classes) and minor container wrappers.
- The app must remain playable with no visual regressions on large screens.

---

### Task 1: Scale Title Typography

**Files:**
- Modify: `src/app/page.tsx:15`
- Modify: `src/app/page.tsx:25`

**Interfaces:**
- Consumes: N/A
- Produces: A responsively scaled title text element.

- [ ] **Step 1: Write the failing test**

*(Visual verification only for CSS)*

- [ ] **Step 2: Run test to verify it fails**

N/A

- [ ] **Step 3: Write minimal implementation**

Update the ENILENO title styling in both the success and error states inside `src/app/page.tsx`.

Success state (line 15):
```tsx
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-[#F7AF4C] mb-2 md:mb-8 tracking-wider shadow-[4px_4px_0px_#000000]">
```

Error state (line 25):
```tsx
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-[#F7AF4C] mb-2 md:mb-8 tracking-wider shadow-[4px_4px_0px_#000000]">
```

- [ ] **Step 4: Run test to verify it passes**

Visually verify the title scales down on mobile screens.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "style: scale title typography on mobile screens"
```

---

### Task 2: Scale Timer & Reset Button

**Files:**
- Modify: `src/components/GameBoard.tsx`

**Interfaces:**
- Consumes: N/A
- Produces: Responsively scaled controls in GameBoard.

- [ ] **Step 1: Write the failing test**

*(Visual verification only for CSS)*

- [ ] **Step 2: Run test to verify it fails**

N/A

- [ ] **Step 3: Write minimal implementation**

Update the Timer styling:
```tsx
      <div className="text-black text-sm sm:text-lg md:text-3xl font-extrabold mb-2 md:mb-6 tracking-widest shadow-[4px_4px_0px_#000000] px-2 py-1 md:px-4 md:py-2 bg-[#F7AF4C] border-4 border-black inline-block">
        TIME {Math.floor(time / 60).toString().padStart(2, '0')}:{(time % 60).toString().padStart(2, '0')}
      </div>
```

Update the Grid max-width:
```tsx
      <div 
        className="grid grid-cols-7 gap-x-3 gap-y-1 sm:gap-2 md:gap-3 bg-white p-2 sm:p-4 md:p-6 shadow-[8px_8px_0px_#000000] relative overflow-hidden border-4 border-black w-full max-w-[min(100%,_700px)] aspect-square"
```

Update the Reset Button wrapper and button:
```tsx
      <div className="mt-2 md:mt-10 flex gap-4">
        <button onClick={() => { setPath([startPos]); setTime(0); setIsRunning(false); }} className="px-4 py-2 md:px-8 md:py-3 text-sm md:text-base bg-[#F7AF4C] text-black font-bold tracking-widest uppercase border-2 md:border-4 border-black shadow-[4px_4px_0px_#000000] hover:translate-y-1 hover:shadow-[2px_2px_0px_#000000] transition-all">Reset</button>
      </div>
```

- [ ] **Step 4: Run test to verify it passes**

Visually verify the components are scaled down on mobile viewports.

- [ ] **Step 5: Commit**

```bash
git add src/components/GameBoard.tsx
git commit -m "style: scale timer, reset button, and expand grid max-width"
```
