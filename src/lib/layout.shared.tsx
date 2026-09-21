import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { appName, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: (
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Pace Logo" className="w-6 h-6" />
          <span className="font-semibold tracking-tight text-foreground">
            pace<span className="text-emerald-500">.</span>
          </span>
        </div>
      ),
    },
    links: [
      {
        text: "Docs",
        url: "/docs",
        active: "nested-url",
        on: "nav",
      },
      {
        text: "Blog",
        url: "/blog",
        active: "nested-url",
        on: "nav",
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
