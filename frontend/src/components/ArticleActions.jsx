import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

export function ArticleActions({ className }) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full border border-slate-100 bg-white text-slate-500 shadow-sm hover:bg-red-50 hover:border-red-100 hover:text-red-600 hover:scale-110 transition-all duration-300 group">
        <Heart className="h-5 w-5 group-hover:fill-red-600" />
      </Button>
      
      <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full border border-slate-100 bg-white text-slate-500 shadow-sm hover:bg-blue-50 hover:border-blue-100 hover:text-blue-600 hover:scale-110 transition-all duration-300">
        <MessageCircle className="h-5 w-5" />
      </Button>

      <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full border border-slate-100 bg-white text-slate-500 shadow-sm hover:bg-purple-50 hover:border-purple-100 hover:text-purple-600 hover:scale-110 transition-all duration-300">
        <Bookmark className="h-5 w-5" />
      </Button>

      <div className="h-px w-8 bg-slate-200 mx-auto my-2" />

      <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full border border-slate-100 bg-white text-slate-500 shadow-sm hover:bg-slate-50 hover:scale-110 transition-all duration-300">
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
