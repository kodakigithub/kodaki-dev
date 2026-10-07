import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const projectsDirectory = path.join(process.cwd(), 'src', 'projects');
    const filePath = path.join(projectsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: `Project not found: ${slug}` }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Serialize MDX content with GFM support for tables
    const mdxSource = await serialize(content, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
        format: 'mdx',
      },
    });

    return NextResponse.json({
      frontmatter: data,
      content: mdxSource,
    });
  } catch (error) {
    console.error('Error in getProjectBySlug:', error);
    return NextResponse.json({ error: 'Failed to load project' }, { status: 500 });
  }
}
