'use client';

import { baseURL } from '@/actions/variables';
import usePostsStore from '@/lib/zustand/store/postStore';
import getAvatar from '@/utils/getAvatar';
import MapPinIcon from '@heroicons/react/24/solid/MapPinIcon';
import { Input, User } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Dispatch,
  FormEvent,
  Ref,
  SetStateAction,
  forwardRef,
  useState
} from 'react';

type Props = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  fileList: File[];
  loading: boolean;
  onClose: VoidFunction;
};

const PostForm = (
  { fileList, setLoading, loading, onClose }: Props,
  ref: Ref<HTMLButtonElement>
) => {
  const { data: auth } = useSession();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();
  const { addPost } = usePostsStore();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!auth) {
      router.replace('/accounts/login');
      return;
    }
    const formData = new FormData();
    formData.append('description', description);
    for (let i = 0; i < fileList.length; i++) {
      formData.append('images', fileList[i]);
    }
    formData.append('location', location);
    formData.append('authId', auth.user.id);
    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/api/post`, {
        method: 'POST',
        body: formData
      });
      const res = await response.json();
      addPost(res.post);
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <fieldset className="w-full h-full" disabled={loading}>
      <form
        onSubmit={onSubmit}
        className="w-full flex flex-col items-start gap-4 pl-4 py-2 h-full"
      >
        <div className="flex-1 h-full">
          <User
            name={auth?.user.username}
            avatarProps={{ src: getAvatar(auth?.user.avatar) }}
          />
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="h-full bg-transparent outline-none w-full rounded-lg resize-none"
            placeholder="Enter your description"
          />
        </div>
        <Input
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          variant="flat"
          endContent={<MapPinIcon className="w-6 h-6" />}
          placeholder="Add Location"
        />
        <button hidden type="submit" ref={ref} />
      </form>
    </fieldset>
  );
};

export default forwardRef(PostForm);
