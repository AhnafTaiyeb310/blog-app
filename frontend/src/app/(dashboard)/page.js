import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArticleCard } from "@/components/ArticleCard";
import { RightPanel } from "@/components/RightPanel";
import { ARTICLES } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="flex gap-8">
      {/* Center Feed */}
      <div className="flex-1 min-w-0">
        <div className="mb-8">
          <Tabs defaultValue="for-you" className="w-full">
            <TabsList className="bg-slate-100/50 p-1 h-12 rounded-full border-none shadow-sm">
              <TabsTrigger
                value="for-you"
                className="rounded-full px-8 py-2 text-sm font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm"
              >
                For You
              </TabsTrigger>
              <TabsTrigger
                value="trending"
                className="rounded-full px-8 py-2 text-sm font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm"
              >
                Trending
              </TabsTrigger>
              <TabsTrigger
                value="following"
                className="rounded-full px-8 py-2 text-sm font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm"
              >
                Following
              </TabsTrigger>
            </TabsList>

            <TabsContent value="for-you" className="mt-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {ARTICLES.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
                {/* Rendering multiple times for mock infinite scroll visual */}
                {ARTICLES.map((article) => (
                  <ArticleCard key={`dup-${article.id}`} article={article} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="trending" className="mt-8">
              <div className="flex items-center justify-center h-64 text-slate-400 font-medium italic">
                Trending articles will appear here...
              </div>
            </TabsContent>

            <TabsContent value="following" className="mt-8">
              <div className="flex items-center justify-center h-64 text-slate-400 font-medium italic">
                Content from authors you follow will appear here...
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Sidebar */}
      <RightPanel />
    </div>
  );
}