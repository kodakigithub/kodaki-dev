import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllPosts, getPostBySlug, getAllProjects, getProjectBySlug } from '@/lib/mdx';

// Query keys
export const queryKeys = {
  posts: ['posts'] as const,
  post: (slug: string) => ['posts', slug] as const,
  projects: ['projects'] as const,
  project: (slug: string) => ['projects', slug] as const,
};

// Posts hooks
export function usePostsQuery() {
  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: getAllPosts,
  });
}

export function usePostQuery(slug: string | null) {
  return useQuery({
    queryKey: queryKeys.post(slug || ''),
    queryFn: () => getPostBySlug(slug!),
    enabled: !!slug,
  });
}

// Projects hooks
export function useProjectsQuery() {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: getAllProjects,
  });
}

export function useProjectQuery(slug: string | null) {
  return useQuery({
    queryKey: queryKeys.project(slug || ''),
    queryFn: () => getProjectBySlug(slug!),
    enabled: !!slug,
  });
}

// Prefetch functions for performance
export function usePrefetchPosts() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.posts,
      queryFn: getAllPosts,
    });
  };
}

export function usePrefetchProjects() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.projects,
      queryFn: getAllProjects,
    });
  };
}
