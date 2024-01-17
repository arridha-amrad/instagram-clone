import searchUser from '../../searchUser';

export async function GET(
  req: Request,
  { params }: { params: { searchKey: string } }
) {
  try {
    const users = await searchUser(params.searchKey);
    return Response.json({ users }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
