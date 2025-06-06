'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Edit3, 
  Eye, 
  Code2, 
  BookOpen, 
  Palette,
  ArrowRight,
  Github,
  Star,
  Sparkles,
  Zap,
  Smartphone
} from 'lucide-react';
import Link from 'next/link';
import { MDXRenderer } from '@/components/MDXRenderer';
import { mockQuickStart } from '@/lib/mock-data';

export default function Home() {
  const [showPreview, setShowPreview] = useState(false);

  const features = [
    {
      icon: <Edit3 className="h-6 w-6" />,
      title: "Rich Text Editor",
      description: "Full-featured MDX editor with live preview and syntax highlighting",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Smart Table of Contents",
      description: "Auto-generated TOC with smooth scrolling and mobile modal support",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Syntax Highlighting",
      description: "Beautiful code blocks with Prism.js highlighting and copy functionality",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Responsive Design",
      description: "Optimized for all devices with mobile-first approach and adaptive UI",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              MDX Rich Editor
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A modern, feature-rich MDX editor with beautiful aesthetics, responsive design, 
            and intelligent table of contents. Built for developers who love great content creation tools.
          </p>

          <div className="flex items-center justify-center gap-4 pt-6">
            <Link href="/editor">
              <Button size="lg" className="flex items-center gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                <Sparkles className="h-5 w-5" />
                Start Writing
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="flex items-center gap-2 border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-200">
              <Github className="h-4 w-4" />
              View Source
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-8">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
                <Zap className="h-3 w-3 mr-1" />
                Next.js 13+
              </Badge>
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                TypeScript
              </Badge>
              <Badge variant="secondary" className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
                Tailwind CSS
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 border-t border-primary/10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need for professional content creation with modern aesthetics
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300 border-primary/10 bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Preview Section */}
      <section className="container mx-auto px-4 py-16 border-t border-primary/10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            See It In Action
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Toggle between the raw markdown and beautifully rendered preview
          </p>
          
          <div className="flex items-center justify-center gap-2">
            <Button
              variant={!showPreview ? "default" : "outline"}
              onClick={() => setShowPreview(false)}
              className={cn(
                "flex items-center gap-2 transition-all duration-200",
                !showPreview && "bg-gradient-to-r from-primary to-purple-600 text-white"
              )}
            >
              <Code2 className="h-4 w-4" />
              Markdown
            </Button>
            <Button
              variant={showPreview ? "default" : "outline"}
              onClick={() => setShowPreview(true)}
              className={cn(
                "flex items-center gap-2 transition-all duration-200",
                showPreview && "bg-gradient-to-r from-primary to-purple-600 text-white"
              )}
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </div>
        </div>

        <Card className="max-w-5xl mx-auto shadow-xl border-primary/10 overflow-hidden">
          <CardContent className="p-0">
            {showPreview ? (
              <div className="p-8 bg-gradient-to-br from-background via-background to-primary/5">
                <div className="fade-in">
                  <MDXRenderer content={mockQuickStart} />
                </div>
              </div>
            ) : (
              <div className="p-8 bg-gradient-to-br from-muted/20 to-primary/5">
                <pre className="text-sm font-mono whitespace-pre-wrap text-muted-foreground leading-relaxed">
                  {mockQuickStart}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 border-t border-primary/10">
        <div className="text-center space-y-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Jump into the editor and start creating beautiful, rich content with our 
            comprehensive MDX editing experience. Perfect for blogs, documentation, and more.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Link href="/editor">
              <Button size="lg" className="flex items-center gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                <Edit3 className="h-5 w-5" />
                Open Editor
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-12 mt-16 bg-gradient-to-r from-muted/30 to-primary/5">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold text-foreground text-lg">MDX Rich Editor</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span className="text-sm">Built with Next.js & shadcn/ui</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed">
            A modern content creation tool for developers and writers who appreciate beautiful design.
          </p>
        </div>
      </footer>
    </div>
  );
}