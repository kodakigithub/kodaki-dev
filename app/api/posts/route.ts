import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { PostMetadata } from '@/types/mdx';

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'src', 'posts');

    if (!fs.existsSync(postsDirectory)) {
      return NextResponse.json([]);
    }

    const filenames = fs.readdirSync(postsDirectory);

    const posts = filenames
      .filter(filename => filename.endsWith('.mdx'))
      .map(filename => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        const slug = filename.replace('.mdx', '');

        return {
          slug,
          ...(data as Omit<PostMetadata, 'slug'>),
        };
      });

    const sortedPosts = posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
    return NextResponse.json(sortedPosts);
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    return NextResponse.json([], { status: 500 });
  }
}
