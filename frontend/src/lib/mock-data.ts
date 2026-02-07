import { Home, Compass, Newspaper, Bookmark, Clock, Twitter, Github, Globe, Mail } from "lucide-react";

export const NAV_ITEMS = [
  { label: "Dashboard", icon: Home, href: "/", active: false },
  { label: "Discover", icon: Compass, href: "/discover", active: false },
  { label: "News", icon: Newspaper, href: "/news", active: false },
];

export const ARTICLES = [
  {
    id: "1",
    title: "The Future of Minimalist Interface Design in 2026",
    excerpt: "Exploring how white space and subtle typography are reclaiming the digital landscape in an era of noise.",
    category: "Design",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    author: {
      id: "auth-1",
      name: "Alex Rivera",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      role: "UX Architect",
      bio: "Crafting digital experiences with a focus on minimalism and human-centric design. Previously at DesignCo and TechFlow.",
      stats: { articles: 24, followers: "1.2k", following: 148 },
      socials: { twitter: "@arivera", github: "arivera", website: "arivera.design" }
    },
    date: "Oct 12, 2025",
    readTime: "5 min read",
    isBookmarked: false,
    tags: ["UI Design", "Minimalism", "Trends", "UX"],
    content: `...`, // Truncated for brevity
    comments: [
      {
        id: "c1",
        user: { name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
        text: "This really resonates with what we're seeing in SaaS dashboards too. Less is definitely more.",
        date: "2 hours ago",
        likes: 12
      }
    ]
  },
  {
    id: "2",
    title: "Understanding Server Components in Next.js 16",
    excerpt: "A deep dive into the latest streaming patterns and how they impact Core Web Vitals.",
    category: "Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    author: {
      id: "auth-2",
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      role: "Senior Engineer",
      bio: "Full-stack developer passionate about performance optimization and React ecosystem. Lead at WebSolutions.",
      stats: { articles: 18, followers: "3.5k", following: 290 },
      socials: { twitter: "@sarahc_dev", github: "schen-dev", website: "sarahchen.me" }
    },
    date: "Oct 10, 2025",
    readTime: "8 min read",
    isBookmarked: true,
    tags: ["Next.js", "React", "Performance", "WebDev"],
    content: `...`,
    comments: []
  },
  {
    id: "3",
    title: "The Rise of Editorial-Driven SaaS Dashboards",
    excerpt: "Why modern platforms are shifting towards a content-first discovery experience.",
    category: "Product",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    author: {
      id: "auth-3",
      name: "James Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      role: "Product Manager",
      bio: "Strategy-focused product leader. Helping teams build products that users love through data and empathy.",
      stats: { articles: 12, followers: "850", following: 112 },
      socials: { twitter: "@jwilson_pm", github: "jwilson", website: "jwilson.io" }
    },
    date: "Oct 08, 2025",
    readTime: "6 min read",
    isBookmarked: false,
    tags: ["SaaS", "Product", "UX", "Dashboard"],
    content: `...`,
    comments: []
  },
];

export const CATEGORIES = [
  { name: "Design", count: 12, active: true },
  { name: "Development", count: 8, active: false },
  { name: "Product", count: 5, active: false },
  { name: "Technology", count: 15, active: false },
  { name: "Business", count: 7, active: false },
];

export const RECOMMENDED_FOLLOWS = [
  { name: "Jordan Smith", handle: "@jsmith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan" },
  { name: "Elena Gilbert", handle: "@elena_g", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" },
  { name: "Marcus Wright", handle: "@mwright", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" },
];
