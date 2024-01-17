'use client';

import { Avatar } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useRef, useState } from 'react';

type Props = {
  src: string;
};

export default function UpdateableAvatar({ src }: Props) {
  const ref = useRef<HTMLInputElement | null>(null);
  const { data } = useSession();
  const authUserId = data?.user.id;
  const [url, setUrl] = useState(src);
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!authUserId) return;
    if (files && files.length > 0) {
      console.log('path : ', files[0]);
      console.log('url : ', URL.createObjectURL(files[0]));
      setUrl(URL.createObjectURL(files[0]));
      const url = `${process.env.NEXT_PUBLIC_URL}/api/user/avatar`;
      const formData = new FormData();
      formData.append('image', files[0]);
      formData.append('authUserId', authUserId);
      await fetch(url, { method: 'POST', body: formData });
    }
  };
  return (
    <>
      <Avatar
        onClick={() => ref.current?.click()}
        className="w-20 cursor-pointer h-20 md:w-40 md:h-40 text-large"
        src={url}
      />
      <input ref={ref} hidden type="file" onChange={onChange} />
    </>
  );
}
