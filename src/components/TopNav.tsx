'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Github, Linkedin, Mail } from 'lucide-react';
import { usePrefetchPosts, usePrefetchProjects } from '@/hooks/useMdxQueries';

const socialLinks = [
  { label: 'GitHub', icon: Github, href: 'https://github.com/kodakigithub' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/harshchauhan1/' },
  { label: 'Email', icon: Mail, href: 'mailto:harsh10singhchauhan@gmail.com' },
];

const TopNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const prefetchPosts = usePrefetchPosts();
  const prefetchProjects = usePrefetchProjects();

  const sections = [
    { id: 'home', label: 'home', shortcut: 'esc', path: '/', onHover: () => { } },
    { id: 'projects', label: 'projects', shortcut: 'p', path: '/projects', onHover: prefetchProjects },
    { id: 'blog', label: 'blog', shortcut: 'b', path: '/blog', onHover: prefetchPosts },
    { id: 'contact', label: 'contact', shortcut: 'c', path: '/contact', onHover: () => { } },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav className="hidden lg:block flex-shrink-0" aria-label="Main navigation">
      <div className="max-w-content mx-auto w-full px-3 sm:px-4 md:px-5 lg:px-6 pt-5 flex items-center justify-between font-mono text-sm">
        <div className="flex items-center gap-5">
          {sections.map((section) => {
            const active = isActive(section.path);
            return (
              <button
                key={section.id}
                onClick={() => router.push(section.path)}
                onMouseEnter={section.onHover}
                onFocus={section.onHover}
                aria-label={`Navigate to ${section.label}`}
                aria-current={active ? 'page' : undefined}
                className={`transition-colors ${active ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-200'}`}
              >
                <span className={active ? 'text-amber-400/60' : 'text-zinc-700'}>[{section.shortcut}]</span> {section.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-zinc-500 hover:text-amber-400 transition-colors"
            >
              <Icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
