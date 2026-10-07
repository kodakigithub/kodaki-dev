import { useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function useKeyboardShortcuts() {
  const router = useRouter();
  const pathname = usePathname();

  const handleSectionChange = useCallback(
    (section: string) => {
      switch (section) {
        case 'projects':
          router.push('/projects');
          break;
        case 'blog':
          router.push('/blog');
          break;
        case 'contact':
          router.push('/contact');
          break;
        case 'home':
        default:
          router.push('/');
          break;
      }
    },
    [router]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in any input/textarea
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'p':
          event.preventDefault();
          handleSectionChange('projects');
          break;
        case 'b':
          event.preventDefault();
          handleSectionChange('blog');
          break;
        case 'c':
          event.preventDefault();
          handleSectionChange('contact');
          break;
        case 'escape':
          event.preventDefault();
          handleSectionChange('home');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [pathname, handleSectionChange]);

  return { handleSectionChange };
}
