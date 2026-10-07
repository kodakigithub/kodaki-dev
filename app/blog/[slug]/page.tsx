import { getAllPostsServer } from '@/lib/mdx-server';

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  const posts = await getAllPostsServer();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage() {
  // Layout is handled by app/layout.tsx
  // TerminalInterface handles content switching based on pathname
  return null;
}
