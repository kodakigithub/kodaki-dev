import React from 'react';
import Image from 'next/image';

export const mdxComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="text-3xl font-bold mb-6 mt-8 font-mono text-white" {...props} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="text-2xl font-bold mb-4 mt-10 font-mono text-white" {...props} />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="text-xl font-bold mb-3 mt-8 font-mono text-white" {...props} />
    ),
    h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 className="text-lg font-bold mb-2 mt-6 font-mono text-white" {...props} />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="mb-6 font-mono text-base leading-7 text-zinc-300" {...props} />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
        <code
            className="bg-zinc-800/70 px-1.5 py-0.5 rounded font-mono text-sm text-zinc-300"
            {...props}
        />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <div className="relative mb-6">
            <div 
                className="absolute inset-y-0 left-0 w-1 bg-cyan-500/70"
                style={{
                    boxShadow: '0 0 8px rgba(6, 182, 212, 0.3)',
                }}
            />
            <pre
                className="bg-zinc-900 p-4 pl-6 rounded-lg overflow-x-auto font-mono text-sm border border-zinc-800 text-zinc-300"
                {...props}
            />
        </div>
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a className="text-cyan-400 hover:text-cyan-300 underline font-mono transition-colors" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="list-disc list-inside mb-6 font-mono text-base space-y-2 text-zinc-300" {...props} />
    ),
    ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
        <ol className="list-decimal list-inside mb-6 font-mono text-base space-y-2 text-zinc-300" {...props} />
    ),
    li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
        <li className="leading-7 font-mono" {...props} />
    ),
    blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className="border-l-4 border-cyan-500/70 pl-4 py-2 bg-zinc-800/30 italic mb-6 font-mono text-base text-zinc-400"
            {...props}
        />
    ),
    // Image component for CDN images
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <span className="block my-6">
            <Image
                src={props.src || ''}
                alt={props.alt || 'Blog image'}
                width={800}
                height={450}
                className="rounded-lg border border-zinc-800 w-full h-auto"
                unoptimized // Required for external CDN images
            />
            {props.alt && (
                <span className="block text-center text-sm text-terminal-muted mt-2 font-mono">
                    {props.alt}
                </span>
            )}
        </span>
    ),
    // Table components
    table: (props: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="my-6 overflow-x-auto">
            <table className="w-full border-collapse font-mono text-sm" {...props} />
        </div>
    ),
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <thead className="border-b-2 border-cyan-500/50" {...props} />
    ),
    tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <tbody {...props} />
    ),
    tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors" {...props} />
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
        <th className="px-4 py-3 text-left font-bold text-white" {...props} />
    ),
    td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
        <td className="px-4 py-3 text-zinc-300" {...props} />
    ),
};
