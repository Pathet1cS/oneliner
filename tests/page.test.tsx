import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Page from '@/app/page'

vi.mock('@/lib/gameLogic', () => ({
  generatePuzzle: vi.fn(() => ({ activeCells: [], startPos: {x:0, y:0} }))
}))
vi.mock('@/components/GameBoard', () => ({
  default: () => <div data-testid="game-board" />
}))

describe('Page', () => {
  it('renders GameBoard', async () => {
    const { getByTestId } = render(await Page())
    expect(getByTestId('game-board')).toBeInTheDocument()
  })
})
