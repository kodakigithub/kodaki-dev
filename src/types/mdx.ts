import { type MDXRemoteSerializeResult } from 'next-mdx-remote';

/**
 * Metadata for blog posts
 */
export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  slug: string;
}

/**
 * Complete post data with frontmatter and serialized MDX content
 */
export interface PostData {
  frontmatter: PostMetadata;
  content: MDXRemoteSerializeResult;
}

/**
 * Metadata for projects
 */
export interface ProjectMetadata {
  title: string;
  role?: string;
  description: string;
  tech: string[];
  status: 'production' | 'active' | 'stable' | 'maintenance';
  date: string;
  size?: string;
  github?: string;
  slug: string;
}

/**
 * Complete project data with frontmatter and serialized MDX content
 */
export interface ProjectData {
  frontmatter: ProjectMetadata;
  content: MDXRemoteSerializeResult;
}
