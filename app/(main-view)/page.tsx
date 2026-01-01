import AuthUser from "@/components/AuthUser";
import FeedPostCard from "@/components/FeedPostCard";
import SuggestedUsers from "@/components/SuggestedUsers";
import { FeedPosts } from "@/features/post/FeedPosts";
import Stories from "@/features/user/Stories";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <main className="flex-1">
        <div className="w-full sm:max-w-[630px] max-w-full mx-auto min-h-screen p-4">
          <Suspense fallback={<div>Loading...</div>}>
            <Stories />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            {/* <FeedPostCard /> */}
            <FeedPosts />
          </Suspense>
        </div>
      </main>
      <aside className="lg:w-xs flex flex-col h-screen px-2 py-8 sticky top-0">
        <Suspense fallback={<div>Loading...</div>}>
          <AuthUser />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <SuggestedUsers />
        </Suspense>
        <>
          <ul className="flex flex-wrap gap-1 text-xs text-foreground/50 mt-4">
            <li className="w-max leading-6">About &middot;</li>
            <li className="w-max leading-6">Blog &middot;</li>
            <li className="w-max leading-6">Jobs &middot;</li>
            <li className="w-max leading-6">Help &middot;</li>
            <li className="w-max leading-6">API &middot;</li>
            <li className="w-max leading-6">Privacy &middot;</li>
            <li className="w-max leading-6">Terms &middot;</li>
            <li className="w-max leading-6">Locations &middot;</li>
            <li className="w-max leading-6">Language &middot;</li>
            <li className="w-max leading-6">Meta Verified</li>
          </ul>
          <p className="text-xs text-foreground/50 mt-4 uppercase">
            © {new Date().getFullYear()} Instagram from devari
          </p>
        </>
      </aside>
    </>
  );
}
