import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen container mx-auto">
      <Sidebar avatar="" username="" users={[]} notifications={[]} />
      {children}
    </div>
  );
}
