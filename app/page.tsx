import { getServerSideSession } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSideSession();

  return (
    <div>
      <h1>{JSON.stringify(session?.user)}</h1>
    </div>
  );
}
