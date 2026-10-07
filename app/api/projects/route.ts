import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { ProjectMetadata } from '@/types/mdx';

export async function GET() {
  try {
    const projectsDirectory = path.join(process.cwd(), 'src', 'projects');

    if (!fs.existsSync(projectsDirectory)) {
      return NextResponse.json([]);
    }

    const filenames = fs.readdirSync(projectsDirectory);

    const projects = filenames
      .filter(filename => filename.endsWith('.mdx'))
      .map(filename => {
        const filePath = path.join(projectsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        const slug = filename.replace('.mdx', '');

        return {
          slug,
          ...(data as Omit<ProjectMetadata, 'slug'>),
        };
      });

    const sortedProjects = projects.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
    return NextResponse.json(sortedProjects);
  } catch (error) {
    console.error('Error in getAllProjects:', error);
    return NextResponse.json([], { status: 500 });
  }
}
