import { baseOptions } from "@/lib/layout.shared";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import {
  ArrowRight,
  Copy,
  Terminal,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [os, setOs] = useState<"linux" | "windows">("linux");
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const installCommand =
    os === "linux"
      ? "curl -fsSL https://pace-lang.org/install.sh | bash"
      : "iwr https://pace-lang.org/install.ps1 -useb | iex";

  return (
    <HomeLayout {...baseOptions()}>
      <main className="flex-1 flex flex-col overflow-x-hidden bg-background">

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#fff_70%,transparent_100%)] dark:mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        {/* Hero Section */}
        <section className="relative w-full border-b border-border z-10">
          <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-352 items-center px-6 py-16 sm:px-8">
            <div className="grid w-full items-center gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(640px,1fr)] xl:gap-12">

              {/* Left: Text & Install */}
              <div className="min-w-0 mt-10 xl:mt-0">
                <a
                  className="group inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-card/50 py-1 pl-1 pr-3 text-sm leading-none text-muted-foreground hover:border-emerald-500/50 transition-colors"
                  href="/blog"
                >
                  <span className="shrink-0 rounded-full bg-emerald-500 px-2.5 py-0.5 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-white shadow-[0_0_10px_rgba(52,211,153,0.8)]">
                    New
                  </span>
                  <span className="min-w-0 truncate text-foreground">
                    Pace v0.1.0 — The Foundation Release
                  </span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </a>

                <h1 className="text-balance font-bold leading-[1.1] tracking-tight text-foreground mt-6 text-4xl md:text-5xl xl:text-[clamp(2.3rem,3vw,3rem)]">
                  The compiled systems language that feels like{" "}
                  <span className="italic text-emerald-500">scripting.</span>
                </h1>

                <p className="text-balance text-lg leading-[1.75] text-muted-foreground md:text-xl mt-6">
                  A meticulously designed, statically typed language. Build robust, hyper-fast applications with{" "}
                  <span className="text-foreground font-medium">zero GC pauses</span> and{" "}
                  <span className="text-foreground font-medium">strict null safety</span>.
                </p>

                {/* Install Widget */}
                <div className="mt-10">
                  <div className="w-full max-w-xl text-left">
                    <div className="flex items-center gap-1 rounded-t-lg border-x border-t border-border bg-card/60 p-1.5 backdrop-blur">
                      <button
                        onClick={() => setOs("linux")}
                        className={`rounded-md px-3.5 py-1.5 font-mono text-xs leading-none transition-colors ${os === "linux"
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                          }`}
                      >
                        Linux/macOS
                      </button>
                      <button
                        onClick={() => setOs("windows")}
                        className={`rounded-md px-3.5 py-1.5 font-mono text-xs leading-none transition-colors ${os === "windows"
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                          }`}
                      >
                        Windows
                      </button>
                    </div>
                    <button
                      onClick={() => handleCopy(installCommand)}
                      className="group flex w-full items-center gap-3 rounded-b-lg border border-border bg-card/60 px-5 py-4 text-left font-mono text-[0.95rem] text-foreground backdrop-blur hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-colors"
                    >
                      <span className="select-none text-emerald-500">$</span>
                      <span className="min-w-0 flex-1 truncate">
                        {installCommand}
                      </span>
                      <Copy className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                    </button>
                    {copied && (
                      <p className="text-xs text-emerald-500 mt-2 font-mono">Copied to clipboard!</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    to="/docs/$"
                    params={{ _splat: "" }}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-emerald-500 transition-colors underline underline-offset-4 decoration-border hover:decoration-emerald-500"
                  >
                    Read the documentation
                  </Link>
                  <a
                    href="https://github.com/pace-lang/pace"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-transparent hover:decoration-border"
                  >
                    View repo
                  </a>
                </div>
              </div>

              {/* Right: Code Block */}
              <div className="overflow-hidden rounded-xl border border-border bg-card w-full min-w-0 shadow-2xl">
                <div className="flex items-center border-b border-border gap-2.5 px-5 py-3.5 bg-muted/50">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]"></span>
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]"></span>
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]"></span>
                  <div className="ml-2 text-xs font-mono text-muted-foreground flex items-center gap-2">
                    <Terminal className="w-3 h-3" />
                    main.pace
                  </div>
                </div>
                <pre className="overflow-x-auto font-mono px-6 py-5 text-[0.9rem] leading-loose">
                  <code>
                    <span className="text-[#ff7b72] font-semibold">class</span>{" "}
                    <span className="text-[#79c0ff]">User</span> {"{\n"}
                    {"  "}<span className="text-[#ff7b72] font-semibold">public static var</span> count:{" "}
                    <span className="text-[#79c0ff]">Int</span> = <span className="text-[#79c0ff]">0</span>{";\n\n"}
                    {"  "}<span className="text-[#ff7b72] font-semibold">var</span> age:{" "}
                    <span className="text-[#79c0ff]">Int</span>{";\n\n"}
                    {"  "}<span className="text-[#ff7b72] font-semibold">public static func</span>{" "}
                    <span className="text-[#d2a8ff]">getCount</span>() -{">"} <span className="text-[#79c0ff]">Int</span> {"{\n"}
                    {"    "}<span className="text-[#ff7b72] font-semibold">return</span> User::count{";\n"}
                    {"  "}{"}\n\n"}
                    {"  "}<span className="text-[#ff7b72] font-semibold">func</span>{" "}
                    <span className="text-[#d2a8ff]">setAge</span>(a: <span className="text-[#79c0ff]">Int</span>) {"{\n"}
                    {"    "}<span className="text-[#79c0ff]">self</span>.age = a{";\n"}
                    {"  "}{"}\n"}
                    {"}\n\n"}
                    <span className="text-[#ff7b72] font-semibold">func</span>{" "}
                    <span className="text-[#d2a8ff]">main</span>() {"{\n"}
                    {"  "}<span className="text-[#ff7b72] font-semibold">let</span> u1 = User(){";\n"}
                    {"  "}u1.<span className="text-[#d2a8ff]">setAge</span>(<span className="text-[#79c0ff]">30</span>){";\n"}
                    {"  "}User::count = <span className="text-[#79c0ff]">1</span>{";\n"}
                    {"  "}<span className="text-[#d2a8ff]">print</span>(<span className="text-[#a5d6ff]">"Users: {"${"}</span>User::<span className="text-[#d2a8ff]">getCount</span>()<span className="text-[#a5d6ff]">{"}"}"</span>){";\n"}
                    {"}"}
                  </code>
                </pre>
              </div>

            </div>
          </div>
        </section>

        {/* Alternating Features Section */}
        <section className="border-b border-border relative z-10">
          <div className="mx-auto w-full max-w-7xl px-6 py-28 md:py-30">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mt-6 text-balance font-bold text-4xl leading-[1.05] tracking-tight md:text-5xl text-foreground">
                Built for the Modern Era
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
                Pace gets out of your way. With advanced type inference, clean
                syntax, and strict safety guarantees, you can focus on writing
                logic rather than fighting the compiler.
              </p>
            </div>

            <div className="mt-16 divide-y divide-border/60">

              {/* Feature 1 */}
              <div className="grid items-center gap-12 py-14 lg:grid-cols-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold tracking-widest uppercase text-emerald-500">Safety</p>
                  <h3 className="mt-3 text-balance font-bold text-2xl leading-snug md:text-3xl text-foreground">
                    Strict Null Safety & Error Handling
                  </h3>
                  <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                    Catch errors before you even run the code. Pace enforces strict null safety using the
                    <code className="mx-1 rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">T?</code>
                    syntax. Combined with algebraic Result types and exhaustive pattern matching, NullPointerExceptions are a thing of the past.
                  </p>
                </div>
                <div className="min-w-0">
                  <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                    <div className="flex items-center border-b border-border gap-2 px-4 py-2.5 bg-muted/50">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]"></span>
                    </div>
                    <pre className="overflow-x-auto font-mono px-5 py-4 text-[0.85rem] leading-loose">
                      <code>
                        <span className="text-[#8b949e] italic">// Nullable types require explicit handling</span>{"\n"}
                        <span className="text-[#ff7b72] font-semibold">func</span> <span className="text-[#d2a8ff]">getCity</span>(user: User): <span className="text-[#79c0ff]">String</span> {"{\n"}
                        {"  "}<span className="text-[#ff7b72] font-semibold">return</span> user.address?.city ?? <span className="text-[#a5d6ff]">"Unknown"</span>{"\n"}
                        {"}"}
                        {"\n\n"}
                        <span className="text-[#8b949e] italic">// Exhaustive Pattern Matching</span>{"\n"}
                        <span className="text-[#ff7b72] font-semibold">match</span> result {"{\n"}
                        {"  "}Ok(val) {`=>`} <span className="text-[#d2a8ff]">print</span>(val),{"\n"}
                        {"  "}Err(e)  {`=>`} <span className="text-[#d2a8ff]">log</span>(e){"\n"}
                        {"}"}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="grid items-center gap-12 py-14 lg:grid-cols-2">
                <div className="min-w-0 lg:order-2">
                  <p className="text-sm font-semibold tracking-widest uppercase text-indigo-500">Performance</p>
                  <h3 className="mt-3 text-balance font-bold text-2xl leading-snug md:text-3xl text-foreground">
                    Zero GC Pauses with Value Types
                  </h3>
                  <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                    Pace compiles directly to heavily optimized native machine code.
                    Manage memory predictably using Automatic Reference Counting (ARC) for classes,
                    or bypass the heap entirely by using stack-allocated
                    <code className="mx-1 rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">structs</code>
                    for maximum performance.
                  </p>
                </div>
                <div className="min-w-0 lg:order-1">
                  <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                    <div className="flex items-center border-b border-border gap-2 px-4 py-2.5 bg-muted/50">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]"></span>
                    </div>
                    <pre className="overflow-x-auto font-mono px-5 py-4 text-[0.85rem] leading-loose">
                      <code>
                        <span className="text-[#ff7b72] font-semibold">struct</span> <span className="text-[#79c0ff]">Vector3</span> {"{\n"}
                        {"  "}x: <span className="text-[#79c0ff]">Float64</span>{"\n"}
                        {"  "}y: <span className="text-[#79c0ff]">Float64</span>{"\n"}
                        {"  "}z: <span className="text-[#79c0ff]">Float64</span>{"\n"}
                        {"}"}
                        {"\n\n"}
                        <span className="text-[#8b949e] italic">// Passed by value. No heap allocation.</span>{"\n"}
                        <span className="text-[#ff7b72] font-semibold">let</span> v1 = Vector3(x: <span className="text-[#79c0ff]">1.0</span>, y: <span className="text-[#79c0ff]">0.0</span>, z: <span className="text-[#79c0ff]">0.0</span>)
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="grid items-center gap-12 py-14 lg:grid-cols-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold tracking-widest uppercase text-rose-500">Concurrency</p>
                  <h3 className="mt-3 text-balance font-bold text-2xl leading-snug md:text-3xl text-foreground">
                    Effortless Multi-threading
                  </h3>
                  <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                    Sharing mutable state across threads is notoriously dangerous. Pace solves this elegantly with
                    <code className="mx-1 rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">actors</code>
                    which isolate state and guarantee safe concurrent access. Combine it with
                    <code className="mx-1 rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">async/await</code>
                    and you have a powerhouse for highly concurrent apps.
                  </p>
                </div>
                <div className="min-w-0">
                  <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                    <div className="flex items-center border-b border-border gap-2 px-4 py-2.5 bg-muted/50">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]"></span>
                    </div>
                    <pre className="overflow-x-auto font-mono px-5 py-4 text-[0.85rem] leading-loose">
                      <code>
                        <span className="text-[#ff7b72] font-semibold">actor</span> <span className="text-[#79c0ff]">Counter</span> {"{\n"}
                        {"  "}<span className="text-[#ff7b72] font-semibold">private var</span> value = <span className="text-[#79c0ff]">0</span>{"\n"}
                        {"  "}<span className="text-[#ff7b72] font-semibold">func</span> <span className="text-[#d2a8ff]">increment</span>() {"{"} value += <span className="text-[#79c0ff]">1</span> {"}"}
                        {"}"}
                        {"\n\n"}
                        <span className="text-[#8b949e] italic">// Safe cross-thread invocation</span>{"\n"}
                        <span className="text-[#ff7b72] font-semibold">let</span> c = Counter(){"\n"}
                        <span className="text-[#ff7b72] font-semibold">spawn</span> {"{\n"}
                        {"  "}<span className="text-[#ff7b72] font-semibold">await</span> c.<span className="text-[#d2a8ff]">increment</span>(){"\n"}
                        {"}"}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Global Footer */}
        <footer className="w-full bg-muted/30 border-t border-border z-10">
          <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
            <div className="flex justify-center space-x-6 md:order-2">
              <a href="https://github.com/pace-lang/pace" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
            <div className="mt-8 md:order-1 md:mt-0 flex flex-col md:flex-row gap-4 items-center">
              <span className="font-semibold tracking-tight text-foreground">pace<span className="text-emerald-500">.</span></span>
              <p className="text-center text-sm leading-5 text-muted-foreground">
                &copy; 2026 Pace Language Contributors. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </HomeLayout>
  );
}
