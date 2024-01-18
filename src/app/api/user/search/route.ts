import addSearchedUsers from '../addSearchedUsers';
import deleteSearchHistory from '../deleteSearchHistory';
import getSearchedUsers from '../getSearchedUsers';

export async function POST(req: Request) {
  try {
    const { id, authId } = await req.json();
    await addSearchedUsers(id, authId);
    return Response.json({ message: 'ok' }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const users = await getSearchedUsers();
    return Response.json({ users }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id, authId } = await req.json();
    if (!authId) {
      return Response.json({}, { status: 204 });
    }
    await deleteSearchHistory(id, authId);
    return Response.json({ message: 'delete' }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: 'Server Error' }, { status: 500 });
  }
}
