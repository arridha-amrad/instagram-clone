'use client';

import { searchUser } from '@/actions/server/user';
import { TUser } from '@/lib/mongoose/models/User/types';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Divider, Input, Spacer } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';
import Item from './Item';

type Props = {
  children: ReactNode;
};

const SearchDialog = ({ children }: Props) => {
  const [search, setSearch] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSession();

  useEffect(() => {
    const id = setTimeout(() => {
      setKey(search);
    }, 1500);
    return () => {
      clearTimeout(id);
    };
  }, [search]);

  const initSearch = async () => {
    setIsLoading(true);
    try {
      const data = await searchUser(key);
      setResult(data);
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(
    () => {
      if (!key) return;
      initSearch();
    },
    // eslint-disable-next-line
    [key]
  );

  return (
    <>
      <div className="py-2 px-4">
        <h1 className="font-bold text-2xl">Search</h1>
      </div>
      <Spacer y={3} />
      <div className="px-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="sm"
          type="text"
          placeholder="Search"
          startContent={
            <MagnifyingGlassIcon className="w-5 h-5 pointer-events-none" />
          }
          endContent={
            isLoading ? (
              <Button
                variant="light"
                isDisabled
                isIconOnly
                isLoading={isLoading}
                size="sm"
              />
            ) : (
              <Button
                isIconOnly
                size="sm"
                variant="light"
                startContent={<XMarkIcon className="w-4 h-4" />}
                onClick={() => setSearch('')}
              />
            )
          }
        />
      </div>
      <Spacer y={4} />
      <Divider />
      {!key ? (
        data && children
      ) : (
        <div className="space-y-2 h-full">
          {result.length === 0
            ? !isLoading && (
                <div className="text-center py-4">
                  <p>No result</p>
                </div>
              )
            : result.map((data) => <Item item={data} key={data.id} />)}
        </div>
      )}
    </>
  );
};

export default SearchDialog;
