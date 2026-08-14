import { baseOptions } from '@/lib/layout.shared';
import { blogSource } from '@/lib/source';
import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

export const Route = createFileRoute('/blog/')({
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
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-grow">
                {post.data.description}
              </p>
              <div className="flex items-center gap-4 mt-auto">
                {(post.data as any)?.date && (
                  <div className="text-sm text-muted-foreground/80 font-medium uppercase tracking-wider">
                    {new Date((post.data as any).date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                )}
                {(post.data as any)?.tags && (
                  <div className="flex gap-2">
                    {(post.data as any).tags.map((tag: string) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
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
