import { baseOptions } from "@/lib/layout.shared";
import { blogSource } from "@/lib/source";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Rss, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
});

function BlogIndex() {
  const [filter, setFilter] = useState<"Everything" | "Articles" | "Releases">("Everything");

  const posts = [...blogSource.getPages()].sort((a, b) => {
    const dateA = new Date((a.data as any).date ?? 0).getTime();
    const dateB = new Date((b.data as any).date ?? 0).getTime();
    return dateB - dateA;
  });

  const filteredPosts = posts.filter(post => {
    if (filter === "Everything") return true;
    
    const tags = (post.data as any).tags || [];
    const isRelease = tags.some((t: string) => 
      t.toLowerCase().includes('release') || t.toLowerCase().includes('v0.1')
    );
    
    if (filter === "Releases") return isRelease;
    if (filter === "Articles") return !isRelease;
    return true;
  });

  const featuredPost = filteredPosts[0];
  const olderPosts = filteredPosts;

  return (
    <HomeLayout {...baseOptions()}>
      <main className="flex-1 flex flex-col items-center bg-background w-full pb-24">
        <div className="w-full max-w-5xl mx-auto px-6 pt-16 relative z-10">
          
          {/* Header */}
          <div className="flex items-end justify-between mb-12 border-b border-border/50 pb-6">
            <h1 className="text-5xl font-black tracking-tight text-foreground">
              Blog
            </h1>
            <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
              <Rss className="w-4 h-4" />
              RSS
            </a>
          </div>

          <div className="flex flex-col gap-16 w-full">
            {/* Featured Post */}
            {featuredPost && (
              <Link
                to={featuredPost.url}
                className="group relative flex flex-col p-8 md:p-10 border border-border/50 rounded-xl hover:border-border transition-all duration-300 bg-card/20 hover:bg-card/40 w-full"
              >
                <div className="mb-6 flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  <span className="bg-[#ff2e93] text-white px-2 py-0.5 rounded-sm font-bold">
                    Latest
                  </span>
                  {(featuredPost.data as any)?.date && (
                    <span>
                      {new Date((featuredPost.data as any).date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  )}
                  <span className="hidden sm:inline">&middot;</span>
                  <span className="hidden sm:inline">
                    {((featuredPost.data as any)?.tags || []).some((t: string) => t.toLowerCase().includes('release')) ? 'Release' : 'Article'}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground tracking-tight leading-tight group-hover:text-emerald-500 transition-colors">
                  {featuredPost.data.title}
                </h2>
                
                <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-3xl">
                  {featuredPost.data.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto text-sm text-muted-foreground">
                  <span>Pace Team</span>
                  <div className="w-8 h-8 rounded border border-border/50 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:text-emerald-500 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            )}

            {/* List Header */}
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <div className="flex gap-4">
                <button 
                  onClick={() => setFilter("Everything")}
                  className={`text-sm font-medium px-3 py-1 rounded-md transition-colors ${filter === "Everything" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Everything
                </button>
                <button 
                  onClick={() => setFilter("Articles")}
                  className={`text-sm font-medium px-3 py-1 rounded-md transition-colors ${filter === "Articles" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Articles
                </button>
                <button 
                  onClick={() => setFilter("Releases")}
                  className={`text-sm font-medium px-3 py-1 rounded-md transition-colors ${filter === "Releases" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Releases
                </button>
              </div>
              <span className="text-sm font-mono text-muted-foreground">{filteredPosts.length} posts</span>
            </div>

            {/* Older Posts List */}
            {olderPosts.length > 0 && (
              <div className="flex flex-col gap-12 w-full">
                {olderPosts.map((post) => {
                  const date = (post.data as any)?.date ? new Date((post.data as any).date) : null;
                  return (
                    <div key={post.url} className="grid grid-cols-1 md:grid-cols-[100px_140px_1fr] gap-4 md:gap-8 items-start group">
                      <div className="text-2xl font-bold text-foreground hidden md:block">
                        {date?.getFullYear() || "2026"}
                      </div>
                      <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground pt-1.5 hidden md:block">
                        {date?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) || "Aug 11, 2026"}
                      </div>
                      <Link to={post.url} className="block">
                        <div className="md:hidden text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                          {date?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) || "Aug 11, 2026"}
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-emerald-500 transition-colors leading-tight">
                          {post.data.title}
                        </h3>
                        <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                          {post.data.description}
                        </p>
                        <div className="text-sm text-muted-foreground">
                          Pace Team
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}

            {filteredPosts.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <p>No blog posts found for this filter.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </HomeLayout>
  );
}
