import React from "react";
import { ARTICLES } from "@/lib/mock-data";
import { ArticleCard } from "@/components/ArticleCard";
import { RightPanel } from "@/components/RightPanel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Twitter, Github, Globe, Mail, MapPin, Calendar, Users, FileText } from "lucide-react";
import { notFound } from "next/navigation";

export default async function AuthorProfilePage({ params }) {
  const { id } = await params;
  
  // Find the author from any article (mock simulation)
  const article = ARTICLES.find((a) => a.author.id === id);
  const author = article?.author;

  if (!author) {
    notFound();
  }

  // Filter articles by this author
  const authorArticles = ARTICLES.filter((a) => a.author.id === id);

  return (
    <div className="space-y-8">
      {/* Profile Header Card */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        {/* Cover Image/Pattern */}
        <div className="h-48 w-full bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-700 md:h-64" />
        
        <div className="relative px-6 pb-8 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:gap-8">
            {/* Avatar */}
            <div className="-mt-16 mb-4 md:mb-0">
              <Avatar className="h-32 w-32 border-4 border-white shadow-xl md:h-40 md:w-40">
                <AvatarImage src={author.avatar} />
                <AvatarFallback>{author.name[0]}</AvatarFallback>
              </Avatar>
            </div>

            {/* Author Info */}
            <div className="flex-1 space-y-4 pt-4 md:pt-0">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                      {author.name}
                    </h1>
                    <Badge className="bg-purple-100 text-purple-600 border-none px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      Pro Member
                    </Badge>
                  </div>
                  <p className="text-slate-500 font-medium">{author.role}</p>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline" className="rounded-full border-slate-200 px-6 font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-all">
                    Share Profile
                  </Button>
                  <Button className="rounded-full bg-purple-600 px-8 font-bold text-white shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all active:scale-95">
                    Follow
                  </Button>
                </div>
              </div>

              {/* Stats & Socials */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Users className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-900">{author.stats.followers}</span> Followers
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <FileText className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-900">{author.stats.articles}</span> Articles
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  Remote
                </div>
                <div className="flex items-center gap-4 border-l border-slate-100 pl-8">
                  <a href="#" className="text-slate-400 hover:text-purple-600 transition-colors"><Twitter className="h-4 w-4" /></a>
                  <a href="#" className="text-slate-400 hover:text-purple-600 transition-colors"><Github className="h-4 w-4" /></a>
                  <a href="#" className="text-slate-400 hover:text-purple-600 transition-colors"><Globe className="h-4 w-4" /></a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 max-w-2xl">
            <p className="text-slate-600 leading-relaxed">
              {author.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1 min-w-0">
          <Tabs defaultValue="articles" className="w-full">
            <TabsList className="h-12 w-fit bg-slate-100/50 p-1 rounded-full mb-8">
              <TabsTrigger value="articles" className="rounded-full px-8 font-bold data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm">
                Articles
              </TabsTrigger>
              <TabsTrigger value="about" className="rounded-full px-8 font-bold data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm">
                About
              </TabsTrigger>
              <TabsTrigger value="following" className="rounded-full px-8 font-bold data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm">
                Following
              </TabsTrigger>
            </TabsList>

            <TabsContent value="articles">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {authorArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
                {/* Mock duplication for visual fill */}
                {authorArticles.map((article) => (
                  <ArticleCard key={`profile-${article.id}`} article={article} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about" className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">About {author.name}</h3>
              <p className="text-slate-600 leading-8 mb-6">
                Alex is a seasoned UX Architect with over a decade of experience in building scalable design systems for the world's leading tech companies. Their work focuses on the intersection of aesthetics and functionality.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {["UX Strategy", "Figma", "Design Systems", "Product Strategy", "React"].map(s => (
                      <Badge key={s} variant="secondary" className="rounded-md font-medium">{s}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Experience</h4>
                  <div className="space-y-1 text-sm">
                    <div className="font-bold text-slate-800">UX Architect @ TechFlow</div>
                    <div className="text-slate-500 italic">2022 - Present</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="following" className="flex items-center justify-center h-48 text-slate-400 italic font-medium">
              List of people followed by {author.name} will appear here...
            </TabsContent>
          </Tabs>
        </div>

        <div className="hidden lg:block">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
