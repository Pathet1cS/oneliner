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
export const MIN_PATH_LENGTH = 20;
export const MAX_PATH_LENGTH = 45;

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
  const targetLength = Math.floor(random() * (MAX_PATH_LENGTH - MIN_PATH_LENGTH + 1)) + MIN_PATH_LENGTH;
  
  let startX = Math.floor(random() * GRID_SIZE);
  let startY = Math.floor(random() * GRID_SIZE);
  const startPos = { x: startX, y: startY };
  
  const dirs = [{dx: 0, dy: -1}, {dx: 1, dy: 0}, {dx: 0, dy: 1}, {dx: -1, dy: 0}];
  let finalPath: {x: number, y: number}[] | null = null;
  
  function dfs(currentPath: {x: number, y: number}[], grid: boolean[][]) {
    if (finalPath) return; 
    
    if (currentPath.length === targetLength) {
      finalPath = [...currentPath];
      return;
    }
    
    const last = currentPath[currentPath.length - 1];
    
    // shuffle dirs
    let shuffledDirs = [...dirs];
    for (let j = shuffledDirs.length - 1; j > 0; j--) {
      const k = Math.floor(random() * (j + 1));
      [shuffledDirs[j], shuffledDirs[k]] = [shuffledDirs[k], shuffledDirs[j]];
    }
    
    for (let {dx, dy} of shuffledDirs) {
      const nx = last.x + dx;
      const ny = last.y + dy;
      
      if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE && !grid[ny][nx]) {
        grid[ny][nx] = true;
        currentPath.push({x: nx, y: ny});
        
        dfs(currentPath, grid);
        if (finalPath) return;
        
        currentPath.pop();
        grid[ny][nx] = false;
      }
    }
  }
  
  let grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false));
  grid[startY][startX] = true;
  dfs([{x: startX, y: startY}], grid);
  
  if (!finalPath) {
    throw new Error('Could not generate puzzle of required length');
  }
  
  return { activeCells: finalPath, startPos };
}
