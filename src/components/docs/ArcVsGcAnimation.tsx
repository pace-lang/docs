import React, { useState, useEffect } from 'react';

export function ArcVsGcAnimation() {
  const [mode, setMode] = useState<'arc' | 'gc'>('gc');
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [frees, setFrees] = useState<number[]>([]);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    let gcPauseTime = 0;

    const update = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (mode === 'gc') {
        if (isPaused) {
          gcPauseTime -= delta;
          if (gcPauseTime <= 0) {
            setIsPaused(false);
            setFrees([]);
          }
        } else {
          setProgress((p) => {
            const next = p + delta * 0.05;
            if (next >= 100) return 0;
            // Trigger GC pause every 33% roughly
            if ((Math.floor(p) % 33 === 0) && (Math.floor(next) % 33 !== 0)) {
              setIsPaused(true);
              gcPauseTime = 1500; // 1.5 second pause
            }
            return next;
          });
        }
      } else {
        setIsPaused(false);
        setProgress((p) => {
          const next = p + delta * 0.05;
          if (next >= 100) return 0;
          
          // ARC: smooth steady frees
          if (Math.random() < 0.1) {
             setFrees(f => [...f, next].slice(-5));
          }
          
          return next;
        });
      }
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mode, isPaused]);

  return (
    <div className="w-full my-8 p-6 rounded-2xl border bg-card text-card-foreground shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold tracking-tight">Memory Architecture Simulator</h3>
        <div className="flex gap-2 p-1 rounded-lg bg-muted">
          <button
            onClick={() => setMode('gc')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
              mode === 'gc' ? 'bg-indigo-500/20 text-indigo-400' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Garbage Collection
          </button>
          <button
            onClick={() => setMode('arc')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
              mode === 'arc' ? 'bg-emerald-500/20 text-emerald-400' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Pace ARC (No GC)
          </button>
        </div>
      </div>

      <div className="relative h-32 rounded-xl border border-border/50 bg-background/50 overflow-hidden flex flex-col justify-center px-4">
        
        {/* The timeline track */}
        <div className="w-full h-2 bg-muted rounded-full relative">
          
          {/* ARC Free indicators */}
          {mode === 'arc' && frees.map((pos, i) => (
             <div 
               key={i} 
               className="absolute top-1/2 -translate-y-1/2 w-1.5 h-4 bg-emerald-400 rounded-full animate-out fade-out slide-out-to-top-4 duration-1000"
               style={{ left: `${pos}%` }}
             />
          ))}

          {/* The moving execution block */}
          <div 
            className={`absolute top-1/2 -translate-y-1/2 h-6 w-6 rounded-md shadow-sm transition-colors ${isPaused ? 'bg-rose-500' : mode === 'arc' ? 'bg-emerald-500' : 'bg-indigo-500'}`}
            style={{ left: `${progress}%`, transition: isPaused ? 'none' : 'left 0s linear' }}
          />
        </div>

        {/* Status Text Overlay */}
        <div className="absolute inset-x-0 bottom-4 text-center">
          {mode === 'gc' && isPaused ? (
            <span className="text-rose-500 font-bold animate-pulse text-sm">⚠️ GC STOP-THE-WORLD PAUSE (Frame Dropped)</span>
          ) : mode === 'gc' && !isPaused ? (
            <span className="text-indigo-400 font-medium text-sm">Execution running... (Allocating garbage)</span>
          ) : (
            <span className="text-emerald-400 font-medium text-sm">Smooth predictable execution (Deterministic free)</span>
          )}
        </div>
      </div>
    </div>
  );
}
