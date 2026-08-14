import { baseOptions } from '@/lib/layout.shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Activity, ArrowRight, Cpu, Globe, Layers, PlayCircle, ShieldCheck, Terminal, Zap } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const [activeTab, setActiveTab] = useState<'hello' | 'pattern' | 'nullsafe'>('hello');

  const codeSnippets = {
    hello: {
      title: 'main.pace',
      code: <><span className="text-[#ff7b72] font-semibold">struct</span> <span className="text-[#79c0ff]">User</span> {'{\n'}    name: <span className="text-[#79c0ff]">String</span>{'\n'}    age: <span className="text-[#79c0ff]">Int</span>{'\n'}{'}'}{'\n\n'}<span className="text-[#ff7b72] font-semibold">func</span> <span className="text-[#d2a8ff]">greet</span>(user: User) {'{\n'}    <span className="text-[#d2a8ff]">print</span>(<span className="text-[#a5d6ff]">"Hello, "</span> + user.name);{'\n'}{'}'}{'\n\n'}<span className="text-[#ff7b72] font-semibold">func</span> <span className="text-[#d2a8ff]">main</span>() {'{\n'}    <span className="text-[#ff7b72] font-semibold">let</span> alice = User {'{'} name: <span className="text-[#a5d6ff]">"Alice"</span>, age: <span className="text-[#79c0ff]">30</span> {'}'};{'\n'}    <span className="text-[#d2a8ff]">greet</span>(alice);{'\n'}{'}'}</>
    },
    pattern: {
      title: 'network.pace',
      code: <><span className="text-[#ff7b72] font-semibold">enum</span> Result&lt;T, E&gt; {'{\n'}    Ok(T),{'\n'}    Err(E){'\n'}{'}'}{'\n\n'}<span className="text-[#ff7b72] font-semibold">func</span> <span className="text-[#d2a8ff]">parse_port</span>(input: <span className="text-[#79c0ff]">String</span>): Result&lt;<span className="text-[#79c0ff]">Int</span>, <span className="text-[#79c0ff]">String</span>&gt; {'{\n'}    <span className="text-[#ff7b72] font-semibold">match</span> input.<span className="text-[#d2a8ff]">to_int</span>() {'{\n'}        Some(port) <span className="text-[#ff7b72] font-semibold">if</span> port &gt; <span className="text-[#79c0ff]">0</span> && port &lt; <span className="text-[#79c0ff]">65536</span> {`=>`} Result.Ok(port),{'\n'}        Some(_) {`=>`} Result.Err(<span className="text-[#a5d6ff]">"Port out of range"</span>),{'\n'}        None {`=>`} Result.Err(<span className="text-[#a5d6ff]">"Invalid number"</span>){'\n'}    {'}'}{'\n'}{'}'}</>
    },
    nullsafe: {
      title: 'safety.pace',
      code: <><span className="text-[#ff7b72] font-semibold">struct</span> <span className="text-[#79c0ff]">Address</span> {'{\n'}    city: <span className="text-[#79c0ff]">String</span>{'\n'}    zipcode: <span className="text-[#79c0ff]">String</span>? <span className="text-[#8b949e] italic">// Nullable</span>{'\n'}{'}'}{'\n\n'}<span className="text-[#ff7b72] font-semibold">struct</span> <span className="text-[#79c0ff]">User</span> {'{\n'}    name: <span className="text-[#79c0ff]">String</span>{'\n'}    address: Address? <span className="text-[#8b949e] italic">// Nullable</span>{'\n'}{'}'}{'\n\n'}<span className="text-[#ff7b72] font-semibold">func</span> <span className="text-[#d2a8ff]">get_city</span>(user: User): <span className="text-[#79c0ff]">String</span> {'{\n'}    <span className="text-[#8b949e] italic">// Optional chaining and null coalescing</span>{'\n'}    <span className="text-[#ff7b72] font-semibold">return</span> user.address?.city ?? <span className="text-[#a5d6ff]">"Unknown City"</span>;{'\n'}{'}'}{'\n\n'}<span className="text-[#ff7b72] font-semibold">func</span> <span className="text-[#d2a8ff]">main</span>() {'{\n'}    <span className="text-[#ff7b72] font-semibold">let</span> bob = User {'{'} name: <span className="text-[#a5d6ff]">"Bob"</span>, address: <span className="text-[#79c0ff]">null</span> {'}'};{'\n'}    <span className="text-[#d2a8ff]">print</span>(<span className="text-[#d2a8ff]">get_city</span>(bob));{'\n'}{'}'}</>
    }
  };

  return (
    <HomeLayout {...baseOptions()}>
      <main className="flex-1 flex flex-col items-center overflow-x-hidden selection:bg-primary/30">

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        {/* Hero Section */}
        <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-32 flex flex-col items-center text-center z-10">
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 w-full max-w-4xl mx-auto flex flex-col items-center">

            <a href="/blog/v0-2-0-release" className="group inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white mb-10 hover:bg-white/10 transition-all backdrop-blur-xl hover:scale-105">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 mr-3 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              Pace v0.2.0 is now available
              <ArrowRight className="ml-2 w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </a>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white">
              Blazing Speed.<br />
              Modern Ergonomics.
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-normal leading-relaxed">
              A meticulously designed, statically typed systems language. Build robust, hyper-fast applications with <span className="text-white font-medium">zero GC pauses</span> and <span className="text-white font-medium">strict null safety</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-2xl mx-auto">
              <Link
                to="/docs/$"
                params={{ _splat: '' }}
                className="group relative px-6 py-3 rounded-xl bg-white text-black font-semibold text-base transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Get Started <PlayCircle className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Showcase Grid */}
        <section className="relative w-full max-w-7xl mx-auto px-4 py-24 z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Card 1 */}
            <div className="group relative rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300">
              <div className="h-full w-full rounded-2xl p-6 md:p-8 flex flex-col relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Compile-Time Safety</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Catch errors before you even run the code. Pace enforces strict null safety (using the `T?` syntax) and exhaustive pattern matching, meaning no unhandled states or unexpected NullPointerExceptions at runtime.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300">
              <div className="h-full w-full rounded-2xl p-6 md:p-8 flex flex-col relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Zero GC Pauses</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Memory is managed deterministically through advanced compile-time analysis and Automatic Reference Counting (ARC). Achieve predictable, extremely low-latency execution suited for real-time systems.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 md:col-span-2 lg:col-span-1">
              <div className="h-full w-full rounded-2xl p-6 md:p-8 flex flex-col relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-400 mb-6 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Multi-Paradigm</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Enjoy the perfect blend of Object-Oriented design (Classes, Interfaces) and Functional primitives (Algebraic Data Types, advanced Pattern Matching) without compromising on runtime speed.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Code Showcase Section */}
        <section className="w-full max-w-7xl mx-auto px-4 py-24 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center z-10 relative">

          {/* Left Text */}
          <div className="flex-1 flex flex-col gap-6 w-full lg:max-w-xl text-left">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white tracking-tight">
              Syntax that feels <br />
              <span className="text-white font-medium opacity-80">like home.</span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Pace gets out of your way. With advanced type inference, clean syntax, and strict safety guarantees, you can focus on writing logic rather than fighting the compiler.
            </p>

            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={() => setActiveTab('hello')}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all border ${activeTab === 'hello' ? 'bg-white/5 border-white/10' : 'bg-transparent border-transparent hover:bg-white/5'} text-left`}
              >
                <Terminal className={`w-5 h-5 shrink-0 ${activeTab === 'hello' ? 'text-emerald-400' : 'text-gray-500'}`} />
                <div>
                  <h4 className={`font-semibold text-sm ${activeTab === 'hello' ? 'text-white' : 'text-gray-400'}`}>Familiar Syntax</h4>
                  <p className="text-xs text-gray-500 mt-1">Easy to pick up if you know C, Rust, or Swift.</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('pattern')}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all border ${activeTab === 'pattern' ? 'bg-white/5 border-white/10' : 'bg-transparent border-transparent hover:bg-white/5'} text-left`}
              >
                <Cpu className={`w-5 h-5 shrink-0 ${activeTab === 'pattern' ? 'text-indigo-400' : 'text-gray-500'}`} />
                <div>
                  <h4 className={`font-semibold text-sm ${activeTab === 'pattern' ? 'text-white' : 'text-gray-400'}`}>Pattern Matching</h4>
                  <p className="text-xs text-gray-500 mt-1">Exhaustive matching with algebraic data types.</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('nullsafe')}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all border ${activeTab === 'nullsafe' ? 'bg-white/5 border-white/10' : 'bg-transparent border-transparent hover:bg-white/5'} text-left`}
              >
                <ShieldCheck className={`w-5 h-5 shrink-0 ${activeTab === 'nullsafe' ? 'text-rose-400' : 'text-gray-500'}`} />
                <div>
                  <h4 className={`font-semibold text-sm ${activeTab === 'nullsafe' ? 'text-white' : 'text-gray-400'}`}>Strict Null Safety</h4>
                  <p className="text-xs text-gray-500 mt-1">No more runtime NullPointerExceptions.</p>
                </div>
              </button>
            </div>
          </div>

          {/* Right IDE Window */}
          <div className="flex-1 w-full relative mt-10 lg:mt-0">
            <div className="relative z-10 rounded-xl border border-white/10 bg-[#0d1117]/95 shadow-xl overflow-hidden">
              {/* IDE Header */}
              <div className="flex items-center px-4 py-3 border-b border-white/10 bg-[#161b22]/90">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="mx-auto text-xs text-gray-400 font-mono tracking-wider flex items-center gap-2">
                  <Terminal className="w-3 h-3" /> {codeSnippets[activeTab].title}
                </div>
              </div>

              {/* IDE Body */}
              <div className="p-6 overflow-x-auto text-left relative h-95 flex items-start">
                <div className="absolute top-0 left-0 w-10 h-full bg-[#161b22]/50 border-r border-white/5 flex flex-col items-center py-6 text-gray-600 font-mono text-sm leading-loose select-none">
                  {[...Array(15)].map((_, i) => <span key={i}>{i + 1}</span>)}
                </div>
                <pre className="text-sm font-mono leading-loose pl-10 w-full animate-in fade-in zoom-in-95 duration-200" key={activeTab}>
                  <code className="text-gray-300">
                    {codeSnippets[activeTab].code}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Section */}
        <section className="w-full max-w-7xl mx-auto px-4 py-24 z-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 relative overflow-hidden">
            <div className="p-8 md:p-16 text-center relative flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                <Activity className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built for Extreme Performance</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                Pace eliminates unpredictable latency spikes by discarding the traditional Garbage Collector. Memory is deterministically managed, ensuring rock-solid performance for game engines, high-frequency trading, and embedded systems.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-3xl font-bold text-white mb-1">0ms</span>
                  <span className="text-sm text-gray-400 font-medium">GC Pauses</span>
                </div>
                <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-3xl font-bold text-white mb-1">O(1)</span>
                  <span className="text-sm text-gray-400 font-medium">Memory Overhead</span>
                </div>
                <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-3xl font-bold text-white mb-1">&lt;10ms</span>
                  <span className="text-sm text-gray-400 font-medium">Cold Start</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-4xl mx-auto px-4 py-24 z-10 text-center flex flex-col items-center">
          <Globe className="w-12 h-12 text-indigo-400 mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Ready to step up your pace?</h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl">
            Join the growing community of developers building the next generation of robust systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link
              to="/docs/$"
              params={{ _splat: '' }}
              className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-base hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              Read the Docs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>
    </HomeLayout>
  );
}
