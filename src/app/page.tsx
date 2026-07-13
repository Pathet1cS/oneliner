import { generatePuzzle } from '@/lib/gameLogic';
import GameBoard from '@/components/GameBoard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const dateStr = new Date().toLocaleDateString('en-CA', { timeZone: 'UTC' });
  
  try {
    const { activeCells, startPos } = generatePuzzle(dateStr);
    
    return (
      <main className="min-h-[100dvh] h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#334173] flex flex-col items-center justify-center p-4 relative">
        <div className="crt-overlay"></div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-[#F7AF4C] mb-2 md:mb-8 tracking-wider shadow-[4px_4px_0px_#000000]">
          ENILENO
        </h1>
        <GameBoard activeCells={activeCells} startPos={startPos} />
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-[100dvh] h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#334173] flex flex-col items-center justify-center p-4 relative">
        <div className="crt-overlay"></div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-[#F7AF4C] mb-2 md:mb-8 tracking-wider shadow-[4px_4px_0px_#000000]">
          ENILENO
        </h1>
        <p className="text-rose-500 font-medium text-center">Error generating today's puzzle. Please try again later.</p>
      </main>
    );
  }
}
