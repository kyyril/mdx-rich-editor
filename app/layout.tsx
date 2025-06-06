import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MDX Rich Editor - Modern Content Creation Tool',
  description: 'A powerful MDX editor with table of contents, syntax highlighting, and live preview. Built with Next.js and TypeScript.',
  keywords: ['MDX', 'editor', 'markdown', 'content creation', 'Next.js', 'TypeScript'],
  authors: [{ name: 'MDX Editor Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "antialiased")}>
        {children}
      </body>
    </html>
  );
}