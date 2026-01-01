import db from "@/lib/drizzle/db";
import SuggestedUserCard from "./SuggestedUserCard";
import Link from "next/link";

const fetchSuggestedUsers = async () => {
  const result = await db.query.user.findMany({
    limit: 5,
    columns: {
      id: true,
      username: true,
      name: true,
      image: true,
    },
  });
  return result;
};

export default async function SuggestedUsers() {
  const users = await fetchSuggestedUsers();
  return (
    <div className="my-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-semibold text-sm">Suggested Users</h1>
        <Link className="font-extrabold text-sm block" href="/search">
          See All
        </Link>
      </div>
      <div className="space-y-2">
        {users.map((user) => (
          <SuggestedUserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
