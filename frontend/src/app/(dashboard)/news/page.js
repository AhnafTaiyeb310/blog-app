import React from "react";
import { Newspaper } from "lucide-react";

export default function NewsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="p-6 bg-purple-50 rounded-full">
        <Newspaper className="h-12 w-12 text-purple-600" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900">Latest News</h1>
      <p className="text-slate-500 max-w-md text-center">
        Our editorial team is currently gathering the latest insights and breaking news for you. Check back soon!
      </p>
    </div>
  );
}
