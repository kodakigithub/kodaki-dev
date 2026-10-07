import React from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

interface MdxLayoutProps {
  children: React.ReactNode;
  frontmatter: {
    title: string;
    date: string;
    description: string;
    tags?: string[];
  };
}

const MdxLayout: React.FC<MdxLayoutProps> = ({ children, frontmatter }) => {
  const router = useRouter();

  return (
    <div className="fixed inset-10 z-50 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Window Header */}
      <div className="bg-zinc-900 px-4 py-2 flex items-center justify-between flex-shrink-0 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 cursor-pointer" onClick={() => router.push('/blog')}></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="ml-4 text-sm text-zinc-500">~/blog/post</span>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto p-6 font-mono text-sm bg-zinc-900">
        <article className="max-w-4xl mx-auto prose prose-invert prose-amber">
          <header className="mb-12">
            <h1 className="text-4xl font-mono font-bold mb-4 text-amber-400 [text-shadow:0_0_10px_#FFB000]">
              {frontmatter.title}
            </h1>
            <div className="text-amber-400/70 mb-4 font-mono">
              {format(new Date(frontmatter.date), 'MMMM dd, yyyy')}
            </div>
            <p className="text-zinc-400 font-mono">{frontmatter.description}</p>
            {frontmatter.tags && (
              <div className="flex flex-wrap gap-2 mt-4">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-amber-900/30 text-amber-300 border border-amber-700/50 rounded-md text-sm font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
          <div className="prose prose-invert prose-amber max-w-none">
            <div className="font-mono [&_pre]:bg-zinc-800/50 [&_pre]:border [&_pre]:border-amber-800/30 [&_code]:text-amber-300 [&_h1]:text-amber-400 [&_h2]:text-amber-300 [&_h3]:text-amber-200 [&_a]:text-amber-400 [&_a:hover]:text-amber-300 [&_blockquote]:border-l-amber-400">
              {children}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default MdxLayout; 