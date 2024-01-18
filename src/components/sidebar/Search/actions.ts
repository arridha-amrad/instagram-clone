'use server';

import { headers } from 'next/headers';

export const fetchSearchCache = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user/search`,
      { headers: headers() }
    );
    const data = await response.json();
    return data.users;
  } catch (err) {
    throw err;
  }
};
