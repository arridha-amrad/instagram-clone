import { getServerSideSession } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSideSession();

  return (
    <div>
      <p>hello</p>
      <h1>{JSON.stringify(session?.user)}</h1>
    </div>
  );
}
