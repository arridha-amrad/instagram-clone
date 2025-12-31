import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import { getServerSideSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CurrentUser() {
  const session = await getServerSideSession();
  if (!session) {
    redirect("/auth/login");
  }

  const user = session?.user;

  return (
    <div className="flex w-full items-center gap-2">
      <div className="flex flex-1 basis-0 items-center justify-start gap-3">
        <AvatarWithStoryIndicator
          isStoryExists={false}
          isStoryWatched={false}
          size={44}
          avatarUrl={user?.image}
        />
        <div className="max-w-[150px] overflow-hidden text-sm">
          <h1 className="overflow-hidden font-medium text-ellipsis whitespace-pre-line">
            {user?.username}
          </h1>
          <p className="text-foreground/70 line-clamp-1">{user?.name}</p>
        </div>
      </div>
      <Link
        className="text-skin-primary text-sm font-semibold"
        href={`/${user?.username}`}
      >
        Visit
      </Link>
    </div>
  );
}
