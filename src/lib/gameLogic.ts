// Simple deterministic RNG
function mulberry32(a: number) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

export function generatePuzzle(dateStr: string) {
  const seed = parseInt(dateStr.replace(/-/g, ''));
  const random = mulberry32(seed);
  
  let grid = Array(7).fill(0).map(() => Array(7).fill(false));
  let x = Math.floor(random() * 7);
  let y = Math.floor(random() * 7);
  
  const startPos = { x, y };
  const activeCells = [{ x, y }];
  grid[y][x] = true;
  
  const dirs = [{dx: 0, dy: -1}, {dx: 1, dy: 0}, {dx: 0, dy: 1}, {dx: -1, dy: 0}];
  
  for (let i = 1; i < 20; i++) {
    // shuffle dirs
    let shuffledDirs = [...dirs].sort(() => random() - 0.5);
    let moved = false;
    for (let {dx, dy} of shuffledDirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < 7 && ny >= 0 && ny < 7 && !grid[ny][nx]) {
        x = nx;
        y = ny;
        grid[y][x] = true;
        activeCells.push({ x, y });
        moved = true;
        break;
      }
    }
    if (!moved) break;
  }
  
  return { activeCells, startPos };
}
