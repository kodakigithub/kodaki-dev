import { getAllProjectsServer } from '@/lib/mdx-server';

// Generate static params for all projects at build time
export async function generateStaticParams() {
  const projects = await getAllProjectsServer();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage() {
  // Layout is handled by app/layout.tsx
  // TerminalInterface handles content switching based on pathname
  return null;
}
