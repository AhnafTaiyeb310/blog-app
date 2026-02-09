import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="mx-auto max-w-[1440px]">
      <Sidebar />
      <div className="lg:pl-[260px]">
        <TopBar />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
