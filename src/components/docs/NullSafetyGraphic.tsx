import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, ArrowRight, XCircle } from 'lucide-react';

export function NullSafetyGraphic() {
  const [activePath, setActivePath] = useState<'none' | 'unsafe' | 'safe'>('none');

  useEffect(() => {
    let current = 'none';
    const interval = setInterval(() => {
      if (current === 'none') current = 'unsafe';
      else if (current === 'unsafe') current = 'safe';
      else current = 'none';
      
      setActivePath(current as 'none' | 'unsafe' | 'safe');
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full my-8 p-6 rounded-2xl border bg-card text-card-foreground shadow-sm">
      <h3 className="text-xl font-bold tracking-tight mb-8">Pace Compiler Checks</h3>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative">
        
        {/* Source */}
        <div className="p-4 rounded-xl border bg-muted font-mono text-sm shadow-sm flex flex-col items-center">
          <span className="text-muted-foreground mb-1">Nullable Object</span>
          <span className="font-bold">user.address</span>
        </div>

        {/* Arrow splitting */}
        <div className="hidden md:flex flex-col justify-center h-full px-4 text-muted-foreground">
           <ArrowRight className="w-6 h-6 mb-16" />
           <ArrowRight className="w-6 h-6 mt-16" />
        </div>

        <div className="flex flex-col gap-8 w-full md:w-auto">
          {/* Unsafe Path */}
          <div className={`p-4 rounded-xl border transition-all flex items-center gap-4 ${activePath === 'unsafe' ? 'border-rose-500 bg-rose-500/10' : 'border-border opacity-50'}`}>
            <div className="flex flex-col font-mono text-sm">
              <span className="text-muted-foreground text-xs mb-1">Unsafe Access</span>
              <span>user.address.city</span>
            </div>
            {activePath === 'unsafe' && (
              <div className="ml-auto flex items-center text-rose-500 animate-in fade-in slide-in-from-left-4">
                <XCircle className="w-5 h-5 mr-2" />
                <span className="text-sm font-bold">Compiler Error</span>
              </div>
            )}
          </div>

          {/* Safe Path */}
          <div className={`p-4 rounded-xl border transition-all flex items-center gap-4 ${activePath === 'safe' ? 'border-emerald-500 bg-emerald-500/10' : 'border-border opacity-50'}`}>
            <div className="flex flex-col font-mono text-sm">
              <span className="text-muted-foreground text-xs mb-1">Safe Access</span>
              <span>user.address<span className="text-emerald-500 font-bold">?.</span>city <span className="text-emerald-500 font-bold">??</span> "N/A"</span>
            </div>
            {activePath === 'safe' && (
              <div className="ml-auto flex items-center text-emerald-500 animate-in fade-in slide-in-from-left-4">
                <ShieldCheck className="w-5 h-5 mr-2" />
                <span className="text-sm font-bold">Compiled!</span>
              </div>
            )}
          </div>
        </div>
        
      </div>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        {activePath === 'unsafe' && "The compiler physically prevents you from building the code."}
        {activePath === 'safe' && "By handling the null case explicitly, the compiler guarantees safety."}
        {activePath === 'none' && "Pace forces you to deal with nulls at compile time."}
      </div>
    </div>
  );
}
