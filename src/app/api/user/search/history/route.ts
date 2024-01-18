import deleteAllSearchHistory from '../../deleteAllSearchHistory';

export async function DELETE(req: Request) {
  try {
    const { authId } = await req.json();
    await deleteAllSearchHistory(authId);
    return Response.json({ message: 'Delete all' }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: 'Server Error' }, { status: 500 });
  }
}
