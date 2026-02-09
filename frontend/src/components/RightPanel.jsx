import React from "react";
import { ARTICLES, CATEGORIES, RECOMMENDED_FOLLOWS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import Link from "next/link";

export function RightPanel() {
  return (
    <aside className="hidden xl:flex w-[320px] flex-col gap-8">
      {/* Related Articles */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Trending Now</h3>
          <Link href="/discover" className="text-xs font-semibold text-purple-600 hover:underline">See all</Link>
        </div>
        <div className="space-y-4">
          {ARTICLES.slice(0, 3).map((article) => (
            <Link href={`/articles/${article.id}`} key={article.id} className="group flex gap-4 items-start">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                <img src={article.image} alt="" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col gap-1">
                <Badge className="w-fit h-4 px-1.5 text-[9px] bg-purple-50 text-purple-600 border-none rounded-md">
                  {article.category}
                </Badge>
                <h4 className="line-clamp-2 text-xs font-bold leading-tight text-slate-800 group-hover:text-purple-600 transition-colors">
                  {article.title}
                </h4>
                <span className="text-[10px] text-slate-400 font-medium">{article.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">Top Categories</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Link href={`/discover?category=${category.name}`} key={category.name}>
              <Badge
                className={cn(
                  "cursor-pointer rounded-full px-4 py-1.5 text-[11px] font-semibold border-none transition-all",
                  category.active 
                    ? "bg-purple-600 text-white shadow-md shadow-purple-200" 
                    : "bg-white text-slate-500 hover:bg-slate-100 shadow-sm"
                )}
              >
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>
      </section>

      {/* Recommended Follows */}
      <section>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">Who to follow</h3>
        <Card className="border-none bg-white shadow-sm rounded-2xl p-4">
          <div className="flex flex-col gap-4">
            {RECOMMENDED_FOLLOWS.map((user) => (
              <div key={user.handle} className="flex items-center justify-between">
                <Link href={`/authors/auth-1`} className="flex items-center gap-3 group">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900 leading-none group-hover:text-purple-600 transition-colors">{user.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium mt-1">{user.handle}</span>
                  </div>
                </Link>
                <Button variant="outline" size="sm" className="h-8 rounded-full border-purple-200 text-[10px] font-bold text-purple-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 px-3 transition-colors">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </aside>
  );
}
