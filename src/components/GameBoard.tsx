'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        className="grid grid-cols-7 gap-3 bg-white p-6 shadow-[8px_8px_0px_#000000] relative overflow-hidden border-4 border-black"
        onPointerUp={() => setIsDrawing(false)}
        onPointerLeave={() => setIsDrawing(false)}
      >
        {Array.from({length: GRID_SIZE * GRID_SIZE}).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const active = isActive(x, y);
          const pIndex = path.findIndex(p => p.x === x && p.y === y);
          const visited = pIndex !== -1;
          const isStart = startPos.x === x && startPos.y === y;
          
          const prevPath = visited && pIndex > 0 ? path[pIndex - 1] : null;
          const nextPath = visited && pIndex < path.length - 1 ? path[pIndex + 1] : null;
          
          const connectTop = (prevPath?.x === x && prevPath?.y === y - 1) || (nextPath?.x === x && nextPath?.y === y - 1);
          const connectBottom = (prevPath?.x === x && prevPath?.y === y + 1) || (nextPath?.x === x && nextPath?.y === y + 1);
          const connectLeft = (prevPath?.x === x - 1 && prevPath?.y === y) || (nextPath?.x === x - 1 && nextPath?.y === y);
          const connectRight = (prevPath?.x === x + 1 && prevPath?.y === y) || (nextPath?.x === x + 1 && nextPath?.y === y);

          return (
            <motion.div 
              key={i} 
              data-testid={`cell-${x}-${y}`}
              className={`relative cell w-10 h-10 md:w-16 md:h-16 select-none touch-none transition-none border-2 border-transparent ${active && !visited ? 'active bg-[#1A2548] border-[#F7AF4C] border-opacity-30' : ''} ${visited ? 'bg-[#F7AF4C] border-black shadow-[4px_4px_0px_#000000] z-10' : 'z-0'}`}
              whileHover={active && !visited ? { scale: 1.1 } : {}}
              whileTap={active ? { scale: 0.9 } : {}}
              onPointerDown={(e) => { e.currentTarget.releasePointerCapture(e.pointerId); handlePointerDown(x, y); }}
              onPointerEnter={() => handlePointerEnter(x, y)}
            >
              {active && (
                <>
                  {isStart && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-white border-2 border-black z-20 pointer-events-none" />}
                  {visited && !isStart && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 bg-white z-10 pointer-events-none" />}
                  {connectTop && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 md:w-6 h-1/2 bg-white z-10 pointer-events-none" />}
                  {connectBottom && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 md:w-6 h-1/2 bg-white z-10 pointer-events-none" />}
                  {connectLeft && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 md:h-6 w-1/2 bg-white z-10 pointer-events-none" />}
                  {connectRight && <div className="absolute right-0 top-1/2 -translate-y-1/2 h-4 md:h-6 w-1/2 bg-white z-10 pointer-events-none" />}
                </>
              )}
            </motion.div>
          );
        })}
        {won && (
          <div className="absolute inset-0 bg-[#334173]/90 z-50 flex flex-col items-center justify-center">
            {/* Win Particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-4 h-4 bg-[#F7AF4C] border-2 border-black pointer-events-none"
                initial={{ opacity: 1, x: 0, y: 0 }}
                animate={{ 
                  opacity: 0, 
                  x: (Math.random() - 0.5) * 400, 
                  y: (Math.random() - 0.5) * 400,
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            ))}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.6 }}
              className="text-4xl md:text-5xl text-white font-extrabold shadow-[4px_4px_0px_#000000] text-center uppercase"
            >
              Level<br/>Cleared!
            </motion.div>
          </div>
        )}
      </div>
      <div className="mt-10 flex gap-4">
        <button onClick={() => setPath([startPos])} className="px-8 py-3 bg-[#F7AF4C] text-black font-bold tracking-widest uppercase border-4 border-black shadow-[4px_4px_0px_#000000] hover:translate-y-1 hover:shadow-[2px_2px_0px_#000000] transition-all">Reset</button>
      </div>
    </div>
  );
}
