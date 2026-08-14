import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { ArcVsGcAnimation } from './docs/ArcVsGcAnimation';
import { NullSafetyGraphic } from './docs/NullSafetyGraphic';
import { CompileErrorTerminal } from './docs/CompileErrorTerminal';

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
