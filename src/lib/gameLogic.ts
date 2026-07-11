// Simple deterministic RNG
function mulberry32(a: number) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

export const GRID_SIZE = 7;
export const MAX_PATH_LENGTH = 20;

export function generatePuzzle(dateStr: string) {
  if (!dateStr || dateStr.trim() === '') {
    throw new Error('Invalid date string: cannot be empty');
  }

  const parsedSeed = parseInt(dateStr.replace(/-/g, ''), 10);
  if (isNaN(parsedSeed)) {
    throw new Error('Invalid date string: must contain valid numbers');
  }
  
  const seed = parsedSeed;
  const random = mulberry32(seed);
  
  let grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false));
  let x = Math.floor(random() * GRID_SIZE);
  let y = Math.floor(random() * GRID_SIZE);
  
  const startPos = { x, y };
  const activeCells = [{ x, y }];
  grid[y][x] = true;
  
  const dirs = [{dx: 0, dy: -1}, {dx: 1, dy: 0}, {dx: 0, dy: 1}, {dx: -1, dy: 0}];
  
  for (let i = 1; i < MAX_PATH_LENGTH; i++) {
    // shuffle dirs using Fisher-Yates
    let shuffledDirs = [...dirs];
    for (let j = shuffledDirs.length - 1; j > 0; j--) {
      const k = Math.floor(random() * (j + 1));
      [shuffledDirs[j], shuffledDirs[k]] = [shuffledDirs[k], shuffledDirs[j]];
    }
    
    let moved = false;
    for (let {dx, dy} of shuffledDirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE && !grid[ny][nx]) {
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
