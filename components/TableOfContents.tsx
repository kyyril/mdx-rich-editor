"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, List, ChevronRight } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
  isMobile?: boolean;
}

export function TableOfContents({
  content,
  className,
  isMobile = false,
}: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,4})\s+(.+)$/gm;
    const headings: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      headings.push({ id, text, level });
    }

    setToc(headings);
  }, [content]);

  useEffect(() => {
    // Intersection Observer to track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 0,
      }
    );

    // Observe all headings
    toc.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      if (isMobile) {
        setIsOpen(false);
      }
    }
  };

  const TOCContent = () => (
    <div className="space-y-1">
      {toc.map(({ id, text, level }) => (
        <button
          key={id}
          onClick={() => scrollToHeading(id)}
          className={cn(
            "group flex items-center w-full text-left text-sm py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5",
            {
              "pl-3": level === 1,
              "pl-6": level === 2,
              "pl-9": level === 3,
              "pl-12": level === 4,
            },
            activeId === id
              ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary font-medium border-l-2 border-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <ChevronRight
            className={cn(
              "h-3 w-3 mr-2 transition-transform duration-200",
              activeId === id
                ? "rotate-90 text-primary"
                : "text-muted-foreground/50 group-hover:text-muted-foreground"
            )}
          />
          <span className="truncate">{text}</span>
        </button>
      ))}
    </div>
  );

  if (toc.length === 0) return null;

  // Mobile version with modal
  if (isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="fixed bottom-6 right-6 z-40 shadow-lg bg-background/95 backdrop-blur-sm border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-200"
          >
            <List className="h-4 w-4 mr-2" />
            Contents
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm mx-4 max-h-[80vh] bg-background/60 backdrop-blur-xl backdrop-saturate-150 border border-white/10 shadow-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary">
              <BookOpen className="h-5 w-5" />
              Table of Contents
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <TOCContent />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  // Desktop version
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-card via-card to-primary/5 border border-primary/10 rounded-xl p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <BookOpen className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">Table of Contents</h3>
      </div>

      <ScrollArea className="h-[400px] pr-2">
        <TOCContent />
      </ScrollArea>
    </div>
  );
}
