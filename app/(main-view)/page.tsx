import AuthUser from "@/components/AuthUser";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <main className="flex-1">
        <h1>hello</h1>
      </main>
      <aside className="lg:w-xs flex flex-col h-screen px-2 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <AuthUser />
        </Suspense>
      </aside>
    </>
  );
}
