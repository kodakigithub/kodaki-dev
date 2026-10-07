'use client';

import { forwardRef } from 'react';
import { usePathname } from 'next/navigation';
import BlogView from '@/components/BlogView';
import ContactView from '@/components/ContactView';
import DashboardView from '@/components/DashboardView';
import ProjectsView from '@/components/ProjectsView';
import TopNav from '@/components/TopNav';

export const TerminalContent = forwardRef<HTMLDivElement>(
  function TerminalContent(_, ref) {
    const pathname = usePathname();

    return (
      <div ref={ref} className="flex-1 overflow-y-auto overflow-x-hidden">
        <TopNav />
        {pathname.startsWith('/projects') ? (
          <ProjectsView />
        ) : pathname.startsWith('/blog') ? (
          <BlogView />
        ) : pathname === '/contact' ? (
          <ContactView />
        ) : (
          <DashboardView />
        )}
      </div>
    );
  }
);
