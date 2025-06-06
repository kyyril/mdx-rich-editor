'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Edit3, 
  Download, 
  Upload,
  FileText,
  Columns,
  Maximize2,
  Minimize2,
  Palette,
  Code2,
  Quote,
  Table,
  CheckSquare,
  Sparkles
} from 'lucide-react';
import { MDXRenderer } from './MDXRenderer';
import { TableOfContents } from './TableOfContents';
import { cn } from '@/lib/utils';

interface MDXEditorProps {
  initialContent?: string;
  className?: string;
}

export function MDXEditor({ initialContent = '', className }: MDXEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'split'>('split');
  const [wordCount, setWordCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Calculate word count
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSave = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/markdown') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setContent(text);
      };
      reader.readAsText(file);
    }
  };

  const insertTemplate = (template: string) => {
    setContent(prev => prev + '\n\n' + template);
  };

  const templates = [
    {
      name: 'Code Block',
      icon: <Code2 className="h-3 w-3" />,
      template: '```javascript\n// Your code here\nconsole.log("Hello, World!");\n```'
    },
    {
      name: 'Table',
      icon: <Table className="h-3 w-3" />,
      template: '| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Row 1    | Data     | Data     |\n| Row 2    | Data     | Data     |'
    },
    {
      name: 'Quote',
      icon: <Quote className="h-3 w-3" />,
      template: '> This is a blockquote. Use it to highlight important information or quotes from other sources.'
    },
    {
      name: 'Checklist',
      icon: <CheckSquare className="h-3 w-3" />,
      template: '- [ ] Task 1\n- [ ] Task 2\n- [x] Completed task'
    }
  ];

  return (
    <div className={cn(
      "flex flex-col h-full editor-container backdrop-blur-sm",
      isFullscreen && "fixed inset-0 z-50 bg-background",
      className
    )}>
      {/* Enhanced Toolbar */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-card/80 via-card to-primary/5 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">MDX Editor</h2>
              <p className="text-xs text-muted-foreground">Rich content editor</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
              <Sparkles className="h-3 w-3 mr-1" />
              {wordCount} words
            </Badge>
            <Badge variant="outline" className="text-xs">
              {content.length} chars
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Template buttons - hidden on mobile */}
          {!isMobile && (
            <div className="flex items-center gap-1">
              {templates.map((template) => (
                <Button
                  key={template.name}
                  variant="ghost"
                  size="sm"
                  onClick={() => insertTemplate(template.template)}
                  className="text-xs hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  title={template.name}
                >
                  {template.icon}
                  <span className="ml-1 hidden md:inline">{template.name}</span>
                </Button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-1">
            <input
              type="file"
              accept=".md,.markdown"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="outline" size="sm" asChild className="hover:bg-primary/10 hover:border-primary/30">
                <span>
                  <Upload className="h-4 w-4" />
                </span>
              </Button>
            </label>
            
            <Button variant="outline" size="sm" onClick={handleSave} className="hover:bg-primary/10 hover:border-primary/30">
              <Download className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="hover:bg-primary/10 hover:border-primary/30"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced View Mode Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <div className="border-b bg-gradient-to-r from-muted/30 via-muted/20 to-primary/5">
          <TabsList className="ml-4 bg-transparent">
            <TabsTrigger 
              value="edit" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-purple-500/10 data-[state=active]:text-primary"
            >
              <Edit3 className="h-4 w-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger 
              value="preview" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-purple-500/10 data-[state=active]:text-primary"
            >
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
            {!isMobile && (
              <TabsTrigger 
                value="split" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-purple-500/10 data-[state=active]:text-primary"
              >
                <Columns className="h-4 w-4" />
                Split
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="edit" className="h-full mt-0">
            <div className="h-full p-4">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your MDX content..."
                className="h-full resize-none font-mono text-sm leading-relaxed bg-gradient-to-br from-background to-primary/5 border-primary/10 focus:border-primary/30 transition-all duration-200"
              />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="h-full mt-0">
            <div className="flex h-full">
              <div className="flex-1 overflow-auto p-6 bg-gradient-to-br from-background via-background to-primary/5">
                <div className="fade-in">
                  <MDXRenderer content={content} />
                </div>
              </div>
              {!isMobile && (
                <div className="w-80 border-l border-primary/10 p-4 bg-gradient-to-br from-muted/20 to-primary/5">
                  <TableOfContents content={content} />
                </div>
              )}
            </div>
            {isMobile && <TableOfContents content={content} isMobile={true} />}
          </TabsContent>

          {!isMobile && (
            <TabsContent value="split" className="h-full mt-0">
              <div className="flex h-full">
                {/* Editor Panel */}
                <div className="flex-1 border-r border-primary/10">
                  <div className="h-full p-4">
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Start writing your MDX content..."
                      className="h-full resize-none font-mono text-sm leading-relaxed bg-gradient-to-br from-background to-primary/5 border-primary/10 focus:border-primary/30 transition-all duration-200"
                    />
                  </div>
                </div>
                
                {/* Preview Panel */}
                <div className="flex-1 flex">
                  <div className="flex-1 overflow-auto p-6 bg-gradient-to-br from-background via-background to-primary/5">
                    <div className="fade-in">
                      <MDXRenderer content={content} />
                    </div>
                  </div>
                  <div className="w-64 border-l border-primary/10 p-4 bg-gradient-to-br from-muted/20 to-primary/5 slide-in-right">
                    <TableOfContents content={content} />
                  </div>
                </div>
              </div>
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
}