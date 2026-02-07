import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Fallback if Textarea isn't installed
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";

export function CommentSection({ comments }) {
  return (
    <section className="mt-16 border-t border-slate-100 pt-10">
      <h3 className="mb-8 text-xl font-bold text-slate-900">
        Comments <span className="text-slate-400">({comments.length})</span>
      </h3>

      {/* Comment Form */}
      <div className="mb-10 flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
          <AvatarFallback>FX</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          <textarea 
            className="w-full min-h-[100px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all resize-y"
            placeholder="What are your thoughts?" 
          />
          <div className="flex justify-end">
            <Button className="rounded-full bg-purple-600 px-6 hover:bg-purple-700">
              Post Comment
            </Button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.user.avatar} />
              <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 text-sm">{comment.user.name}</span>
                  <span className="text-xs text-slate-400">{comment.date}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm leading-relaxed text-slate-700">{comment.text}</p>
              
              <div className="mt-3 flex items-center gap-4">
                <button className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-purple-600 transition-colors">
                  <Heart className="h-3.5 w-3.5" />
                  {comment.likes} Likes
                </button>
                <button className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-purple-600 transition-colors">
                  <MessageCircle className="h-3.5 w-3.5" />
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
