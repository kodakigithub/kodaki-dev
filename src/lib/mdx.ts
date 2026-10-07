import type { PostMetadata, PostData, ProjectMetadata, ProjectData } from '@/types/mdx';

// Relative URL: these fetches only run in the browser (server-side reads use
// mdx-server.ts), and a hardcoded port breaks when the dev server picks another one
const API_URL = '/api';

// Optimized fetch options for better performance
const fetchOptions: RequestInit = {
  // Keep connections alive for reuse
  keepalive: true,
  // Cache for 5 minutes
  next: { revalidate: 300 },
};

export async function getAllPosts(): Promise<PostMetadata[]> {
  try {
    const response = await fetch(`${API_URL}/posts`, fetchOptions);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<PostData> {
  const response = await fetch(`${API_URL}/posts/${slug}`, fetchOptions);
  if (!response.ok) {
    throw new Error(`Post not found: ${slug}`);
  }
  return await response.json();
}

export async function getAllProjects(): Promise<ProjectMetadata[]> {
  try {
    const response = await fetch(`${API_URL}/projects`, fetchOptions);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getAllProjects:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectData> {
  const response = await fetch(`${API_URL}/projects/${slug}`, fetchOptions);
  if (!response.ok) {
    throw new Error(`Project not found: ${slug}`);
  }
  return await response.json();
} 