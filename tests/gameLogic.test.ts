// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { generatePuzzle, GRID_SIZE } from '@/lib/gameLogic'

describe('generatePuzzle', () => {
  const testDate = '2026-07-11'

  it('generates the same puzzle for the same date', () => {
    const puzzle1 = generatePuzzle(testDate)
    const puzzle2 = generatePuzzle(testDate)
    expect(puzzle1).toEqual(puzzle2)
  })
  
  it('generates a valid path of correct length', () => {
    const puzzle = generatePuzzle(testDate)
    expect(puzzle.activeCells.length).toBeGreaterThanOrEqual(20)
    expect(puzzle.activeCells.length).toBeLessThanOrEqual(45)
    // Start pos should be in activeCells
    const startInActive = puzzle.activeCells.some(c => c.x === puzzle.startPos.x && c.y === puzzle.startPos.y)
    expect(startInActive).toBe(true)
  })

  it('throws an error for invalid date strings', () => {
    expect(() => generatePuzzle('')).toThrow('Invalid date string: cannot be empty')
    expect(() => generatePuzzle('invalid-date')).toThrow('Invalid date string: must contain valid numbers')
  })

  it('should ensure the last tile of the path has exactly one active neighbor', () => {
    // Generate a puzzle using a fixed date string for determinism
    const result = generatePuzzle('2023-01-03')
    const { activeCells } = result
    const lastCell = activeCells[activeCells.length - 1]
    
    // Create a set for quick lookup of active cells
    const activeSet = new Set(activeCells.map(c => `${c.x},${c.y}`))
    
    // Count active neighbors of the last cell
    const dirs = [{dx: 0, dy: -1}, {dx: 1, dy: 0}, {dx: 0, dy: 1}, {dx: -1, dy: 0}]
    let activeNeighbors = 0
    
    for (const {dx, dy} of dirs) {
      const nx = lastCell.x + dx
      const ny = lastCell.y + dy
      if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE) {
        if (activeSet.has(`${nx},${ny}`)) {
          activeNeighbors++
        }
      }
    }
    
    // The last cell should only touch its predecessor
    expect(activeNeighbors).toBe(1)
  })
})
