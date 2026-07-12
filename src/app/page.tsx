import { generatePuzzle } from '@/lib/gameLogic';
import GameBoard from '@/components/GameBoard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const dateStr = new Date().toLocaleDateString('id-ID', { timeZone: 'UTC' });
  
  try {
    const { activeCells, startPos } = generatePuzzle("2/1/2026");
    
    return (
      <main className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 mb-8 tracking-tighter drop-shadow-sm">One Line Daily</h1>
        <GameBoard activeCells={activeCells} startPos={startPos} />
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 mb-8 tracking-tighter drop-shadow-sm">One Line Daily</h1>
        <p className="text-rose-500 font-medium text-center">Error generating today's puzzle. Please try again later.</p>
      </main>
    );
  }
}
