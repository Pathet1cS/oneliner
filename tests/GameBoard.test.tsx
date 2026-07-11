import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import GameBoard from '@/components/GameBoard'

describe('GameBoard', () => {
  it('renders active cells', () => {
    const activeCells = [{x: 0, y: 0}, {x: 1, y: 0}]
    const startPos = {x: 0, y: 0}
    const { container } = render(<GameBoard activeCells={activeCells} startPos={startPos} />)
    expect(container.querySelectorAll('.cell').length).toBe(49)
    expect(container.querySelectorAll('.cell.active').length).toBe(2)
  })
})
