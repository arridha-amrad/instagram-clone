'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { Button, User } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import {
  addToSearchHistory,
  deleteSearchHistories
} from '@/actions/server/user';
import { TUser } from '@/lib/mongoose/models/User/types';

type Props = {
  item: TUser;
  isRemoveAble?: boolean;
};

const Item = ({ item, isRemoveAble }: Props) => {
  const { id, name, username, avatar } = item;
  const defaultAvatar = `${process.env.NEXT_PUBLIC_URL}/default_profile.jpg`;
  const router = useRouter();

  const navigateAndSave = async () => {
    await addToSearchHistory(id);
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
            await deleteSearchHistories(id);
          }}
          isIconOnly
          startContent={<XMarkIcon className="w-5 h-5" />}
        />
      )}
    </div>
  );
};

export default Item;
