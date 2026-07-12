import { render, fireEvent, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import GameBoard from '@/components/GameBoard'

describe('GameBoard', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders active cells', () => {
    const activeCells = [{x: 0, y: 0}, {x: 1, y: 0}]
    const startPos = {x: 0, y: 0}
    const { container } = render(<GameBoard activeCells={activeCells} startPos={startPos} />)
    expect(container.querySelectorAll('.cell').length).toBe(49)
    expect(container.querySelectorAll('.cell.active').length).toBe(1)
    expect(Array.from(container.querySelectorAll('.cell')).filter(el => el.className.includes('bg-[#F7AF4C]')).length).toBe(1)
  })

  it('allows drawing a path, validates backtracking, triggers win, and reset button', () => {
    const activeCells = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}]
    const startPos = {x: 0, y: 0}
    const { container } = render(<GameBoard activeCells={activeCells} startPos={startPos} />)
    
    const cell00 = container.querySelector('[data-testid="cell-0-0"]')!
    const cell10 = container.querySelector('[data-testid="cell-1-0"]')!
    const cell20 = container.querySelector('[data-testid="cell-2-0"]')!

    // Start drawing
    // Mock releasePointerCapture since JSDOM does not implement it
    const releasePointerCapture = vi.fn()
    cell00.releasePointerCapture = releasePointerCapture

    fireEvent.pointerDown(cell00, { pointerId: 1 })
    expect(releasePointerCapture).toHaveBeenCalledWith(1)

    // Enter next valid cell
    fireEvent.pointerEnter(cell10)
    expect(cell10.className).toContain('bg-[#F7AF4C]')

    // Test backtracking (go back to 0,0)
    fireEvent.pointerEnter(cell00)
    expect(cell10.className).not.toContain('bg-[#F7AF4C]') // cell10 should no longer be visited

    // Go forward again
    fireEvent.pointerEnter(cell10)
    expect(cell10.className).toContain('bg-[#F7AF4C]')
    
    // Test win condition by reaching last cell
    fireEvent.pointerEnter(cell20)
    expect(cell20.className).toContain('bg-[#F7AF4C]')
    expect(screen.getByText(/Level.*Cleared!/i)).toBeInTheDocument()
    expect(localStorage.getItem(`solved-${new Date().toLocaleDateString('en-CA')}`)).toBe('true')

    // Test reset button
    const resetBtn = screen.getByText('Reset')
    fireEvent.click(resetBtn)
    
    expect(cell10.className).not.toContain('bg-[#F7AF4C]')
    expect(cell20.className).not.toContain('bg-[#F7AF4C]')
    expect(screen.queryByText(/Level.*Cleared!/i)).not.toBeInTheDocument()
  })
})
