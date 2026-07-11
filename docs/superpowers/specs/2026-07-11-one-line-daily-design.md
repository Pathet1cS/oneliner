# One Line Daily - Design Specification

## Overview
A web-based puzzle game inspired by "One Line", where players must connect all playable tiles on a grid with a single continuous line. The game updates daily with a procedurally generated, unique puzzle shape. 

## Architecture & Tech Stack
- **Framework**: Next.js (App Router) for a fullstack approach.
- **Styling**: Tailwind CSS for styling, focusing on premium, dark mode, glassmorphic aesthetics.
- **State Management**: React state for gameplay (path drawing), LocalStorage to track if the player has solved the current day's puzzle.

## Game Logic & Puzzle Generation
- **Path-First Generation Algorithm**: 
  - To ensure a 100% solvable puzzle with a unique shape, generation occurs on the server.
  - The server uses a seeded Random Number Generator (seeded by the current date in YYYY-MM-DD format).
  - Starting from a virtual grid (e.g., 7x7), a random starting point is chosen.
  - A self-avoiding walk (DFS) of a fixed length (e.g., 20 steps) is simulated.
  - The tiles touched by this walk become the puzzle's shape. Untouched tiles are discarded and not rendered (they are empty space).
  - The server returns the list of active tiles and the starting tile to the client.

## User Interface & Experience
- **Aesthetic**: Premium dark mode. Active tiles appear as glowing/glassmorphic elements. The drawn line connects tiles clearly.
- **Interaction**: 
  - Player clicks/taps the starting tile and drags through adjacent active tiles.
  - Dragging backward "un-draws" the line.
  - A "Reset" button clears the path.
- **Win Condition**: When the line visits every active tile exactly once.
- **Daily Loop**: Only one puzzle per day. Focus is purely on the daily challenge (no complex Wordle-like sharing grids or streaks required).
