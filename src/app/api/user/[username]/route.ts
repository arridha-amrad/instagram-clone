export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  const username = params.username;
  return Response.json({ username }, { status: 200 });
}
