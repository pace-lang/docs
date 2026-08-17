import { baseOptions } from "@/lib/layout.shared";
import { blogSource } from "@/lib/source";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
});

function BlogIndex() {
  const posts = [...blogSource.getPages()].sort((a, b) => {
    const dateA = new Date((a.data as any).date ?? 0).getTime();
    const dateB = new Date((b.data as any).date ?? 0).getTime();
    return dateB - dateA;
  });

  return (
    <HomeLayout {...baseOptions()}>
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-8 border-b border-border/50 pb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Pace Blog</h1>
          <p className="text-base text-muted-foreground max-w-2xl">
            News, releases, and articles about the Pace programming language.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link
              key={post.url}
              to={post.url}
              className="group flex flex-col p-2 md:p-4 border border-border/50 rounded-2xl hover:border-primary hover:shadow-sm transition-all bg-card/50"
            >
              <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {post.data.title}
              </h2>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed grow">
                {post.data.description}
              </p>
              <div className="flex items-center gap-3 mt-auto flex-wrap">
                {(post.data as any)?.date && (
                  <div className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date((post.data as any).date).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </div>
                )}
                {(post.data as any)?.tags && (
                  <div className="flex gap-2 flex-wrap">
                    {(post.data as any).tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-md bg-muted hover:bg-muted/80 text-foreground font-medium border border-border transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
          {posts.length === 0 && (
            <p className="text-muted-foreground">No blog posts found.</p>
          )}
        </div>
      </main>
    </HomeLayout>
  );
}
