'use client';

import { Input, Spacer, Divider, Button, User } from '@nextui-org/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Item from './Item';
import { useSidebarSearchContext } from './Context';

const searchUser = async (key: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/user/search/${key}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

type TSearchResult = {
  _id: string;
  username: string;
  name: string;
  avatar?: string;
};

const SearchDialog = () => {
  const [search, setSearch] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState<TSearchResult[]>([]);
  const { savedSearch } = useSidebarSearchContext();

  useEffect(() => {
    const id = setTimeout(() => {
      setKey(search);
    }, 1500);
    return () => {
      clearTimeout(id);
    };
  }, [search]);

  useEffect(() => {
    if (key) {
      searchUser(key)
        .then((data) => {
          console.log('data : ', data);
          setResult(data.users);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [key]);

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
          onClear={() => setSearch('')}
          size="sm"
          type="text"
          placeholder="Search"
          startContent={
            <MagnifyingGlassIcon className="w-5 h-5 pointer-events-none" />
          }
          isClearable
        />
      </div>
      <Spacer y={4} />
      <Divider />
      <div className="flex justify-between items-center px-4 py-2">
        <div>
          <h1 className="font-bold">Latest</h1>
        </div>
        <Button variant="light" color="primary" className="font-bold">
          Clear all
        </Button>
      </div>
      <div className="space-y-2 h-full">
        {!key
          ? savedSearch.map((data) => <Item item={data} key={data._id} />)
          : result.map((data) => <Item item={data} key={data._id} />)}
      </div>
    </>
  );
};

export default SearchDialog;
