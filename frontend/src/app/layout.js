import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Editorial - Discovery Platform",
  description: "A modern editorial content discovery platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f8fafc] text-slate-900 antialiased`}>
        <div className="mx-auto max-w-[1440px]">
          <Sidebar />
          <div className="lg:pl-[260px]">
            <TopBar />
            <main className="p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}