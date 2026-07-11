'use client';
import { useState, useEffect } from 'react';

export type Point = { x: number; y: number };

const GRID_SIZE = 7;

export default function GameBoard({ activeCells, startPos }: { activeCells: Point[], startPos: Point }) {
  const [path, setPath] = useState<Point[]>([startPos]);
  const [isDrawing, setIsDrawing] = useState(false);

  const won = path.length === activeCells.length;

  useEffect(() => {
    if (won) {
      localStorage.setItem(`solved-${new Date().toLocaleDateString('en-CA')}`, 'true');
    }
  }, [won]);

  const activeSet = new Set(activeCells.map(c => `${c.x},${c.y}`));
  const pathSet = new Set(path.map(c => `${c.x},${c.y}`));

  const isActive = (x: number, y: number) => activeSet.has(`${x},${y}`);
  const isVisited = (x: number, y: number) => pathSet.has(`${x},${y}`);

  const handlePointerDown = (x: number, y: number) => {
    if (won) return;
    const last = path[path.length - 1];
    if (x === last.x && y === last.y) {
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
        {Array.from({length: GRID_SIZE * GRID_SIZE}).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const active = isActive(x, y);
          const visited = isVisited(x, y);
          const isStart = startPos.x === x && startPos.y === y;
          return (
            <div 
              key={i} 
              data-testid={`cell-${x}-${y}`}
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
