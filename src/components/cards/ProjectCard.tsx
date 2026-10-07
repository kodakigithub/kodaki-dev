'use client';

import { useRouter } from 'next/navigation';
import type { ProjectMetadata } from '@/types/mdx';
import { HoverRow } from '@/components/ui/HoverRow';

interface ProjectCardProps {
  project: ProjectMetadata;
  linkToGithub?: boolean;
}

const ProjectCard = ({ project, linkToGithub = false }: ProjectCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (linkToGithub && project.github) {
      window.open(project.github, '_blank');
    } else {
      router.push(`/projects/${project.slug}`);
    }
  };

  return (
    <div className="mb-4 sm:mb-5 md:mb-6">
      <HoverRow onClick={handleClick}>
        <div className="py-2">
          {/* Header */}
          <div className="mb-2">
            <h3 className="text-base font-bold transition-colors" style={{ color: '#FFFFFF' }}>
              {project.title}
            </h3>
          </div>

          {/* Role */}
          <p className="text-xs sm:text-sm mb-2" style={{ color: '#727780' }}>
            {project.role}
          </p>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-4 break-words" style={{ color: '#D1D5DB', wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}>
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tech.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm bg-zinc-800/50 border border-zinc-700/50 rounded"
                style={{ color: '#727780' }}
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm bg-zinc-800/50 border border-zinc-700/50 rounded" style={{ color: '#727780' }}>
                +{project.tech.length - 5}
              </span>
            )}
          </div>
        </div>
      </HoverRow>
    </div>
  );
};

export default ProjectCard;
