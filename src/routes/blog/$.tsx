import { useMDXComponents } from '@/components/mdx';
import { baseOptions } from '@/lib/layout.shared';
import { encodeMarkdownUrl } from '@/lib/shared';
import { blogDocs, blogSource } from '@/lib/source';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import {
  DocsBody
} from 'fumadocs-ui/layouts/docs/page';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Suspense, use } from 'react';

export const Route = createFileRoute('/blog/$')({
  component: Page,
  loader: async ({ params }) => {
    const slugs = params._splat?.split('/') ?? [];
    const data = await loader({ data: slugs });
    await blogDocs.getPage(data.path)?.preload();
    return data;
  },
});

const loader = createServerFn({
  method: 'GET',
})
  .validator((slugs: string[]) => slugs)
  .middleware([staticFunctionMiddleware])
  .handler(async ({ data: slugs }) => {
    const page = blogSource.getPage(slugs);
    if (!page) throw notFound();

    return {
      path: page.path,
      markdownUrl: encodeMarkdownUrl(page.slugs, page.locale),
      // For blog posts we don't necessarily need the whole tree unless we want to show a sidebar
      // We will just pass empty tree to DocsLayout, or pass the blogSource tree.
      pageTree: await blogSource.serializePageTree(blogSource.getPageTree()),
    };
  });

function Content({ path }: { path: string }) {
  const page = blogDocs.getPage(path);
  if (!page) throw new Error(`unknown page: ${path}`);

  const { toc } = use(page.load());
  const MDX = page.body;

  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-16 border-b border-border/50 pb-10">
        <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 inline-flex items-center gap-2">
          &larr; Back to Blog
        </Link>
        <h1 className="text-3xl md:text-xl lg:text-3xl font-bold tracking-tight mb-4 leading-tight">{page.title}</h1>
        <p className="text-md md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
          {page.description}
        </p>
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            P
          </div>
          <div>
            <div className="font-semibold text-sm">Pace Team</div>
            {(page as any).data?.date && (
              <div className="text-sm text-muted-foreground/80 font-medium">
                {new Date((page as any).data.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            )}
            {(page as any).data?.tags && (
              <div className="flex gap-2 mt-2">
                {(page as any).data.tags.map((tag: string) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <DocsBody>
        <MDX components={useMDXComponents()} />
      </DocsBody>
    </main>
  );
}

function Page() {
  const { pageTree, path, markdownUrl } = useFumadocsLoader(Route.useLoaderData());

  return (
    <HomeLayout {...baseOptions()}>
      <Link to={markdownUrl} hidden />
      <Suspense>
        <Content path={path} />
      </Suspense>
    </HomeLayout>
  );
}
