import { Sidebar } from "@/components/Sidebar";
import { getServerSideSession } from "@/lib/auth";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSideSession();

  return (
    <div className="flex min-h-screen container mx-auto">
      {session && <Sidebar username={session?.user?.username!} />}
      {children}
    </div>
  );
}
