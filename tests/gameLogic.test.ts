import { describe, it, expect } from 'vitest';
import { generatePuzzle, GRID_SIZE } from '../src/lib/gameLogic';

describe('generatePuzzle', () => {
  it('should ensure the last tile of the path has exactly one active neighbor', () => {
    // Generate a puzzle using a fixed date string for determinism
    const result = generatePuzzle('2023-01-03');
    const { activeCells } = result;
    const lastCell = activeCells[activeCells.length - 1];
    
    // Create a set for quick lookup of active cells
    const activeSet = new Set(activeCells.map(c => `${c.x},${c.y}`));
    
    // Count active neighbors of the last cell
    const dirs = [{dx: 0, dy: -1}, {dx: 1, dy: 0}, {dx: 0, dy: 1}, {dx: -1, dy: 0}];
    let activeNeighbors = 0;
    
    for (const {dx, dy} of dirs) {
      const nx = lastCell.x + dx;
      const ny = lastCell.y + dy;
      if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE) {
        if (activeSet.has(`${nx},${ny}`)) {
          activeNeighbors++;
        }
      }
    }
    
    // The last cell should only touch its predecessor
    expect(activeNeighbors).toBe(1);
  });
});
