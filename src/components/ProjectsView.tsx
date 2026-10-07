'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useProjectsQuery, useProjectQuery } from '@/hooks/useMdxQueries';
import { MDXRemote } from 'next-mdx-remote';
import { mdxComponents } from '@/components/mdx/components';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { HoverRow } from '@/components/ui/HoverRow';
import { useRouter } from 'next/navigation';

const ProjectsView = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug ? (Array.isArray(params.slug) ? params.slug[0] : params.slug) : null;

  const { data: projects = [], isLoading: projectsLoading } = useProjectsQuery();
  const { data: currentProject } = useProjectQuery(slug);

  // Show project detail if slug exists
  if (slug && currentProject) {
    return (
      <div className="overflow-x-hidden">
        <div className="max-w-article mx-auto p-3 sm:p-4 md:p-5 lg:p-6 space-y-6">
          {/* Back Button */}
          <Link href="/projects" className="inline-block mb-4 text-sm text-terminal-muted hover:underline">
            ← back to projects
          </Link>

          {/* Project Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
              {currentProject.frontmatter.title}
            </h1>

            <p className="text-xs sm:text-sm mb-3 text-terminal-muted">
              {currentProject.frontmatter.role}
            </p>

            <p className="text-sm mb-4 leading-relaxed text-terminal-text">
              {currentProject.frontmatter.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {currentProject.frontmatter.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-sm bg-zinc-800/50 border border-zinc-700/50 rounded text-terminal-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* MDX Content */}
          <div className="prose prose-invert max-w-none">
            <ErrorBoundary>
              <MDXRemote {...currentProject.content} components={mdxComponents} />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    );
  }

  // Show projects list
  return (
    <div className="overflow-x-hidden">
      <div className="max-w-content mx-auto p-3 sm:p-4 md:p-5 lg:p-6 space-y-6">
        {/* Header */}
        <div className="mt-6 sm:mt-8 mb-8">
          <div className="overflow-hidden mb-4 w-full max-w-full">
            <pre className="text-[2.25px] xs:text-[2.7px] sm:text-[3.6px] md:text-[4.5px] leading-none text-zinc-300 whitespace-pre crt-glow" style={{ fontFamily: 'monospace' }}>
              {`                                   ███                     █████           
                                  ░░░                     ░░███            
 ████████  ████████   ██████      █████  ██████   ██████  ███████    █████ 
░░███░░███░░███░░███ ███░░███    ░░███  ███░░███ ███░░███░░░███░    ███░░  
 ░███ ░███ ░███ ░░░ ░███ ░███     ░███ ░███████ ░███ ░░░   ░███    ░░█████ 
 ░███ ░███ ░███     ░███ ░███     ░███ ░███░░░  ░███  ███  ░███ ███ ░░░░███
 ░███████  █████    ░░██████      ░███ ░░██████ ░░██████   ░░█████  ██████ 
 ░███░░░  ░░░░░      ░░░░░░       ░███  ░░░░░░   ░░░░░░     ░░░░░  ░░░░░░  
 ░███                         ███ ░███                                     
 █████                       ░░██████                                      
░░░░░                         ░░░░░░                                       `}
            </pre>
          </div>
          <p className="text-base text-terminal-muted">
            things i've built
          </p>
        </div>

            {/* Projects List */}
            {projectsLoading ? (
              <div className="text-terminal-muted">Loading...</div>
            ) : (
              <div className="space-y-6 sm:space-y-7 md:space-y-8">
                {projects.map((project) => (
                  <HoverRow
                    key={project.slug}
                    onClick={() => router.push(`/projects/${project.slug}`)}
                  >
                    <div className="py-2">
                      {/* Project Name */}
                      <h2 className="text-base font-bold mb-3 text-white">
                        {project.title}
                      </h2>

                      {/* Role */}
                      <p className="text-xs sm:text-sm mb-2 text-terminal-muted">
                        {project.role}
                      </p>

                      {/* Description */}
                      <p className="text-sm leading-relaxed mb-4 break-words text-terminal-text">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm bg-zinc-800/50 border border-zinc-700/50 rounded text-terminal-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </HoverRow>
                ))}
              </div>
            )}
      </div>
    </div>
  );
};

export default ProjectsView;
