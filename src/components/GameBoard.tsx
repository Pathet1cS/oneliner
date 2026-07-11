'use client';
import { useState, useEffect } from 'react';

export default function GameBoard({ activeCells, startPos }: { activeCells: {x:number, y:number}[], startPos: {x:number, y:number} }) {
  const [path, setPath] = useState<{x:number, y:number}[]>([startPos]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (path.length === activeCells.length) {
      setWon(true);
      localStorage.setItem(`solved-${new Date().toISOString().split('T')[0]}`, 'true');
    }
  }, [path, activeCells]);

  const isActive = (x: number, y: number) => activeCells.some(c => c.x === x && c.y === y);
  const isVisited = (x: number, y: number) => path.some(c => c.x === x && c.y === y);

  const handlePointerDown = (x: number, y: number) => {
    if (won) return;
    if (x === path[path.length - 1].x && y === path[path.length - 1].y) {
      setIsDrawing(true);
    }
  };

  const handlePointerEnter = (x: number, y: number) => {
    if (!isDrawing || won || !isActive(x, y)) return;
    const last = path[path.length - 1];
    if (Math.abs(last.x - x) + Math.abs(last.y - y) === 1) {
      if (path.length > 1 && path[path.length - 2].x === x && path[path.length - 2].y === y) {
        setPath(p => p.slice(0, -1));
      } else if (!isVisited(x, y)) {
        setPath(p => [...p, {x, y}]);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className="grid grid-cols-7 gap-2 bg-zinc-900 p-4 rounded-xl"
        onPointerUp={() => setIsDrawing(false)}
        onPointerLeave={() => setIsDrawing(false)}
      >
        {Array.from({length: 49}).map((_, i) => {
          const x = i % 7;
          const y = Math.floor(i / 7);
          const active = isActive(x, y);
          const visited = isVisited(x, y);
          const isStart = startPos.x === x && startPos.y === y;
          return (
            <div 
              key={i} 
              className={`cell w-10 h-10 md:w-16 md:h-16 rounded-lg select-none touch-none ${active ? 'active bg-zinc-800/80 backdrop-blur border border-zinc-700' : ''} ${visited ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]' : ''} ${isStart && !visited ? 'animate-pulse bg-blue-400' : ''}`}
              onPointerDown={(e) => { e.currentTarget.releasePointerCapture(e.pointerId); handlePointerDown(x, y); }}
              onPointerEnter={() => handlePointerEnter(x, y)}
            />
          );
        })}
      </div>
      <div className="mt-8 flex gap-4">
        <button onClick={() => setPath([startPos])} className="px-6 py-2 bg-zinc-800 rounded text-white border border-zinc-700">Reset</button>
      </div>
      {won && <div className="mt-8 text-2xl text-green-400 font-bold animate-bounce">Puzzle Solved!</div>}
    </div>
  );
}
