'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { Button, User } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { TSearchResult } from './SearchHistory';
import {
  addToSearchHistory,
  deleteSearchHistories
} from '@/actions/server/user';

type Props = {
  item: TSearchResult;
  isRemoveAble?: boolean;
};

const Item = ({ item, isRemoveAble }: Props) => {
  const { _id, name, username, avatar } = item;
  const defaultAvatar = `${process.env.NEXT_PUBLIC_URL}/default_profile.jpg`;
  const router = useRouter();

  const navigateAndSave = async () => {
    await addToSearchHistory(_id);
    router.push(`/${username}`);
  };

  return (
    <div
      onClick={navigateAndSave}
      key={username}
      className="px-4 w-full hover:dark:bg-slate-900 cursor-pointer flex justify-between py-2  rounded-none h-max"
    >
      <User
        avatarProps={{ src: avatar ?? defaultAvatar }}
        name={username}
        description={name}
      />
      {isRemoveAble && (
        <Button
          size="sm"
          variant="light"
          onClick={async (e) => {
            e.stopPropagation();
            await deleteSearchHistories(_id);
          }}
          isIconOnly
          startContent={<XMarkIcon className="w-5 h-5" />}
        />
      )}
    </div>
  );
};

export default Item;
