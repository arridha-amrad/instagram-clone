'use client';

import { Button, User } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { TSearchResult, useSidebarSearchContext } from './Context';
import { useSession } from 'next-auth/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { postSearchedUser, removeHistory } from './clientAction';

type Props = {
  item: TSearchResult;
  isRemoveAble?: boolean;
};

const Item = ({ item, isRemoveAble }: Props) => {
  const { _id, name, username, avatar } = item;
  const defaultAvatar = `${process.env.NEXT_PUBLIC_URL}/default_profile.jpg`;
  const { data } = useSession();
  const router = useRouter();
  const { add, remove } = useSidebarSearchContext();

  const navigateAndSave = async (username: string, id: string) => {
    await postSearchedUser(id, data?.user.id);
    add(item);
    router.push(`/${username}`);
  };

  const deleteSearch = async () => {
    console.log('delete id : ', _id);
    remove(item);
    await removeHistory(_id, data?.user.id);
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
      {isRemoveAble && (
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
      )}
    </div>
  );
};

export default Item;
