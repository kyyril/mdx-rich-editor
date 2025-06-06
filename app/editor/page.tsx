'use client';

import { MDXEditor } from '@/components/MDXEditor';
import { mockBlogPost } from '@/lib/mock-data';

export default function EditorPage() {
  return (
    <div className="h-screen bg-background">
      <MDXEditor initialContent={mockBlogPost} />
    </div>
  );
}