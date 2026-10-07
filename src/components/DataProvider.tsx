'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { queryKeys } from '@/hooks/useMdxQueries';
import type { PostMetadata, ProjectMetadata } from '@/types/mdx';

interface DataProviderProps {
  posts?: PostMetadata[];
  projects?: ProjectMetadata[];
  children: React.ReactNode;
}

export function DataProvider({ posts, projects, children }: DataProviderProps) {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Pre-populate React Query cache with server-rendered data
    if (posts) {
      queryClient.setQueryData(queryKeys.posts, posts);
    }
    if (projects) {
      queryClient.setQueryData(queryKeys.projects, projects);
    }
  }, [posts, projects, queryClient]);

  return <>{children}</>;
}
