'use client';

import { useRouter, usePathname } from 'next/navigation';
import { usePrefetchPosts, usePrefetchProjects } from '@/hooks/useMdxQueries';

const MobileBottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const prefetchPosts = usePrefetchPosts();
  const prefetchProjects = usePrefetchProjects();

  const navItems = [
    { id: 'home', label: 'Home', icon: '⌂', path: '/', onHover: () => {} },
    { id: 'projects', label: 'Projects', icon: '▶', path: '/projects', onHover: prefetchProjects },
    { id: 'blog', label: 'Blog', icon: '■', path: '/blog', onHover: prefetchPosts },
    { id: 'contact', label: 'Contact', icon: '◐', path: '/contact', onHover: () => {} },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 backdrop-blur-md"
      style={{ background: 'rgba(17, 17, 17, 0.95)' }}
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 max-w-screen-sm mx-auto px-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              onMouseEnter={item.onHover}
              onFocus={item.onHover}
              aria-label={`Navigate to ${item.label}`}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[60px] ${
                active
                  ? 'text-purple-400'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span className="text-lg" aria-hidden="true">{item.icon}</span>
              <span className="text-[10px] font-mono font-medium">{item.label}</span>
              {active && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
