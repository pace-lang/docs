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
      pageTree: await blogSource.serializePageTree(blogSource.getPageTree()),
    };
  });

function Content({ path }: { path: string }) {
  const page = blogDocs.getPage(path);
  if (!page) throw new Error(`unknown page: ${path}`);

  const { toc } = use(page.load());
  const MDX = page.body;

  return (
    <main className="flex-1 flex flex-col items-center overflow-x-hidden bg-background w-full pb-32">
      <div className="w-full max-w-[800px] mx-auto px-6 pt-16 pb-12 relative z-10">
        <div className="mb-10 border-b border-border/50 pb-6">
          <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 mb-8">
            &larr; Back to Blog
          </Link>
          
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
            {(page as any).data?.tags && (
              <span className="bg-[#ff2e93] text-white px-2 py-0.5 rounded-sm font-bold">
                {(page as any).data.tags[0] || 'Release'}
              </span>
            )}
            {(page as any).data?.date && (
              <span>
                {new Date((page as any).data.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight text-foreground text-balance">
            {page.title}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-balance">
            {page.description}
          </p>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>Pace Team</span>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-[800px] mx-auto px-6 relative z-10">
        <DocsBody>
          <MDX components={useMDXComponents()} />
        </DocsBody>
      </div>
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
