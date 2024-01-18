'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';

export const fetchSearchCache = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user/search`,
      { headers: headers(), next: { tags: ['search'] } }
    );
    const data = await response.json();
    return data.users;
  } catch (err) {
    throw err;
  }
};

export const postSearchedUser = async (id: string, authId?: string) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, authId })
    });
    revalidateTag('search');
  } catch (err) {
    throw err;
  }
};
