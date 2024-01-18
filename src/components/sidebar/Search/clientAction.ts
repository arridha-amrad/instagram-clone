export const postSearchedUser = async (id: string, authId?: string) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, authId })
    });
  } catch (err) {
    throw err;
  }
};

export const removeHistory = async (id: string, authId?: string) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/search`, {
      method: 'DELETE',
      body: JSON.stringify({ id, authId })
    });
  } catch (err) {
    throw err;
  }
};
