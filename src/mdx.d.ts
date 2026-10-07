declare module '*.mdx' {
  import type { ComponentProps, ComponentType } from 'react';
  
  export const frontmatter: {
    title: string;
    description: string;
    date: string;
    tags?: string[];
  };
  
  const MDXComponent: ComponentType<ComponentProps<'div'>>;
  export default MDXComponent;
} 