import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { frontmatterSchema } from 'fumadocs-mdx/config';
import { defineDocs } from 'fumadocs-mdx/macro';
import { z } from 'zod';
import { docsRoute } from './shared';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    async: true,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export const source = loader({
  source: docs.toFumadocsSource(),
  baseUrl: docsRoute,
  plugins: [lucideIconsPlugin()],
});

export const blogDocs = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string().or(z.date()).optional(),
      tags: z.array(z.string()).optional(),
    }),
    async: true,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export const blogSource = loader({
  source: blogDocs.toFumadocsSource(),
  baseUrl: '/blog',
  plugins: [lucideIconsPlugin()],
});

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
