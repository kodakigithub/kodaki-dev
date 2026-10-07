import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import type { PostMetadata, PostData, ProjectMetadata, ProjectData } from '@/types/mdx';

const postsDirectory = path.join(process.cwd(), 'src', 'posts');
const projectsDirectory = path.join(process.cwd(), 'src', 'projects');

// Server-side data fetching functions
export async function getAllPostsServer(): Promise<PostMetadata[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags,
        slug: filename.replace(/\.mdx$/, ''),
      } as PostMetadata;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getPostBySlugServer(slug: string): Promise<PostData> {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        rehypeHighlight,
      ],
    },
  });

  return {
    frontmatter: {
      title: data.title,
      date: data.date,
      description: data.description,
      tags: data.tags,
      slug,
    },
    content: mdxSource,
  };
}

export async function getAllProjectsServer(): Promise<ProjectMetadata[]> {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(projectsDirectory);

  const projects = filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => {
      const filePath = path.join(projectsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        title: data.title,
        role: data.role,
        description: data.description,
        tech: data.tech,
        status: data.status,
        date: data.date,
        size: data.size,
        github: data.github,
        slug: filename.replace(/\.mdx$/, ''),
      } as ProjectMetadata;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return projects;
}

export async function getProjectBySlugServer(slug: string): Promise<ProjectData> {
  const filePath = path.join(projectsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Project not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        rehypeHighlight,
      ],
    },
  });

  return {
    frontmatter: {
      title: data.title,
      description: data.description,
      role: data.role,
      tech: data.tech,
      status: data.status,
      date: data.date,
      size: data.size,
      github: data.github,
      slug,
    },
    content: mdxSource,
  };
}
