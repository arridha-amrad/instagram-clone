'use client';

import { Button } from '@nextui-org/react';

type Props = {
  user: any;
};

const ProfileEditButton = ({ user }: Props) => {
  return <Button className="font-semibold">Edit Profile</Button>;
};

export default ProfileEditButton;
