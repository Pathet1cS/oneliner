import { generatePuzzle } from './src/lib/gameLogic';

for (let i = 1; i <= 365; i++) {
  const dateStr = `2026-01-${String(i).padStart(2, '0')}`;
  try {
    const start = performance.now();
    generatePuzzle(dateStr);
    const end = performance.now();
    if (end - start > 10) {
      console.log(`Took ${end - start}ms for ${dateStr}`);
    }
  } catch(e) {
    console.error(`Failed for ${dateStr}: ${(e as Error).message}`);
  }
}
console.log("Done");
