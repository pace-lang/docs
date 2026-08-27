import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: <span className="font-semibold tracking-tight text-foreground">pace<span className="text-emerald-500">.</span></span>,
    },
    links: [
      {
        text: 'Docs',
        url: '/docs',
        active: 'nested-url',
        on: 'nav',
      },
      {
        text: 'Blog',
        url: '/blog',
        active: 'nested-url',
        on: 'nav',
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
