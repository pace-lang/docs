import React, { useState, useEffect } from 'react';

type DiagnosticType = 'null' | 'warning' | 'property';

export function CompileErrorTerminal() {
  const [activeTab, setActiveTab] = useState<DiagnosticType>('warning');
  const [step, setStep] = useState(0);

  // Restart animation when tab changes
  useEffect(() => {
    setStep(0);
    const timer1 = setTimeout(() => {
      setStep(1);
      const timer2 = setTimeout(() => {
        setStep(2);
      }, 600);
      return () => clearTimeout(timer2);
    }, 400);
    return () => clearTimeout(timer1);
  }, [activeTab]);

  return (
    <div className="w-full my-8 rounded-xl border overflow-hidden bg-[#0d1117] text-gray-300 shadow-2xl font-mono text-sm leading-relaxed">
      
      {/* Terminal Header & Tabs */}
      <div className="flex items-center bg-[#161b22] border-b border-white/10">
        <div className="flex space-x-2 px-4 py-3">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex flex-1 overflow-x-auto no-scrollbar ml-2">
          <button 
            onClick={() => setActiveTab('warning')}
            className={`px-4 py-2 text-xs font-sans tracking-wide transition-colors border-b-2 ${activeTab === 'warning' ? 'border-amber-400 text-white bg-white/5' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            Linter Warning
          </button>
          <button 
            onClick={() => setActiveTab('null')}
            className={`px-4 py-2 text-xs font-sans tracking-wide transition-colors border-b-2 ${activeTab === 'null' ? 'border-rose-400 text-white bg-white/5' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            Type Error
          </button>
          <button 
            onClick={() => setActiveTab('property')}
            className={`px-4 py-2 text-xs font-sans tracking-wide transition-colors border-b-2 ${activeTab === 'property' ? 'border-rose-400 text-white bg-white/5' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            Missing Property
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 md:p-6 overflow-x-auto min-h-[320px]">
        {/* Command Line */}
        <div className="flex items-center text-emerald-400 font-bold mb-2">
          <span className="mr-2">$</span>
          <span className={`text-white font-normal ${step === 0 ? 'border-r-8 border-gray-400 animate-pulse' : ''}`}>
            {step >= 1 ? 'pace run' : ''}
          </span>
        </div>

        {/* Output */}
        {step >= 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 mt-4 whitespace-pre">
            
            {activeTab === 'null' && (
              <>
                <span className="text-rose-400 font-bold">[P3001] Error:</span> Cannot assign type 'Null' to variable of type 'Int'.{'\n'}
                <span className="text-gray-500">   ╭─[</span> src/main.pace:9:5 <span className="text-gray-500">]</span>{'\n'}
                <span className="text-gray-500">   │</span>{'\n'}
                <span className="text-gray-500"> 9 │</span>     <span className="text-rose-300">var</span> id: Int = <span className="text-rose-400">null</span>;{'\n'}
                <span className="text-gray-500">   │     ─────────┬─────────</span>{'\n'}
                <span className="text-gray-500">   │              ╰───────────</span> <span className="text-rose-400">Cannot assign type 'Null' to variable of type 'Int'.</span>{'\n'}
                <span className="text-gray-500">───╯</span>
              </>
            )}

            {activeTab === 'warning' && (
              <>
                <span className="text-amber-400 font-bold">[P5001] Warning:</span> Function `print_status` does not follow Pace naming convention{'\n'}
                <span className="text-gray-500">    ╭─[</span> src/main.pace:23:5 <span className="text-gray-500">]</span>{'\n'}
                <span className="text-gray-500">    │</span>{'\n'}
                <span className="text-gray-500"> 23 │ </span><span className="text-amber-400">╭─▶</span>     <span className="text-rose-300">func</span> <span className="text-blue-300">print_status</span>() {'{'}{'\n'}
                <span className="text-gray-500">    ┆ ┆   </span>{'\n'}
                <span className="text-gray-500"> 29 │ </span><span className="text-amber-400">├─▶</span>     {'}'}{'\n'}
                <span className="text-gray-500">    │ </span><span className="text-amber-400">│</span>{'\n'}
                <span className="text-gray-500">    │ </span><span className="text-amber-400">╰───────────</span> <span className="text-amber-400">Function `print_status` does not follow Pace naming convention</span>{'\n'}
                <span className="text-gray-500">    │</span>{'\n'}
                <span className="text-gray-500">    │</span>     <span className="text-emerald-400 font-bold">Help:</span> use camelCase (e.g. `printStatus`){'\n'}
                <span className="text-gray-500">────╯</span>
              </>
            )}

            {activeTab === 'property' && (
              <>
                <span className="text-rose-400 font-bold">[P3002] Error:</span> Property 'printStatus' not found on class 'Task'.{'\n'}
                <span className="text-gray-500">    ╭─[</span> src/main.pace:51:9 <span className="text-gray-500">]</span>{'\n'}
                <span className="text-gray-500">    │</span>{'\n'}
                <span className="text-gray-500"> 51 │</span>     task1.printStatus();{'\n'}
                <span className="text-gray-500">    │         ────────┬────────</span>{'\n'}
                <span className="text-gray-500">    │                 ╰──────────</span> <span className="text-rose-400">Property 'printStatus' not found on class 'Task'.</span>{'\n'}
                <span className="text-gray-500">────╯</span>
              </>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
