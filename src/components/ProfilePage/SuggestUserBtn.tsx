import { Button } from '@nextui-org/react';
import UserPlusIcon from '@heroicons/react/24/outline/UserPlusIcon';

const SuggestUserButton = () => {
  return (
    <Button isIconOnly>
      <UserPlusIcon className="w-6 h-6" />
    </Button>
  );
};

export default SuggestUserButton;
