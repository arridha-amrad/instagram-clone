import { headers } from 'next/headers';

const SavedSearchedUsers = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/user/search`,
    {
      headers: headers()
    }
  );

  const data = await response.json();

  return <div>{JSON.stringify(data)}</div>;
};

export default SavedSearchedUsers;
