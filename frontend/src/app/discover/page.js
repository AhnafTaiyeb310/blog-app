import React from "react";
import { ARTICLES, CATEGORIES } from "@/lib/mock-data";
import { ArticleCard } from "@/components/ArticleCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DiscoverPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Discover
          </h1>
          <p className="text-slate-500">
            Explore the latest insights across design, development, and product.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl bg-white shadow-sm hover:bg-slate-50">
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:text-slate-900">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Filters & Search Bar */}
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input 
            placeholder="Search articles, tags, authors..." 
            className="h-11 border-none bg-slate-50 pl-11 focus-visible:ring-purple-200"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="h-8 w-px bg-slate-100 hidden md:block" />
          
          <Select defaultValue="latest">
            <SelectTrigger className="h-11 w-[140px] border-none bg-slate-50 focus:ring-purple-200">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="h-11 gap-2 border-none bg-slate-50 text-slate-600 hover:bg-slate-100">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        <Badge className="cursor-pointer rounded-full bg-purple-600 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-purple-200 border-none">
          All Topics
        </Badge>
        {CATEGORIES.map((category) => (
          <Badge 
            key={category.name}
            variant="outline" 
            className="cursor-pointer rounded-full border-none bg-white px-5 py-2 text-xs font-semibold text-slate-500 shadow-sm hover:bg-slate-50 transition-all"
          >
            {category.name}
          </Badge>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
        {/* Mock extra cards for the grid feel */}
        {ARTICLES.map((article) => (
          <ArticleCard key={`discover-${article.id}`} article={article} />
        ))}
      </div>

      {/* Pagination / Load More */}
      <div className="flex items-center justify-center py-10">
        <Button 
          variant="outline" 
          className="h-12 rounded-full border-slate-200 bg-white px-10 text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-all active:scale-95"
        >
          Load More Articles
        </Button>
      </div>
    </div>
  );
}
