'use client';

import { uploadAvatar } from '@/actions/server/user';
import { Avatar } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useRef, useState } from 'react';

type Props = {
  src: string;
};

export default function UpdateAbleAvatar({ src }: Props) {
  const ref = useRef<HTMLInputElement | null>(null);
  const { data, update } = useSession();
  const authId = data?.user.id;
  const [url, setUrl] = useState(src);
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!authId) return;
    if (files && files.length > 0) {
      setUrl(URL.createObjectURL(files[0]));
      const formData = new FormData();
      formData.append('image', files[0]);
      const data = await uploadAvatar(formData);
      await update({ avatar: data.avatar });
    }
  };
  return (
    <>
      <Avatar
        onClick={() => ref.current?.click()}
        className="w-20 cursor-pointer h-auto aspect-square md:w-40 md:h-40 text-large"
        src={url}
      />
      <input ref={ref} hidden type="file" onChange={onChange} />
    </>
  );
}
