# Component Scaling Design

## Overview
To allow the game grid to occupy a larger portion of the screen without forcing vertical scrolling on mobile devices, we need to aggressively shrink the surrounding UI components (Title, Timer, and Reset button) on smaller viewports.

## Architecture & Components
The changes modify the Tailwind CSS classes on existing components in two files:
- `src/app/page.tsx`: The main title text.
- `src/components/GameBoard.tsx`: The timer, the reset button, and the grid container cap.

## Layout & Styling Details

### Title (`page.tsx`)
- Scale font size and bottom margin to be smaller on mobile.
- **Classes**: Change from `text-6xl mb-8` to `text-4xl sm:text-5xl md:text-6xl mb-2 md:mb-8`.

### Timer (`GameBoard.tsx`)
- Scale font size and padding down on mobile to reduce its footprint.
- **Classes**: Change from `text-xl sm:text-2xl md:text-3xl px-4 py-2` to `text-sm sm:text-lg md:text-3xl px-2 py-1 md:px-4 md:py-2`.

### Reset Button (`GameBoard.tsx`)
- Reduce padding, font size, border thickness, and the top margin on mobile.
- **Classes**: 
  - Change top margin from `mt-10` to `mt-2 md:mt-10`.
  - Change button styles from `px-8 py-3 border-4` to `px-4 py-2 md:px-8 md:py-3 text-sm md:text-base border-2 md:border-4`.

### Grid Container Size Cap (`GameBoard.tsx`)
- Increase the maximum allowed width of the grid so it can naturally expand further to fill the newly freed vertical space.
- **Classes**: Change `max-w-[min(100%,_500px)]` to `max-w-[min(100%,_700px)]`.

## Error Handling & Testing
- N/A for CSS class changes. Manual visual verification using the dev server is required to ensure the components scale gracefully and the grid expands correctly.
