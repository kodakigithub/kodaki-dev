import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import Providers from './providers';
import TerminalInterface from '@/components/TerminalInterface';
import MobileBottomNav from '@/components/MobileBottomNav';
import { DataProvider } from '@/components/DataProvider';
import { getAllPostsServer, getAllProjectsServer } from '@/lib/mdx-server';

const geistMono = Geist_Mono({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Harsh Chauhan — Backend Engineer',
  description: 'Backend engineer and CS undergrad building CLIs, LLM-powered systems, and on-chain platforms. Published piper on npm, shipped AI features at EnableX. Lives in the terminal.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch data once at root level for all pages
  const [posts, projects] = await Promise.all([
    getAllPostsServer(),
    getAllProjectsServer(),
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geistMono.className} suppressHydrationWarning>
        <Providers>
          <DataProvider posts={posts} projects={projects}>
            {/* Common layout for all pages - Single source of truth */}
            <div className="h-screen w-screen fixed inset-0 overflow-hidden flex p-1 sm:p-1.5 md:p-2 lg:p-3 pb-16 lg:pb-3" style={{ background: '#1a1a1a' }}>
              <div className="flex-1 h-full">
                <TerminalInterface />
              </div>
            </div>
            <MobileBottomNav />
            {/* Children are rendered but TerminalInterface handles all content switching */}
            {children}
          </DataProvider>
        </Providers>
      </body>
    </html>
  );
}
