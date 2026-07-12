// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { generatePuzzle } from '@/lib/gameLogic'

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
})
