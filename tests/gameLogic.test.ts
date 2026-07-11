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
