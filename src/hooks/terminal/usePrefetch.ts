import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePrefetchPosts, usePrefetchProjects } from '@/hooks/useMdxQueries';

export function usePrefetch() {
  const router = useRouter();
  const prefetchPosts = usePrefetchPosts();
  const prefetchProjects = usePrefetchProjects();

  useEffect(() => {
    // Prefetch data immediately
    prefetchPosts();
    prefetchProjects();

    // Prefetch routes in the background
    const prefetchRoutes = () => {
      router.prefetch('/projects');
      router.prefetch('/blog');
      router.prefetch('/contact');
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(prefetchRoutes);
    } else {
      setTimeout(prefetchRoutes, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
