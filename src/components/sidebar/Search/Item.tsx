'use client';

import { Button, User } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { TSearchResult } from './Context';
import { useSession } from 'next-auth/react';
import { postSearchedUser } from './actions';
import { XMarkIcon } from '@heroicons/react/24/solid';

type Props = {
  item: TSearchResult;
};

const Item = ({ item }: Props) => {
  const { _id, name, username, avatar } = item;
  const defaultAvatar = `${process.env.NEXT_PUBLIC_URL}/default_profile.jpg`;
  const { data } = useSession();
  const router = useRouter();

  const navigateAndSave = async (username: string, id: string) => {
    router.push(`/${username}`);
    await postSearchedUser(id, data?.user.id);
  };

  const deleteSearch = () => {
    console.log('delete id : ', _id);
  };

  return (
    <div
      onClick={async () => await navigateAndSave(username, _id)}
      key={username}
      className="px-4 w-full hover:dark:bg-slate-900 cursor-pointer flex justify-between py-2  rounded-none h-max"
    >
      <User
        avatarProps={{ src: avatar ?? defaultAvatar }}
        name={username}
        description={name}
      />
      <Button
        size="sm"
        variant="light"
        onClick={(e) => {
          e.stopPropagation();
          deleteSearch();
        }}
        isIconOnly
        startContent={<XMarkIcon className="w-5 h-5" />}
      />
    </div>
  );
};

export default Item;
