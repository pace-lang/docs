import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ArcVsGcAnimation } from "./docs/ArcVsGcAnimation";
import { CompileErrorTerminal } from "./docs/CompileErrorTerminal";
import { NullSafetyGraphic } from "./docs/NullSafetyGraphic";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    ArcVsGcAnimation,
    NullSafetyGraphic,
    CompileErrorTerminal,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
