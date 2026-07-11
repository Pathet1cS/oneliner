import { generatePuzzle } from '@/lib/gameLogic';
import GameBoard from '@/components/GameBoard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const dateStr = new Date().toLocaleDateString('en-CA', { timeZone: 'UTC' });
  
  try {
    const { activeCells, startPos } = generatePuzzle(dateStr);
    
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-8 tracking-tighter">One Line Daily</h1>
        <GameBoard activeCells={activeCells} startPos={startPos} />
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-8 tracking-tighter">One Line Daily</h1>
        <p className="text-red-400 text-center">Error generating today's puzzle. Please try again later.</p>
      </main>
    );
  }
}
