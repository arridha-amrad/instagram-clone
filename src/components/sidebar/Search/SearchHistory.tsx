'use client';

import { Button } from '@nextui-org/react';
import { useSidebarSearchContext } from './Context';
import { useSession } from 'next-auth/react';
import { deleteAllSearchHistory } from './clientAction';
import Item from './Item';

export default function SearchHistory() {
  const { savedSearch, removeAll } = useSidebarSearchContext();
  const { data } = useSession();

  const removeHistory = async () => {
    if (data?.user.id) {
      removeAll();
      await deleteAllSearchHistory(data.user.id);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center px-4 py-2">
        <div>
          <h1 className="font-bold">Latest</h1>
        </div>
        <Button
          onClick={removeHistory}
          variant="light"
          color="primary"
          className="font-bold"
        >
          Clear all
        </Button>
      </div>
      <div className="space-y-2 h-full">
        {savedSearch.map((data) => (
          <Item isRemoveAble item={data} key={data._id} />
        ))}
      </div>
    </>
  );
}
