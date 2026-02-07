import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

import Image from "next/image";

export function ArticleCard({ article }) {
  return (
    <Card className="group overflow-hidden border-none bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/5 rounded-2xl">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        <Badge className="absolute left-4 top-4 bg-purple-50/90 text-purple-600 backdrop-blur-sm border-none hover:bg-purple-100 rounded-lg py-1 px-3 text-xs font-semibold">
          {article.category}
        </Badge>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 h-9 w-9 rounded-xl bg-white/80 text-slate-600 backdrop-blur-sm hover:bg-white hover:text-purple-600 shadow-sm"
        >
          <Bookmark className={cn("h-4 w-4", article.isBookmarked && "fill-purple-600 text-purple-600")} />
        </Button>
      </div>

      <CardContent className="p-5">
        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-slate-900 group-hover:text-purple-600 transition-colors">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm text-slate-500 leading-relaxed">
          {article.excerpt}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-slate-50 p-5 pt-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 ring-2 ring-slate-50">
            <AvatarImage src={article.author.avatar} />
            <AvatarFallback>{article.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-900">{article.author.name}</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{article.date}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="text-[11px] font-medium tracking-tight italic">{article.readTime}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
