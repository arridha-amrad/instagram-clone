'use client';

import { deleteSearchHistories } from '@/actions/server/user';
import { Button } from '@nextui-org/react';

export default function ClearAllButton() {
  return (
    <Button
      onClick={() => deleteSearchHistories()}
      variant="light"
      color="primary"
      className="font-bold"
    >
      Clear all
    </Button>
  );
}
