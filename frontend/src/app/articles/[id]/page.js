import React from "react";
import { ARTICLES } from "@/lib/mock-data";
import { RightPanel } from "@/components/RightPanel";
import { CommentSection } from "@/components/CommentSection";
import { ArticleActions } from "@/components/ArticleActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

// Dynamic Metadata
export async function generateMetadata({ params }) {
  const { id } = await params; // Awaiting params for Next.js 15+
  const article = ARTICLES.find((a) => a.id === id);

  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | Editorial`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }) {
  const { id } = await params;
  const article = ARTICLES.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  return (
    <div className="flex gap-12">
      {/* Actions Sidebar (Sticky Left) */}
      <div className="hidden xl:block relative w-12 shrink-0">
        <div className="sticky top-28">
          <ArticleActions />
        </div>
      </div>

      {/* Main Content */}
      <article className="flex-1 min-w-0 max-w-3xl">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-1 rounded-full text-xs font-semibold">
              {article.category}
            </Badge>
            <span className="text-slate-400 text-sm">•</span>
            <span className="text-slate-500 text-sm font-medium flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {article.readTime}
            </span>
            <span className="text-slate-400 text-sm">•</span>
            <span className="text-slate-500 text-sm font-medium flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {article.date}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-8">
            {article.title}
          </h1>

          <div className="flex items-center justify-between border-y border-slate-100 py-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 ring-2 ring-purple-50">
                <AvatarImage src={article.author.avatar} />
                <AvatarFallback>{article.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-bold text-slate-900">{article.author.name}</div>
                <div className="text-sm text-slate-500">{article.author.role}</div>
              </div>
            </div>
            {/* Mobile Actions (Visible on small screens) */}
            <div className="xl:hidden">
              <ArticleActions className="flex-row" />
            </div>
          </div>
        </header>

import Image from "next/image";

// ... (existing imports)

        {/* Featured Image */}
        <figure className="mb-12 overflow-hidden rounded-3xl shadow-sm relative aspect-[21/9]">
          <Image 
            src={article.image} 
            alt={article.title} 
            fill
            priority
            className="object-cover"
          />
        </figure>

        {/* Article Body */}
        <div 
          className="prose prose-slate prose-lg max-w-none text-slate-700 leading-8 prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 prose-a:text-purple-600 prose-a:no-underline hover:prose-a:text-purple-700 prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: article.content || "<p>Content pending...</p>" }} 
        />

        {/* Tags */}
        <div className="mt-12 flex flex-wrap gap-2">
          {article.tags?.map(tag => (
            <Badge key={tag} variant="outline" className="rounded-md border-slate-200 text-slate-600 font-normal hover:border-purple-200 hover:bg-purple-50 transition-colors cursor-pointer px-3 py-1">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Comments */}
        <CommentSection comments={article.comments || []} />
      </article>

      {/* Right Sidebar (Reused) */}
      <div className="hidden 2xl:block">
        <RightPanel />
      </div>
    </div>
  );
}
