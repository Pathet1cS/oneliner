# Enileno Redesign Specification

## Overview
Redesign the "One Line Daily" game into a retro arcade-style game called "Enileno". The game will feature 8-bit blocky aesthetics, CRT screen effects, and pixel animations.

## Visual Design
- **Typography:** Use `Pixelify Sans` (imported from Google Fonts) as the global font.
- **Colors:**
  - Background: `#334173` (Dark Blue)
  - Primary accents & text: `#F7AF4C` (Orange)
  - Grid background & path lines: Combinations of white, orange, and dark blue with sharp contrasts.
- **UI Elements:**
  - Remove all rounded corners (`rounded-X`) and soft shadows (`shadow-xl` with blur).
  - Use hard, unblurred offset shadows (e.g., `shadow-[4px_4px_0px_#000000]`) to create a 3D pixel look.

## Component Changes

### `src/app/page.tsx`
- Update the title text to "Enileno".
- Apply the dark blue background color.
- Remove the modern gradient text styles and replace with solid orange text and a hard drop shadow.

### `src/components/GameBoard.tsx`
- **Grid Layout:** Keep the 7x7 grid but change the cell styling to sharp squares.
- **Path Drawing:** Active lines between connected points must be thick, sharp, and blocky instead of thin and rounded.
- **Start Node & Win State:** Replace glowing dots with solid blocky squares or pixelated sprites.

## Animations & Effects
We will use `framer-motion` for complex UI animations and simple CSS for static overlays.

### CRT Overlay (CSS)
- A fixed `div` overlaying the whole screen.
- Features: repeating scanlines (using a linear-gradient background), a subtle opacity flicker animation, and `pointer-events-none`.

### Interactions (Framer Motion)
- **Turn-on effect:** When the page mounts, animate from a horizontal white line expanding vertically into the full screen (classic TV tube turn-on).
- **Bouncy UI:** Wrap the `Reset` button and grid interaction with Framer Motion's `whileTap` and `whileHover` spring animations to give a tactile, arcade feel.
- **Win Particles:** When the puzzle is solved, spawn multiple small square `div`s (particles) that animate outward from the board using Framer Motion layout/physics animations.

## Implementation Steps
1. Install `framer-motion`.
2. Update `layout.tsx` to include the `Pixelify Sans` font from `next/font/google`.
3. Update `page.tsx` with the new colors and title.
4. Refactor `GameBoard.tsx` for the blocky grid and path styles.
5. Add the CRT overlay and TV turn-on effect.
6. Add the interaction springs (bouncy buttons).
7. Implement the win state particle explosion.
