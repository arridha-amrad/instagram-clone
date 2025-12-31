import { Sidebar } from "@/components/Sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen container mx-auto">
      <Sidebar />
      {children}
    </div>
  );
}
