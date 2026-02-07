import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between bg-[#f8fafc]/80 backdrop-blur-md px-8">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="search"
          placeholder="Search here..."
          className="h-11 w-full rounded-full border-none bg-white pl-11 pr-4 shadow-sm focus-visible:ring-purple-200"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm">
          <span className="text-xs font-bold text-purple-600">3S</span>
          <div className="h-4 w-px bg-slate-100" />
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">Status</span>
        </div>

        <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-xl bg-white shadow-sm hover:bg-slate-50 transition-all">
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-purple-500 ring-2 ring-white" />
        </Button>
      </div>
    </header>
  );
}
