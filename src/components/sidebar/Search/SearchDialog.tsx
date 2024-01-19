'use client';

import { Input, Spacer, Divider, Button } from '@nextui-org/react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Item from './Item';
import { TSearchResult } from './Context';
import { searchUser } from './clientAction';
import SearchHistory from './SearchHistory';

const SearchDialog = () => {
  const [search, setSearch] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState<TSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      setResult(data.users);
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!key) return;
    initSearch();
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
        <SearchHistory />
      ) : (
        <div className="space-y-2 h-full">
          {result.length === 0
            ? !isLoading && (
                <div className="text-center py-4">
                  <p>No result</p>
                </div>
              )
            : result.map((data) => <Item item={data} key={data._id} />)}
        </div>
      )}
    </>
  );
};

export default SearchDialog;
