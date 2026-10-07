import createMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ufs.sh',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '/src',
    };
    return config;
  },
  // Include MDX files in server-side builds
  outputFileTracingIncludes: {
    '/': ['./src/posts/**/*', './src/projects/**/*'],
    '/projects': ['./src/posts/**/*', './src/projects/**/*'],
    '/projects/[slug]': ['./src/posts/**/*', './src/projects/**/*'],
    '/blog': ['./src/posts/**/*', './src/projects/**/*'],
    '/blog/[slug]': ['./src/posts/**/*', './src/projects/**/*'],
    '/skills': ['./src/posts/**/*', './src/projects/**/*'],
    '/contact': ['./src/posts/**/*', './src/projects/**/*'],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: 'frontmatter' }]
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      rehypeHighlight
    ],
  },
});

export default withMDX(nextConfig);
