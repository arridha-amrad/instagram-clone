import Item from './Item';
import ClearAllButton from './ClearAllBtn';

import { getSearchHistories } from '@/actions/server/user';

export default async function SearchHistory() {
  const histories = await getSearchHistories();

  if (histories.length === 0) return null;

  return (
    <>
      <div className="flex justify-between items-center px-4 py-2">
        <div>
          <h1 className="font-bold">Latest</h1>
        </div>
        <ClearAllButton />
      </div>
      <div className="space-y-2 h-full">
        {histories?.map((data) => (
          <Item isRemoveAble item={data} key={data.id} />
        ))}
      </div>
    </>
  );
}
