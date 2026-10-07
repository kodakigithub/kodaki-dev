'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Keep cached data for 30 minutes
        gcTime: 30 * 60 * 1000,
        // Data stays fresh for 10 minutes
        staleTime: 10 * 60 * 1000,
        // Don't refetch when window regains focus
        refetchOnWindowFocus: false,
        // Retry failed requests only once
        retry: 1,
        // Faster retry delay
        retryDelay: 500,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
