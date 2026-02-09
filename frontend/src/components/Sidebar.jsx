'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
// ... (rest of imports)

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-65 flex-col border-r bg-white p-6 lg:flex">
      {/* User Profile Section */}
      <Link href="/authors/auth-1" className="mb-8 flex items-center gap-3 hover:opacity-80 transition-opacity">
        <Avatar className="h-12 w-12 bg-linear-to-br from-purple-500 to-indigo-600 p-0.5">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
          <AvatarFallback className="bg-purple-100 text-purple-700">FX</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-900 leading-none">Felix Arvid</span>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[11px] text-slate-500">@felix_design</span>
            <Badge className="h-4 px-1.5 text-[10px] bg-purple-100 text-purple-600 border-none hover:bg-purple-100">Pro</Badge>
          </div>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <div className="mb-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Menu</div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.label} href={item.href} className="block">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-purple-50 text-purple-600 hover:bg-purple-100 hover:text-purple-700 shadow-sm" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-purple-600" : "text-slate-400")} />
                <span className="font-medium">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Card */}
      <Card className="mt-auto border-none bg-linear-to-br from-indigo-600 to-violet-700 p-5 rounded-2xl text-white shadow-lg overflow-hidden relative group">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all duration-500" />
        <div className="relative z-10">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
            <Zap className="h-5 w-5 text-white fill-white" />
          </div>
          <h4 className="mb-1 font-semibold">Upgrade to Pro</h4>
          <p className="mb-4 text-xs text-indigo-100/80 leading-relaxed">
            Get unlimited access to premium articles and insights.
          </p>
          <Button className="w-full rounded-full bg-white text-indigo-600 hover:bg-indigo-50 font-semibold border-none shadow-sm transition-transform active:scale-95">
            Upgrade Now
          </Button>
        </div>
      </Card>
    </aside>
  );
}
