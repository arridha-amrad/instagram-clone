import { Button } from '@nextui-org/react';
import EllipsisHorizontalIcon from '@heroicons/react/24/outline/EllipsisHorizontalIcon';

const ProfileOtherMenuButton = () => {
  return (
    <Button className="p-0" isIconOnly variant="light">
      <EllipsisHorizontalIcon className="w-8 h-8" />
    </Button>
  );
};

export default ProfileOtherMenuButton;
