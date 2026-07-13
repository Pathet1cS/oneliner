# Responsive Layout Design

## Overview
Update the ENILENO web app layout to be fully responsive on both mobile and desktop (laptop) screens. The primary goal is to eliminate vertical scrolling to reach the Reset button and timer, and to optimize the grid spacing, particularly emphasizing wider horizontal gaps on mobile.

## Architecture & Components
The changes are isolated to the presentation layer:
- `src/app/page.tsx`: The main container layout.
- `src/components/GameBoard.tsx`: The game board grid and control buttons.

## Layout & Styling Details

### Main Container (`page.tsx`)
- **Viewport Height constraint**: Update the main container from `min-h-screen` to `min-h-[100dvh]` to account for dynamic address bars on mobile browsers.
- **Flexbox Layout**: Ensure the container uses `flex flex-col` and the grid container uses `flex-1` with constrained maximum sizes, ensuring the Reset button and Timer remain visible without scrolling.

### Game Board Grid (`GameBoard.tsx`)
- **Fluid Grid Scaling**: Transition cell sizing from fixed values (`w-10 md:w-16`) to fluid sizes (e.g., utilizing `aspect-square` with `w-full` inside a container constrained by `max-w-full`). This automatically shrinks cell dimensions proportionally to fit the screen width and height.
- **Asymmetric Mobile Gaps**: 
  - On mobile, grid gaps will emphasize horizontal spacing: `gap-x-4 gap-y-2`.
  - On medium screens and up (laptop/desktop), gaps will return to uniform spacing: `md:gap-3`.
- **Responsive Typography**: The ENILENO title and Timer font sizes will scale down on small screens to prioritize screen real estate for the grid.

## Error Handling & Testing
- **Error Handling**: N/A for layout CSS changes.
- **Testing**: Manual visual verification across simulated mobile viewports (e.g., iPhone SE, Pixel) and desktop resolutions to ensure no vertical scrolling is forced. Check that touch boundaries on the tiles remain accurate after scaling.
